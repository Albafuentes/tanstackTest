// validators.test.ts
import { describe, it, expect } from "vitest";
import { stringVerification, mailVerification } from "./validators";
import { es } from "../locales/es";

describe("stringVerification", () => {
    it.each([
        [undefined, es.stringVerificationNotValueError],
        [null, es.stringVerificationNotValueError],
        ["", es.stringVerificationNotValueError],
        [123, es.stringVerificationNotStringError],
        [{}, es.stringVerificationNotStringError],
        [0, es.stringVerificationNotValueError], // limit case: 0 is falsy, so it triggers the first error and also typeof 0 !== "string", so it triggers the second error as well
    ])("return the correct error for the value %p", (input, expectedError) => {
        expect(stringVerification(input)).toContain(expectedError);
    });

    it("no devuelve errores si recibe un string válido", () => {
        expect(stringVerification("hola")).toEqual([]);
    });
});

describe("mailVerification", () => {
    it("return error when the string does not contain @", () => {
        expect(mailVerification("email-invalido")).toContain(es.mailVerificationNotValidEmailError);
    });

    it.each([
        ["user@test.com"],
        [undefined], //delegates that validation to stringVerification
        [123], // delegates that validation to stringVerification
    ])("return the correct error for the email %p", (input) => {
        const result = mailVerification(input);
        expect(result).toEqual([]);
    });
});