
import { createRoute, Link } from '@tanstack/react-router'
import { Route as QuizRoute } from "../layout";
import useSession from '../../../../../zunstand/session';

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "results",
    component: Results,
});


function Results() {
    const params = Route.useMatch().params;
    const session = useSession();

    const results = session.history.find((item) => item.quizId === params.quizId);

    return (
        <section id="results">

            <article className="info-card">
                <div className="results__text">
                    <h2>{results?.points === 0 ? "Better luck next time!" : "Congratulations!"}</h2>
                    <p>Your score: <span>{results?.points}</span></p>
                </div>
                <div className="results__action">
                    <Link to="/" className="button--variant-outline">Finish Quiz</Link>
                </div>
            </article>

        </section>
    )
}

export default Results
