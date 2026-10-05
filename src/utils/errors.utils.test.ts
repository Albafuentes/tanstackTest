// errors.test.ts
import { describe, it, expect } from "vitest";
import { NotFoundError, UnauthorizedError } from "./errors.utils";

describe("NotFoundError", () => {
    it("es una instancia de Error", () => {
        const error = new NotFoundError("recurso no encontrado");

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(NotFoundError);
    });

    it("asigna el message recibido", () => {
        const error = new NotFoundError("recurso no encontrado");

        expect(error.message).toBe("recurso no encontrado");
    });

    it("fija el name como 'NotFoundError'", () => {
        const error = new NotFoundError("recurso no encontrado");

        expect(error.name).toBe("NotFoundError");
    });
});

describe("UnauthorizedError", () => {
    it("es una instancia de Error", () => {
        const error = new UnauthorizedError("no autorizado");

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(UnauthorizedError);
    });

    it("asigna el message recibido", () => {
        const error = new UnauthorizedError("no autorizado");

        expect(error.message).toBe("no autorizado");
    });

    it("fija el name como 'UnauthorizedError'", () => {
        const error = new UnauthorizedError("no autorizado");

        expect(error.name).toBe("UnauthorizedError");
    });
});