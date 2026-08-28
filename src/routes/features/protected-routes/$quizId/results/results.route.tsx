
import { createRoute, } from '@tanstack/react-router'
import { Route as QuizRoute } from "../layout";
import { lazy } from 'react';

const ResultsComponent = lazy(() => import('./results.component'));

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "/results",
    component: ResultsComponent,

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
    // pendingMs: 1000, // 1 second
});


