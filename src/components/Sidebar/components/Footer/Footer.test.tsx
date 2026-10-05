// Footer.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from './Footer'

describe('Footer component', () => {
    it('renders its child when it is provided', () => {
        render(
            <Footer>
                <span>Contenido del footer</span>
            </Footer>,
        )

        expect(screen.getByText('Contenido del footer')).toBeInTheDocument()
    })

    it('forwards extra props to the underlying div when it is provided', () => {
        render(
            <Footer data-testid="my-footer" aria-label="Pie de página">
                <span>Contenido</span>
            </Footer>,
        )

        const footer = screen.getByTestId('my-footer')
        expect(footer).toHaveAttribute('aria-label', 'Pie de página')
        expect(footer.tagName).toBe('DIV')
    })
})