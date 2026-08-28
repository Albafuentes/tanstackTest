import React from "react";
import style from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode | React.ReactNode[];
    variant?: "black" | "red" | "green" | "outline-black" | "link";
    className?: string;
}

export const Button = ({
    children,
    className,
    variant = "black",
    ...props
}: ButtonProps) => {
    const combinedClassName = `${style.button} ${style[`button--${variant}`]} ${className ?? ""}`;
    return (
        <button className={combinedClassName} {...props}>
            {" "}
            {Array.isArray(children)
                ? children.map((child, index) => (
                    <React.Fragment key={index}>{child}</React.Fragment>
                ))
                : children}
        </button>
    );
};
