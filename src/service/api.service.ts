import { quizService } from "./quiz.service";


export const api = {
    quiz: {
        getQuiz: quizService.getQuiz
    }
};