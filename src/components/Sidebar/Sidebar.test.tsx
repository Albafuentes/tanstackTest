// Sidebar.test.tsx
import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Sidebar } from './Sidebar'
import { SidebarContext } from './SidebarProvider'
import { Trigger } from './components/Trigger/Trigger'
import { Item } from './components/Item/Item'
import { Footer } from './components/Footer/Footer'

vi.mock('./components/Trigger/Trigger', () => ({
    Trigger: ({ children, onClick, ...props }: any) => (
        <button data-testid="trigger" onClick={onClick} {...props}>
            {children}
        </button>
    ),
}))

vi.mock('./components/Item/Item', () => ({
    Item: ({ children, onClick, ...props }: any) => (
        <li data-testid="item" onClick={onClick} {...props}>
            {children}
        </li>
    ),
}))

vi.mock('./components/Footer/Footer', () => ({
    Footer: ({ children, ...props }: any) => (
        <div data-testid="footer" {...props}>
            {children}
        </div>
    ),
}))

function renderWithSidebarContext(
    ui: React.ReactElement,
    contextValue: {
        isOpen: boolean
        openSidebar: () => void
        closeSidebar: () => void
    },
) {
    return render(
        <SidebarContext.Provider value={contextValue}>{ui}</SidebarContext.Provider>,
    )
}

function createContextValue(overrides: Partial<{ isOpen: boolean }> = {}) {
    return {
        isOpen: overrides.isOpen ?? false,
        openSidebar: vi.fn(),
        closeSidebar: vi.fn(),
    }
}

describe('Sidebar component', () => {
    it('renders the Trigger when provided as a child', () => {
        const context = createContextValue()
        renderWithSidebarContext(
            <Sidebar>
                <Trigger><>Abrir</></Trigger>
            </Sidebar>,
            context,
        )

        expect(screen.getByTestId('trigger')).toBeInTheDocument()
    })

    it('does not render sidebar content when isOpen is false', () => {
        const context = createContextValue({ isOpen: false })
        renderWithSidebarContext(
            <Sidebar>
                <Trigger>Abrir</Trigger>
                <Item><>Item 1</></Item>
            </Sidebar>,
            context,
        )

        expect(screen.queryByLabelText('Sidebar')).not.toBeInTheDocument()
    })

    it('renders the overlay and content when isOpen is true', () => {
        const context = createContextValue({ isOpen: true })
        renderWithSidebarContext(
            <Sidebar>
                <Trigger>Abrir</Trigger>
            </Sidebar>,
            context,
        )

        expect(screen.getByLabelText('Sidebar')).toBeInTheDocument()
    })

    it('calls openSidebar when clicking the trigger while closed', async () => {

        const context = createContextValue({ isOpen: false })
        renderWithSidebarContext(
            <Sidebar>
                <Trigger>Abrir</Trigger>
            </Sidebar>,
            context,
        )
        await act(async () => {
            await fireEvent.click(screen.getByTestId('trigger'))
        })

        expect(context.openSidebar).toHaveBeenCalledTimes(1)
        expect(context.closeSidebar).not.toHaveBeenCalled()
    })

    it('calls closeSidebar when clicking the trigger while open', async () => {

        const context = createContextValue({ isOpen: true })
        renderWithSidebarContext(
            <Sidebar>
                <Trigger>Abrir</Trigger>
            </Sidebar>,
            context,
        )

        await act(async () => {
            await fireEvent.click(screen.getByTestId('trigger'))
        })

        expect(context.closeSidebar).toHaveBeenCalledTimes(1)
        expect(context.openSidebar).not.toHaveBeenCalled()
    })

    it('calls closeSidebar when clicking the overlay', async () => {
        const context = createContextValue({ isOpen: true })
        renderWithSidebarContext(
            <Sidebar>
                <Trigger>Abrir</Trigger>
            </Sidebar>,
            context,
        )

        await act(async () => {
            await fireEvent.click(screen.getByTestId('sidebar-overlay'))
        })

        expect(context.closeSidebar).toHaveBeenCalledTimes(1)
    })

    it('does not close the sidebar when clicking inside the content area', async () => {
        const context = createContextValue({ isOpen: true })
        renderWithSidebarContext(
            <Sidebar>
                <Trigger>Abrir</Trigger>
            </Sidebar>,
            context,
        )

        await act(async () => {
            await fireEvent.click(screen.getByLabelText('Sidebar'))
        })

        expect(context.closeSidebar).not.toHaveBeenCalled()
    })

    it('renders every Item when it is passed as a child', () => {
        const context = createContextValue({ isOpen: true })
        renderWithSidebarContext(
            <Sidebar>
                <Item><>Item 1</></Item>
                <Item><>Item 2</></Item>
            </Sidebar>,
            context,
        )

        expect(screen.getAllByTestId('item')).toHaveLength(2)
    })

    it('closes the sidebar when an item is clicked, in addition to the item\'s own onClick', async () => {

        const context = createContextValue({ isOpen: true })
        const itemOnClick = vi.fn()

        renderWithSidebarContext(
            <Sidebar>
                <Item onClick={itemOnClick}><>Item 1</></Item>
            </Sidebar>,
            context,
        )

        await act(async () => {
            await fireEvent.click(screen.getByTestId('item'))
        })

        expect(itemOnClick).toHaveBeenCalledTimes(1)
        expect(context.closeSidebar).toHaveBeenCalledTimes(1)
    })

    it('renders the Footer when provided as a child', () => {
        const context = createContextValue({ isOpen: true })
        renderWithSidebarContext(
            <Sidebar>
                <Footer><>Pie de página</></Footer>
            </Sidebar>,
            context,
        )

        expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('does not render Footer when it is not provided as a child', () => {
        const context = createContextValue({ isOpen: true })
        renderWithSidebarContext(
            <Sidebar>
                <Item><>Item 1</></Item>
            </Sidebar>,
            context,
        )

        expect(screen.queryByTestId('footer')).not.toBeInTheDocument()
    })

    it('does not crash when used without a SidebarProvider (context is null)', () => {
        expect(() =>
            render(
                <Sidebar>
                    <Trigger>Abrir</Trigger>
                </Sidebar>,
            ),
        ).not.toThrow()

        expect(screen.queryByLabelText('Sidebar')).not.toBeInTheDocument()
    })
})