import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Badge } from './Badge'
import styles from './Badge.module.css'

describe('Badge component', () => {

    it('renders the Badge with children when provided a child element', () => {
        render(<Badge>Content</Badge>)

        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('renders the Badge with children when provided multiple child elements', () => {
        render(
            <Badge>
                <span>One</span>
                <span>Two</span>
            </Badge>,
        )

        expect(screen.getByText('One')).toBeInTheDocument()
        expect(screen.getByText('Two')).toBeInTheDocument()
    })

    it('renders the Badge with the "solid" variant when not defined the variant prop', () => {
        render(<Badge>Content</Badge>)

        expect(screen.getByText('Content')).toHaveClass(styles['badge--solid'])
    })

    it('renders the Badge with the "tag" variant when defined the variant prop as "tag"', () => {
        render(<Badge variant="tag">Content</Badge>)

        expect(screen.getByText('Content')).toHaveClass(styles['badge--tag'])
    })

    it('renders the Badge with the "black" color when not defined the color prop', () => {
        render(<Badge>Content</Badge>)

        expect(screen.getByText('Content')).toHaveClass(styles['badge--black'])
    })

    it.each([
        ['black'],
        ['outline-black'],
        ['red'],
        ['outline-red'],
        ['green'],
        ['outline-green'],
        ['gray'],
        ['outline-gray'],
    ] as const)('renders the Badge with the badge--"%s" style when defined the color prop as "%s"', (color) => {
        render(<Badge color={color}>Content</Badge>)

        expect(screen.getByText('Content')).toHaveClass(styles[`badge--${color}`])
    })

    it('renders the Badge with other props when passing a div element props', () => {
        render(
            <Badge data-testid="my-badge" aria-label="tag-element" onClick={() => { }}>
                Content
            </Badge>,
        )

        const badge = screen.getByTestId('my-badge')
        expect(badge).toHaveAttribute('aria-label', 'tag-element')
    })

    it('appends the custom className to the generated classes when provided', () => {
        render(<Badge className="custom-class">Content</Badge>)

        const badge = screen.getByText('Content')
        expect(badge).toHaveClass('custom-class')
        expect(badge).toHaveClass(styles.badge)
        expect(badge).toHaveClass(styles['badge--solid'])
        expect(badge).toHaveClass(styles['badge--black'])
    })

    it('renders the Badge as a button when onClick is provided', () => {
        const mockOnClick = vi.fn();
        render(
            <Badge onClick={mockOnClick} data-testid="clickable-badge">
                Clickable
            </Badge>
        )

        act(() => {
            fireEvent.keyDown(screen.getByTestId('clickable-badge'), { key: 'Enter', code: 'Enter' });
        });

        const badge = screen.getByTestId('clickable-badge')
        expect(badge).toHaveAttribute('role', 'button')
        expect(badge).toHaveAttribute('tabIndex', '0')


        expect(mockOnClick).toHaveBeenCalledTimes(1);
    })
})