import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import style from './Button.module.css';

describe('Button component', () => {
    it('renders the Button with children when provided a child element', () => {
        render(<Button>Content</Button>)

        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('renders the Button with children when provided multiple child elements', () => {
        render(
            <Button>
                <span>One</span>
                <span>Two</span>
            </Button>,
        )

        expect(screen.getByText('One')).toBeInTheDocument()
        expect(screen.getByText('Two')).toBeInTheDocument()
    })

    it('renders the Button with the "black" variant when not defined the variant prop', () => {
        render(<Button>Content</Button>)

        expect(screen.getByText('Content')).toHaveClass(style['button--black'])
    })

    it.each([
        ['black'],
        ['red'],
        ['green'],
        ['gray'],
        ['link'],
    ] as const)('renders the Button with the button--"%s" style when defined the variant prop as "%s"', (variant) => {
        render(<Button variant={variant as "black" | "red" | "green" | "outline-black" | "link"}>Content</Button>)

        expect(screen.getByText('Content')).toHaveClass(style[`button--${variant}`])
    })

    it('renders the Button with other props when passing a div element props', () => {
        render(
            <Button data-testid="my-badge" aria-label="tag-element" onClick={() => { }}>
                Content
            </Button>,
        )

        const button = screen.getByTestId('my-badge')
        expect(button).toHaveAttribute('aria-label', 'tag-element')
    })

    it('appends the custom className to the generated classes when provided', () => {
        render(<Button className="custom-class">Content</Button>)

        const button = screen.getByText('Content')
        expect(button).toHaveClass('custom-class')
        expect(button).toHaveClass(style.button)
        expect(button).toHaveClass(style['button--black'])
    })
});