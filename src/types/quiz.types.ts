export namespace QuizModel {
    export interface Question {
        question: string;
        options: string[];
        answer: number;
        explanation: string;
        level: 1 | 2 | 3;
    }

    export type Quiz = {
        id: string;
        extraPoints: number;
        questions: number;
        name: string;
        quizQuestions: Question[];
    }
}

