import { Route as RootRoute } from "./__root";
import { Route as DashboardRoute } from "./features/protected-routes/dashboard/dashboard.route";
import { Route as QuizRoute } from "./features/protected-routes/$quizId/quiz/quiz.route";
import { Route as QuizLayoutRoute } from "./features/protected-routes/$quizId/layout";
import { Route as ResultsRoute } from "./features/protected-routes/$quizId/results/results.route";
import { Route as LoginRoute } from "./features/login/login.route";
import { Route as ProtectedRoutesLayoutRoute } from "./features/protected-routes/layout";

export const routeTree = RootRoute.addChildren([
    LoginRoute,
    ProtectedRoutesLayoutRoute.addChildren([
        DashboardRoute,
        QuizLayoutRoute.addChildren([QuizRoute, ResultsRoute]),
    ]),
]);