import { createRoute, Link, useNavigate } from '@tanstack/react-router';
import { Route as ProtectedRoutesLayoutRoute } from '../layout';
import useSession from '@/zunstand/session';
import styles from './settings.module.css';
import { Button, Field } from '@/components';
import buttonStyles from '@/components/Button/Button.module.css';
import { useActionState } from 'react';
import type { SettingsState } from './types/state.types';
import { useFormStatus } from 'react-dom';
import { useShallow } from 'zustand/shallow';

export const Route = createRoute({
    getParentRoute: () => ProtectedRoutesLayoutRoute,
    path: '/settings',
    component: Settings,

    // staleTime fixed the revalidation of the data. The loader function is not executed again on the client, and the data is not fetched again if it does not become stale.
    // staleTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 0,

    // gcTime fixed the garbage collection of the data. The loader function is not executed again on the client, and the data is not fetched again if the user does not navigate away from the page.
    // gcTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 0,

    // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
    notFoundComponent: () => <>not found...</>,

    // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
    pendingComponent: () => <>Loading...</>,
    // pendingMs: 1000, // 1 second
});

// SubmitButton component that uses the useFormStatus hook to determine if the form is pending submission. It disables the button when the form is pending.
// It requires a separate component because the useFormStatus hook can only be used inside a component that is a child of a form element.
const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            Save
        </Button>
    );
};

function Settings() {

    const { updateSettings, settings } = useSession(
        useShallow((state) => ({
            updateSettings: state.updateSettings,
            settings: state.settings,
        })),
    );
    const navigate = useNavigate();

    const settingsAction = (_previousState: SettingsState, formData: FormData) => {
        const timer = formData.get('timer') as string;
        const level = formData.get('level') as string;

        updateSettings ? updateSettings(timer, Number(level)) : null;

        navigate({ to: "/dashboard" });

        return {
            errors: {},
        };
    };

    const [state, formAction] = useActionState<SettingsState, FormData>(settingsAction, {
        errors: {},
    });


    return (
        <section className={styles['settings']}>
            <h4>Settings</h4>
            <form action={formAction} >
                <Field
                    type="custom-number"
                    label="Timer"
                    name="timer"
                    description="Select the timer that will be used for every question."
                    errors={state.errors?.timer}
                    defaultValue={settings?.timer || ''}
                    orientation="horizontal"
                />
                <Field
                    type="custom-bar"
                    label="Level"
                    name="level"
                    description="Select the level questions. A higher level indicates that the questions are more difficult."
                    errors={state.errors?.level}
                    defaultValue={settings.level.toString() || ''}
                    orientation="horizontal"

                />

                <div className={styles['settings__button-group']}>
                    <Link to="/dashboard" className={`${buttonStyles["button"]} ${buttonStyles["button--outline-black"]}`}>
                        Cancel
                    </Link>
                    <SubmitButton />
                </div>
            </form>
        </section>
    );
}
