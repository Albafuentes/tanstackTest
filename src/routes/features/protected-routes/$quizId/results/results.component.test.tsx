// results.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Results from './results.component'
import { es } from './locales/es'
import { mockUseSession, setSessionState } from '@/test/mocks/session.mocks'
import { ABBREVIATION_PT } from '@/config/constants'
import type { HistoryState } from '@/zunstand/store/session.store'
import { mockNavigate, mockUseRouterState } from '@/test/mocks/router.mocks'

const mockUseParams = vi.fn()

vi.mock('./results.route', () => ({
    Route: { useParams: () => mockUseParams() },
}))

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

const buildHistoryEntry = (overrides: Partial<HistoryState> = {}): HistoryState => ({
    quizId: 'quiz-1',
    quizName: 'General History',
    points: 20,
    skippedAnswers: 1,
    createdAt: null,
    isCompleted: true,
    totalQuestions: 3,
    correctQuestions: 2,
    wrongQuestions: 0,
    ...overrides,
})

describe('Results component', () => {
    it('shows the error message and a link to the dashboard when there is no matching result', () => {
        mockUseParams.mockReturnValue({ quizId: 'unknown-id' })
        setSessionState({ history: [] })

        render(<Results />)

        expect(screen.getByText(es.errorMessage)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: es.linkText })).toHaveAttribute('href', '/dashboard')
    })

    it('renders the title, score and progress when the quizId matches a history entry', () => {
        mockUseParams.mockReturnValue({ quizId: 'quiz-1' })
        setSessionState({ history: [buildHistoryEntry()] })

        render(<Results />)

        expect(screen.getByText(es.title)).toBeInTheDocument()
        expect(screen.getByText(`+ 20 ${ABBREVIATION_PT}`)).toBeInTheDocument()
        expect(screen.getByText(`20 ${ABBREVIATION_PT}`)).toBeInTheDocument()
    })

    it('renders the correct, wrong and skipped badges with their counts when there are results', () => {
        mockUseParams.mockReturnValue({ quizId: 'quiz-1' })
        setSessionState({
            history: [buildHistoryEntry({ correctQuestions: 2, wrongQuestions: 1, skippedAnswers: 3 })],
        })

        render(<Results />)

        expect(screen.getByText(es.correctBadge)).toBeInTheDocument()
        expect(screen.getByText(es.wrongBadge)).toBeInTheDocument()
        expect(screen.getByText(es.skipsBadge)).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('The link to the dashboard is displayed when there are results.', () => {
        mockUseParams.mockReturnValue({ quizId: 'quiz-1' })
        setSessionState({ history: [buildHistoryEntry()] })

        render(<Results />)

        expect(screen.getByRole('link', { name: es.linkText })).toHaveAttribute('href', '/dashboard')
    })

    it('Find the result that matches the current quizId when there are multiple history entries.', () => {
        mockUseParams.mockReturnValue({ quizId: 'quiz-2' })
        setSessionState({
            history: [
                buildHistoryEntry({ quizId: 'quiz-1', points: 10 }),
                buildHistoryEntry({ quizId: 'quiz-2', points: 30 }),
            ],
        })

        render(<Results />)

        expect(screen.getByText(`+ 30 ${ABBREVIATION_PT}`)).toBeInTheDocument()
    })
})