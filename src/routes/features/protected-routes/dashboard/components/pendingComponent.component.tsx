
import styles from '../dashboard.module.css';
import quizCardStyles from "../components/QuizCard/QuizCard.module.css";
import { Skeleton } from '@/components/Skeleton/Skeleton';

function PendingComponent() {

    return (
        <section className={styles['dashboard']}>
            <Skeleton tag={'h3'} />
            <article className={styles['dashboard-quizs']}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div className={quizCardStyles["quiz-card"]} key={`quiz-card-skeleton-${index}`}>
                        <Skeleton tag={"badge"} />
                        <div className={quizCardStyles["quiz-card__text"]}>
                            <Skeleton tag={"h6"} width={"8rem"} />
                            <Skeleton tag={"p"}width={"6rem"}/>
                        </div>
                        <Skeleton tag={"button"} />
                    </div>

                ))}
            </article>
            <article className={styles['dashboard-scores']}>
                <Skeleton tag={'p'} />
                <ul>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <li key={`history-item-skeleton-${index}`}>
                            <Skeleton tag={'tag'} />
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}

export default PendingComponent;