
import { createRoute } from '@tanstack/react-router'
import { Route as QuizRoute } from "./quiz-layout";

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "results",
    component: Results,
});


function Results() {

    return (
        <section id="center">
        </section>
    )
}

export default Results
