// Item.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Item } from './Item'
import styles from '../../Sidebar.module.css'

describe('Item component', () => {
    it('renders its child', () => {
        render(
            <Item>
                <span>Perfil</span>
            </Item>,
        )

        expect(screen.getByText('Perfil')).toBeInTheDocument()
    })

    it('always applies the base sidebar-item class when it is rendered', () => {
        render(
            <Item>
                <span>Perfil</span>
            </Item>,
        )

        expect(screen.getByRole('listitem')).toHaveClass(styles['sidebar-item'])
    })

    it('does not apply the separator or readonly classes by default when it is rendered', () => {
        render(
            <Item>
                <span>Perfil</span>
            </Item>,
        )

        const item = screen.getByRole('listitem')
        expect(item).not.toHaveClass(styles['item--separator'])
        expect(item).not.toHaveClass(styles['item--readonly'])
    })

    it('applies the separator class when withSeparator is true', () => {
        render(
            <Item withSeparator>
                <span>Perfil</span>
            </Item>,
        )

        expect(screen.getByRole('listitem')).toHaveClass(styles['item--separator'])
    })

    it('applies the readonly class when readonly is true', () => {
        render(
            <Item readonly>
                <span>Perfil</span>
            </Item>,
        )

        expect(screen.getByRole('listitem')).toHaveClass(styles['item--readonly'])
    })

    it('appends a custom className without replacing the generated classes when it is provided', () => {
        render(
            <Item className="custom-class">
                <span>Perfil</span>
            </Item>,
        )

        const item = screen.getByRole('listitem')
        expect(item).toHaveClass('custom-class')
        expect(item).toHaveClass(styles['sidebar-item'])
    })

    it('forwards extra li attributes such as onClick when they are provided', () => {
        const handleClick = vi.fn()
        render(
            <Item onClick={handleClick}>
                <span>Perfil</span>
            </Item>,
        )

        screen.getByRole('listitem').click()

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not leak the withSeparator/readonly custom props onto the DOM element when they are provided', () => {
        render(
            <Item withSeparator readonly>
                <span>Perfil</span>
            </Item>,
        )

        const item = screen.getByRole('listitem')
        expect(item).not.toHaveAttribute('withseparator')
        expect(item).not.toHaveAttribute('readonly')
    })
})