import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider } from "../../../components/Sidebar/SidebarProvider";
import { UnauthorizedError } from "../../../utils/errors.utils";
import useSession from "../../../zunstand/session";
import { Header } from "../../../components/Header/Header";
import { Route as RootRoute } from "../../__root";
import { decodeToken, isAuthenticated } from "../../../utils/auth.util";
import { AnimatedRoute } from "@/components/AnimationRoute/AnimatedRoute";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard",
  component: ProtectedRoutesLayout,
  beforeLoad: async ({ location }) => {
    const hasToken = await isAuthenticated();
    const session = useSession.getState();

    if (!hasToken) {
      console.error(new UnauthorizedError("Unauthorized access. Please provide a valid token."));
      session.resetSession();
      throw redirect({ to: "/", search: { redirect: location.href } });
    }

    if (!session.identity.user) {
      const user = decodeToken();
      session.setUser(user?.email || "Unknown User");
    }
  },
});

function ProtectedRoutesLayout() {
  return (
    <SidebarProvider>
      <Header />
      <Outlet />
    </SidebarProvider>
  );
}

export default ProtectedRoutesLayout;
