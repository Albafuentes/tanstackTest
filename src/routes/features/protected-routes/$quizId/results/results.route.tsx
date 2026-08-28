
import { createRoute, Link, } from '@tanstack/react-router'
import { maxScore } from '@/utils/score.utils';
import { Badge, Progress } from '@/components';
import { isGoodScore } from '@/utils/score.utils';
import { Route as QuizRoute } from "../layout";
import useSession from '../../../../../zunstand/session';
import { Score } from '@/assets/svg/score';
import { ABBREVIATION_PT } from '@/config/constants';
import buttonStyles from '@/components/Button/Button.module.css';
import styles from './results.module.css';

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "/results",
    component: Results,

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


function Results() {
    const session = useSession();
    const params = Route.useParams();
    const results = session.history.find((item) => item.quizId === params.quizId);

    return (
        <section className={styles["results"]}>
            {results ? (
                <>
                    <div className={styles["results__score"]}>
                        <h4>New score</h4>
                        <Score score={`${results.points}`} isGoodScore={isGoodScore(results.points ?? 0, results.totalQuestions ?? 0)} />
                        <Progress
                            helpText={`${results.points} ${ABBREVIATION_PT}`}
                            widthValue={results.points ?? 0}
                            maxValue={maxScore(results.totalQuestions ?? 0)}
                        />
                    </div>
                    <div className={styles["results__summary"]}>
                        <strong>Summary</strong>
                        <div className={styles["results__summary__group-badges"]}>
                            <Badge variant="tag" color="outline-green">
                                <span>Correct </span>
                                <span>{results?.correctQuestions}</span>
                            </Badge>
                            <Badge variant="tag" color="outline-red">
                                <span>Wrong</span>
                                <span>{results?.wrongQuestions}</span>
                            </Badge>
                            <Badge variant="tag" color="outline-black">
                                <span>Skips </span>
                                <span>{results?.skippedAnswers}</span>
                            </Badge>
                        </div>
                        <Link to="/dashboard" className={`${buttonStyles["button"]} ${buttonStyles["button--black"]}`}>
                            Go to Dashboard
                        </Link>
                    </div>
                </>
            ) : (
                <div className={styles["results__empty"]}>
                    <strong>Ups! We have an error, and we can't recover the results. </strong>
                    <Link to="/dashboard" className={`${buttonStyles["button"]} ${buttonStyles["button--black"]}`}>
                        Go to Dashboard
                    </Link>
                </div>
            )}
        </section>
    )
}

export default Results
