import { create } from 'zustand'

export const QUIZ_STATUS = {
    NOT_STARTED: "not-started",
    IN_PROGRESS: "in-progress",
    FINISHED: "finished",
} as const;

type QUIZ_STATUS = typeof QUIZ_STATUS[keyof typeof QUIZ_STATUS];


type ScoreState = {
    status: QUIZ_STATUS;
    setStatus: (status: QUIZ_STATUS) => void;
    resetStatus: () => void;
}

const useSQuizStatus = create<ScoreState>((set) => ({
    status: QUIZ_STATUS.NOT_STARTED,
    setStatus: (status: QUIZ_STATUS) => set({ status: status }),
    resetStatus: () => set({ status: QUIZ_STATUS.NOT_STARTED }),
}))

export default useSQuizStatus
