// QuizCard.test.tsx
import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { mockNavigate, mockUseRouterState } from "@/test/mocks/router.mocks";
import { QuizCard } from "./QuizCard";
import type { QuizModel } from "@/types/quiz.types";

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

const buildQuiz = (overrides: Partial<QuizModel.Quiz> = {}): QuizModel.Quiz => ({
    id: "1",
    name: "historia de españa",
    extraPoints: 5,
    questions: 10,
    quizQuestions: [],
    ...overrides,
});

describe("QuizCard", () => {
    it("render the quiz name formatted when it is provided and it is rendered", () => {
        render(<QuizCard quiz={buildQuiz({ name: "historia de españa" })} />);

        expect(screen.getByText("Historia de españa")).toBeInTheDocument();
    });

    it("shows the number of questions when it is rendered", () => {
        render(<QuizCard quiz={buildQuiz({ questions: 12 })} />);

        expect(screen.getByText(/12/)).toBeInTheDocument();
    });

    it("shows the extra points in the badge when it is rendered", () => {
        render(<QuizCard quiz={buildQuiz({ extraPoints: 7 })} />);

        expect(screen.getByText("7")).toBeInTheDocument();
    });

    it("the link points to the corresponding quiz route when it is rendered", () => {
        render(<QuizCard quiz={buildQuiz({ id: "42" })} />);

        expect(screen.getByRole("link")).toHaveAttribute("href", "/dashboard/$quizId/");
    });

    it("the link is disabled when disabled is true", async () => {
        render(<QuizCard quiz={buildQuiz()} disabled />);

        await act(async () => {
            await fireEvent.click(screen.getByRole("link"));
        });

        expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
        expect(mockNavigate).not.toHaveBeenCalledWith({ to: "/dashboard/$quizId/" });
    });

    it("the link is not disabled when it is not explicitly set to disabled and it is rendered", () => {
        render(<QuizCard quiz={buildQuiz()} />);

        expect(screen.getByRole("link")).not.toHaveAttribute("aria-disabled", "true");
    });
});