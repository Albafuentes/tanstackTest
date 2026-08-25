import { create } from "zustand";

export const SCORE_QUESTION_INCREMENT = 10;
export const TIMER_INCREMENT = 60;

export const MIN_TIMER = TIMER_INCREMENT;
export const MAX_TIMER = TIMER_INCREMENT * 3;

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 3;

type sessionState = {
  identity: {
    id: string | null;
    user: string | null;
    createdAt?: Date | null;
  };
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
    createdAt: Date | null;
    isCompleted: boolean;
  }[];
  resetSession: () => void;
  setUser: (user: string | null) => void;
  increaseScore: () => void;
  increaseTimer: () => void;
  decreaseTimer: () => void;
  increaseLevel: () => void;
  decreaseLevel: () => void;
  updateHistory: (quizId: string, quizName: string, points: number, isCompleted: boolean) => void;
};

const initialState: Omit<
  sessionState,
  | "resetSession"
  | "setUser"
  | "increaseScore"
  | "updateHistory"
  | "increaseTimer"
  | "decreaseTimer"
  | "increaseLevel"
  | "decreaseLevel"
> = {
  identity: {
    id: null,
    user: null,
    createdAt: null,
  },
  score: {
    points: 0,
  },
  settings: {
    timer: TIMER_INCREMENT,
    level: 1,
  },
  history: [],
};

const useSession = create<sessionState>((set) => ({
  ...initialState,
  resetSession: () =>
    set({
      ...initialState,
    }),
  setUser: (user) =>
    set(() => ({
      identity: { id: `session-${new Date().toISOString()}`, user, createdAt: new Date() },
    })),
  increaseScore: () =>
    set((state) => ({
      score: {
        ...state.score,
        points: state.score.points + SCORE_QUESTION_INCREMENT,
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
  updateHistory: (quizId, quizName, points, isCompleted) =>
    set((state) => ({
      history: [
        ...state.history,
        { quizId, quizName, points, createdAt: new Date(), isCompleted },
      ],
    })),
}));

export default useSession;
