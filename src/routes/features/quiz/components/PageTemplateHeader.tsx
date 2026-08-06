import { motion } from "motion/react";
import TimerCountdown from "../../../../components/TimerCountdown";

interface PageTemplateHeaderProps {
    handleResolveAnswer?: () => void;
    questionCount?: { totalQuestions: number, pendingQuestions: number };
    timer?: string;
}

const PageTemplateHeader = ({ questionCount, timer, handleResolveAnswer }: PageTemplateHeaderProps) => {
    const questionsAnswered = questionCount ? questionCount.totalQuestions - questionCount.pendingQuestions : null;

    return <article className="quiz__template-header">
        <div>
            <p>Questions</p>
            <h3><span>{questionsAnswered ?? "-"}</span> / {questionCount?.totalQuestions ?? "-"}</h3>
        </div>

        <TimerCountdown onFinish={handleResolveAnswer} />

        <div className="quiz__template-header__progress-bar">
            <motion.div
                animate={{
                    width: `${((questionsAnswered ?? 0) / (questionCount?.totalQuestions ?? 0) * 100)}%`,
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
            />
            <progress value={questionsAnswered ?? 0} max={questionCount?.totalQuestions ?? 0} >

            </progress>
        </div>
    </article>;
};

export default PageTemplateHeader;