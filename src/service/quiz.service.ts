import { NotFoundError } from "@/utils/errors.utils";
import type { QuizModel } from "@/types/quiz.types";
import { quizs } from "../assets/quizs/quiz";

export const quizService = {
  async getQuizs(): Promise<QuizModel.Quiz[]> {
    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return quizs;
  },

  async getQuizById(id: string): Promise<QuizModel.Quiz> {
    // Simulate an API call with a delay
    const quiz = quizs.find((quiz) => quiz.id === id);
    if (!quiz) {
      throw new NotFoundError(`Quiz with id ${id} not found`);
    }

    return quiz;

  },
};