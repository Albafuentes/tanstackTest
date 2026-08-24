import { create } from 'zustand'

export const SCORE_QUESTION_INCREMENT = 10;

type ScoreState = {
  score: number;
  increase: () => void;
  removeAll: () => void;
}

const useScore = create<ScoreState>((set) => ({
  score: 0,
  increase: () => set((state) => ({ score: state.score + SCORE_QUESTION_INCREMENT })),
  removeAll: () => set({ score: 0 }),
}))

export default useScore
