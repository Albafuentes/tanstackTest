
import { type ReactElement, type LiHTMLAttributes } from "react";

export interface FooterProps extends LiHTMLAttributes<HTMLDivElement> {
    children: ReactElement;
}

export const Footer = ({ children, ...props }: FooterProps) => {
    return (
        <div {...props}>{children}</div>
    );
};