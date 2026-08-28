import React from "react";
import styles from "./Badge.module.css";
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[];
    variant?: "solid" | "tag";
    color?: "black" | "outline-black" | "red" | "outline-red" | "green" | "outline-green" | "gray" | "outline-gray";
    className?: string;
}

export const Badge = ({ children, variant = "solid", color = "black", className, ...props }: BadgeProps) => {
    const classNameCompounded = `${styles.badge} ${variant ? styles[`badge--${variant}`] : ""} ${color ? styles[`badge--${color}`] : ""} ${className ?? ""}`;
    return (
        <div className={classNameCompounded} {...props}>
            {children}
        </div>
    );
};
