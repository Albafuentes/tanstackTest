import { Badge } from "@/components";
import type { SelectedOption } from "../../hook";
import type { QuizModel } from "@/types/quiz.types";
import styles from "./TagAnswer.module.css";

interface TagAnswerProps {
    selectedOption: SelectedOption | null;

    data: {
        index: number;
        answer: string;
        explanation?: string;
    };
    handleSelectOption?: (optionIndex: number) => void;
}

import type { ReactElement } from "react";
const getStatus = (
    selectedOption: SelectedOption | null,
    isTagSelected: boolean,
    explanation: string,
): { style: string; component: ReactElement | null } => {
    const isResolvedState = selectedOption !== null && selectedOption?.resolved;
    const isCorrectAnswer =
        isResolvedState === true && selectedOption?.correct === true;

    if (isResolvedState) {
        if (isTagSelected && isCorrectAnswer) {
            return {
                style: styles["tag-answer--green"],
                component: <Badge color="outline-green" className={styles["tag-answer__badge"]}>Good!</Badge>,
            };
        }

        if (isTagSelected && !isCorrectAnswer) {
            return {
                style: styles["tag-answer--red"],
                component: (
                    <>
                        <Badge color="outline-red" className={styles["tag-answer__badge"]}>Oops!</Badge>
                        <p>{explanation}</p>
                    </>
                ),
            };
        }
        return { style: styles["tag-answer--disabled"], component: null };
    }

    return { style: "", component: null };
};

export const TagAnswer = ({
    selectedOption,
    data,
    handleSelectOption,
}: TagAnswerProps) => {
    const isTagSelected = selectedOption?.answer === data.index;
    const status = getStatus(selectedOption, isTagSelected, data.explanation || "");

    return (
        <label className={`${styles["tag-answer"]} ${status.style}`}>
            <input
                type="radio"
                onChange={() => handleSelectOption?.(data.index)}
                checked={isTagSelected}
                aria-checked={isTagSelected}
            />
            <p>
                <strong>{String.fromCharCode(65 + data.index)}.</strong>
                &nbsp;{data.answer}
            </p>
            {status.component}
        </label>
    );
};
