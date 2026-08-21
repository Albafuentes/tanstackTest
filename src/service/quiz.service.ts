import type { Question } from "../types/question.types";
import { questions } from "../assets/quiz-questions";

export const quizService = {
  async getQuiz(): Promise<Question[]> {
    // Simulate an API call with a delay
    return new Promise((resolve) =>
      setTimeout(() => resolve(questions), 1000),
    );
  },
};