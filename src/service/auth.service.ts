import type { AuthModel } from "@/types/auth.types";
import { generateToken } from "@/utils/auth.util";

export const authService = {
    async login(email: string, password: string): Promise<{ token: string }> {
        // Simulate an API call with a delay
        return new Promise((resolve, reject) => {
            if (email && password) {
                const user: AuthModel.User = {
                    id: crypto.randomUUID(),
                    name: (email as string).split("@")[0],
                    email: email as string,
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