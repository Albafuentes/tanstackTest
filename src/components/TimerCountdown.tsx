import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SECONDS = 60;

interface TimerCountdownProps {
    seconds?: number;
    onFinish?: () => void;
    showTimer?: boolean;
}

const TimerCountdown = ({ seconds = SECONDS, onFinish, showTimer = true }: TimerCountdownProps) => {
    const secondsToDisplay = showTimer ? seconds : 0;
    const [currentSeconds, setCurrentSeconds] = useState(secondsToDisplay);
    const timer = useMotionValue(secondsToDisplay);

    const strokeDasharray = currentSeconds === 0 ? CIRCUMFERENCE : CIRCUMFERENCE + 2;

    useMotionValueEvent(timer, "change", (latest) => {
        setCurrentSeconds(Math.ceil(latest));
    });

    const dashOffset = useTransform(
        timer,
        [secondsToDisplay, 0],
        [0, CIRCUMFERENCE]
    );

    useEffect(() => {

        if (!showTimer) {
            return;
        }

        const controls = animate(timer, 0, {
            duration: secondsToDisplay,
            ease: "linear",
        });

        return () => controls.stop();

    }, [showTimer, secondsToDisplay, timer]);

    useEffect(() => {
        if (currentSeconds === 0) {
            onFinish?.();
        }
    }, [currentSeconds, onFinish]);

    return (
        <div id="timer-counterdown">
            <svg width="120" height="120">
                <circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    className="timer-countdown__svg__circle"
                />

                <motion.circle
                    cx="60"
                    cy="60"
                    r={RADIUS}
                    strokeDasharray={strokeDasharray}
                    className="timer-countdown__svg__value"
                    style={{
                        strokeDashoffset: dashOffset
                    }}
                />
            </svg>

            <div
                className={"timer-countdown__counter"}
            >
                {new Date(currentSeconds * 1000).toLocaleTimeString("en-US", { minute: "2-digit", second: "2-digit" })}
            </div>

        </div>
    );


};

export default TimerCountdown;