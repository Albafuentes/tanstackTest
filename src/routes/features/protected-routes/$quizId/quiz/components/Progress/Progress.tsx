import { motion } from "motion/react";
import styles from "./Progress.module.css";
import type { QuestionCount } from "@/routes/features/protected-routes/$quizId/quiz/hook";

export const Progress = ({
    questionCount,
}: {
    questionCount: QuestionCount
}) => {
    return (
        <div className={styles["progress"]}>
            <p className={styles["progress__help-text"]}>{questionCount?.questionsAnswered ?? "-"} of {questionCount?.totalQuestions ?? "-"}</p>
            <div className={styles["progress__thumb"]}>
                <motion.div
                    animate={{
                        width: `${((questionCount?.questionsAnswered ?? 0) / (questionCount?.totalQuestions ?? 0)) * 100}%`,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                    style={{
                        visibility:
                            questionCount?.questionsAnswered === null ? "hidden" : "visible",
                    }}
                    className={styles["progress__thumb__value"]}
                />
                <progress
                    value={questionCount?.questionsAnswered ?? 0}
                    max={questionCount?.totalQuestions ?? 0}
                />
            </div>
        </div >
    );
};
