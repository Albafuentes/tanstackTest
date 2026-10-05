
import { Skeleton } from '@/components/Skeleton/Skeleton';
import styles from '../quiz.module.css';
import ProgressStyles from '@/components/Progress/Progress.module.css';
import timmerCountdownStyles from './TimerCountdown/TimerCountdown.module.css';

function PendingComponent() {

    return (
        <section className={styles['quiz']}>
            <div className={styles['quiz__header']}>
                <Skeleton tag="h4" maxWidth="24rem" />
                <div className={styles['quiz__header-timer']}>
                    <div className={ProgressStyles["progress"]}>
                        <Skeleton tag="tag" height="1.5rem" maxWidth="4rem" className={ProgressStyles["progress__help-text"]} style={{ marginLeft: "auto" }} />
                        <div className={ProgressStyles["progress__thumb"]}>
                            <Skeleton tag="badge" height="var(--size-8)" />
                        </div>
                    </div>
                    <Skeleton tag="badge" maxWidth="4rem" height='1.25rem' className={timmerCountdownStyles["timer-countdown"]} />
                </div>
            </div>
            <div className={styles['quiz__body']}>
                <Skeleton tag="h6" maxWidth="64rem" />
                <div className={styles['quiz__body__list-answers']}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} tag="tag" />
                    ))}
                </div>
            </div>
            <div className={styles['quiz__footer']}>
                <Skeleton tag="button" maxWidth="5rem" />
                <Skeleton tag="button" maxWidth="6.5rem" />
            </div>
        </section>
    );
}

export default PendingComponent;