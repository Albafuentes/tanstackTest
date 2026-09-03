// quiz.test.tsx
import { render, screen, act, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Quiz from "./quiz.component";
import { Route } from "./quiz.route";
import { mockUseSession, setSessionState } from "@/test/mocks/session.mocks";
import { es } from "./locales/es";
import { mockNavigate, mockUseRouterState } from "@/test/mocks/router.mocks";


vi.mock("./quiz.route", () => ({
    Route: { useLoaderData: vi.fn() },
}));

vi.mock('@/zunstand/store/session.store', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/zunstand/store/session.store')>();
    return {
        ...actual,
        default: (selector: (state: any) => unknown) => mockUseSession(selector),
    };
});

vi.mock("./components/TimerCountdown/TimerCountdown", () => ({
    default: ({ onFinish }: { onFinish: () => void }) => (
        <button data-testid="mock-timer-finish" onClick={onFinish}>
            mock timer
        </button>
    ),
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

const buildQuizData = () => ({
    id: "quiz-1",
    name: "historia de españa",
    quizQuestions: [
        {
            level: 1 as const,
            question: "In which year did the Reconquista end?",
            options: ["1492", "1500", "1400"],
            answer: 0,
            explanation: "In 1492 the Reconquista ended.",
        },
        {
            level: 1 as const,
            question: "Who was Isabella I of Castile?",
            options: ["Queen of Castile", "Queen of France", "Queen of Portugal"],
            answer: 0,
            explanation: "She was the Queen of Castile.",
        },
    ],
});

async function answerQuestion(tagIndex: number, nextQuestion: boolean = false) {
    const tag = screen.getByTestId(`tag-answer-${tagIndex}`);

    await act(async () => {
        await fireEvent.click(tag);
        await fireEvent.click(screen.getByRole("button", { name: es.resolveButton }));
        if (nextQuestion) {
            await fireEvent.click(screen.getByRole("button", { name: es.nextButton }));
        }
    });

}

describe("Quiz page", () => {
    beforeEach(() => {
        vi.spyOn(Math, "random").mockReturnValue(0);
        vi.useFakeTimers();
        vi.clearAllMocks();
        setSessionState({ settings: { timer: "00:01", level: 1 } });
        vi.mocked(Route.useLoaderData).mockReturnValue(buildQuizData());

    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
        cleanup();
    });

    it("should show the first question filtered when the level in settings", () => {
        render(<Quiz />);

        expect(screen.getByText("In which year did the Reconquista end?")).toBeInTheDocument();
    });

    it("the resolve button is disabled when the option is not selected", () => {
        render(<Quiz />);

        expect(screen.getByRole("button", { name: es.resolveButton })).toHaveAttribute("aria-disabled", "true");
    });

    it("allows selecting an answer and enables the resolve button when an option is selected", async () => {

        render(<Quiz />);

        const tag = screen.getByTestId('tag-answer-0');

        await act(async () => {
            await fireEvent.click(tag);

        });

        expect(screen.getByRole("button", { name: es.resolveButton })).toBeEnabled();
    });

    it("shows the explanation when resolving the question", async () => {
        render(<Quiz />);

        await answerQuestion(1);

        expect(screen.getByText("In 1492 the Reconquista ended.")).toBeInTheDocument();
    });

    it("advances to the next question when clicking 'next'", async () => {

        render(<Quiz />);

        await answerQuestion(1, true);

        expect(screen.getByText("Who was Isabella I of Castile?")).toBeInTheDocument();
    });

    it("shows the link to view results when the last question is resolved", async () => {

        render(<Quiz />);

        // Pregunta 1
        await answerQuestion(0, true);

        // Pregunta 2 (última)
        await answerQuestion(1);

        const link = screen.getByRole("link", { name: es.linkText });
        expect(link).toHaveAttribute("href", "/dashboard/$quizId/results");
    });

    it("invokes skipAnswer and advances without resolving when clicking skip on a question", async () => {
        render(<Quiz />);

        await act(async () => {
            await fireEvent.click(screen.getByRole("button", { name: es.skipButton }));
        });

        expect(screen.getByText("Who was Isabella I of Castile?")).toBeInTheDocument();
    });

    it("automatically skips the question when the timer reaches zero", async () => {
        render(<Quiz />);

        // TimerCountdown is mocked because affects the test timing. When clicking the mock button, it simulates the timer reaching zero and invokes the onFinish callback.
        await act(async () => {
            await fireEvent.click(screen.getByTestId("mock-timer-finish"));
        });

        expect(screen.getByText("Who was Isabella I of Castile?")).toBeInTheDocument();
    });

    it("only shows questions when the level configured in settings matches the question level", () => {
        setSessionState({ settings: { timer: "00:01", level: 2 } });

        render(<Quiz />);

        // Ninguna pregunta es de nivel 2 en el mock de datos
        expect(screen.queryByText(/reconquista/i)).not.toBeInTheDocument();
    });

    it("does not show 'undefined' in the progress when questionCount is not ready yet", () => {
        render(<Quiz />);
        expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
    });
});