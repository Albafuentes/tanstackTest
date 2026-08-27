import { useCallback, useEffect, useRef, useState } from "react";
import useSession from "../../../../../zunstand/session";
import type { QuizModel } from "@/types/quiz.types";

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

interface UseQuizProps {
    id: string;
    name: string;
}

export const DEFAULT_ANSWER_SELECTED = 0

export const QUIZ_STATUS = {
    NOT_STARTED: "not-started",
    IN_PROGRESS: "in-progress",
    FINISHED: "finished",
} as const;
type QUIZ_STATUS = typeof QUIZ_STATUS[keyof typeof QUIZ_STATUS];

export const useQuiz = (questions: QuizModel.Question[], quizInfo: UseQuizProps): {
    getRandomQuestion: () => void;
    resolveAnswer: () => void;
    skipAnswer: () => void;
    selectOption: (optionIndex: number) => void;
    nextQuestion: () => void;
    finishedQuiz: () => void;
    currentQuestion: QuizModel.Question | null;
    questionCount: QuestionCount;
    selectedOption: SelectedOption | null;
    isQuizFinished: boolean;
} => {
    const [pendingQuestions, setPendingQuestions] = useState<QuizModel.Question[]>(questions);
    const [currentQuestion, setCurrentQuestion] = useState<QuizModel.Question | null>(null);

    const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);

    const [quizStatus, setQuizStatus] = useState<{ status: QUIZ_STATUS, totalScore: number, skippedAnswers: number, correctQuestions: number, wrongQuestions: number }>({ status: QUIZ_STATUS.NOT_STARTED, totalScore: 0, skippedAnswers: 0, correctQuestions: 0, wrongQuestions: 0 });


    // Added to ensure that the first question is generated only once when the component mounts. This prevents multiple questions from being generated on re-renders.
    const hasGenerated = useRef(false);
    const session = useSession();

    const generateCurrentQuestion = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * pendingQuestions?.length);
        const newQuestion = pendingQuestions[randomIndex];

        setCurrentQuestion(newQuestion);
    }, [pendingQuestions]);

    useEffect(() => {
        if (hasGenerated.current || quizStatus.status !== QUIZ_STATUS.NOT_STARTED) return;

        hasGenerated.current = true;
        setQuizStatus({ ...quizStatus, status: QUIZ_STATUS.IN_PROGRESS });
        generateCurrentQuestion();
    }, [quizStatus, setQuizStatus, generateCurrentQuestion,]);

    const selectOption = (optionIndex: number): void => {
        if (!currentQuestion) return;

        setSelectedOption({ answer: optionIndex, resolved: false, correct: null });
    }

    const resolveAnswer = (): void => {
        if (!currentQuestion) return;

        const isCorrect = currentQuestion.answer === selectedOption?.answer;
        setSelectedOption({ answer: selectedOption?.answer ?? DEFAULT_ANSWER_SELECTED, resolved: true, correct: isCorrect });

        if (isCorrect) {
            setQuizStatus({ ...quizStatus, totalScore: quizStatus.totalScore + 1, correctQuestions: quizStatus.correctQuestions + 1 });
        } else {
            setQuizStatus({ ...quizStatus, wrongQuestions: quizStatus.wrongQuestions + 1 });
        }
    }

    const skipAnswer = (): void => {
        if (!currentQuestion) return;

        setSelectedOption({ answer: selectedOption?.answer ?? DEFAULT_ANSWER_SELECTED, resolved: true, correct: false });
        setQuizStatus({ ...quizStatus, skippedAnswers: quizStatus.skippedAnswers + 1 });
        nextQuestion();
    }

    const nextQuestion = () => {
        setPendingQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question !== currentQuestion)
        );

        generateCurrentQuestion();
        setSelectedOption(null);
    }

    const finishedQuiz = () => {
        setPendingQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question !== currentQuestion)
        );
        setSelectedOption(null);
        setQuizStatus({ ...quizStatus, status: QUIZ_STATUS.FINISHED });

        session.increaseScore(quizStatus.totalScore);
        session.updateHistory(quizInfo.id, quizInfo.name, quizStatus.totalScore, quizStatus.skippedAnswers, true, questions.length, quizStatus.correctQuestions, quizStatus.wrongQuestions);
    }

    const questionCount: QuestionCount = {
        totalQuestions: questions.length,
        pendingQuestions: pendingQuestions.length,
        questionsAnswered: questions.length - pendingQuestions.length,
    };

    return { getRandomQuestion: generateCurrentQuestion, resolveAnswer, skipAnswer, selectOption, nextQuestion, finishedQuiz, currentQuestion, questionCount, selectedOption, isQuizFinished: pendingQuestions.length === 1 };
}