import { createRoute, Outlet, redirect } from '@tanstack/react-router'
import { Route as RootRoute } from "../../__root";
import { getToken, isAuthenticated } from "../../../utils/auth.util";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/protected",
  component: ProtectedRoutesLayout,
  beforeLoad: ({ location }) => {
    const hasToken = isAuthenticated();
    if (!hasToken) {
      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  }
})

function ProtectedRoutesLayout() {
  return (
    <Outlet />
  )
}

export default ProtectedRoutesLayout