export namespace QuizModel {
    export interface Question {
        question: string;
        options: string[];
        answer: number;
        explanation: string;
    }

    export type Quiz = {
        id: string;
        extraPoints: number;
        questions: number;
        name: string;
    }
}

