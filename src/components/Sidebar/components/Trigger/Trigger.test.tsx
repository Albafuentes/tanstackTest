// Trigger.test.tsx
import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Trigger } from './Trigger'

vi.mock('@/components/Button/Button', () => ({
    Button: ({ children, variant, ...props }: any) => (
        <button data-variant={variant} {...props}>
            {children}
        </button>
    ),
}))


describe('Trigger component', () => {
    it('renders its children when they are rendered', () => {
        render(<Trigger>Abrir menú</Trigger>)

        expect(screen.getByText('Abrir menú')).toBeInTheDocument()
    })

    it('always renders with the "link" variant, ignoring any variant prop passed when provided a variant', () => {
        render(<Trigger variant="green">Abrir menú</Trigger>)

        expect(screen.getByText('Abrir menú')).toHaveAttribute('data-variant', 'link')
    })

    it('forwards extra Button props such as onClick when they are provided', async () => {
        const handleClick = vi.fn()

        render(<Trigger onClick={handleClick}>Abrir menú</Trigger>)

        await act(async () => {
            await fireEvent.click(screen.getByText('Abrir menú'))
        })

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('forwards accessibility attributes such as aria-label when they are provided', () => {
        render(
            <Trigger aria-label="Abrir menú lateral">
                Abrir
            </Trigger>,
        )

        expect(screen.getByLabelText('Abrir menú lateral')).toBeInTheDocument()
    })
})