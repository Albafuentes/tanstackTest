import { motion } from "motion/react";
import styles from "./Progress.module.css";

interface ProgressProps {
    helpText: string;
    widthValue: number;
    maxValue: number;
    color?: "black" | "red";
}
export const Progress = ({
    helpText,
    widthValue,
    maxValue,
    color = "black"
}: ProgressProps) => {
    return (
        <div className={styles["progress"]}>
            <p className={styles["progress__help-text"]}>{helpText}</p>
            <div className={styles["progress__thumb"]}>
                <motion.div
                    animate={{
                        width: `${widthValue}%`,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                    style={{
                        visibility:
                            widthValue === 0 ? "hidden" : "visible",
                    }}
                    className={`${styles["progress__thumb__value"]} ${color === "red" ? styles["progress__thumb__value--red"] : styles["progress__thumb__value--black"]}`}
                />
                <progress
                    value={widthValue ?? 0}
                    max={maxValue ?? 0}
                />
            </div>
        </div >
    );
};
