
import { createRoute, Link, } from '@tanstack/react-router'
import { Badge, Progress } from '@/components';
import { isGoodScore } from '@/utils/score.utils';
import { Route as QuizRoute } from "../layout";
import useSession from '../../../../../zunstand/session';
import { Score } from '@/assets/svg/score';
import { ABBREVIATION_PT } from '@/config/constants';
import buttonStyles from '@/components/Button/Button.module.css';
import styles from './results.module.css';
import { averagePercentageScore, maxScorePercentage } from '@/utils/score.utils';

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "quiz/results",
    component: Results,

    // staleTime: 5 * 60 * 1000,
    // gcTime: 10 * 60 * 1000,

    notFoundComponent: () => <>not found...</>,
    pendingComponent: () => <>Loading...</>,
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
                            widthValue={averagePercentageScore(results.points ?? 0, results.totalQuestions ?? 0)}
                            maxValue={maxScorePercentage(results.totalQuestions ?? 0)}
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
