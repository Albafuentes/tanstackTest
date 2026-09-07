// SidebarProvider.test.tsx
import { render, screen, act, fireEvent } from '@testing-library/react'

import { afterEach, describe, expect, it } from 'vitest'
import { SidebarContext, SidebarProvider } from './SidebarProvider'
import { useContext as reactUseContext } from 'react'

function TestConsumer() {
    const context = reactUseContext(SidebarContext)

    if (!context) return <p>No context</p>

    return (
        <>
            <div>
                <p data-testid="status">{context.isOpen ? 'open' : 'closed'}</p>
                <button onClick={context.openSidebar}>Open</button>
                <button onClick={context.closeSidebar}>Close</button>
            </div>
            <main data-testid="main" id="protected-routes-main">Test</main>
        </>
    )
}

describe('SidebarProvider', () => {
    afterEach(() => {
        document.body.style.removeProperty('overflow')
    })

    it('provides isOpen as false by default', () => {
        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )

        expect(screen.getByTestId('status')).toHaveTextContent('closed')
    })

    it('sets isOpen to true when openSidebar is called', async () => {

        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )
        await act(async () => {
            await fireEvent.click(screen.getByText('Open'))
        })

        expect(screen.getByTestId('status')).toHaveTextContent('open')
    })

    it('sets isOpen back to false when closeSidebar is called', async () => {
        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )

        await act(async () => {
            await fireEvent.click(screen.getByText('Open'))
        })
        await act(async () => {
            await fireEvent.click(screen.getByText('Close'))
        })

        expect(screen.getByTestId('status')).toHaveTextContent('closed')
    })

    it('locks body scroll (overflow: hidden) when openSidebar is called', async () => {
        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )

        await act(async () => {
            await fireEvent.click(screen.getByText('Open'))
        })

        expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closeSidebar is called', async () => {
        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )

        await act(async () => {
            await fireEvent.click(screen.getByText('Open'))
        })
        await act(async () => {
            await fireEvent.click(screen.getByText('Close'))
        })

        expect(document.body.style.overflow).toBe('')
    })

    it('exposes null as the default context value when there is no provider', () => {
        render(<TestConsumer />)

        expect(screen.getByText('No context')).toBeInTheDocument()
    })

    it("enables scroll and enables inert on main when opening", async () => {
        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )
        const main = screen.getByTestId("main");


        await act(async () => {
            await fireEvent.click(screen.getByText('Open'))

        })

        expect(document.body.style.overflow).toBe("hidden");
        expect(main.hasAttribute("inert")).toBe(true);
        expect(main.getAttribute("aria-hidden")).toBe("true");
    });

    it("blocks scroll and inerts the main when opening, and reverts when closing", async () => {
        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )
        const main = screen.getByTestId("main");


        await act(async () => {
            await fireEvent.click(screen.getByText('Open'))
            await fireEvent.click(screen.getByText('Close'))
        })

        expect(document.body.style.overflow).toBe("");
        expect(main.hasAttribute("inert")).toBe(false);
        expect(main.hasAttribute("aria-hidden")).toBe(false);
    });

    it("cleans up overflow and inert if unmounted with the sidebar open when the component is removed from the DOM", async () => {
        render(
            <SidebarProvider>
                <TestConsumer />
            </SidebarProvider>,
        )
        const main = screen.getByTestId("main");

        await act(async () => {
            await fireEvent.click(screen.getByText('Open'))
            await fireEvent.click(screen.getByText('Close'))
        })

        expect(document.body.style.overflow).toBe("");
        expect(main.hasAttribute("inert")).toBe(false);
    });
})