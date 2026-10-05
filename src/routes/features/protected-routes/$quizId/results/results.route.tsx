
import { createRoute, notFound, type NotFoundRouteProps } from '@tanstack/react-router'
import { Route as QuizRoute } from "../layout";
import { lazy } from 'react';
import useSession from '@/zunstand/store/session.store';
import type { NotFoundRouterData } from '@/types/error.types';
import { Error } from '@/components/Error/Error';
import PendingComponent from './components/pendingComponent.component';

const ResultsComponent = lazy(() => import('./components/results.component'));

export const Route = createRoute({
    head: (ctx) => ({
        meta: [{
            title: `Quiz-${ctx.params.quizId}-Results`,
        }]
    }),
    getParentRoute: () => QuizRoute,
    path: "/results",
    component: ResultsComponent,
    loader: ({ params }) => {
        const history = useSession.getState().history;

        const result = history.find((item) => item.quizId === params.quizId);

        if (!result) {
            console.error(`Error fetching history by quizId: ${params.quizId}`);
            const data: NotFoundRouterData = { status: 404, resource: 'history.params.quizId' }
            throw notFound({ data })
        }

        return result;
    },

    // staleTime fixed the revalidation of the data. The loader function is not executed again on the client, and the data is not fetched again if it does not become stale.
    // staleTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 0,

    // gcTime fixed the garbage collection of the data. The loader function is not executed again on the client, and the data is not fetched again if the user does not navigate away from the page.
    // gcTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 0,

    // page error 404, the page is not found, the component is rendered, and the user can navigate to another page.
    notFoundComponent: (props: NotFoundRouteProps) => <Error status={(props.data as NotFoundRouterData)?.status ?? 404} />,

    // the component is rendered while the navigator is pending a few minutes. It works with pendingMs and only appears to after the time specified in pendingMs. It is useful for long loading times, and the user can see a loading state.
    pendingComponent: () => <PendingComponent />
    // pendingMs: 1000, // 1 second
});
