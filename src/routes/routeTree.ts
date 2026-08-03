import { Route as RootRoute } from "./__root";
import { Route as InitRoute } from "../init";
import { Route as QuizRoute } from "../quiz";
import { Route as QuizLayoutRoute } from "../quiz-layout";
import { Route as ResultsRoute } from "../results";

export const routeTree = RootRoute.addChildren([
    InitRoute,
    QuizLayoutRoute.addChildren([QuizRoute, ResultsRoute]),
]);