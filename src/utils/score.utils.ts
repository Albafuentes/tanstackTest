import type { HistoryState } from "@/zunstand/session";

export const SCORE_QUESTION_INCREMENT = 10;
export const DEFAULT_SCORE = 0;

export function increaseScore(amount: number): number {
  return amount + SCORE_QUESTION_INCREMENT;
}

export function averagePercentageScore(points: number, totalQuestions: number): number {
  if (totalQuestions === 0) return DEFAULT_SCORE;
  return (points / totalQuestions) * 100;
}

export const maxScorePercentage = (totalQuestions: number): number => {
  if (totalQuestions === 0) return DEFAULT_SCORE;
  return (totalQuestions * SCORE_QUESTION_INCREMENT) / totalQuestions * 100;
}

export const isGoodScore = (points: number, totalQuestions: number): boolean => {
  if (totalQuestions === 0) return false;
  return points >= (totalQuestions / 2);
}

export const totalScore = (history: HistoryState[]): number => {
  if (history.length === 0) return DEFAULT_SCORE;
  return history.reduce((total, entry) => Number(total) + entry.points, DEFAULT_SCORE);
}