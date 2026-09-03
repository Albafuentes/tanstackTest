// dashboard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Dashboard from "./dashboard.component";
import { mockUseSession, setSessionState } from "@/test/mocks/session.mocks";
import { Route } from "./dashboard.route";
import { mockNavigate, mockUseRouterState } from "@/test/mocks/router.mocks";
import {es} from "./locales/es";

vi.mock("./dashboard.route", () => ({
    Route: {
        useLoaderData: vi.fn(),
    },
}));

vi.mock('@/zunstand/store/session.store', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/zunstand/store/session.store')>();
    return {
        ...actual,
        default: (selector: (state: any) => unknown) => mockUseSession(selector),
    };
});

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

const buildQuiz = (overrides = {}) => ({
    id: "1",
    name: "Historia",
    ...overrides,
});

describe("Dashboard page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(Route.useLoaderData).mockReturnValue({
            quizsData: [buildQuiz()],
        });
        setSessionState({
            history: [],
        });
    });

    it("render the QuizCard when it receives each quiz from the loader", () => {
        vi.mocked(Route.useLoaderData).mockReturnValue({
            quizsData: [buildQuiz({ id: "1" }), buildQuiz({ id: "2" })],
        });
        render(<Dashboard />);

        expect(screen.getAllByTestId(/quiz-card-1/i)).toHaveLength(1);
        expect(screen.getAllByTestId(/quiz-card-2/i)).toHaveLength(1); 
    });

    it("shows the empty list message when there is no history", () => {
        render(<Dashboard />);

        expect(screen.getByText(es.scoresEmptyList)).toBeInTheDocument();
    });

    it("shows the formatted score history when it exists", () => {
        setSessionState({
            history: [{
                quizName: "historia de españa", points: 8,
                quizId: "",
                skippedAnswers: 0,
                createdAt: null,
                isCompleted: false,
                totalQuestions: 0,
                correctQuestions: 0,
                wrongQuestions: 0
            }],
        });

        render(<Dashboard />);

        expect(screen.getByText(/Historia de españa/)).toBeInTheDocument();
        expect(screen.getByText(/8/)).toBeInTheDocument();
    });

    it("does not show the empty list message when there is history", () => {
        setSessionState({
            history: [{
                quizName: "test", points: 5,
                quizId: "",
                skippedAnswers: 0,
                createdAt: null,
                isCompleted: false,
                totalQuestions: 0,
                correctQuestions: 0,
                wrongQuestions: 0
            }],
        });

        render(<Dashboard />);

        expect(screen.queryByText(es.scoresEmptyList)).not.toBeInTheDocument();
    });
});