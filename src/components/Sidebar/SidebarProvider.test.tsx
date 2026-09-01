// SidebarProvider.test.tsx
import { render, screen, act, fireEvent } from '@testing-library/react'

import { afterEach, describe, expect, it } from 'vitest'
import { SidebarContext, SidebarProvider } from './SidebarProvider'
import { useContext as reactUseContext } from 'react'

function TestConsumer() {
    const context = reactUseContext(SidebarContext)

    if (!context) return <p>No context</p>

    return (
        <div>
            <p data-testid="status">{context.isOpen ? 'open' : 'closed'}</p>
            <button onClick={context.openSidebar}>Open</button>
            <button onClick={context.closeSidebar}>Close</button>
        </div>
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
})