
import { Badge } from '@/components/Badge/Badge';
import useSession from '@/zunstand/session';
import type { QuizModel } from '@/types/quiz.types';
import { QuizCard } from './QuizCard/QuizCard';
import styles from './dashboard.module.css';
import { ABBREVIATION_PT } from '@/config/constants';
import { formatSentenceString } from '@/utils/formats';
import { Route } from './dashboard.route';

function Dashboard() {
    const session = useSession();
    const { quizsData } = Route.useLoaderData() as {
        quizsData: QuizModel.Quiz[];
    };

    return (
        <section className={styles['dashboard']}>
            <h3>Let's play a quiz!</h3>

            <article className={styles['dashboard-quizs']}>
                {quizsData.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                ))}
            </article>
            <article className={styles['dashboard-scores']}>
                <strong>All Scores</strong>
                <ul>
                    {session?.history.length ? (
                        session?.history.map((historyItem, index) => (
                            <li key={index}>
                                <Badge variant="tag">
                                    <span>{formatSentenceString(historyItem.quizName)}</span>
                                    <span>
                                        {historyItem.points} {ABBREVIATION_PT}
                                    </span>
                                </Badge>
                            </li>
                        ))
                    ) : (
                        <li className={styles['dashboard-scores__item-empty']}>
                            No scores yet...
                        </li>
                    )}
                </ul>
            </article>
        </section>
    );
}

export default Dashboard;