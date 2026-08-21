import { createRoute, Outlet, redirect } from '@tanstack/react-router'
import { Route as RootRoute } from "../../__root";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/protected",
  component: ProtectedRoutesLayout,
  beforeLoad: ({ location }) => {
  const token = sessionStorage.getItem('token');
  //TODO: add helper function to check if token is valid
  if (!token) {
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