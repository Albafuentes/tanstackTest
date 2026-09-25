
import { Skeleton } from '@/components/Skeleton/Skeleton';
import styles from '../quiz.module.css';

function PendingComponent() {

    return (
        <section className={styles['quiz']}>
            <div className={styles['quiz__header']}>
                <Skeleton tag="h4" maxWidth="24rem"/>
                <div className={styles['quiz__header-timer']}>
                    <Skeleton tag="tag" height="1.5rem" maxWidth="4rem"/>
                    <Skeleton tag="badge" height="var(--size-8)"/>
                    <Skeleton tag="badge" maxWidth="4rem" height='1.25rem'/>
                </div>
            </div>
            <div className={styles['quiz__body']}>
                <Skeleton tag="h6" maxWidth="64rem" />
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} tag="tag" />
                ))}
            </div>
            <div className={styles['quiz__footer']}>
                <Skeleton tag="button" maxWidth="2rem" />
                <Skeleton tag="button" maxWidth="3.6rem"/>
            </div>
        </section>
    );
}

export default PendingComponent;