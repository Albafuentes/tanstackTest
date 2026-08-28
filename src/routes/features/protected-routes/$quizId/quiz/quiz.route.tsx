import { api } from '../../../../../service/api.service';
import { createRoute } from '@tanstack/react-router';
import { Route as QuizLayoutRoute } from '../layout';

import type { QuizModel } from '@/types/quiz.types';

import { lazy } from 'react';

const QuizComponent = lazy(() => import('./quiz.component'));

export const Route = createRoute({
    getParentRoute: () => QuizLayoutRoute,
    path: '/',
    component: QuizComponent,

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


