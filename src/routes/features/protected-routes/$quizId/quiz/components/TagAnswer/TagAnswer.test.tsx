import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TagAnswer } from './TagAnswer'
import styles from './TagAnswer.module.css'
import type { SelectedOption } from '../../hooks/useQuiz.hook'

const baseData = {
    index: 1,
    answer: 'Madrid',
    explanation: 'La capital de España es Madrid',
}

describe('TagAnswer component', () => {
    it('renders the option letter and answer text when it is rendered', () => {
        render(<TagAnswer selectedOption={null} data={baseData} />)

        expect(screen.getByText('B.')).toBeInTheDocument()
        expect(screen.getByText('Madrid')).toBeInTheDocument()
    })

    it('does not check the radio when selectedOption is null', () => {
        render(<TagAnswer selectedOption={null} data={baseData} />)

        expect(screen.getByRole('radio')).not.toBeChecked()
    })

    it('checks the radio when selectedOption.answer matches data.index', () => {
        const selectedOption: SelectedOption = { answer: 1, resolved: false, correct: null }
        render(<TagAnswer selectedOption={selectedOption} data={baseData} />)

        expect(screen.getByRole('radio')).toBeChecked()
        expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true')
    })

    it('calls handleSelectOption with the option index when clicked', async () => {
        const handleSelectOption = vi.fn()
        render(
            <TagAnswer
                selectedOption={null}
                data={baseData}
                handleSelectOption={handleSelectOption}
            />,
        )

        await act(async () => {
            fireEvent.click(screen.getByRole('radio'))
        })

        expect(handleSelectOption).toHaveBeenCalledWith(1)
    })

    it('does not throw when handleSelectOption is not provided', async () => {
        render(<TagAnswer selectedOption={null} data={baseData} />)

        await act(async () => {
            fireEvent.click(screen.getByRole('radio'))
        })
    })

    it('applies no status class and no badge when not resolved', () => {
        const selectedOption: SelectedOption = { answer: 1, resolved: false, correct: null }
        render(<TagAnswer selectedOption={selectedOption} data={baseData} />)

        expect(screen.queryByText('Good!')).not.toBeInTheDocument()
        expect(screen.queryByText('Oops!')).not.toBeInTheDocument()
    })

    it('shows the green style and success badge when selected and correct', () => {
        const selectedOption: SelectedOption = { answer: 1, resolved: true, correct: true }
        render(<TagAnswer selectedOption={selectedOption} data={baseData} />)

        expect(screen.getByTestId('tag-answer-1')).toHaveClass(styles['tag-answer--green'])
        expect(screen.getByText('Good!')).toBeInTheDocument()
    })

    it('shows the red style, fail badge and explanation when selected and incorrect', () => {
        const selectedOption: SelectedOption = { answer: 1, resolved: true, correct: false }
        render(<TagAnswer selectedOption={selectedOption} data={baseData} />)

        expect(screen.getByTestId('tag-answer-1')).toHaveClass(styles['tag-answer--red'])
        expect(screen.getByText('Oops!')).toBeInTheDocument()
        expect(screen.getByText(baseData.explanation)).toBeInTheDocument()
    })

    it('shows the disabled style and no badge when resolved but not the selected option', () => {
        const selectedOption: SelectedOption = { answer: 0, resolved: true, correct: true }
        render(<TagAnswer selectedOption={selectedOption} data={baseData} />)

        expect(screen.getByTestId('tag-answer-1')).toHaveClass(styles['tag-answer--disabled'])
        expect(screen.queryByText('Good!')).not.toBeInTheDocument()
        expect(screen.queryByText('Oops!')).not.toBeInTheDocument()
    })

    it("The input is focusabled when it is hidden visually", async () => {
        const selectedOption: SelectedOption = { answer: 0, resolved: true, correct: true }
        render(<TagAnswer selectedOption={selectedOption} data={baseData} />)

        const radio = screen.getByRole("radio");

        radio.focus();

        expect(document.activeElement).toBe(radio);
        expect(radio).toHaveFocus();
    });
})