import type { QuizModel } from "@/types/quiz.types";
import { Link } from "@tanstack/react-router";
import styles from "./QuizCard.module.css";
import { Badge, buttonStyles } from "@/components";
import { IconStar } from "@tabler/icons-react";
import { formatSentenceString } from "@/utils/formats.utils";
import { translate } from "@/utils/locales.utils";
import { es } from "../../locales/es";


export const QuizCard = ({ quiz, disabled }: { quiz: QuizModel.Quiz, disabled?: boolean }) => {
    return (
        <div className={styles["quiz-card"]} data-testid={`quiz-card-${quiz.id}`}>
            <Badge color="green" className={styles["quiz-card__badge"]}><IconStar size={14} />{quiz.extraPoints}</Badge>

            <div className={styles["quiz-card__text"]}>
                <h6>{formatSentenceString(quiz.name)}</h6>
                <p>{translate(es.quizCard.totalQuestions, { totalQuestions: String(quiz.questions) })}</p>
            </div>

            <Link
                to="/dashboard/$quizId/"
                params={{ quizId: quiz.id }}
                activeOptions={{ exact: true }}
                className={`${buttonStyles["button"]} ${buttonStyles["button--red"]}`}
                aria-disabled={disabled}
            >
                {translate(es.quizCard.linkText)}
            </Link>
        </div>
    );
};
