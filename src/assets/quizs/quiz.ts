import * as quizsQuestions from "@/assets/quizs/quiz-questions"
import type { QuizModel } from "@/types/quiz.types";
import { SCORE_QUESTION_INCREMENT } from "@/zunstand/score";

export const quizs: QuizModel.Quiz[] = Object.entries(quizsQuestions).map(([key, value], index) => {
    const numberOfQuestions = value.questions.length;
    return {
        id: `${key}-${index}${numberOfQuestions}`,
        name: key,
        extraPoints: numberOfQuestions * SCORE_QUESTION_INCREMENT,
        questions: numberOfQuestions,

    }
})