// useQuiz.hook.test.ts
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQuiz, TIMER_STATUS } from "./useQuiz.hook";
import type { QuizModel } from "@/types/quiz.types";
import { mockUseSession, setSessionState } from "@/test/mocks/session.mocks";

vi.mock('@/zunstand/store/session.store', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/zunstand/store/session.store')>();
    return {
        ...actual,
        default: (selector: (state: any) => unknown) => mockUseSession(selector),
    };
});

const buildQuestions = (): QuizModel.Question[] => [
    {
        level: 1,
        question: "¿En qué año fue la reconquista?",
        options: ["1492", "1500", "1400"],
        answer: 0,
        explanation: "En 1492 finalizó la reconquista.",
    },
    {
        level: 1,
        question: "¿Quién fue Isabel la Católica?",
        options: ["Reina de Castilla", "Reina de Francia", "Reina de Portugal"],
        answer: 0,
        explanation: "Fue reina de Castilla.",
    },
];

const quizInfo = { id: "quiz-1", name: "historia de españa" };

describe("useQuiz", () => {
    const updateHistoryMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(Math, "random").mockReturnValue(0);
        setSessionState({ updateHistory: updateHistoryMock });
    });

    it("generate the first question when is mounted", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        expect(result.current.currentQuestion?.question).toBe(
            "¿En qué año fue la reconquista?",
        );
    });

    it("not return a new question on subsequent re-renders when the questions prop remains the same", () => {
        const { result, rerender } = renderHook(
            (props: { questions: QuizModel.Question[] }) => useQuiz(props.questions, quizInfo),
            { initialProps: { questions: buildQuestions() } },
        );

        const firstQuestion = result.current.currentQuestion;
        rerender({ questions: buildQuestions() });

        expect(result.current.currentQuestion).toBe(firstQuestion);
    });

    it("questionCount reflects the initial state correctly when the quiz is first loaded", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        expect(result.current.questionCount).toEqual({
            totalQuestions: 2,
            pendingQuestions: 2,
            questionsAnswered: 0,
        });
    });


    it("does not execute selectOption an option where there is no currentQuestion (defensive)", () => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        const { result } = renderHook(() => useQuiz([], quizInfo));

        act(() => {
            result.current.selectOption(0);
        });

        expect(result.current.selectedOption).toBeNull();
    });

    it("saves the selected option as unresolved when an option is selected", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => {
            result.current.selectOption(0);
        });

        expect(result.current.selectedOption).toEqual({
            answer: 0,
            resolved: false,
            correct: null,
        });
    });

    it("marks the answer as correct and pauses the timer when resolved and answered correctly", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.selectOption(0));
        act(() => result.current.resolveAnswer());

        expect(result.current.selectedOption).toEqual({
            answer: 0,
            resolved: true,
            correct: true,
        });
        expect(result.current.timerStatus).toBe(TIMER_STATUS.PAUSED);
    });

    it("marks the answer as incorrect and pauses the timer when resolved and answered incorrectly", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.selectOption(1));
        act(() => result.current.resolveAnswer());

        expect(result.current.selectedOption).toEqual({
            answer: 1,
            resolved: true,
            correct: false,
        });
        expect(result.current.timerStatus).toBe(TIMER_STATUS.PAUSED);
    });

    it("uses DEFAULT_ANSWER_SELECTED when resolved without selecting any option", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.resolveAnswer());

        expect(result.current.selectedOption?.answer).toBe(0);
    });



    it("marks the question as resolved and incorrect, and increments skippedAnswers when skipAnswer is called", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.skipAnswer());

        expect(result.current.selectedOption).toBeNull();
        expect(result.current.currentQuestion?.question).toBe(
            "¿Quién fue Isabel la Católica?",
        );
    });

    it("advances to the next question, removes the current one from pending, and resets selectedOption when moving to the next question", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.selectOption(0));
        act(() => result.current.resolveAnswer());
        act(() => result.current.nextQuestion());

        expect(result.current.currentQuestion?.question).toBe(
            "¿Quién fue Isabel la Católica?",
        );
        expect(result.current.selectedOption).toBeNull();
        expect(result.current.questionCount.questionsAnswered).toBe(1);
    });

    it("reactivates the timer (STARTED) when moving to the next question", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.selectOption(0));
        act(() => result.current.resolveAnswer()); // pausa el timer
        expect(result.current.timerStatus).toBe(TIMER_STATUS.PAUSED);

        act(() => result.current.nextQuestion());

        expect(result.current.timerStatus).toBe(TIMER_STATUS.STARTED);
    });

    it("does not execute resolveAnswer and questionsAnswered is 0 when there is no currentQuestion", () => {
        const { result } = renderHook(() => useQuiz([], quizInfo));

        act(() => result.current.resolveAnswer());

        expect(result.current.selectedOption).toBeNull();
        expect(result.current.questionCount.questionsAnswered).toBe(0);
    });

    it("is false as long when the quiz is finished and there is more than one pending question", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        expect(result.current.isQuizFinished).toBe(false);
    });


    it("isQuizFinished is true when only the last pending question remains unresolved", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.selectOption(0));
        act(() => result.current.resolveAnswer());
        act(() => result.current.nextQuestion());

        expect(result.current.questionCount.pendingQuestions).toBe(1);
        expect(result.current.isQuizFinished).toBe(true);
    });

    it("calls updateHistory with the accumulated quiz data when the quiz is finished", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.selectOption(0));
        act(() => result.current.resolveAnswer()); // correctly answered
        act(() => result.current.nextQuestion());
        act(() => result.current.skipAnswer()); // 2 answerd skipped

        act(() => result.current.finishedQuiz());

        expect(updateHistoryMock).toHaveBeenCalledWith(
            "quiz-1",
            "historia de españa",
            expect.any(Number), // totalScore
            1, // skippedAnswers
            true,
            2, // questions.length total
            1, // correctQuestions
            0, // wrongQuestions
        );
    });

    it("resets the quiz state when it is finished", () => {
        const { result } = renderHook(() => useQuiz(buildQuestions(), quizInfo));

        act(() => result.current.finishedQuiz());

        expect(result.current.currentQuestion).toBeNull();
        expect(result.current.selectedOption).toBeNull();
        expect(result.current.questionCount.pendingQuestions).toBe(0);
        expect(result.current.timerStatus).toBe(TIMER_STATUS.FINISHED);
    });

});