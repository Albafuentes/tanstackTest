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
import { translate } from "@/utils/locales.utils";
import { es } from "./locales/es";

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: Login,
});

// SubmitButton component that uses the useFormStatus hook to determine if the form is pending submission. It disables the button when the form is pending.
// It requires a separate component because the useFormStatus hook can only be used inside a component that is a child of a form element.
const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {translate(es.submitButton)}
        </Button>
    );
};

export function Login() {
    const navigate = useNavigate();

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
                    email: [translate(es.loginActionError)],
                    password: [translate(es.loginActionError)],
                },
            };
        }

        sessionStorage.setItem("token", response.token);

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
            <img src={hero} loading="lazy" alt="Hero" width={370} height={275}/>
            <form action={formAction}>
                <Field
                    type="text"
                    label={translate(es.emailLabel)}
                    name={"email"}
                    placeholder={translate(es.emailPlaceholder)}
                    errors={state.errors?.email}
                />
                <Field
                    type="password"
                    label={translate(es.passwordLabel)}
                    name={"password"}
                    placeholder={translate(es.passwordPlaceholder)}
                    errors={state.errors?.password}
                />
                <SubmitButton />
            </form>
        </main>
    );
}
