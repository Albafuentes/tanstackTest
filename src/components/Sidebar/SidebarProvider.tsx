import { createContext, useState } from "react";

type SidebarContextValue = {
    isOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openSidebar = () => {
        const body = document.querySelector("body");
        const main = document.getElementById("protected-routes-main");

        setIsOpen(true);
        body?.style.setProperty("overflow", "hidden");

        main?.setAttribute("inert", "");
        main?.setAttribute("aria-hidden", "true");

    };
    const closeSidebar = () => {
        const body = document.querySelector("body");
        const main = document.getElementById("protected-routes-main");

        setIsOpen(false);
        body?.style.removeProperty("overflow");

        main?.removeAttribute("inert");
        main?.removeAttribute("aria-hidden");

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