import { useEffect, useRef, useState } from "react";
import type { Question } from "../../../types/question.types";
import useScore from "../../../zunstand/score";
import useSQuizStatus, { QUIZ_STATUS } from "../../../zunstand/quiz-status";

export type SelectedOption = {
    answer: number;
    resolved: boolean;
    correct: boolean | null;
}

export type QuestionCount = {
    totalQuestions: number;
    pendingQuestions: number;
    questionsAnswered: number;
}

export const DEFAULT_ANSWER_SELECTED = 0

export const useQuiz = (questions: Question[]): {
    getRandomQuestion: () => void;
    resolveAnswer: () => void;
    selectOption: (optionIndex: number) => void;
    nextQuestion: () => void;
    currentQuestion: Question | null;
    questionCount: QuestionCount;
    selectedOption: SelectedOption | null;
    isQuizFinished: boolean;
} => {
    const [pendingQuestions, setPendingQuestions] = useState<Question[]>(questions);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);

    const quizStatus = useSQuizStatus();

    // Added to ensure that the first question is generated only once when the component mounts. This prevents multiple questions from being generated on re-renders.
    const hasGenerated = useRef(false);
    const increase = useScore((state) => state.increase);

    useEffect(() => {
        if (hasGenerated.current || quizStatus.status !== QUIZ_STATUS.NOT_STARTED) return;

        hasGenerated.current = true;
        quizStatus.setStatus(QUIZ_STATUS.IN_PROGRESS);
        generateCurrentQuestion();
    }, []);



    const generateCurrentQuestion = () => {
        const randomIndex = Math.floor(Math.random() * pendingQuestions?.length);
        const newQuestion = pendingQuestions[randomIndex];

        setCurrentQuestion(newQuestion);
    }

    const selectOption = (optionIndex: number): void => {
        if (!currentQuestion) return;

        setSelectedOption({ answer: optionIndex, resolved: false, correct: null });
    }

    const resolveAnswer = (): void => {
        if (!currentQuestion) return;

        const isCorrect = currentQuestion.answer === selectedOption?.answer;
        setSelectedOption({ answer: selectedOption?.answer ?? DEFAULT_ANSWER_SELECTED, resolved: true, correct: isCorrect });

        if (isCorrect) {
            increase();
        }
    }

    const nextQuestion = () => {
        const isQuizFinished = pendingQuestions.length === 1;

        setPendingQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question !== currentQuestion)
        );

        if (isQuizFinished) {
            quizStatus.setStatus(QUIZ_STATUS.FINISHED);
            return;
        }

        generateCurrentQuestion();
        setSelectedOption(null);
    }

    const questionCount: QuestionCount = {
        totalQuestions: questions.length,
        pendingQuestions: pendingQuestions.length,
        questionsAnswered: questions.length - pendingQuestions.length,
    };

    return { getRandomQuestion: generateCurrentQuestion, resolveAnswer, selectOption, nextQuestion, currentQuestion, questionCount, selectedOption, isQuizFinished: quizStatus.status === QUIZ_STATUS.FINISHED };
}