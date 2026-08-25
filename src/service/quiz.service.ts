import { NotFoundError } from "@/utils/errors.utils";
import type { QuizModel } from "@/types/quiz.types";
import { quizs } from "../assets/quizs/quiz";

export const quizService = {
  async getQuizs(): Promise<QuizModel.Quiz[]> {
    return new Promise((resolve) => {
      // Simulate an API call with a delay
      setTimeout(() => resolve(quizs), 1000);
    });
  },

  async getQuizById(id: string): Promise<QuizModel.Quiz> {
    return new Promise((resolve, reject) => {
      // Simulate an API call with a delay
      setTimeout(() => {
        const quiz = quizs.find((quiz) => quiz.id === id);

        if (!quiz) {
          reject(new NotFoundError(`Quiz with id ${id} not found`));
          return;
        }

        resolve(quiz);
      }, 1000);
    });
  },
};