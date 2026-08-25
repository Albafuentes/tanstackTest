import type { QuizModel } from "@/types/quiz.types";
import { Link } from "@tanstack/react-router";
import buttonStyles from "@/components/Button/Button.module.css";
import styles from "./QuizCard.module.css";

export const QuizCard = ({ quiz }: { quiz: QuizModel.Quiz }) => {
  return (
    <div className={styles["quiz-card"]}>

      <p>{quiz.extraPoints}</p>

      <div  className={styles["quiz-card__text"]}>
        <h6>{quiz.name}</h6>
        <p>Questions: {quiz.questions}</p>
      </div>

      <Link
        to="/protected/session/quiz"
        activeOptions={{ exact: true }}
        className={`${buttonStyles["button"]} ${buttonStyles["button--red"]}`}
      >
        Let's go!
      </Link>
    </div>
  );
};
