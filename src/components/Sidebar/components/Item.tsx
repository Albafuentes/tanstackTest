
import { type ReactElement, type LiHTMLAttributes } from "react";
import styles from "../Sidebar.module.css";

export interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {
    children: ReactElement;
}

export const Item = ({ children, ...props }: ItemProps) => {
    return (
        <li {...props} className={`${props.className ?? ""} ${styles["sidebar-item"]}`}>{children}</li>
    );
};