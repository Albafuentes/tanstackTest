import { createRoute, notFound, Outlet, type NotFoundRouteProps } from "@tanstack/react-router";
import { AnimatedRoute } from "../../../components";
import { SidebarProvider } from "../../../components/Sidebar/SidebarProvider";
import { UnauthorizedError } from "../../../utils/errors.utils";
import useSession from "../../../zunstand/store/session.store";
import { Header } from "../../../components/Header/Header";
import { Route as RootRoute } from "../../__root";
import { isAuthenticated } from "../../../utils/auth.utils";
import { Suspense } from "react";
import type { NotFoundRouterData } from "@/types/error.types";
import { Error } from "@/components/Error/Error";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/dashboard",
  component: ProtectedRoutesLayout,
  notFoundComponent: (props: NotFoundRouteProps) => (
    <Error status={(props.data as NotFoundRouterData)?.status ?? 404} />
  ),
  beforeLoad: async () => {
    const hasToken = await isAuthenticated();
    const session = useSession.getState();

    if (!hasToken) {
      console.error(new UnauthorizedError("Unauthorized access. Please provide a valid token."));
      session.resetSession();
      const data: NotFoundRouterData = { status: 501, resource: 'token' }
      throw notFound({ data })
    }
  },
});

function ProtectedRoutesLayout() {
  return (
    <SidebarProvider>
      <Header />
      <Suspense>
        <AnimatedRoute variant="fade">
          <Outlet />
        </AnimatedRoute>
      </Suspense>
    </SidebarProvider>
  );
}

export default ProtectedRoutesLayout;
