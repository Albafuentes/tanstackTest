import type { AuthModel } from "@/types/auth.types";
import { generateToken } from "@/utils/auth.utils";
import chGreen from "@/assets/svg/ch-green.svg";
import chRed from "@/assets/svg/ch-red.svg";

export const authService = {
    async login(sessionName: string): Promise<{ token: string }> {
        
        if (!sessionName) {
            throw new Error("Invalid session name");
        }

        const user: AuthModel.User = {
            id: crypto.randomUUID(),
            sessionName: sessionName,
            createdAt: new Date().toISOString(),
            avatarURL: Math.random() < 0.5 ? chGreen : chRed
        };

        const token = await generateToken(user);
        // Simulate an API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { token };
    },
};