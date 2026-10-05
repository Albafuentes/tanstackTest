// settings.test.tsx
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Settings } from "./settings.route";
import { mockUseSession, setSessionState } from "@/test/mocks/session.mocks";
import { es } from "./locales/es";
import { mockNavigate, mockUseRouterState } from "@/test/mocks/router.mocks";


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

vi.mock('@/zunstand/store/session.store', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/zunstand/store/session.store')>();
    return {
        ...actual,
        default: (selector: (state: any) => unknown) => mockUseSession(selector),
    };
});

describe("Settings page", () => {
    const updateSettingsMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        setSessionState({
            updateSettings: updateSettingsMock,
            settings: { timer: "00:00:30", level: 3 },
        });
    });

    it("should show the current settings values preloaded in the form when rendered", () => {
        render(<Settings />);

        expect(screen.getByLabelText(es.timerLabel)).toHaveValue("00:00:30");
        expect(screen.getByLabelText(es.levelLabel)).toHaveValue(3);
    });

    it("calls updateSettings with the form values and navigates to the dashboard when the form is submitted", async () => {
        render(<Settings />);

        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: "Increase value" }));
            fireEvent.click(screen.getByRole("button", { name: es.submitButton }));
        });

        await waitFor(() => {
            expect(updateSettingsMock).toHaveBeenCalledWith("00:01", 3);
        });
        expect(mockNavigate).toHaveBeenCalledWith({ to: "/dashboard" });
    });

    it("navigates to the dashboard even if updateSettings is not available when the form is submitted", async () => {
        setSessionState({
            updateSettings: undefined,
            settings: { timer: "00:02", level: 3 },
        });

        render(<Settings />);

        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: es.submitButton }));
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith({ to: "/dashboard" });
        });
    });

    it("the cancel button is a link that points to /dashboard when rendered", () => {
        render(<Settings />);

        expect(screen.getByRole("link", { name: es.cancelButton })).toHaveAttribute(
            "href",
            "/dashboard",
        );
    });

    it("does not crash (regression) when the settings is undefined", () => {
        setSessionState({
            updateSettings: updateSettingsMock,
            settings: undefined,
        });

        expect(() => render(<Settings />)).not.toThrow();
    });
});