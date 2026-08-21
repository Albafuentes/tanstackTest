import { createRoute, useNavigate } from "@tanstack/react-router";
import { Route as RootRoute } from "../../__root";
import { generateToken } from "../../../utils/auth.util";

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: Login,
});

function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {

        sessionStorage.setItem('token', generateToken({ id: "1", name: "John Doe", email: "john.doe@example.com" }));
        navigate({ to: '/protected' });
    }

    return <button onClick={handleLogin}>Login</button>;
}