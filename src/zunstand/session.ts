import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const SCORE_QUESTION_INCREMENT = 10;
export const TIMER_INCREMENT = 60;

export const MIN_TIMER = TIMER_INCREMENT;
export const MAX_TIMER = TIMER_INCREMENT * 3;

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 3;

type SessionState = {
  score: {
    points: number;
  };
  settings: {
    timer: number;
    level: number;
  };
  history: {
    quizId: string;
    quizName: string;
    points: number;
    skippedAnswers: number;
    createdAt: string | null;
    isCompleted: boolean;
    totalQuestions: number;
    correctQuestions: number;
    wrongQuestions: number;
  }[];
  resetSession: () => void;
  // setUser: (user: string | null) => void;
  increaseScore: (amount: number) => void;
  increaseTimer: () => void;
  decreaseTimer: () => void;
  increaseLevel: () => void;
  decreaseLevel: () => void;
  updateHistory: (quizId: string, quizName: string, points: number, skippedAnswers: number, isCompleted: boolean, totalQuestions: number, correctQuestions: number, wrongQuestions: number) => void;
};

const initialState: Omit<
  SessionState,
  | "resetSession"
  | "setUser"
  | "increaseScore"
  | "updateHistory"
  | "increaseTimer"
  | "decreaseTimer"
  | "increaseLevel"
  | "decreaseLevel"
> = {
  score: {
    points: 0,
  },
  settings: {
    timer: TIMER_INCREMENT,
    level: 1,
  },
  history: [],
};

const useSession = create<SessionState>()(
  persist(
    (set) => ({
      ...initialState,

      resetSession: () =>
        set({
          ...initialState,
        }),
      increaseScore: (amount) =>
        set((state) => ({
          score: {
            ...state.score,
            points: state.score.points + amount,
          },
        })),
      increaseTimer: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            timer: Math.min(state.settings.timer + TIMER_INCREMENT, MAX_TIMER),
          },
        })),
      decreaseTimer: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            timer: Math.max(state.settings.timer - TIMER_INCREMENT, MIN_TIMER),
          },
        })),
      increaseLevel: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            level: Math.min(state.settings.level + 1, MAX_LEVEL),
          },
        })),
      decreaseLevel: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            level: Math.max(state.settings.level - 1, MIN_LEVEL),
          },
        })),
      updateHistory: (quizId, quizName, points, skippedAnswers, isCompleted, totalQuestions, correctQuestions, wrongQuestions) =>
        set((state) => ({
          history: [
            ...state.history,
            { quizId, quizName, points, skippedAnswers, createdAt: new Date().toISOString(), isCompleted, totalQuestions, correctQuestions, wrongQuestions },
          ],
        })),
    }),
    {
      name: "quiz-session",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useSession;
