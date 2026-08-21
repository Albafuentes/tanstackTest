import { createRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Route as RootRoute } from "../../__root";
import { generateToken } from "../../../utils/auth.util";
import hero from "@/assets/svg/hero.svg";
import { Field } from "@/components/Field/Field";
import style from "./login.module.css";
import type { AuthModel } from "@/types/auth.types";

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: Login,
});

function Login() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);
    const [loading, setLoading] = useState(false);

    const stringVerification = (value: unknown): string[] | null => {
        const errors: string[] = [];
        if (!value) {
            errors.push("This field is required");
        }

        if (typeof value !== "string") {
            errors.push("The field must be a string");
        }

        return errors.length > 0 ? errors : null;
    };

    const mailVerification = (value: unknown): string[] | null => {
        if (typeof value === "string" && !value.includes("@")) {
            return ["Email must be a valid email address"];
        }
        return null;
    };

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        const errors = {
            email: [...(stringVerification(email) || []), ...(mailVerification(email) || [])],
            password: [...(stringVerification(password) || [])],
        };

        if (errors.email.length > 0 || errors.password.length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }

        const user: AuthModel.User = {
            id: crypto.randomUUID(),
            name: email.split("@")[0],
            email: email
        }

        sessionStorage.setItem('token', await generateToken(user));
        navigate({ to: '/protected' });
        setLoading(false);
    }

    return (
        <main id={style.login}>
            <img src={hero} alt="Hero" />
            <form onSubmit={(e) => handleLogin(e)}>
                <Field
                    type="text"
                    label="Email"
                    name={"email"}
                    placeholder="email..."
                    errors={errors?.email}
                />
                <Field
                    type="password"
                    label="Password"
                    name={"password"}
                    placeholder="password..."
                    errors={errors?.password}
                />
                <Button type="submit" disabled={loading}>Login</Button>
            </form>
        </main>
    );
}