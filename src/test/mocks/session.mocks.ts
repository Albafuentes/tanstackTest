import { vi } from 'vitest'
import type { SessionState } from '@/zunstand/store/session.store'

export const mockUseSession = vi.fn()

export const mockSessionState: SessionState = {
    settings: {
        timer: '00:30',
        level: 1,
    },
    history: [],
    resetSession: vi.fn(),
    updateSettings: vi.fn(),
    updateHistory: vi.fn(),
}

export function setSessionState(state: Partial<SessionState>) {
    const fullState = { ...mockSessionState, ...state }
    mockUseSession.mockImplementation((selector: (s: SessionState) => unknown) =>
        selector(fullState),
    )
}

// Copy and paste this code into your test file to use the session mock:
// vi.mock('@/zunstand/store/session.store', () => ({
//     default: (selector: (state: any) => unknown) => mockUseSession(selector),
// }))