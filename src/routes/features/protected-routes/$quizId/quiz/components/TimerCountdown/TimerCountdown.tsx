import { Badge } from "@/components";
import { TIMER_INCREMENT } from "@/zunstand/store/session.store";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./TimerCountdown.module.css";
import { secondsToTime, timeToSeconds } from "@/utils/formats";

interface TimerCountdownProps {
    time?: string;
    onFinish?: () => void;
    showTimer?: boolean;
    isPaused?: boolean;
}

const TimerCountdown = ({ time = secondsToTime(TIMER_INCREMENT), onFinish, showTimer = true, isPaused = false, }: TimerCountdownProps) => {

    const secondsToDisplay = showTimer
        ? timeToSeconds(time)
        : 0;
    const [currentSeconds, setCurrentSeconds] = useState(secondsToDisplay);
    const timer = useMotionValue(secondsToDisplay);

    useMotionValueEvent(timer, "change", (latest) => {
        setCurrentSeconds(Math.ceil(latest));
    });

    useEffect(() => {
        if (!showTimer || isPaused) {
            return;
        }

        let controls: ReturnType<typeof animate>;

        const run = () => {
            timer.set(secondsToDisplay);

            controls = animate(timer, 0, {
                duration: secondsToDisplay,
                ease: "linear",
                onComplete: () => {
                    onFinish?.();
                    run();
                },
            });
        };

        run();

        return () => {
            controls?.stop();
        };
    }, [showTimer, secondsToDisplay, isPaused, onFinish]);

    return (
        <Badge color="gray" className={styles["timer-countdown"]}>
            {new Date(currentSeconds * 1000).toLocaleTimeString("en-US", { minute: "2-digit", second: "2-digit" })}
        </Badge>
    );
};

export default TimerCountdown;