// auth.service.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { authService } from "./auth.service";
import { generateToken } from "@/utils/auth.utils";
import chGreen from "@/assets/svg/ch-green.svg";
import chRed from "@/assets/svg/ch-red.svg";

vi.mock("@/utils/auth.utils", () => ({
    generateToken: vi.fn(),
}));

describe("authService.login", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        vi.mocked(generateToken).mockResolvedValue("fake-jwt-token");
        vi.spyOn(crypto, "randomUUID").mockReturnValue(
            "00000000-0000-0000-0000-000000000000",
        );
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("resolves with a token when email and password are valid when provided the email and password", async () => {
        vi.spyOn(Math, "random").mockReturnValue(0.9);

        const promise = authService.login("ada@test.com", "password123");
        await vi.advanceTimersByTimeAsync(1000);

        await expect(promise).resolves.toEqual({ token: "fake-jwt-token" });
    });

    it("rejects with an error when the email is missing", async () => {
        await expect(authService.login("", "password123")).rejects.toThrow(
            "Invalid username or password",
        );
    });

    it("rejects with an error when the password is missing", async () => {
        await expect(authService.login("ada@test.com", "")).rejects.toThrow(
            "Invalid username or password",
        );
    });

    it("does not call generateToken when the credentials are empty", async () => {
        await expect(authService.login("", "")).rejects.toThrow();
        expect(generateToken).not.toHaveBeenCalled();
    });

    it("calls generateToken with a user information when the credentials are valid", async () => {
        vi.spyOn(Math, "random").mockReturnValue(0.1);

        const promise = authService.login("ada@test.com", "password123");
        await vi.advanceTimersByTimeAsync(1000);
        await promise;

        expect(generateToken).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "00000000-0000-0000-0000-000000000000",
                createdAt: expect.any(String),
                avatarURL: chGreen,
            }),
        );
    });

    it("assigns red avatarURL when Math.random is >= 0.5", async () => {
        vi.spyOn(Math, "random").mockReturnValue(0.5);

        const promise = authService.login("ada@test.com", "password123");
        await vi.advanceTimersByTimeAsync(1000);
        await promise;

        expect(generateToken).toHaveBeenCalledWith(
            expect.objectContaining({ avatarURL: chRed }),
        );
    });

    it("assigns green avatarURL when Math.random is < 0.5", async () => {
        vi.spyOn(Math, "random").mockReturnValue(0.4);

        const promise = authService.login("ada@test.com", "password123");
        await vi.advanceTimersByTimeAsync(1000);
        await promise;

        expect(generateToken).toHaveBeenCalledWith(
            expect.objectContaining({ avatarURL: chGreen }),
        );
    });

    it("propagates the error when generateToken fails", async () => {
        vi.mocked(generateToken).mockRejectedValue(new Error("signing failed"));

        await expect(authService.login("ada@test.com", "password123")).rejects.toThrow(
            "signing failed",
        );
    });

    it("createdAt is a valid ISO date when the user logs in successfully", async () => {
        const promise = authService.login("ada@test.com", "password123");
        await vi.advanceTimersByTimeAsync(1000);
        await promise;

        const callArg = vi.mocked(generateToken).mock.calls[0][0];
        expect(new Date(callArg.createdAt).toISOString()).toBe(callArg.createdAt);
    });
});