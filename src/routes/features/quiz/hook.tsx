import { useEffect, useState } from "react";
import type { Question } from "../../../types/question.types";

export const QuizStatus = {
    NOT_STARTED: "not-started",
    IN_PROGRESS: "in-progress",
    FINISHED: "finished"
} as const;
type QuizStatus = typeof QuizStatus[keyof typeof QuizStatus];

export const useQuiz = (questions: Question[]): {
    getRandomQuestion: () => void;
    currentQuestion: Question | null;
    quizStatus: QuizStatus;
    totalQuestions: number;
    pendingQuestions: number;
} => {

    const [questionNotAnswered, setQuestionNotAnswered] = useState<Question[]>(questions);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [quizStatus, setQuizStatus] = useState<QuizStatus>(QuizStatus.NOT_STARTED);

    useEffect(() => {
        getRandomQuestion()
    }, [])

    const getRandomQuestion = () => {
        if (questionNotAnswered.length === 0 && quizStatus === QuizStatus.IN_PROGRESS) {
            setQuizStatus(QuizStatus.FINISHED);
            return;
        }

        if (quizStatus === QuizStatus.NOT_STARTED) {
            setQuizStatus(QuizStatus.IN_PROGRESS);
        }

        const randomIndex = Math.floor(Math.random() * questionNotAnswered.length);
        const newQuestion = questionNotAnswered[randomIndex];

        setQuestionNotAnswered(prevQuestions => prevQuestions.filter((_, index) => index !== randomIndex));
        setCurrentQuestion(newQuestion);
    }

    return { getRandomQuestion, currentQuestion, quizStatus, totalQuestions: questions.length, pendingQuestions: questionNotAnswered.length };
}