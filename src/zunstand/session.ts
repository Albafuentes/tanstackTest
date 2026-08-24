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
    }
    score: {
        points: number;
    }
    settings: {
        timer: number;
        level: number;
    };
    resetSession: () => void;
    setUser: (user: string | null) => void;
    increaseScore: () => void;
    increaseTimer: () => void;
    decreaseTimer: () => void;
    increaseLevel: () => void;
    decreaseLevel: () => void;
};


const initialState: Omit<sessionState, "resetSession" | "setUser" | "increaseScore" | "increaseTimer" | "decreaseTimer" | "increaseLevel" | "decreaseLevel"> = {
    identity: {
        id: null,
        user: null,
    },
    score: {
        points: 0,
    },
    settings: {
        timer: TIMER_INCREMENT,
        level: 1,
    },

}

const useSession = create<sessionState>((set) => ({
    ...initialState,
    resetSession: () =>
        set({
            ...initialState,
        }),
    setUser: (user) => set(() => ({ identity: { id: `session-${new Date().toISOString()}`, user } })),
    increaseScore: () => set((state) => ({ score: { ...state.score, points: state.score.points + SCORE_QUESTION_INCREMENT } })),
    increaseTimer: () => set((state) => ({ settings: { ...state.settings, timer: Math.min(state.settings.timer + TIMER_INCREMENT, MAX_TIMER) } })),
    decreaseTimer: () => set((state) => ({ settings: { ...state.settings, timer: Math.max(state.settings.timer - TIMER_INCREMENT, MIN_TIMER) } })),
    increaseLevel: () => set((state) => ({ settings: { ...state.settings, level: Math.min(state.settings.level + 1, MAX_LEVEL) } })),
    decreaseLevel: () => set((state) => ({ settings: { ...state.settings, level: Math.max(state.settings.level - 1, MIN_LEVEL) } })),
}));

export default useSession;

