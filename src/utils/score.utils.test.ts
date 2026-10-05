// score.utils.test.ts
import { describe, it, expect } from "vitest";
import {
    increaseScore,
    maxScore,
    isGoodScore,
    totalScore,
    SCORE_QUESTION_INCREMENT,
    DEFAULT_SCORE,
} from "./score.utils";
import type { HistoryState } from "@/zunstand/store/session.store";

const buildHistoryEntry = (overrides: Partial<HistoryState> = {}): HistoryState => ({
    quizName: "historia",
    points: 10,
    ...overrides,
} as HistoryState);

describe("increaseScore", () => {
    it("add the increment to the given amount when starting from zero", () => {
        expect(increaseScore(0)).toBe(SCORE_QUESTION_INCREMENT);
    });

    it("accumulates correctly when starting from an existing value", () => {
        expect(increaseScore(20)).toBe(30);
    });

    it("works with negative amounts (defensive, although it shouldn't happen in production) when starting from a negative value", () => {
        expect(increaseScore(-5)).toBe(5);
    });
});

describe("maxScore", () => {
    it("returns DEFAULT_SCORE when there are no questions", () => {
        expect(maxScore(0)).toBe(DEFAULT_SCORE);
    });

    it("multiplies the total number of questions when the increment per question is applied", () => {
        expect(maxScore(4)).toBe(40);
    });

    it("works with a single question when the increment per question is applied", () => {
        expect(maxScore(1)).toBe(SCORE_QUESTION_INCREMENT);
    });
});

describe("isGoodScore", () => {
    it("returns false when there are no questions", () => {
        expect(isGoodScore(100, 0)).toBe(false);
    });

    it("returns true when the points are at least half of the maximum possible score", () => {
        // maxScore(4) = 40, la mitad = 20
        expect(isGoodScore(20, 4)).toBe(true);
    });

    it("returns true when the points exceed half of the maximum possible score", () => {
        expect(isGoodScore(30, 4)).toBe(true);
    });

    it("returns false when the points are less than half of the maximum possible score", () => {
        expect(isGoodScore(10, 4)).toBe(false);
    });

    it("returns false for a low score even when it exceeds totalQuestions/2 without scaling (regression of the fixed bug)", () => {
        // Antes del fix: isGoodScore(3, 4) daba true porque comparaba contra 4/2=2
        // Con el fix: 3 >= maxScore(4)/2 (20) es false, como debe ser
        expect(isGoodScore(3, 4)).toBe(false);
    });

    it("returns a good result when a perfect score is achieved", () => {
        expect(isGoodScore(maxScore(10), 10)).toBe(true);
    });
});

describe("totalScore", () => {
    it("returns DEFAULT_SCORE when the history is empty", () => {
        expect(totalScore([])).toBe(DEFAULT_SCORE);
    });

    it("sums the points of a single entry when the history contains only one entry", () => {
        expect(totalScore([buildHistoryEntry({ points: 15 })])).toBe(15);
    });

    it("sums the points of multiple entries when the history contains several entries", () => {
        const history = [
            buildHistoryEntry({ points: 10 }),
            buildHistoryEntry({ points: 20 }),
            buildHistoryEntry({ points: 5 }),
        ];

        expect(totalScore(history)).toBe(35);
    });

    it("handles entries with 0 points without affecting the total when calculating the total score", () => {
        const history = [
            buildHistoryEntry({ points: 0 }),
            buildHistoryEntry({ points: 10 }),
        ];

        expect(totalScore(history)).toBe(10);
    });
});