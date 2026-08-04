
import { createRoute, notFound } from '@tanstack/react-router'
import { Route as QuizRoute } from "./layout";
import { useQuiz } from './hook';
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
    loader: async () => {
        try {
            const data = await api.quiz.getQuiz();

            if (data && data.length > 0) {

                return data;
            }

        } catch (error) {
            console.error("Error fetching quiz data:", error);
            throw notFound()   // if the data is not found, throw a page error 404

        }
    },

    // staleTime fixed the revalidation of the data, so the loader function is not executed again on the client, and the data is not fetched again.
    // staleTime: 1000 * 60 * 5, // 5 minutes

    // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
    notFoundComponent: () => <NotFound />,

    // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
    pendingComponent: () => <Loader />,
    pendingMs: 1000, // 1 second

    //// the component is rendered while the route is loading, and the user can see a loading state.
    // loaderComponent: () => <div>Loading...</div>, 
});


function Quiz() {
    // const quizRouteApi = Route.useRouteApi("quiz");
    // const {isLoading, data} = quizRouteApi.useLoaderData() can be used here to access the data returned from the loader function
    // or
    const data = Route.useLoaderData() // can be used here to access the data returned from the loader function
    const { getRandomQuestion, currentQuestion, quizStatus, totalQuestions, pendingQuestions } = useQuiz(data);

    return (
        <section id="center">
            {currentQuestion ? <p>{currentQuestion.question}</p> : <p>No question available</p>}
        </section>
    )
}

export default Quiz
