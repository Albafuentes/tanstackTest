import { IconChevronRight } from "@tabler/icons-react";
import TimerCountdown from "../../../components/TimerCountdown";
import { motion } from "motion/react";

const Loader = () => {
    return (
        <>
            <article className="quiz__template-header">
                <div>
                    <p>Questions</p>
                    <h3>
                        <span>{"-"}</span> / {"-"}
                    </h3>
                </div>

                <TimerCountdown key={0} showTimer={false} />

                <div className="quiz__template-header__progress-bar">
                    <div style={{ visibility: "hidden" }} />
                    <progress value={0} max={0} />
                </div>
            </article>

            <article className="quiz__template-content">
                <motion.div
                    className="quiz-card quiz-card--pink"
                    animate={{
                        backgroundPosition: ["200% 0", "-200% 0"],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <div
                    className="quiz__template-content__list"
                >
                    {new Array(4).fill("").map((_option, index) => {
                        return (
                            <motion.label
                                key={`${index}`}
                                className="quiz-card quiz-card--purple"
                                animate={{
                                    backgroundPosition: ["200% 0", "-200% 0"],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        );
                    })}
                </div>

                <button
                    type="button"
                    className={"button--variant-solid--purple"}
                    disabled={true}
                >
                    Resolve
                    <IconChevronRight size={18} />
                </button>
            </article>
        </>
    );
};

export default Loader;