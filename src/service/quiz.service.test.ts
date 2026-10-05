// quiz.service.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { quizService } from "./quiz.service";
import { NotFoundError } from "@/utils/errors.utils";
import { quizs } from "../assets/quizs/quiz";

vi.mock("../assets/quizs/quiz", () => ({
  quizs: [
    { id: "1", name: "historia de españa", quizQuestions: [], extraPoints: 5, questions: 10 },
    { id: "2", name: "geografía mundial", quizQuestions: [], extraPoints: 3, questions: 8 },
  ],
}));

describe("quizService", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("getQuizs", () => {
    it("resolve with the complete list of quizzes when it is called", async () => {
      const promise = quizService.getQuizs();
      await vi.advanceTimersByTimeAsync(1000);

      await expect(promise).resolves.toEqual(quizs);
    });

    it("does not resolve before the simulated delay has passed when fetching the list of quizzes", async () => {
      let resolved = false;
      quizService.getQuizs().then(() => {
        resolved = true;
      });

      await vi.advanceTimersByTimeAsync(500);
      expect(resolved).toBe(false);

      await vi.advanceTimersByTimeAsync(500);
      expect(resolved).toBe(true);
    });
  });

  describe("getQuizById", () => {
    it("resolves with the quiz corresponding to the id when it exists", async () => {
      const promise = quizService.getQuizById("1");
      await vi.advanceTimersByTimeAsync(1000);

      await expect(promise).resolves.toEqual(quizs[0]);
    });

    it("rejects with NotFoundError when the id does not exist", async () => {
      const promise = quizService.getQuizById("no-existe");
      const assertion = expect(promise).rejects.toBeInstanceOf(NotFoundError);

      await vi.advanceTimersByTimeAsync(1000);
      await assertion;

    });

    it("the message of NotFoundError includes the searched id when the quiz does not exist", async () => {
      const promise = quizService.getQuizById("no-existe");
      const assertion = expect(promise).rejects.toThrow("Quiz with id no-existe not found");

      await vi.advanceTimersByTimeAsync(1000);
      await assertion;

    });
  });
});