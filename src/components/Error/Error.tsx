import HeroConectionError from '@/assets/svg/hero-conection-error.svg'
import HeroPageNotFound from '@/assets/svg/hero-page-not-found.svg'
import HeroUnauthorizedError from '@/assets/svg/hero-session-error.svg'
import { Button } from '../Button/Button';
import type { JSX } from 'react/jsx-runtime';
import styles from './Error.module.css';
import { es } from './locales/es';

interface ErrorProps {
    status: number;
}

const GetClientError = (status: number): { image: string, title: string, description: string, action: JSX.Element | null } => {
    const isPageNotFound = status >= 400 && status < 500;
    const isUnAuthorized = status === 501 || status === 403;

    const errorType = isUnAuthorized ? "unauthorized" : isPageNotFound ? "notFound" : "noConnection";

    switch (errorType) {
        case "notFound":
            return {
                image: HeroPageNotFound,
                title: es.notFoundTitle,
                description: es.notFoundDescription,
                action: <Button>{es.actionGoBack}</Button>
            };
        case "noConnection":
            return {
                image: HeroConectionError,
                title: es.noConnectionTitle,
                description: es.noConnectionDescription,
                action: <Button>{es.actionGoBack}</Button>
            };
        case "unauthorized":
            return {
                image: HeroUnauthorizedError,
                title: es.unauthorizedTitle,
                description: es.unauthorizedDescription,
                action: <Button>{es.actionCreateSession}</Button>
            };
    }
}

export const Error = ({ status }: ErrorProps) => {
    const error = GetClientError(status);

    return (
        <section id={styles.Error}>
            <img src={error.image} alt="Error illustration" />
            <article>
                <h5>{error.title}</h5>
                <p>{error.description}</p>
            </article>
             {error.action}
        </section>
    )
}