import jwt from "jsonwebtoken";
import type { AuthModel } from "../types/auth.types";

const SECRET_KEY = crypto.randomUUID();

export function isAuthenticated(): boolean {
    const token = getToken();

    if (!token) {
        return false;
    }

    jwt.verify(token, SECRET_KEY, (err) => {
        if (err) {
            sessionStorage.removeItem('token');
            return false;
        }
    });

    return true;
}

export function getToken(): string | null {
    return sessionStorage.getItem('token');
}

export function generateToken(payload: AuthModel.User): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: (60 * 60 * 1.000) * 24 }); // 24h
}

export function decodeToken(token: string): AuthModel.User | null {
    if (isAuthenticated()) {
        const decoded = jwt.decode(token) as AuthModel.User;
        return decoded;
    }
    return null;
}