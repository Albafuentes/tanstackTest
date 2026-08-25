
import { createRoute, notFound, useNavigate } from '@tanstack/react-router'
import { Route as QuizRoute } from "../layout";
import NotFound from './not-found';
import Loader from './loader';
import { api } from '../../../../../service/api.service';
import PageTemplateHeader from './components/PageTemplateHeader';
import PageTemplateContent from './components/PageTemplateContent';
import { useQuiz } from './hook';
import { AnimatedRoute as AnimationRoute } from "@/components/AnimationRoute/AnimatedRoute";
import { motion } from 'motion/react';

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "quiz",
    component: Quiz,

    // First on the server and then on the client, it usually doesn't mean it's doing the same job twice for no reason, but is part of the hydration cycle.
    // Navigator - Request /users > Server - Executes loader() - Obtains data - Renders HTML - Sends HTML + data > Client - React hydrates the application - TanStack Router reconstructs the state - Can re-execute the loader.
    // The customer needs to know that the data is still valid.
    // with Vite SPA config the loader function is not executed on the server, but only on the client, so the data is fetched only once.
    // Added try catch if we need to manage te error for example in Sentry o redirect to another page.
    loader: async () => {
        // const questions = await api.quiz.getQuiz();

        // if (questions.length === 0 || !questions) {
        //     throw notFound(); // if the data is not found, the notFound() function is executed, and the user is redirected to the 404 page.
        // }

        // return questions;
    },

    // staleTime fixed the revalidation of the data. The loader function is not executed again on the client, and the data is not fetched again if it does not become stale.
    // staleTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 0,

    // gcTime fixed the garbage collection of the data. The loader function is not executed again on the client, and the data is not fetched again if the user does not navigate away from the page.
    // gcTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 0,

    // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
    notFoundComponent: () => <NotFound />,

    // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
    pendingComponent: () => <Loader />,
    pendingMs: 1000, // 1 second

    // the component is rendered while the route is loading, and the user can see a loading state.
    // loaderComponent: () => <div>Loading...</div>, 
});


function Quiz() {
    // const navigate = useNavigate()
    // const data = Route.useLoaderData() // can be used here to access the data returned from the loader function
    // // const {isFetching} = Route.useMatch()  can be used here to access the data returned from the loader function
    // const { resolveAnswer, selectOption, nextQuestion, currentQuestion, questionCount, selectedOption, isQuizFinished } = useQuiz(data);

    // const handleNextQuestion = () => {
    //     nextQuestion();

    //     if (isQuizFinished) {
    //         navigate({ to: "results" });
    //     }
    // }


    return (
        <motion.section>
            heyyy
            {/* <PageTemplateHeader
                questionCount={questionCount}
                handleResolveAnswer={resolveAnswer}
                isResolvingAnswer={selectedOption?.resolved ?? false}
            />

            <PageTemplateContent
                selectedOption={selectedOption}
                handleNextQuestion={handleNextQuestion}
                currentQuestion={currentQuestion}
                handleResolveAnswer={resolveAnswer}
                handleSelectOption={selectOption}
            /> */}

        </motion.section>
    )
}

export default Quiz
