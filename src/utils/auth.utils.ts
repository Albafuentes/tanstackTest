import { SignJWT, jwtVerify, decodeJwt, type JWTPayload } from "jose";
import type { AuthModel } from "../types/auth.types";

/**
 * Mock JWT secret.
 *
 * This key intentionally lives in the client because authentication
 * is simulated and the token is not used for server authorization.
 */
const SECRET_KEY = crypto.getRandomValues(
    new Uint8Array(32),
);

/**
 * NOTE: This token simulates part of the communication that would normally
 * take place with a backend authentication service.
 *
 * In a real-world application, token creation and verification would be
 * handled by the backend, while user data would be retrieved through
 * authenticated API requests.
 *
 * For this project, some user data is required by the client application.
 * Keeping it in the token allows the authentication/session flow to remain
 * self-contained and compact in this frontend-only implementation.
 */

export function getToken(): string | null {
    return sessionStorage.getItem("token");
}

export async function generateToken(
    payload: AuthModel.User,
): Promise<string> {
    const SignPayload: JWTPayload = {
        ...payload,
    };


    return new SignJWT(SignPayload)
        .setProtectedHeader({
            alg: "HS256",
            typ: "JWT",
        })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, SECRET_KEY);
        return true;
    } catch {
        return false;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        await verifyToken(token);
        return true;
    } catch {
        sessionStorage.removeItem("token");

        return false;
    }
}

export function decodeToken(): AuthModel.User | null {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        return decodeJwt<AuthModel.User>(token);
    } catch {
        return null;
    }
}

export function clearToken(): void {
    sessionStorage.removeItem("token");
}