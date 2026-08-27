import { createRoute, Outlet } from "@tanstack/react-router";
import { Route as ProtectedRoutesLayoutRoute } from "../layout";

export const Route = createRoute({
  getParentRoute: () => ProtectedRoutesLayoutRoute,
  path: "$quizId",
  component: QuizLayout,
});

function QuizLayout() {

  return (
    <Outlet />
  );
}

export default QuizLayout;
