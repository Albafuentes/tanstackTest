// login.test.tsx
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "@/service/api.service";
import { Login } from "./login.route";
import { es } from "./locales/es";
import { mockNavigate, mockUseRouterState } from "@/test/mocks/router.mocks";

// Mockeamos solo los boundaries externos
vi.mock("@/service/api.service", () => ({
    api: {
        auth: {
            login: vi.fn(),
        },
    },
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@tanstack/react-router")>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useRouterState: (opts?: { select?: (state: unknown) => unknown },
        ) => mockUseRouterState(opts),
        Link: ({ to, children, ...props }: { to: string, children: React.ReactNode }) => (
            <a href={to} {...props}>
                {children}
            </a>
        ),
    };
});

describe("Login page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sessionStorage.clear();
    });

    it("should show validation errors when submitting the empty form", async () => {
        render(<Login />);

        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: es.submitButton }));
        });

        expect(await screen.findAllByText(es.stringVerificationNotValueError)).not.toHaveLength(0);
        expect(api.auth.login).not.toHaveBeenCalled();
    });

    it("should save the token and navigate to the dashboard if the login is successful", async () => {
        vi.mocked(api.auth.login).mockResolvedValue({ token: "fake-token" });
        render(<Login />);
        await act(async () => {
            fireEvent.change(screen.getByLabelText(es.sessionNameLabel), { target: { value: "Test Session" } });
            fireEvent.click(screen.getByRole("button", { name: es.submitButton }));
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith({ to: "/dashboard" });
        });
        expect(sessionStorage.getItem("token")).toBe("fake-token");
    });

    it("should show a generic error if the login fails", async () => {
        vi.mocked(api.auth.login).mockResolvedValue("" as any);
        render(<Login />);
        await act(async () => {
            fireEvent.change(screen.getByLabelText(es.sessionNameLabel), { target: { value: "Test Session" } });
            fireEvent.click(screen.getByRole("button", { name: es.submitButton }));
        });

        expect(await screen.findAllByText(es.loginActionError)).not.toHaveLength(0);
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});