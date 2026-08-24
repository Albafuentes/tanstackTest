import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { UnauthorizedError } from "../../../utils/errors.utils";
import useSession from "../../../zunstand/session";
import { Header } from "../../../components/Header/Header";
import { Route as RootRoute } from "../../__root";
import { isAuthenticated } from "../../../utils/auth.util";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/protected",
  component: ProtectedRoutesLayout,
  beforeLoad: async ({ location }) => {
    const hasToken = await isAuthenticated();
    const session = useSession.getState();

    if (!hasToken) {
      console.error(new UnauthorizedError("Unauthorized access. Please provide a valid token."));
      session.resetSession();
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
