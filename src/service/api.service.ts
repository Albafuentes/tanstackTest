import { authService } from "./auth.service";
import { quizService } from "./quiz.service";


export const api = {
    quiz: quizService,
    auth: authService,
};