import { Route as RootRoute } from "./__root";
import { Route as DashboardRoute } from "./features/dashboard";
import { Route as QuizRoute } from "./features/quiz";
import { Route as QuizLayoutRoute } from "./features/quiz/layout";
import { Route as ResultsRoute } from "./features/quiz/results";
import { Route as LoginRoute } from "./features/login";

export const routeTree = RootRoute.addChildren([
    LoginRoute,
    DashboardRoute,
    QuizLayoutRoute.addChildren([QuizRoute, ResultsRoute]),
]);