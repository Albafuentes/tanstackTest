// Progress.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, } from 'vitest'
import { Progress } from './Progress'
import styles from './Progress.module.css'

describe('Progress component', () => {
    it('renders the help text when it is provided', () => {
        render(<Progress helpText="Loading..." widthValue={30} maxValue={100} />)

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders a native progress element with the correct value and a fixed max of 100 when it is rendered', () => {
        render(<Progress helpText="Progreso" widthValue={30} maxValue={100} />)

        const progress = document.querySelector('progress') as HTMLProgressElement
        expect(progress).toHaveAttribute('value', '30')
        expect(progress).toHaveAttribute('max', '100')
    })

    it('computes the percentage as widthValue relative to maxValue when it is rendered', () => {
        render(<Progress helpText="Progreso" widthValue={25} maxValue={50} />)

        // 25 / 50 * 100 = 50%
        const progressValue = document.querySelector('div[data-motion-tag="div"]') as HTMLDivElement
        expect(progressValue).toHaveAttribute('data-animate-width', '50%')

        const progress = document.querySelector('progress') as HTMLProgressElement
        expect(progress).toHaveAttribute('value', '50')
    })

    it('uses the "black" color by default when it is not provided the color value', () => {
        render(<Progress helpText="Progreso" widthValue={30} maxValue={100} />)

        const progressValue = document.querySelector('div[data-motion-tag="div"]') as HTMLDivElement
        expect(progressValue).toHaveClass(styles['progress__thumb__value--black'])
        expect(progressValue).not.toHaveClass(styles['progress__thumb__value--red'])
    })

    it('uses the "red" color when the color prop is "red" when it is provided the color value', () => {
        render(<Progress helpText="Progreso" widthValue={30} maxValue={100} color="red" />)

        const progressValue = document.querySelector('div[data-motion-tag="div"]') as HTMLDivElement
        expect(progressValue).toHaveClass(styles['progress__thumb__value--red'])
        expect(progressValue).not.toHaveClass(styles['progress__thumb__value--black'])
    })

    it('hides the thumb visually when the percentage is 0', () => {
        render(<Progress helpText="Progreso" widthValue={0} maxValue={100} />)

        const progressValue = document.querySelector('div[data-motion-tag="div"]') as HTMLDivElement
        expect(progressValue).toHaveStyle({ visibility: 'hidden' })
    })

    it('shows the thumb when the percentage is greater than 0', () => {
        render(<Progress helpText="Progreso" widthValue={1} maxValue={100} />)

        const progressValue = document.querySelector('div[data-motion-tag="div"]') as HTMLDivElement
        expect(progressValue).toHaveStyle({ visibility: 'visible' })
    })

    it('caps the visual width representation when widthValue exceeds maxValue', () => {
        render(<Progress helpText="Progreso" widthValue={150} maxValue={100} />)

        // 150 / 100 * 100 = 150% — el componente no clampa este valor
        const progressValue = document.querySelector('div[data-motion-tag="div"]') as HTMLDivElement
        expect(progressValue).toHaveAttribute('data-animate-width', '150%')
    })
})