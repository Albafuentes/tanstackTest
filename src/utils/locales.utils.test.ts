// locales.utils.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTimeZone, getLocale, translate } from "./locales.utils";
import { isValidString } from "./validators.utils";

vi.mock("./validators.utils", () => ({
    isValidString: vi.fn(),
}));

describe("getTimeZone", () => {
    it("returns the timezone when resolved by Intl", () => {
        vi.spyOn(Intl, "DateTimeFormat").mockReturnValue({
            resolvedOptions: () => ({ timeZone: "Europe/Madrid" }),
        } as any);

        expect(getTimeZone()).toBe("Europe/Madrid");

        vi.restoreAllMocks();
    });
});

describe("getLocale", () => {
    it("returns the language reported by navigator.language when it is available", () => {
        vi.stubGlobal("navigator", { language: "es-ES" });

        expect(getLocale()).toBe("es-ES");

        vi.unstubAllGlobals();
    });
});

describe("translate", () => {
    beforeEach(() => {
        vi.mocked(isValidString).mockReturnValue(true);
    });

    it("returns '' when the translation is an empty string", () => {
        expect(translate("")).toBe("");
    });

    it("returns '' when isValidString returns false", () => {
        vi.mocked(isValidString).mockReturnValue(false);
        expect(translate("hola")).toBe("");
    });

    it("returns the text as is when it has no placeholders", () => {
        expect(translate("Hola mundo")).toBe("Hola mundo");
    });

    it("replaces a single placeholder with its interpolation value when it is provided", () => {
        expect(translate("Hola {{name}}", { name: "Ada" })).toBe("Hola Ada");
    });

    it("replaces multiple distinct placeholders with their interpolation values when they are provided", () => {
        expect(
            translate("{{greeting}} {{name}}, tienes {{count}} mensajes", {
                greeting: "Hola",
                name: "Ada",
                count: "3",
            }),
        ).toBe("Hola Ada, tienes 3 mensajes");
    });

    it("leaves the placeholder literal when the interpolation object is not provided", () => {
        expect(translate("Hola {{name}}")).toBe("Hola {{name}}");
    });

    it("leaves the placeholder literal when the key does not exist in the interpolation object", () => {
        expect(translate("Hola {{name}}", { other: "x" })).toBe("Hola {{name}}");
    });

    it("replaces with an empty string when the interpolation value is an empty string (should not fall back to the literal placeholder)", () => {
        expect(translate("Hola {{name}}", { name: "" })).toBe("Hola ");
    });

    it("repeats the same placeholder multiple times with the same value when it is provided", () => {
        expect(translate("{{name}} y {{name}} otra vez", { name: "Ada" })).toBe(
            "Ada y Ada otra vez",
        );
    });
});