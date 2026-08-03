
import { createRoute } from '@tanstack/react-router'
import { Route as QuizRoute } from "./quiz-layout";

export const Route = createRoute({
    getParentRoute: () => QuizRoute,
    path: "/",
    component: Quiz,
});


function Quiz() {

    return (
        <section id="center">
            heeyyyy
        </section>
    )
}

export default Quiz
