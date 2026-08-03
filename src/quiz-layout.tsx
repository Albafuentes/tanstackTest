import { createRoute, Outlet } from '@tanstack/react-router'
import { Route as RootRoute } from "./routes/__root";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "quiz",
  component: QuizLayout,
});

function QuizLayout() {
  return <Outlet />
}

export default QuizLayout