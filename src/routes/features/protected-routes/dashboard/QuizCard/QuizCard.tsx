import type { QuizModel } from "@/types/quiz.types";
import { Link } from "@tanstack/react-router";
import buttonStyles from "@/components/Button/Button.module.css";
import styles from "./QuizCard.module.css";
import { Badge } from "@/components/Badge/Badge";
import { IconStar } from "@tabler/icons-react";
import { formatSentenceString } from "@/utils/formats";


export const QuizCard = ({ quiz, disabled }: { quiz: QuizModel.Quiz, disabled?: boolean }) => {
    return (
        <div className={styles["quiz-card"]}>
            <Badge color="green" className={styles["quiz-card__badge"]}><IconStar size={14} />{quiz.extraPoints}</Badge>

            <div className={styles["quiz-card__text"]}>
                <h6>{formatSentenceString(quiz.name)}</h6>
                <p>Questions: {quiz.questions}</p>
            </div>

            <Link
                to="/dashboard/$quizId/"
                params={{ quizId: quiz.id }}
                activeOptions={{ exact: true }}
                className={`${buttonStyles["button"]} ${buttonStyles["button--red"]}`}
                disabled={disabled}
            >
                Let's go!
            </Link>
        </div>
    );
};
