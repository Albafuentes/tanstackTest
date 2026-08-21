import { Route as RootRoute } from "./__root";
import { Route as DashboardRoute } from "./features/protected-routes/dashboard";
import { Route as QuizRoute } from "./features/protected-routes/quiz";
import { Route as QuizLayoutRoute } from "./features/protected-routes/quiz/layout";
import { Route as ResultsRoute } from "./features/protected-routes/quiz/results";
import { Route as LoginRoute } from "./features/login";
import { Route as ProtectedRoutesLayoutRoute } from "./features/protected-routes/layout";

export const routeTree = RootRoute.addChildren([
    LoginRoute,
    ProtectedRoutesLayoutRoute.addChildren([
        DashboardRoute,
        QuizLayoutRoute.addChildren([QuizRoute, ResultsRoute]),
    ]),
]);