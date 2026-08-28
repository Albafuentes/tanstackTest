
import { Link, } from '@tanstack/react-router'
import { maxScore } from '@/utils/score.utils';
import { Badge, Progress, buttonStyles } from '@/components';
import { isGoodScore } from '@/utils/score.utils';
import useSession from '../../../../../zunstand/session';
import { Score } from '@/assets/svg/score';
import { ABBREVIATION_PT } from '@/config/constants';
import styles from './results.module.css';
import { Route } from './results.route';

function Results() {
    const history = useSession((state) => state.history);
    const params = Route.useParams();
    const results = history.find((item) => item.quizId === params.quizId);

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
                    </div>
                    <Link to="/dashboard" className={`${buttonStyles["button"]} ${buttonStyles["button--black"]}`}>
                        Go to Dashboard
                    </Link>
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
