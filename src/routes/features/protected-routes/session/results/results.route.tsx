
import { createRoute, Link } from '@tanstack/react-router'
import { Route as QuizRoute } from "../layout";
import useSQuizStatus from '../../../../../zunstand/quiz-status';
import useSession from '../../../../../zunstand/session';
import cube from "../../../../../assets/svg/cube-variant-01.svg";

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "results",
    component: Results,
});


function Results() {
    const score = useSession((state) => state.score.points);
    const resetStatus = useSQuizStatus((state) => state.resetStatus);

    return (
        <section id="results">

            <article className="info-card">
                <img src={cube} alt="logo" width={300} />
                <div className="results__text">
                    <h2>{score === 0 ? "Better luck next time!" : "Congratulations!"}</h2>
                    <p>Your score: <span>{score}</span></p>
                </div>
                <div className="results__action">
                    <Link to="/" className="button--variant-outline" onClick={resetStatus}>Finish Quiz</Link>
                </div>
            </article>

        </section>
    )
}

export default Results
