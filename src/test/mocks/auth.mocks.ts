import { vi } from 'vitest'
import * as authUtils from '@/utils/auth.utils'

export function createAuthMock() {

    function setDecodedUser(user: { avatarURL?: string; createdAt?: string, sessionName?: string } | null) {
        vi.spyOn(authUtils, 'decodeToken').mockReturnValue(user as any)
    }

    return { setDecodedUser, clearToken: authUtils.clearToken }
}

// Copy and paste this code into your test file to use the auth mock:
// vi.mock('@/utils/auth.utils', () => ({
//     decodeToken: vi.fn(),
//     clearToken: vi.fn(),
// }));