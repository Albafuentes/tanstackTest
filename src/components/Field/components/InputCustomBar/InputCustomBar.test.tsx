// InputCustomBar.test.tsx
import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { InputCustomBar } from './InputCustomBar'
import { MAX_LEVEL, MIN_LEVEL } from '@/zunstand/store/session.store'

describe('InputCustomBar component', () => {
    it('renders a number input with min, max and step from the level constants when it is rendered', () => {
        render(<InputCustomBar name="level" />)

        const input = document.querySelector('input[type="number"]') as HTMLInputElement
        expect(input).toHaveAttribute('min', String(MIN_LEVEL))
        expect(input).toHaveAttribute('max', String(MAX_LEVEL))
        expect(input).toHaveAttribute('step', '1')
    })

    it('renders exactly MAX_LEVEL buttons with the correct accessible label and value when it is rendered', () => {
        render(<InputCustomBar name="level" />)

        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(MAX_LEVEL)

        buttons.forEach((button, index) => {
            const level = index + 1
            expect(button).toHaveAccessibleName(`change value level to ${level}`)
            expect(button).toHaveAttribute('value', level.toString())
        })
    })

    it('marks all buttons as inactive when no defaultValue is provided on initial render', () => {
        render(<InputCustomBar name="level" />)

        screen.getAllByRole('button').forEach((button) => {
            expect(button).toHaveAttribute('data-active', 'false')
        })
    })

    it('marks buttons up to defaultValue as active on initial render when it is rendered', () => {
        render(<InputCustomBar name="level" defaultValue={3} />)

        screen.getAllByRole('button').forEach((button, index) => {
            const level = index + 1
            expect(button).toHaveAttribute('data-active', level <= 3 ? 'true' : 'false')
        })
    })

    it('sets the input value and updates active buttons when a level button is clicked by the user', async () => {

        render(<InputCustomBar name="level" />)

        const targetLevel = 3
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: `change value level to ${targetLevel}` }))
        })

        const input = document.querySelector('input[type="number"]') as HTMLInputElement
        expect(input).toHaveValue(targetLevel)

        screen.getAllByRole('button').forEach((button, index) => {
            const level = index + 1
            expect(button).toHaveAttribute('data-active', level <= targetLevel ? 'true' : 'false')
        })
    })

    it('deactivates previously active buttons when a lower level is selected afterwards by the user', async () => {

        render(<InputCustomBar name="level" defaultValue={3} />)

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'change value level to 2' }))
        })

        const buttons = screen.getAllByRole('button')
        expect(buttons[2]).toHaveAttribute('data-active', 'false') // level 3
        expect(buttons[1]).toHaveAttribute('data-active', 'true')  // level 2
        expect(buttons[0]).toHaveAttribute('data-active', 'true')  // level 1
    })

    it('prevents the default button action (avoids implicit form submission) when a level button is clicked', async () => {

        const handleSubmit = vi.fn((e: React.SubmitEvent<HTMLFormElement>) => e.preventDefault())

        render(
            <form onSubmit={handleSubmit}>
                <InputCustomBar name="level" />
            </form>,
        )

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'change value level to 1' }))
        })

        expect(handleSubmit).not.toHaveBeenCalled()
    })

    it('notifies an external onChange listener when a level button is clicked by the user', async () => {

        const handleChange = vi.fn()
        render(<InputCustomBar name="level" onChange={handleChange} />)

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'change value level to 2' }))
        })

        expect(handleChange).toHaveBeenCalled()
    })
})