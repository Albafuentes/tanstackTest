import type { Question } from "../../../../types/question.types";
import { DEFAULT_ANSWER_SELECTED, type SelectedOption } from "../hook";
import { motion, type TransitionWithValueOverrides } from "motion/react";
import resolveGood from "../../../../../public/resolve-good.svg";
import resolveError from "../../../../../public/resolve-error.svg";
import { IconChevronRight } from "@tabler/icons-react";

interface PageTemplateContentProps {
    selectedOption?: SelectedOption | null;
    currentQuestion?: Question | null;
    handleResolveAnswer?: () => void;
    handleSelectOption?: (optionIndex: number) => void;
    handleNextQuestion?: () => void;
}

const PageTemplateContent = ({ selectedOption, currentQuestion, handleNextQuestion, handleResolveAnswer, handleSelectOption }: PageTemplateContentProps) => {

    const isTemplateContentResolved = selectedOption !== null && selectedOption?.resolved;
    const isLabelResolved = isTemplateContentResolved === true && typeof currentQuestion?.options[selectedOption.answer] !== "undefined";

    const transitionSpring: TransitionWithValueOverrides<any> = {
        delay: .55,
        type: "spring",
        stiffness: 160,
        damping: 22,
        mass: 0.8
    }

    const animationVariant = {
        hidden: {
            y: 100,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
        }
    }

    return (
        <motion.article className="quiz__template-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>

            {/* Question */}
            {!isLabelResolved && (
                <div className="quiz-card quiz-card--pink">  <p>{currentQuestion?.question}</p></div>
            )}

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {
                        opacity: 0
                    },
                    visible: {
                        opacity: 1,
                        transition: {
                            ease: "easeOut"
                        }
                    }
                }}
                className="quiz__template-content__list"
            >
                {isLabelResolved ?
                    <motion.label
                        className="quiz-card quiz-card--purple quiz-card--purple--checked"
                        layout="position"
                        layoutId="focusModeButton"
                        variants={animationVariant}
                    >
                        <span className="quiz-card__option">{String.fromCharCode(65 + selectedOption.answer)}</span>
                        <p>{currentQuestion?.options[selectedOption.answer]}</p>
                    </motion.label>
                    : currentQuestion?.options.map((option, index) => {
                        const isSelected = selectedOption
                            ? selectedOption.answer === index
                            : index === DEFAULT_ANSWER_SELECTED;

                        return (
                            <motion.label
                                key={`${index}`}
                                className="quiz-card quiz-card--purple"
                                layout="position"
                                layoutId={isSelected && isLabelResolved ? "focusModeButton" : ""}
                                variants={{
                                    hidden: {
                                        opacity: 0
                                    },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            ease: "easeOut"
                                        }
                                    }
                                }}
                            >
                                <span className="quiz-card__option">{String.fromCharCode(65 + index)}</span>
                                <p>{option}</p>
                                <input
                                    type="radio"
                                    onChange={() => handleSelectOption?.(index)}
                                    checked={isSelected}
                                    aria-checked={isSelected}
                                />
                            </motion.label>
                        );
                    })}
            </motion.div>

            {/* Explanation & Resolution */}
            {isTemplateContentResolved && (
                <div>
                    <motion.img
                        initial="hidden"
                        animate="visible"
                        transition={transitionSpring}
                        variants={animationVariant}
                        width={200}
                        src={selectedOption.correct ? resolveGood : resolveError}
                    />
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={transitionSpring}
                        variants={animationVariant}
                        className="quiz-card quiz-card--pink quiz-card--70"
                    >
                        <p>{currentQuestion?.explanation}</p>
                    </motion.div>
                </div>
            )}

            <button type="button" onClick={isTemplateContentResolved ? handleNextQuestion : handleResolveAnswer} className={"button--variant-solid--purple"}>
                {isTemplateContentResolved ? "Next Question" : "Resolve"}
                <IconChevronRight size={18} />
            </button>
        </motion.article>
    )
};

export default PageTemplateContent;