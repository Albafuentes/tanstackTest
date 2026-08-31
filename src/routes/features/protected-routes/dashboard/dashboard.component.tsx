
import { Badge } from '@/components';
import useSession from '@/zunstand/session';
import type { QuizModel } from '@/types/quiz.types';
import { QuizCard } from './components/QuizCard/QuizCard';
import styles from './dashboard.module.css';
import { ABBREVIATION_PT } from '@/config/constants';
import { formatSentenceString } from '@/utils/formats';
import { Route } from './dashboard.route';
import { translate } from '@/utils/locales.utils';
import { es } from './locales/es';

function Dashboard() {
    const history = useSession((state) => state.history);
    const { quizsData } = Route.useLoaderData() as {
        quizsData: QuizModel.Quiz[];
    };

    return (
        <section className={styles['dashboard']}>
            <h3>{translate(es.title)}</h3>

            <article className={styles['dashboard-quizs']}>
                {quizsData.map((quiz) => (
                    <QuizCard key={`quiz-card-${quiz.id}`} quiz={quiz} />
                ))}
            </article>
            <article className={styles['dashboard-scores']}>
                <strong>{translate(es.scoresSubTitle)}</strong>
                <ul>
                    {history.length ? (
                        history.map((historyItem, index) => (
                            <li key={`history-item-${index}`}>
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
                            {translate(es.scoresEmptyList)}
                        </li>
                    )}
                </ul>
            </article>
        </section>
    );
}

export default Dashboard;