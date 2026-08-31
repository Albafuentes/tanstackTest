import type { HistoryState } from "@/zunstand/store/session.store";

export const SCORE_QUESTION_INCREMENT = 10;
export const DEFAULT_SCORE = 0;

export function increaseScore(amount: number): number {
    return amount + SCORE_QUESTION_INCREMENT;
}

export const maxScore = (totalQuestions: number): number => {
    if (totalQuestions === 0) return DEFAULT_SCORE;
    return (totalQuestions * SCORE_QUESTION_INCREMENT);
}

export const isGoodScore = (points: number, totalQuestions: number): boolean => {
    if (totalQuestions === 0) return false;
    return points >= (totalQuestions / 2);
}

export const totalScore = (history: HistoryState[]): number => {
    if (history.length === 0) return DEFAULT_SCORE;
    return history.reduce((total, entry) => Number(total) + entry.points, DEFAULT_SCORE);
}