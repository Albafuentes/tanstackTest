
import { translate } from '@/utils/locales.utils';
import ProgressStyles from '@/components/Progress/Progress.module.css';
import styles from '../results.module.css';
import { es } from '../locales/es';
import ScoreLoading from '@/assets/svg/score-loading.svg';
import { Skeleton } from '@/components/Skeleton/Skeleton';

function PendingComponent() {

    return (
        <section className={styles["results"]}>
            <h4>{translate(es.title)}</h4>
            <div className={styles["results__score"]}>
                <img src={ScoreLoading} aria-hidden="true" style={{
                    width: "186px",
                    height: "174px"
                }} />
                <div className={ProgressStyles["progress"]}>
                    <Skeleton tag="tag" height="1.5rem" maxWidth="4rem" className={ProgressStyles["progress__help-text"]}  style={{ marginLeft: "auto" }}/>
                    <div className={ProgressStyles["progress__thumb"]}>
                        <Skeleton tag="badge" height="var(--size-8)" />
                    </div>
                </div>

            </div>
            <div className={styles["results__summary"]}>
                <strong>{translate(es.summarySubTitle)}</strong>
                <div className={styles["results__summary__group-badges"]}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={`results-summary-group-${index}`} tag="tag" height="5rem"/>
                    ))}
                </div>
            </div>
            <Skeleton tag="button" maxWidth="8rem" style={{ marginLeft: "auto" }} />
        </section>
    );
}

export default PendingComponent;