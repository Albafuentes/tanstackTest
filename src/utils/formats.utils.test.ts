// formats.utils.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatSentenceString, formatDate, secondsToTime, timeToSeconds } from "./formats.utils";
import { getLocale, getTimeZone } from "./locales.utils";
import { isValidString, isAValidISODate } from "./validators.utils";

vi.mock("./locales.utils", () => ({
    getLocale: vi.fn(),
    getTimeZone: vi.fn(),
}));

vi.mock("./validators.utils", () => ({
    isValidString: vi.fn(),
    isAValidISODate: vi.fn(),
}));

describe("formatSentenceString", () => {
    beforeEach(() => {
        vi.mocked(isValidString).mockReturnValue(true);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it.each([
        [null, "-"],
        ["", "-"],
        ["helloWorld", "Hello world"],
        ["hello_world_foo", "Hello world foo"],
        ["hello-world", "Hello world"],
        ["hello.world", "Hello world"],
        ["HELLO WORLD", "Hello world"],
        ["hello   world", "Hello world"],
        ["___...---", ""],
        ["hello", "Hello"]
    ])("return '%i' when the value is '%s'", (input, expected) => {
        expect(formatSentenceString(input)).toBe(expected);
    });


    it("return '-' when isValidString returns false", () => {
        vi.mocked(isValidString).mockReturnValue(false);
        expect(formatSentenceString("cualquier cosa")).toBe("-");
    });

    it("separate consecutive acronyms when they are followed by another word", () => {
        // "APIResponse" -> "API Response" tras el split, pero recuerda
        // que el .toLowerCase() posterior pierde el casing del acrónimo (ver nota abajo)
        expect(formatSentenceString("APIResponseData")).toBe("Api response data");
    });

});

describe("formatDate", () => {
    beforeEach(() => {
        vi.mocked(isAValidISODate).mockReturnValue(true);
        vi.mocked(getLocale).mockReturnValue("en-US");
        vi.mocked(getTimeZone).mockReturnValue("UTC");
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("ignore the defaults when the locale and timeZone are passed explicitly", () => {
        const result = formatDate("2024-03-15T00:00:00Z", "es-ES", "UTC");
        expect(result).toBe("15/03/2024");
        expect(getLocale).not.toHaveBeenCalled();
    });

    it.each([
        [null, "-"],
        ["", "-"],
        ["2024-03-15T00:00:00Z", "03/15/2024"],
        ["2024-12-31T23:59:59Z", "12/31/2024"]
    ])("returns '%i' when the value is '%s'", (input, expected) => {
        expect(formatDate(input)).toBe(expected);
    });

    it("return  '-' when isAValidISODate returns false", () => {
        vi.mocked(isAValidISODate).mockReturnValue(false);
        expect(formatDate("2024-01-01")).toBe("-");
    });

    it("includes hours and minutes when withTime is true", () => {
        const result = formatDate("2024-03-15T14:30:00Z", "en-US", "UTC", true);
        expect(result).toContain("02:30");
    });
});

describe("secondsToTime", () => {
    it.each([
        [0, "00:00:00"],
        [90, "00:01:30"],
        [3661, "01:01:01"],
        [36_000, "10:00:00"]
    ])("returns %i when the value is '%s'", (input, expected) => {
        expect(secondsToTime(input)).toBe(expected);
    });
});

describe("timeToSeconds", () => {
    it.each([
        ["01:01:01", 3661],
        ["00:00:00", 0],
        ["10:00:00", 36_000]
    ])("returns %i when the value is '%s'", (input, expected) => {
        expect(timeToSeconds(input)).toBe(expected);
    });

    it("return the exact inverse of secondsToTime when using 3-part formats", () => {
        expect(timeToSeconds(secondsToTime(5000))).toBe(5000);
    });

    // This test documents a potentially undesired behavior - see note below
    it("interprets a 2-part string as HH:MM, not as MM:SS when using timeToSeconds", () => {
        expect(timeToSeconds("00:30")).toBe(30 * 60); // 1800, not 30
    });
});