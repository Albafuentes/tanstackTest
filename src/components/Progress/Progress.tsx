import { motion } from "motion/react";
import styles from "./Progress.module.css";
import { isValidNumber } from "@/utils/validators.utils";

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
    const percentage = (widthValue / maxValue) * 100;
    const value = isValidNumber(percentage)? percentage : 0;
    
    return (
        <div className={styles["progress"]}>
            <p className={styles["progress__help-text"]}>{helpText}</p>
            <div className={styles["progress__thumb"]}>
                <motion.div
                    animate={{
                        width: `${value}%`,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                    style={{
                        visibility:
                            value === 0 ? "hidden" : "visible",
                    }}
                    className={`${styles["progress__thumb__value"]} ${color === "red" ? styles["progress__thumb__value--red"] : styles["progress__thumb__value--black"]}`}
                />
                <progress
                    value={value ?? 0}
                    max={100}
                />
            </div>
        </div >
    );
};
