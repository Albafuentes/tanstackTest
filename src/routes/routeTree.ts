import { Route as RootRoute } from "./__root";
import { Route as DashboardRoute } from "./features/protected-routes/dashboard/dashboard.route";
import { Route as QuizRoute } from "./features/protected-routes/session/quiz/quiz.route";
import { Route as QuizLayoutRoute } from "./features/protected-routes/session/layout";
import { Route as ResultsRoute } from "./features/protected-routes/session/results/results.route";
import { Route as LoginRoute } from "./features/login/login.route";
import { Route as ProtectedRoutesLayoutRoute } from "./features/protected-routes/layout";

export const routeTree = RootRoute.addChildren([
    LoginRoute,
    ProtectedRoutesLayoutRoute.addChildren([
        DashboardRoute,
        QuizLayoutRoute.addChildren([QuizRoute, ResultsRoute]),
    ]),
]);