import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "../../../components/Header/Header";
import { Route as RootRoute } from "../../__root";
import { isAuthenticated } from "../../../utils/auth.util";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/protected",
  component: ProtectedRoutesLayout,
  beforeLoad: async ({ location }) => {
    const hasToken = await isAuthenticated();

    if (!hasToken) {
      throw redirect({ to: "/", search: { redirect: location.href } });
    }
  },
});

function ProtectedRoutesLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default ProtectedRoutesLayout;
