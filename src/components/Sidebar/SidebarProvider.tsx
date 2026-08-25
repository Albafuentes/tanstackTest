import { createContext, useState } from "react";

type SidebarContextValue = {
    isOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const body = document.querySelector("body");
    const openSidebar = () => {

        setIsOpen(true);
        body?.style.setProperty("overflow", "hidden");

    };
    const closeSidebar = () => {
        setIsOpen(false);
        body?.style.removeProperty("overflow");

    };
    const activeSidebar = {
        isOpen,
        openSidebar,
        closeSidebar,
    };

    return (
        <SidebarContext.Provider value={activeSidebar}>
            {children}
        </SidebarContext.Provider>
    );
}