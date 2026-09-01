// Header.test.tsx
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { Header } from './Header';
import { mockNavigate, mockUseRouterState, setRouterState } from '@/test/mocks/router.mocks';
import { createAuthMock } from '@/test/mocks/auth.mocks';
import { es } from './locales/es';
import { totalScore } from '@/utils/score.utils';
import { ABBREVIATION_PT } from '@/config/constants';
import { mockUseSession } from '@/test/mocks/session.mocks';

vi.mock('@tanstack/react-router', () => ({
    useNavigate: () => mockNavigate,
    useRouterState: (opts?: { select?: (state: unknown) => unknown },
    ) => mockUseRouterState(opts),
    Link: ({ to, children, ...props }: { to: string, children: React.ReactNode }) => (
        <a href={to} {...props}>
            {children}
        </a>
    ),
}))

vi.mock('@/zunstand/store/session.store', () => ({
    default: (selector: (state: any) => unknown) => mockUseSession(selector),
}))

vi.mock('@/utils/formats.utils', () => ({
    formatDate: vi.fn(),
    formatSentenceString: vi.fn(),
    secondsToTime: vi.fn(),
    timeToSeconds: vi.fn(),
}));

vi.mock('@/utils/auth.utils', () => ({
    decodeToken: vi.fn(),
    clearToken: vi.fn(),
}));

vi.mock('@/components', () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
}));

vi.mock('../Sidebar', () => {
    const Sidebar = ({ children }: any) => (
        <div data-testid="sidebar">{children}</div>
    );
    Sidebar.Trigger = ({ children, ...props }: any) => (
        <button data-testid="sidebar-trigger" {...props}>
            {children}
        </button>
    );
    Sidebar.Item = ({ children, readonly, withSeparator, ...props }: any) => (
        <div
            data-testid="sidebar-item"
            data-readonly={readonly ? 'true' : 'false'}
            data-with-separator={withSeparator ? 'true' : 'false'}
            {...props}
        >
            {children}
        </div>
    );
    Sidebar.Footer = ({ children }: any) => (
        <div data-testid="sidebar-footer">{children}</div>
    );
    return { Sidebar };
});

vi.mock('@/utils/score.utils', () => ({
    totalScore: vi.fn(),
}));

const { setDecodedUser, clearToken } = createAuthMock();

beforeEach(() => {
    vi.clearAllMocks();
    setDecodedUser(null);
    setRouterState({ pathname: '/other-route' });
});

describe('Header component', () => {
    describe('sidebar visibility', () => {
        it('does not render the sidebar when the route is neither dashboard nor settings', () => {
            setRouterState({ pathname: '/other-route', status: 'idle' });
            render(<Header />);

            expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
        });

        it('does not render the sidebar on nested dashboard routes that are not "/settings"', () => {
            setRouterState({ pathname: '/dashboard/other', status: 'idle' });
            render(<Header />);

            expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
        });

        it.each([['/dashboard'], ['/dashboard/settings']])(
            'renders the sidebar when the route is "%s"',
            (pathname) => {
                setRouterState({ pathname, status: 'idle' });
                render(<Header />);

                expect(screen.getByTestId('sidebar')).toBeInTheDocument();
            },
        );
    });

    describe('avatar', () => {
        it('uses the fallback logo when there is no logged-in user', () => {
            setRouterState({ pathname: '/dashboard', status: 'idle' })
            setDecodedUser(null)
            render(<Header />)

            const avatars = screen.getAllByAltText('User')
            expect(avatars[0]).toBeInTheDocument()
        })

        it("uses the user's avatarURL when a user is logged in", () => {
            setRouterState({ pathname: '/dashboard', status: 'idle' })
            setDecodedUser({ avatarURL: 'src/assets/svg/ch-red.svg' })
            render(<Header />)

            const avatars = screen.getAllByAltText('User')
            expect(avatars[0]).toHaveAttribute('src', expect.stringContaining('ch-red'))
        })
    })

    describe('sidebar first item', () => {
        it('Has a data-readonly attribute and is marked as readonly when it is rendered', () => {
            setRouterState({ pathname: '/dashboard', status: 'idle' })
            render(<Header />)

            const items = screen.getAllByTestId('sidebar-item')
            expect(items[0]).toHaveAttribute('data-readonly', 'true')
        })

        it('renders the user name and formatted session date when it is rendered', () => {
            setRouterState({ pathname: '/dashboard', status: 'idle' })
            setDecodedUser({ createdAt: '2026-01-01T00:00:00.000Z' })
            render(<Header />)

            expect(screen.getByText(es.userNameItemSidebar)).toBeInTheDocument()
            expect(screen.getByText(es.sessionItemSidebar)).toBeInTheDocument()
        })
    })

    describe('sidebar list items', () => {
        it('renders a link pointing to "/dashboard/settings" when it is rendered', () => {
            setRouterState({ pathname: '/dashboard', status: 'idle' })
            render(<Header />)

            const link = screen.getByRole('link', { name: new RegExp(es.linkText) })
            expect(link).toHaveAttribute('href', '/dashboard/settings')
        })
    })

    describe('logout', () => {
        it('clears the token and navigates to "/" when the logout button is clicked', async () => {

            setRouterState({ pathname: '/dashboard', status: 'idle' })
            render(<Header />)

            await act(async () => {
                await fireEvent.click(screen.getByText(es.logoutButton))
            })

            expect(clearToken).toHaveBeenCalledTimes(1)
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/' })
        })
    })

    // TODO: review the score pill tests, they are not working as expected
    describe('score pill', () => {

        it('always renders the score regardless of the current route when it is rendered', () => {
            setRouterState({ pathname: '/other-route', status: 'idle' })
            vi.mocked(totalScore).mockReturnValue(99)
            render(<Header />)

            expect(screen.getByText(`99 ${ABBREVIATION_PT}`)).toBeInTheDocument()
        })

        it('always computes the score from session history when it is rendered', () => {
            setRouterState({ pathname: '/dashboard', status: 'idle' })

            render(<Header />)

            expect(screen.getByText(`99 ${ABBREVIATION_PT}`)).toBeInTheDocument()
        })

        it('falls back to an empty array when history is undefined', () => {
            setRouterState({ pathname: '/dashboard', status: 'idle' })

            render(<Header />)

            expect(totalScore).toHaveBeenCalledWith([])
        })
    })
});
