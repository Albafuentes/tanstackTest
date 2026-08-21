import { createRoute, useNavigate } from "@tanstack/react-router";
import { Route as RootRoute } from "../../__root";

export const Route = createRoute({
    getParentRoute: () => RootRoute,
    path: "/",
    component: Login,
});

function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const token = 'mi-token-obtenido'; // desde API
        sessionStorage.setItem('token', token);
        navigate({ to: '/protected' });
    }

    return <button onClick={handleLogin}>Login</button>;
}