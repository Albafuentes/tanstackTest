import type { AuthModel } from "@/types/auth.types";
import { generateToken } from "@/utils/auth.util";
import chGreen from "@/assets/svg/ch-green.svg";
import chRed from "@/assets/svg/ch-red.svg";

export const authService = {
    async login(email: string, password: string): Promise<{ token: string }> {
        // Simulate an API call with a delay
        return new Promise((resolve, reject) => {
            if (email && password) {
                const user: AuthModel.User = {
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                    avatarURL: Math.random() < 0.5 ? chGreen : chRed
                };

                generateToken(user).then((token) => {
                    setTimeout(() => { resolve({ token }); return; }, 1000);
                }).catch(reject);
            } else {
                reject(new Error("Invalid username or password"));
            }
        });
    },
};