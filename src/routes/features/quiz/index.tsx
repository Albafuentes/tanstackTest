
import { createRoute } from '@tanstack/react-router'
import { Route as QuizRoute } from "./layout";

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "/",
    component: Quiz,

    // First on the server and then on the client, it usually doesn't mean it's doing the same job twice for no reason, but is part of the hydration cycle.
    // Navigator - Request /users > Server - Executes loader() - Obtains data - Renders HTML - Sends HTML + data > Client - React hydrates the application - TanStack Router reconstructs the state - Can re-execute the loader.
    // The customer needs to know that the data is still valid.
    // with Vite SPA config the loader function is not executed on the server, but only on the client, so the data is fetched only once.
    // loader: async () => {
    // const { isLoading, data } = await fetchQuizData();
    // if (!data) { throw notFound() } // if the data is not found, throw a page error 404
    // return { isLoading, data };
    // }

    // staleTime fixed the revalidation of the data, so the loader function is not executed again on the client, and the data is not fetched again.
    // staleTime: 1000 * 60 * 5, // 5 minutes

    // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
    // notFoundComponent: () => <div>Quiz not found</div>,

    // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
    // pendingComponent: () => <div>Loading...</div>, 

    //// the component is rendered while the route is loading, and the user can see a loading state.
    // loaderComponent: () => <div>Loading...</div>, 
});


function Quiz() {


    // const quizRouteApi = Route.useRouteApi("quiz");
    // const {isLoading, data} = quizRouteApi.useLoaderData() can be used here to access the data returned from the loader function
    // or
    // const {isLoading, data} = Route.useLoaderData() can be used here to access the data returned from the loader function


    return (
        <section id="center">
            heeyyyy
        </section>
    )
}

export default Quiz
