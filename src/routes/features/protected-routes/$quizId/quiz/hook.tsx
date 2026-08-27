import { useCallback, useEffect, useRef, useState } from 'react';
import useSession from '../../../../../zunstand/session';
import type { QuizModel } from '@/types/quiz.types';
import { DEFAULT_SCORE, increaseScore } from '@/utils/score.utils';

export type SelectedOption = {
    answer: number;
    resolved: boolean;
    correct: boolean | null;
};

export type QuestionCount = {
    totalQuestions: number;
    pendingQuestions: number;
    questionsAnswered: number;
};

interface UseQuizProps {
    id: string;
    name: string;
}

export const DEFAULT_ANSWER_SELECTED = 0;

export const QUIZ_STATUS = {
    NOT_STARTED: 'not-started',
    IN_PROGRESS: 'in-progress',
    FINISHED: 'finished',
} as const;
type QUIZ_STATUS = (typeof QUIZ_STATUS)[keyof typeof QUIZ_STATUS];

export const TIMER_STATUS = {
    STARTED: 'started',
    PAUSED: 'paused',
    FINISHED: 'finished',
} as const;
type TIMER_STATUS = (typeof TIMER_STATUS)[keyof typeof TIMER_STATUS];

type QuizStatus = {
    timerStatus: TIMER_STATUS;
    status: QUIZ_STATUS;
    totalScore: number;
    skippedAnswers: number;
    correctQuestions: number;
    wrongQuestions: number;
}

export const useQuiz = (
    questions: QuizModel.Question[],
    quizInfo: UseQuizProps,
): {
    resolveAnswer: () => void;
    skipAnswer: () => void;
    selectOption: (optionIndex: number) => void;
    nextQuestion: () => void;
    finishedQuiz: () => void;
    timerStatus: TIMER_STATUS;
    currentQuestion: QuizModel.Question | null;
    questionCount: QuestionCount;
    selectedOption: SelectedOption | null;
    isQuizFinished: boolean;
} => {
    const [pendingQuestions, setPendingQuestions] =
        useState<QuizModel.Question[]>(questions);
    const [currentQuestion, setCurrentQuestion] =
        useState<QuizModel.Question | null>(null);

    const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(
        null,
    );

    const [quizStatus, setQuizStatus] = useState<QuizStatus>({
        timerStatus: TIMER_STATUS.STARTED,
        status: QUIZ_STATUS.NOT_STARTED,
        totalScore: DEFAULT_SCORE,
        skippedAnswers: 0,
        correctQuestions: 0,
        wrongQuestions: 0,
    });

    // Added to ensure that the first question is generated only once when the component mounts. This prevents multiple questions from being generated on re-renders.
    const hasGenerated = useRef(false);
    const session = useSession();

    const generateCurrentQuestion = useCallback((pendingQuestions: QuizModel.Question[]) => {
        const randomIndex = Math.floor(Math.random() * pendingQuestions?.length);
        const newQuestion = pendingQuestions[randomIndex];

        setCurrentQuestion(newQuestion);
    }, [pendingQuestions]);

    useEffect(() => {

        if (hasGenerated.current || quizStatus.status !== QUIZ_STATUS.NOT_STARTED)
            return;

        hasGenerated.current = true;
        setQuizStatus((prev) => ({ ...prev, status: QUIZ_STATUS.IN_PROGRESS }));
        generateCurrentQuestion(pendingQuestions);
    }, [quizStatus, setQuizStatus, generateCurrentQuestion]);

    const selectOption = (optionIndex: number): void => {
        if (!currentQuestion) return;

        setSelectedOption({ answer: optionIndex, resolved: false, correct: null });
    };

    const resolveAnswer = (): void => {
        if (!currentQuestion) return;

        const isCorrect = currentQuestion.answer === selectedOption?.answer;
        setSelectedOption({
            answer: selectedOption?.answer ?? DEFAULT_ANSWER_SELECTED,
            resolved: true,
            correct: isCorrect,
        });

        if (isCorrect) {
            setQuizStatus((prev) => ({
                ...prev,
                timerStatus: TIMER_STATUS.PAUSED,
                totalScore: increaseScore(prev.totalScore),
                correctQuestions: prev.correctQuestions + 1,
            }));
        } else {
            setQuizStatus((prev) => ({
                ...prev,
                wrongQuestions: prev.wrongQuestions + 1,
            }));
        }

    };

    const skipAnswer = (): void => {
        if (!currentQuestion) return;

        setSelectedOption({
            answer: selectedOption?.answer ?? DEFAULT_ANSWER_SELECTED,
            resolved: true,
            correct: false,
        });
        setQuizStatus((prev) => ({
            ...prev,
            skippedAnswers: prev.skippedAnswers + 1,
        }));
        nextQuestion();
    };

    const nextQuestion = () => {
        const nextQuestions = pendingQuestions.filter(
            (question) => question !== currentQuestion,
        );

        setPendingQuestions(nextQuestions);
        generateCurrentQuestion(nextQuestions);
        setSelectedOption(null);
        setQuizStatus((prev) => ({ ...prev, timerStatus: TIMER_STATUS.STARTED }));
    };

    const finishedQuiz = () => {
        session.updateHistory(
            quizInfo.id,
            quizInfo.name,
            quizStatus.totalScore,
            quizStatus.skippedAnswers,
            true,
            questions.length,
            quizStatus.correctQuestions,
            quizStatus.wrongQuestions,
        );

        setQuizStatus((prev) => ({ ...prev, status: QUIZ_STATUS.FINISHED, timerStatus: TIMER_STATUS.FINISHED }));

        // reset the quiz state for the next time the user takes the quiz
        setPendingQuestions([]);
        setSelectedOption(null);
        setCurrentQuestion(null);
    };

    const questionCount: QuestionCount = {
        totalQuestions: questions.length,
        pendingQuestions: pendingQuestions.length,
        questionsAnswered: questions.length - pendingQuestions.length,
    };

    return {
        resolveAnswer,
        skipAnswer,
        selectOption,
        nextQuestion,
        finishedQuiz,
        timerStatus: quizStatus.timerStatus,
        currentQuestion,
        questionCount,
        selectedOption,
        isQuizFinished: pendingQuestions.length === 1,
    };
};
