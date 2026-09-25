
import { type ReactElement, type HTMLAttributes } from "react";

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement;
}

export const Footer = ({ children, ...props }: FooterProps) => {
    return (
        <div {...props}>{children}</div>
    );
};