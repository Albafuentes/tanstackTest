import type { Question } from "../types/question.types";
import { questions } from "../assets/quiz-questions";

export const quizService = {
    getQuiz: async (): Promise<Question[]> => {
        // Simulate a delay to mimic an API call
        const data = await new Promise(resolve => setTimeout(() => resolve(questions), 1000));
        return data as Question[];
    }
};