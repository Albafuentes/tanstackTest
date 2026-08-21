import { motion } from "motion/react";
import TimerCountdown from "../../../../../../components/TimerCountdown";

interface PageTemplateHeaderProps {
    handleResolveAnswer?: () => void;
    questionCount?: { totalQuestions: number, pendingQuestions: number, questionsAnswered: number };
    isResolvingAnswer?: boolean;
}

const PageTemplateHeader = ({ questionCount, handleResolveAnswer, isResolvingAnswer }: PageTemplateHeaderProps) => {

    return (
        <article className="quiz__template-header">
            <div>
                <p>Questions</p>
                <h3>
                    <span>{questionCount?.questionsAnswered ?? "-"}</span> / {questionCount?.totalQuestions ?? "-"}
                </h3>
            </div>

            <TimerCountdown
                key={questionCount?.pendingQuestions ?? 0}
                onFinish={handleResolveAnswer}
                showTimer={!!questionCount}
                isPaused={isResolvingAnswer ?? false}
            />

            <div className="quiz__template-header__progress-bar">
                <motion.div
                    animate={{
                        width: `${((questionCount?.questionsAnswered ?? 0) / (questionCount?.totalQuestions ?? 0) * 100)}%`,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                    style={{ visibility: questionCount?.questionsAnswered === null ? "hidden" : "visible" }}
                />
                <progress
                    value={questionCount?.questionsAnswered ?? 0}
                    max={questionCount?.totalQuestions ?? 0}
                />
            </div>
        </article>
    );
};

export default PageTemplateHeader;