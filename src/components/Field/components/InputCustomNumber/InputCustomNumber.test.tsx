// InputCustomNumber.test.tsx
import { act, fireEvent, render, screen } from '@testing-library/react'

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { InputCustomNumber } from './InputCustomNumber'
import { MAX_TIMER, MIN_TIMER, TIMER_INCREMENT } from '@/zunstand/store/session.store'
import { secondsToTime } from '@/utils/formats.utils'

vi.mock('@/components', () => ({
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

describe('InputCustomNumber component', () => {
    it('renders an input with type="time" when it is rendered', () => {
        render(<InputCustomNumber name="duration" />)

        expect(document.querySelector('input[type="time"]')).toBeTruthy()
    })

    it('sets min, max and step based on the timer constants when it is rendered', () => {
        render(<InputCustomNumber name="duration" />)

        const input = document.querySelector('input[type="time"]') as HTMLInputElement
        expect(input).toHaveAttribute('min', secondsToTime(MIN_TIMER))
        expect(input).toHaveAttribute('max', secondsToTime(MAX_TIMER))
        expect(input).toHaveAttribute('step', String(TIMER_INCREMENT))
    })

    it('renders a decrease and an increase button with accessible labels when it is rendered', () => {
        render(<InputCustomNumber name="duration" />)

        expect(screen.getByRole('button', { name: 'Decrease value' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Increase value' })).toBeInTheDocument()
    })

    describe('stepping behaviour', () => {
        beforeEach(() => {
            vi.spyOn(HTMLInputElement.prototype, 'stepUp').mockImplementation(() => { })
            vi.spyOn(HTMLInputElement.prototype, 'stepDown').mockImplementation(() => { })
        })

        afterEach(() => {
            vi.restoreAllMocks()
        })

        it('calls stepUp on the input when clicking the increase button by the user', async () => {
            render(<InputCustomNumber name="duration" />)

            await act(async () => {
                await fireEvent.click(screen.getByRole('button', { name: 'Increase value' }))
            })


            expect(HTMLInputElement.prototype.stepUp).toHaveBeenCalledTimes(1)
            expect(HTMLInputElement.prototype.stepDown).not.toHaveBeenCalled()
        })

        it('calls stepDown on the input when clicking the decrease button by the user', async () => {

            render(<InputCustomNumber name="duration" />)

            await act(async () => {
                await fireEvent.click(screen.getByRole('button', { name: 'Decrease value' }))
            })

            expect(HTMLInputElement.prototype.stepDown).toHaveBeenCalledTimes(1)
            expect(HTMLInputElement.prototype.stepUp).not.toHaveBeenCalled()
        })
    })

    it('prevents the default action of the button click (avoids implicit form submission) when the increase button is clicked by the user', async () => {

        const handleSubmit = vi.fn((e: React.SubmitEvent<HTMLFormElement>) => e.preventDefault())

        render(
            <form onSubmit={handleSubmit}>
                <InputCustomNumber name="duration" />
            </form>,
        )

        await act(async () => {
            await fireEvent.click(screen.getByRole('button', { name: 'Increase value' }))
        })

        expect(handleSubmit).not.toHaveBeenCalled()
    })

    it('forwards extra input props such as value and onChange when they are provided', async () => {
        const handleChange = vi.fn()
        render(<InputCustomNumber name="duration" value="00:05:00" onChange={handleChange} readOnly />)

        const input = document.querySelector('input[type="time"]') as HTMLInputElement
        expect(input).toHaveValue('00:05:00')
        expect(input).toHaveAttribute('name', 'duration')
    })

    it('allows props to override the default min, max and step values when they are provided', () => {
        render(<InputCustomNumber name="duration" min="00:01:00" max="00:10:00" step={30} />)

        const input = document.querySelector('input[type="time"]') as HTMLInputElement
        expect(input).toHaveAttribute('min', '00:01:00')
        expect(input).toHaveAttribute('max', '00:10:00')
        expect(input).toHaveAttribute('step', '30')
    })
})