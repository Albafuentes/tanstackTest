import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secondsToTime } from "@/utils/formats";

export const TIMER_INCREMENT = 30;

export const MIN_TIMER = TIMER_INCREMENT;
export const MAX_TIMER = TIMER_INCREMENT * 6;

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 3;

export type HistoryState = {
  quizId: string;
  quizName: string;
  points: number;
  skippedAnswers: number;
  createdAt: string | null;
  isCompleted: boolean;
  totalQuestions: number;
  correctQuestions: number;
  wrongQuestions: number;
}

type SessionState = {
  settings: {
    timer: string;
    level: number;
  };
  history: HistoryState[];
  resetSession: () => void;
  updateSettings: (timer: string, level: number) => void;
  updateHistory: (quizId: string, quizName: string, points: number, skippedAnswers: number, isCompleted: boolean, totalQuestions: number, correctQuestions: number, wrongQuestions: number) => void;
};

const initialState: Omit<
  SessionState,
  | "resetSession"
  | "updateHistory"
  | "updateSettings"
> = {
  settings: {
    timer: secondsToTime(TIMER_INCREMENT),
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

      updateSettings: (timer, level) =>
        set((state) => ({
          settings: {
            ...state.settings,
            timer: timer,
            level: level,
          },
        })),

      updateHistory: (quizId, quizName, points, skippedAnswers, isCompleted, totalQuestions, correctQuestions, wrongQuestions) =>
        set((state) => {
          const previousHistory = state.history.filter((item) => item.quizId !== quizId);
          return {
            ...state,
            history: [
              ...previousHistory,
              { quizId, quizName, points, skippedAnswers, createdAt: new Date().toISOString(), isCompleted, totalQuestions, correctQuestions, wrongQuestions },
            ],
          };
        }),

    }),
    {
      name: "quiz-session",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useSession;
