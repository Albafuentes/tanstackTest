
import { createRoute, Link, } from '@tanstack/react-router'
import { AnimatedRoute, Badge, Progress } from '@/components';
import { Route as QuizRoute } from "../layout";
import useSession, { SCORE_QUESTION_INCREMENT } from '../../../../../zunstand/session';
import { Score } from '@/assets/svg/score';
import { ABBREVIATION_PT } from '@/config/constants';
import buttonStyles from '@/components/Button/Button.module.css';
import styles from './results.module.css';

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "quiz/results",
    component: Results,

    // staleTime: 5 * 60 * 1000,
    // gcTime: 10 * 60 * 1000,
});


function Results() {
    const session = useSession();
    const params = Route.useParams();
    const results = session.history.find((item) => item.quizId === params.quizId);

    return (
        <AnimatedRoute variant="slideUp">
            {results ? (
                <section className={styles["results"]}>
                    <div className={styles["results__score"]}>
                        <h4>New score</h4>
                        <Score score={`${results?.points}`} isGoodScore={(results?.points ?? 0) >= ((results?.totalQuestions ?? 0) / 2)} />
                        <Progress
                            helpText={`${results?.points} ${ABBREVIATION_PT}`}
                            widthValue={results?.points ?? 0}
                            maxValue={(results?.totalQuestions ?? 0) * SCORE_QUESTION_INCREMENT}
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

                </section>
            ) : (
                <section className={styles["results"]}>
                    <div className={styles["results__empty"]}>
                        <strong>Ups! We have an error, and we can't recover the results. </strong>
                        <Link to="/dashboard" className={`${buttonStyles["button"]} ${buttonStyles["button--black"]}`}>
                            Go to Dashboard
                        </Link>
                    </div>
                </section>
            )}
        </AnimatedRoute>
    )
}

export default Results
