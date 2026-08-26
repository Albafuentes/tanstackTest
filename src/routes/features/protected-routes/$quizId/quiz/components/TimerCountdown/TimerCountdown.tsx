import { Badge } from "@/components";
import { TIMER_INCREMENT } from "@/zunstand/session";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./TimerCountdown.module.css";

interface TimerCountdownProps {
    seconds?: number;
    onFinish?: () => void;
    showTimer?: boolean;
    isPaused?: boolean;
}

const TimerCountdown = ({ seconds = TIMER_INCREMENT, onFinish, showTimer = true, isPaused = false }: TimerCountdownProps) => {

    const secondsToDisplay = showTimer ? seconds : 0;
    const [currentSeconds, setCurrentSeconds] = useState(secondsToDisplay);
    const timer = useMotionValue(secondsToDisplay);

    useMotionValueEvent(timer, "change", (latest) => {
        setCurrentSeconds(Math.ceil(latest));
    });

    useEffect(() => {

        if (!showTimer) {
            return;
        }

        if (isPaused) return;

        const controls = animate(timer, 0, {
            duration: secondsToDisplay,
            ease: "linear",
        });

        return () => controls.stop();

    }, [showTimer, secondsToDisplay, timer, isPaused]);

    useEffect(() => {
        if (currentSeconds === 0) {
            onFinish?.();
        }
    }, [currentSeconds, onFinish]);

    return (
        <Badge color="gray" className={styles["timer-countdown"]}>
            {new Date(currentSeconds * 1000).toLocaleTimeString("en-US", { minute: "2-digit", second: "2-digit" })}
        </Badge>
    );
};

export default TimerCountdown;