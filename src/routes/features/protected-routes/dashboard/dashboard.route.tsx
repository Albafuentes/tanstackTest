import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import PendingComponent from './components/pendingComponent.component';
import { Route as ProtectedRoutesLayoutRoute } from '../layout';
import { api } from '@/service/api.service';

const DashboardComponent = lazy(() => import('./components/dashboard.component'));

export const Route = createRoute({
  head: () => ({
    meta: [{
      title: `Dashboard`,
    }]
  }),
  getParentRoute: () => ProtectedRoutesLayoutRoute,
  path: '/',
  component: DashboardComponent,
  loader: async () => {
    try {
      const quizsData = await api.quiz.getQuizs();
      return { quizsData };
    } catch (error) {
      console.error('Error fetching quiz data:', error);
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
  pendingComponent: () => <PendingComponent />,
  // pendingMs: 1000, // 1 second
});


