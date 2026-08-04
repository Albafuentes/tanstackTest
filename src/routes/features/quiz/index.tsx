
import { createRoute, notFound, useNavigate } from '@tanstack/react-router'
import { Route as QuizRoute } from "./layout";
import { QuizStatus, useQuiz } from './hook';
import NotFound from './not-found';
import Loader from './loader';
import { api } from '../../../service/api.service';

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "/",
    component: Quiz,

    // First on the server and then on the client, it usually doesn't mean it's doing the same job twice for no reason, but is part of the hydration cycle.
    // Navigator - Request /users > Server - Executes loader() - Obtains data - Renders HTML - Sends HTML + data > Client - React hydrates the application - TanStack Router reconstructs the state - Can re-execute the loader.
    // The customer needs to know that the data is still valid.
    // with Vite SPA config the loader function is not executed on the server, but only on the client, so the data is fetched only once.
    // Added try catch if we need to manage te error for example in Sentry o redirect to another page.
    loader: async () => {
        const questions = await api.quiz.getQuiz();

        if (questions.length === 0 || !questions) {
            throw notFound(); // if the data is not found, the notFound() function is executed, and the user is redirected to the 404 page.
        }

        return questions;
    },

    // staleTime fixed the revalidation of the data, so the loader function is not executed again on the client, and the data is not fetched again.
    // staleTime: 1000 * 60 * 5, // 5 minutes

    // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
    notFoundComponent: () => <NotFound />,

    // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
    pendingComponent: () => <Loader />,
    pendingMs: 1000, // 1 second

    // the component is rendered while the route is loading, and the user can see a loading state.
    // loaderComponent: () => <div>Loading...</div>, 
});


function Quiz() {

    const data = Route.useLoaderData() // can be used here to access the data returned from the loader function
    const { getRandomQuestion, currentQuestion, quizStatus, totalQuestions, pendingQuestions } = useQuiz(data);
    const navigate = useNavigate()

    const handleNextQuestion = async() => {

        await getRandomQuestion();

        if (quizStatus === QuizStatus.FINISHED) {
            navigate({ to: "results" });
        }
    }

    return (
        <section id="center">
            <p>Question {pendingQuestions}/{totalQuestions}</p>
            {currentQuestion ? <p>{currentQuestion.question}</p> : <p>No question available</p>}
            <button type='button' onClick={handleNextQuestion}>Next Question</button>
        </section>
    )
}

export default Quiz
