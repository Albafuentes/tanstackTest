// AnimatedRoute.test.tsx
import { setRouterState } from '@/test/mocks/router.mocks'
import { AnimatedRoute } from './AnimatedRoute'
import { render, screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import { mockNavigate, mockUseRouterState } from '@/test/mocks/router.mocks'

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


describe('AnimatedRoute component', () => {
    it('renders children when navigation is idle', () => {
        setRouterState({ status: 'idle' })

        render(
            <AnimatedRoute>
                <p>Content</p>
            </AnimatedRoute>,
        )

        expect(screen.getByTestId('animated-main')).toBeInTheDocument()
    })

    it('does not render children while navigation is pending', () => {
        setRouterState({ status: 'pending' })

        render(
            <AnimatedRoute>
                <p>Content</p>
            </AnimatedRoute>,
        )

        expect(screen.queryByTestId('animated-main')).not.toBeInTheDocument()
    })

    it('applies the "fade" variant when no variant is specified', () => {
        setRouterState({ status: 'idle' })

        render(
            <AnimatedRoute>
                <p>Content</p>
            </AnimatedRoute>,
        )

        expect(screen.getByTestId('animated-main')).toHaveAttribute(
            'data-variant-keys',
            'initial,in,out',
        )
    })
})