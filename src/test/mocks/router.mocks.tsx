// test/mocks/tanstack-router.mock.ts

import { vi } from 'vitest'

export const mockNavigate = vi.fn()
export const mockUseRouterState = vi.fn()

type RouterState = {
    location: { pathname: string }
    status: string
}

export function setRouterState({
    pathname = '/home',
    status = 'idle',
} = {}) {

    const state: RouterState = {
        location: { pathname },
        status,
    }

    mockUseRouterState.mockImplementation(
        (opts?: {
            select?: (state: RouterState) => unknown
        }) =>
            opts?.select
                ? opts.select(state)
                : state,
    )
}


// Copy and paste this code into your test file to use the router mock:
// vi.mock('@tanstack/react-router', () => ({
//     useNavigate: () => mockNavigate,
//     useRouterState: ( opts?: { select?: (state: unknown) => unknown },
//     ) => mockUseRouterState(opts),
//     Link: ({ to,  children, ...props }: {  to: string, children: React.ReactNode }) => (
//         <a href={to} {...props}>
//             {children}
//         </a>
//     ),
// }))