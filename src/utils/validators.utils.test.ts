// validators.utils.test.ts
import { describe, it, expect } from "vitest";
import { isValidString, isValidNumber, isAValidISODate } from "./validators.utils";

describe("isValidString", () => {
    it.each([
        ["hola", true],
        ["", false],
        ["   ", false],
        [null, false],
        [undefined, false],
        [123, false],
        [{}, false],
        [[], false],
        ["  hola  ", true],
    ])("returns %i  when the value is %s", (input, expected) => {
        expect(isValidString(input)).toBe(expected);
    });
});

describe("isValidNumber", () => {
    it.each([
        [5, true],
        [3.14, true],
        [0, true],
        [-10, true],
        [NaN, false],
        ["5", false],
        [null, false],
        [undefined, false],
        [Infinity, true],
    ])("returns %i when the value is %s", (input, expected) => {
        expect(isValidNumber(input)).toBe(expected);
    });
});

describe("isAValidISODate", () => {
    it.each([
        ["", false],
        ["   ", false],
        ["2024-03-15", true],
        ["2024-03-15T14:30:00Z", true],
        ["2024-03-15T14:30:00+02:00", true],
        ["2024-03-15T14:30:00.123Z", true],
        ["15/03/2024", false],
        ["2024-03-15T14:30:00", true],
        ["no es una fecha", false],
        ["2024-13-45", false],
        ["2024-02-31", true],
    ])("returns %i when the value is %s", (input, expected) => {
        expect(isAValidISODate(input)).toBe(expected);
    });
});