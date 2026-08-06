import { useEffect, useState } from "react";
import type { Question } from "../../../types/question.types";

export type SelectedOption = {
    answer: number;
    resolved: boolean;
    correct: boolean | null;
}

const SCORE_INCREMENT = 10;
export const DEFAULT_ANSWER_SELECTED = 0

export const useQuiz = (questions: Question[]): {
    getRandomQuestion: () => void;
    resolveAnswer: () => void;
    selectOption: (optionIndex: number) => void;
    nextQuestion: () => void;
    currentQuestion: Question | null;
    totalQuestions: number;
    pendingQuestions: number;
    score: number;
    selectedOption: SelectedOption | null;
    isQuizFinished: boolean;
} => {
    const [pendingQuestions, setPendingQuestions] = useState(() => [...questions]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);
    const [score, setScore] = useState<number>(0);

    const isQuizFinished = pendingQuestions.length === 0;

    useEffect(() => {
        generateCurrentQuestion()
    }, [])

    const generateCurrentQuestion = () => {
        if (isQuizFinished) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * pendingQuestions.length);
        const newQuestion = pendingQuestions[randomIndex];

        setPendingQuestions(prevQuestions => prevQuestions.filter((_, index) => index !== randomIndex));
        setCurrentQuestion(newQuestion);
    }

    const selectOption = (optionIndex: number): void => {
        if (!currentQuestion) return;

        setSelectedOption({ answer: optionIndex, resolved: false, correct: null });
    }

    const resolveAnswer = (): void => {
        if (!currentQuestion) return;

        const isCorrect = currentQuestion.answer === selectedOption?.answer;
        setSelectedOption({ answer: selectedOption?.answer?? DEFAULT_ANSWER_SELECTED , resolved: true, correct: isCorrect });

        if (isCorrect) {
            setScore(prevScore => prevScore + SCORE_INCREMENT);
        }
    }

    const nextQuestion = () => {
        generateCurrentQuestion();
        setSelectedOption(null);
    }

    return { getRandomQuestion: generateCurrentQuestion, resolveAnswer, selectOption, nextQuestion, currentQuestion, totalQuestions: questions.length, pendingQuestions: pendingQuestions.length, score, selectedOption, isQuizFinished };
}