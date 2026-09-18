
import { Link } from '@tanstack/react-router';
import { useQuiz } from './hooks/useQuiz.hook';
import type { QuizModel } from '@/types/quiz.types';
import { formatSentenceString } from '@/utils/formats.utils';
import styles from './quiz.module.css';
import { Progress, Button, buttonStyles } from '@/components';
import TimerCountdown from './components/TimerCountdown/TimerCountdown';
import useSession from '@/zunstand/store/session.store';
import { TagAnswer } from './components/TagAnswer/TagAnswer';
import { Route } from './quiz.route';
import { translate } from '@/utils/locales.utils';
import { es } from './locales/es';

function Quiz() {

    const settings = useSession((state) => state.settings);

    const data: QuizModel.Quiz = Route.useLoaderData(); // can be used here to access the data returned from the loader function
    const dataWithLevel = data.quizQuestions.filter(
        (quiz) => quiz.level === settings.level,
    );
    const {
        resolveAnswer,
        skipAnswer,
        selectOption,
        nextQuestion,
        finishedQuiz,
        timerStatus,
        isPending,
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
                        aria-disabled={isPending}
                    >
                        {translate(es.linkText)}
                    </Link>
                );
            }

            return <Button onClick={handleNextQuestion} isLoading={isPending}>{translate(es.nextButton)}</Button>;
        } else {
            return (
                <Button
                    variant="red"
                    onClick={resolveAnswer}
                    isLoading={isPending}
                    disabled={!selectedOption}
                    aria-disabled={!selectedOption}
                >
                    {translate(es.resolveButton)}
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
                        helpText={translate(es.progressHelpText, {
                            currentQuestion: String(questionCount?.questionsAnswered ?? '-'),
                            questionCount: String(questionCount?.totalQuestions ?? '-'),
                        })}
                        widthValue={
                            questionCount?.questionsAnswered ?? 0
                        }
                        maxValue={questionCount?.totalQuestions ?? 0}
                        color="red"
                    />
                    <TimerCountdown
                        time={settings.timer}
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
                    {translate(es.skipButton)}
                </Button>
                {buttonSwitch()}
            </div>
        </section>
    );
}

export default Quiz;