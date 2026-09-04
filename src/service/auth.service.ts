import type { AuthModel } from "@/types/auth.types";
import { generateToken } from "@/utils/auth.utils";
import chGreen from "@/assets/svg/ch-green.svg";
import chRed from "@/assets/svg/ch-red.svg";

export const authService = {
    async login(email: string, password: string): Promise<{ token: string }> {
        
        if (!email || !password) {
            throw new Error("Invalid username or password");
        }

        const user: AuthModel.User = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            avatarURL: Math.random() < 0.5 ? chGreen : chRed
        };

        const token = await generateToken(user);
        // Simulate an API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { token };
    },
};