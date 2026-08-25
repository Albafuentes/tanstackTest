import style from "./login.module.css";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { useActionState } from "react";
import { Button, Field } from "@/components";
import { Route as RootRoute } from "../../__root";
import hero from "@/assets/svg/hero.svg";
import { mailVerification, stringVerification } from "./utils/validators";
import { useFormStatus } from "react-dom";
import type { LoginState } from "./types/state.types";
import { api } from "@/service/api.service";
import useSession from "@/zunstand/session";

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: Login,
});

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            Login
        </Button>
    );
};

function Login() {
    const navigate = useNavigate();
    const session = useSession.getState();

    const loginAction = async (_previousState: LoginState, formData: FormData): Promise<LoginState> => {
        const email = formData.get("email");
        const password = formData.get("password");

        const errors = {
            email: [...stringVerification(email), ...mailVerification(email)],
            password: stringVerification(password),
        };

        if (errors.email.length > 0 || errors.password.length > 0) {
            return { errors };
        }

        const response = await api.auth.login(email as string, password as string);

        if (!response || !response.token) {
            return {
                errors: {
                    email: ["Invalid username or password"],
                    password: ["Invalid username or password"],
                },
            };
        }

        sessionStorage.setItem("token", response.token);
        session.setUser(email as string);

        navigate({ to: "/dashboard" });

        return {
            errors: {},
        };
    };

    const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {
        errors: {},
    });

    return (
        <main id={style.login}>
            <img src={hero} alt="Hero" />
            <form action={formAction}>
                <Field
                    type="text"
                    label="Email"
                    name={"email"}
                    placeholder="email..."
                    errors={state.errors?.email}
                />
                <Field
                    type="password"
                    label="Password"
                    name={"password"}
                    placeholder="password..."
                    errors={state.errors?.password}
                />
                <SubmitButton />
            </form>
        </main>
    );
}
