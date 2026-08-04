import { Route as RootRoute } from "./__root";
import { Route as InitRoute } from "./features/init";
import { Route as QuizRoute } from "./features/quiz";
import { Route as QuizLayoutRoute } from "./features/quiz/layout";
import { Route as ResultsRoute } from "./features/quiz/results";

export const routeTree = RootRoute.addChildren([
    InitRoute,
    QuizLayoutRoute.addChildren([QuizRoute, ResultsRoute]),
]);