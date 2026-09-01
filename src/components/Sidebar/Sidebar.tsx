import { Children, cloneElement, isValidElement, useContext } from "react";
import type { FooterProps } from "./components/Footer/Footer";
import { Footer } from "./components/Footer/Footer";
import { SidebarContext } from "./SidebarProvider";

import styles from "./Sidebar.module.css";
import { Trigger, type TriggerProps } from "./components/Trigger/Trigger";

import {
    Item,
    type ItemProps,
} from "./components/Item/Item";
import { AnimatePresence, motion } from "motion/react";

export interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar = ({
    children,
}: SidebarProps) => {
    const activeSidebar = useContext(SidebarContext);

    const childrenArray = Children.toArray(children);

    const TriggerComponent = childrenArray.find(
        (child) => isValidElement(child) && child.type === Trigger,
    ) as React.ReactElement<TriggerProps> | undefined;

    const ItemComponent = childrenArray.filter(
        (child) => isValidElement(child) && child.type === Item,
    ) as React.ReactElement<ItemProps>[] | undefined;

    const FooterComponent = childrenArray.find(
        (child) => isValidElement(child) && child.type === Footer,
    ) as React.ReactElement<FooterProps> | undefined;

    const handleOnOpen = () => {
        if (!activeSidebar?.isOpen) {
            activeSidebar?.openSidebar();
            return;
        }

        activeSidebar?.closeSidebar();
    };

    const handleOnClose = () => {
        activeSidebar?.closeSidebar();
    };

    return (
        <>
            {/* Trigger - execute the handleOpen function when clicked */}
            {TriggerComponent &&
                cloneElement(TriggerComponent, {
                    ...TriggerComponent.props,
                    onClick: handleOnOpen,
                })}
            <AnimatePresence mode="wait" initial={false}>
                {activeSidebar?.isOpen && (
                    <>
                        <motion.div
                            aria-hidden="true"
                            className={styles["sidebar-overlay"]}
                            onClick={handleOnClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { delay: 0.2 } }}
                            transition={{ duration: 0.3 }}
                            data-testid="sidebar-overlay"
                        />
                        <motion.div
                            aria-label="Sidebar"
                            className={styles["sidebar-content"]}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul>
                                {ItemComponent && ItemComponent.map((item) =>
                                    cloneElement(item, {
                                        ...item.props,
                                        onClick: (e) => {
                                            item.props.onClick?.(e);
                                            handleOnClose();
                                        },
                                    })
                                )}

                            </ul>
                            {FooterComponent && cloneElement(FooterComponent, {
                                ...FooterComponent.props,
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
