import style from "./login.module.css";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { useActionState } from "react";
import { Button, Field } from "@/components";
import { Route as RootRoute } from "../../__root";
import hero from "@/assets/svg/hero.svg";
import { stringVerification } from "./utils/validators";
import { useFormStatus } from "react-dom";
import type { LoginState } from "./types/state.types";
import { api } from "@/service/api.service";
import { translate } from "@/utils/locales.utils";
import { es } from "./locales/es";

export const Route = createRoute({
    head: () => ({
        meta: [{
            title: "Login",
        }]
    }),
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
        const sessionName = formData.get("sessionName");


        const errors = {
            sessionName: [...stringVerification(sessionName)],
        };

        if (errors.sessionName.length > 0) {
            return { errors };
        }

        const response = await api.auth.login(sessionName as string);

        if (!response || !response.token) {
            return {
                errors: {
                    sessionName: [translate(es.loginActionError)],
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
                    label={translate(es.sessionNameLabel)}
                    name={"sessionName"}
                    placeholder={translate(es.sessionNamePlaceholder)}
                    errors={state.errors?.sessionName}
                    tooltip={translate(es.explanation)}
                />
                <SubmitButton />
            </form>
        </main>
    );
}
