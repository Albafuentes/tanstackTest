import { Route as QuizRoute } from "../layout";
import { api } from "../../../../../service/api.service";

import { createRoute, useNavigate } from "@tanstack/react-router";
import { useQuiz } from "./hook";
import type { QuizModel } from "@/types/quiz.types";
import { formatSentenceString } from "@/utils/formats";
import styles from "./quiz.module.css";
import { Progress } from "@/components/index";
import TimerCountdown from "./components/TimerCountdown/TimerCountdown";
import useSession from "@/zunstand/session";
import { TagAnswer } from "./components/TagAnswer/TagAnswer";
import { AnimatedRoute, Button } from "@/components";

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "quiz",
    component: Quiz,

    // First on the server and then on the client, it usually doesn't mean it's doing the same job twice for no reason, but is part of the hydration cycle.
    // Navigator - Request /users > Server - Executes loader() - Obtains data - Renders HTML - Sends HTML + data > Client - React hydrates the application - TanStack Router reconstructs the state - Can re-execute the loader.
    // The customer needs to know that the data is still valid.
    // with Vite SPA config the loader function is not executed on the server, but only on the client, so the data is fetched only once.
    // Added try catch if we need to manage te error for example in Sentry o redirect to another page.

    loader: async ({ params }) => {
        try {
            const response: QuizModel.Quiz = await api.quiz.getQuizById(
                params.quizId,
            );
            return response;
        } catch (error) {
            console.error(`Error fetching quiz ${params.quizId}:`, error);
            return { quizsData: [] };
        }
    },

    // staleTime fixed the revalidation of the data. The loader function is not executed again on the client, and the data is not fetched again if it does not become stale.
    // staleTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 0,

    // gcTime fixed the garbage collection of the data. The loader function is not executed again on the client, and the data is not fetched again if the user does not navigate away from the page.
    // gcTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 0,

    // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
    notFoundComponent: () => <>not found...</>,

    // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
    pendingComponent: () => <>Loading...</>,
    //pendingMs: 1000, // 1 second

    // the component is rendered while the route is loading, and the user can see a loading state.
    // loaderComponent: () => <div>Loading...</div>,
});

function Quiz() {
    const navigate = useNavigate();

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
        currentQuestion,
        questionCount,
        selectedOption,
        isQuizFinished,
    } = useQuiz(dataWithLevel, { id: data.id, name: data.name });

    // const {isFetching} = Route.useMatch()  can be used here to access the data returned from the loader function

    const handleNextQuestion = () => {
        nextQuestion();
    };

    const handleFinishQuiz = () => {
        finishedQuiz();
        navigate({ to: "results" });
    };

    return (
        <AnimatedRoute variant="slideUp">
            <section className={styles["quiz"]}>
                <div className={styles["quiz__header"]}>
                    <h4>{formatSentenceString(data.name)}</h4>
                    <div className={styles["quiz__header-timer"]}>
                        <Progress
                            helpText={`${questionCount?.questionsAnswered ?? "-"} of ${questionCount?.totalQuestions ?? "-"}`}
                            widthValue={((questionCount?.questionsAnswered ?? 0) / (questionCount?.totalQuestions ?? 0)) * 100}
                            maxValue={questionCount?.totalQuestions ?? 0}
                            color="red"
                        />
                        <TimerCountdown seconds={session.settings.timer} />
                    </div>
                </div>

                <div className={styles["quiz__body"]}>
                    <h6>{currentQuestion?.question}</h6>
                    <div className={styles["quiz__body__list-answers"]}>
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
                <div className={styles["quiz__footer"]}>
                    <Button variant="outline-black" onClick={skipAnswer}>
                        Skip
                    </Button>
                    {selectedOption?.resolved ? (
                        <Button onClick={handleNextQuestion}>Next Question</Button>
                    ) : isQuizFinished ? (
                        <Button onClick={handleFinishQuiz} disabled={!selectedOption}>
                            Finish Quiz
                        </Button>
                    ) : (
                        <Button
                            variant="red"
                            onClick={resolveAnswer}
                            disabled={!selectedOption}
                        >
                            Resolve
                        </Button>
                    )}
                </div>
            </section>
        </AnimatedRoute>
    );
}

export default Quiz;
