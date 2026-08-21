import { IconChevronRight } from "@tabler/icons-react";
import TimerCountdown from "../../../../../components/TimerCountdown";
import { motion, type TransitionWithValueOverrides } from "motion/react";

/*
* This component displays the skeleton loader for the quiz page and it is called in the index.tsx file when the loader function is fetching data.
* The animations are specifically for this loader and are not used anywhere else in the application.
* It must be a mirror of the quiz page.
*/

const Loader = () => {
    const animation = {
        backgroundPosition: ["200% 0", "-200% 0"],
    }
    const transition: TransitionWithValueOverrides<any> = {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
    }

    return (
        <section id="loader">
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
                    animate={animation}
                    transition={transition}
                />
                <div
                    className="quiz__template-content__list"
                >
                    {new Array(4).fill("").map((_option, index) => {
                        return (
                            <motion.label
                                key={`${index}`}
                                className="quiz-card quiz-card--purple"
                                animate={animation}
                                transition={transition}
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
        </section>
    );
};

export default Loader;