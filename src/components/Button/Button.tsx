import style from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "black" | "red" | "outline-black" | "link";
    className?: string;
}

export const Button = ({ children, className, variant = "black", ...props }: ButtonProps) => {
    const combinedClassName = `${style.button} ${style[`button--${variant}`]} ${className ?? ""}`;
    return <button className={combinedClassName} {...props}>{children}</button>;
};