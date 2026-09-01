import * as formatsUtils from '@/utils/formats.utils'
import { vi } from 'vitest'

export function createFormatsMock() {

    function setFormatDate(returnValue: string) {
        return vi.spyOn(formatsUtils, 'formatDate').mockReturnValue(returnValue)
    }

    function setSecondsToTime(returnValue: string) {
        return vi.spyOn(formatsUtils, 'secondsToTime').mockReturnValue(returnValue)
    }

    function setTimeToSeconds(returnValue: number) {
        return vi.spyOn(formatsUtils, 'timeToSeconds').mockReturnValue(returnValue)
    }

    function setFormatSentenceString(returnValue: string) {
        return vi.spyOn(formatsUtils, 'formatSentenceString').mockReturnValue(returnValue)
    }

    return { setFormatDate, setSecondsToTime, setTimeToSeconds, setFormatSentenceString }
}

// Copy and paste this code into your test file to use the formats mock:
// vi.mock('@/utils/formats.utils', () => ({
//     formatDate: vi.fn(),
//     formatSentenceString: vi.fn(),
//     secondsToTime: vi.fn(),
//     timeToSeconds: vi.fn(),
// }));