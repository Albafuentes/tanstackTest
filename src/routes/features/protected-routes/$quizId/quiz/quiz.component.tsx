
import { Link } from '@tanstack/react-router';
import { useQuiz } from './hook';
import type { QuizModel } from '@/types/quiz.types';
import { formatSentenceString } from '@/utils/formats';
import styles from './quiz.module.css';
import { Progress } from '@/components/index';
import TimerCountdown from './components/TimerCountdown/TimerCountdown';
import useSession from '@/zunstand/session';
import { TagAnswer } from './components/TagAnswer/TagAnswer';
import { Button } from '@/components';
import buttonStyles from '@/components/Button/Button.module.css';
import { Route } from './quiz.route';

function Quiz() {
    const session = useSession();

    const data: QuizModel.Quiz = Route.useLoaderData(); // can be used here to access the data returned from the loader function
    const dataWithLevel = data.quizQuestions.filter(
        (quiz) => quiz.level === session?.settings.level,
    );
    const {
        resolveAnswer,
        skipAnswer,
        selectOption,
        nextQuestion,
        finishedQuiz,
        timerStatus,
        currentQuestion,
        questionCount,
        selectedOption,
        isQuizFinished,
    } = useQuiz(dataWithLevel, { id: data.id, name: data.name });

    const isResolved = selectedOption?.resolved ?? false;

    // const {isFetching} = Route.useMatch()  can be used here to access the data returned from the loader function

    const handleNextQuestion = () => {
        nextQuestion();
    };

    const handleFinishQuiz = () => {
        finishedQuiz();
    };

    const buttonSwitch = () => {
        if (isResolved) {
            if (isQuizFinished) {
                return (
                    <Link
                        to="/dashboard/$quizId/results"
                        activeOptions={{ exact: true }}
                        className={`${buttonStyles['button']} ${buttonStyles['button--red']}`}
                        onClick={handleFinishQuiz}
                    >
                        Finish Quiz
                    </Link>
                );
            }

            return <Button onClick={handleNextQuestion}>Next Question</Button>;
        } else {
            return (
                <Button
                    variant="red"
                    onClick={resolveAnswer}
                    disabled={!selectedOption}
                >
                    Resolve
                </Button>
            );
        }
    };

    return (
        <section className={styles['quiz']}>
            <div className={styles['quiz__header']}>
                <h4>{formatSentenceString(data.name)}</h4>
                <div className={styles['quiz__header-timer']}>
                    <Progress
                        helpText={`${questionCount?.questionsAnswered ?? '-'} of ${questionCount?.totalQuestions ?? '-'}`}
                        widthValue={
                            questionCount?.questionsAnswered ?? 0
                        }
                        maxValue={questionCount?.totalQuestions ?? 0}
                        color="red"
                    />
                    <TimerCountdown
                        time={session.settings.timer}
                        isPaused={timerStatus === 'paused'}
                        onFinish={skipAnswer}
                        showTimer={!isQuizFinished}

                    />
                </div>
            </div>

            <div className={styles['quiz__body']}>
                <h6>{currentQuestion?.question}</h6>
                <div className={styles['quiz__body__list-answers']}>
                    {currentQuestion?.options.map((answer, index) => (
                        <TagAnswer
                            key={`${data.name}-answer-${index}`}
                            selectedOption={selectedOption}
                            data={{
                                index: index,
                                answer: answer,
                                explanation: currentQuestion.explanation,
                            }}
                            handleSelectOption={selectOption}
                        />
                    ))}
                </div>
            </div>
            <div className={styles['quiz__footer']}>
                <Button variant="outline-black" onClick={skipAnswer}>
                    Skip
                </Button>
                {buttonSwitch()}
            </div>
        </section>
    );
}

export default Quiz;