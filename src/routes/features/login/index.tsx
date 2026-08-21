import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "../../__root";

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: Login,
});

function Login() {
    return <div>Login Page</div>;
}