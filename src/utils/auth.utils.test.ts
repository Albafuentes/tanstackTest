// auth.utils.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SignJWT } from "jose";
import {
    getToken,
    generateToken,
    verifyToken,
    isAuthenticated,
    decodeToken,
    clearToken,
} from "./auth.utils";
import type { AuthModel } from "../types/auth.types";

const buildUser = (overrides: Partial<AuthModel.User> = {}): AuthModel.User => ({
    id: "user-1",
    createdAt: "2024-01-01T00:00:00Z",
    avatarURL: "https://example.com/avatar.png",
    ...overrides,
});

describe("auth.utils", () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.useRealTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe("getToken / clearToken", () => {
        it("return null when there is no token stored", () => {
            expect(getToken()).toBeNull();
        });

        it("return the token when there is a token stored in sessionStorage", () => {
            sessionStorage.setItem("token", "abc123");
            expect(getToken()).toBe("abc123");
        });

        it("clearToken removes the token from sessionStorage when it is called", () => {
            sessionStorage.setItem("token", "abc123");
            clearToken();
            expect(sessionStorage.getItem("token")).toBeNull();
        });
    });

    describe("generateToken", () => {
        it("generates a valid JWT with the format header.payload.signature when a user is provided", async () => {
            const token = await generateToken(buildUser());

            expect(token.split(".")).toHaveLength(3);
        });

        it("verifyToken verifiable the generated token when a user is provided", async () => {
            const token = await generateToken(buildUser());

            expect(await verifyToken(token)).toBe(true);
        });

        it("have user data when the token is decoded", async () => {
            const user = buildUser({ id: "user-1" });
            const token = await generateToken(user);

            sessionStorage.setItem("token", token);
            const decoded = decodeToken();

            expect(decoded).toMatchObject({ id: "user-1", avatarURL: user.avatarURL });
        });
    });

    describe("verifyToken", () => {
        it("return true when the token is valid", async () => {
            const token = await generateToken(buildUser());
            expect(await verifyToken(token)).toBe(true);
        });

        it("return false when the token has an invalid format", async () => {
            expect(await verifyToken("no-es-un-jwt")).toBe(false);
        });

        it("return false when the token is signed with a different key", async () => {
            const otherSecret = crypto.getRandomValues(new Uint8Array(32));
            const tokenFirmadoConOtraClave = await new SignJWT({ id: "1" })
                .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                .setIssuedAt()
                .setExpirationTime("24h")
                .sign(otherSecret);

            expect(await verifyToken(tokenFirmadoConOtraClave)).toBe(false);
        });

        it("return false when the token is expired", async () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));

            const token = await generateToken(buildUser());

            vi.setSystemTime(new Date("2025-01-02T01:00:00Z")); // +25h, supera las 24h de expiración

            expect(await verifyToken(token)).toBe(false);
        });
    });

    describe("isAuthenticated", () => {
        it("return false when there is no token", async () => {
            expect(await isAuthenticated()).toBe(false);
        });

        it("return true when the token is valid", async () => {
            const token = await generateToken(buildUser());
            sessionStorage.setItem("token", token);

            expect(await isAuthenticated()).toBe(true);
        });

        // This test documents the bug: it currently FAILS because isAuthenticated
        // ignores the result of verifyToken and always returns true if there is no exception.
        it("return false when the token is invalid/corrupt", async () => {
            sessionStorage.setItem("token", "token-corrupto-o-manipulado");

            expect(await isAuthenticated()).toBe(false);
        });

        it("removes the token from sessionStorage when the token is not valid", async () => {
            sessionStorage.setItem("token", "token-corrupto-o-manipulado");

            await isAuthenticated();

            expect(sessionStorage.getItem("token")).toBeNull();
        });

        it("return false and removes the token when the token is expired", async () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));
            const token = await generateToken(buildUser());
            sessionStorage.setItem("token", token);

            vi.setSystemTime(new Date("2025-01-02T01:00:00Z"));

            expect(await isAuthenticated()).toBe(false);
            expect(sessionStorage.getItem("token")).toBeNull();
        });
    });

    describe("decodeToken", () => {
        it("return null when there is no token", () => {
            expect(decodeToken()).toBeNull();
        });

        it("return null when the token cannot be decoded", () => {
            sessionStorage.setItem("token", "esto-no-es-un-jwt-valido");

            expect(decodeToken()).toBeNull();
        });

        it("return the user payload when the token is decodable", async () => {
            const user = buildUser({ id: "42" });
            const token = await generateToken(user);
            sessionStorage.setItem("token", token);

            expect(decodeToken()).toMatchObject({ id: "42" });
        });

        it("decodes even a token with an invalid signature (decodeJwt does not verify)", async () => {
            // decodeJwt reads the payload without checking the signature - this is an important
            // difference compared to verifyToken, and deserves to be documented in a test.
            const otherSecret = crypto.getRandomValues(new Uint8Array(32));
            const token = await new SignJWT({ id: "999" })
                .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                .setIssuedAt()
                .setExpirationTime("24h")
                .sign(otherSecret);

            sessionStorage.setItem("token", token);

            expect(decodeToken()).toMatchObject({ id: "999" });
        });
    });
});