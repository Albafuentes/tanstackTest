
import { type ReactElement, type LiHTMLAttributes } from "react";
import styles from "../Sidebar.module.css";

export interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {
    children: ReactElement;
    withSeparator?: boolean;
    readonly?: boolean;
}

export const Item = ({ children, ...props }: ItemProps) => {
    return (
        <li
            {...props}
            className={`${props.className ?? ""} ${styles["sidebar-item"]} ${props.withSeparator ? styles["item--separator"] : ""} ${props.readonly ? styles["item--readonly"] : ""}`}
        >
            {children}
        </li>
    );
};