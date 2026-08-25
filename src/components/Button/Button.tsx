import style from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "black" | "red" | "outline-black" | "link";
}

export const Button = ({ children, variant = "black", ...props }: ButtonProps) => {
    const className = `${style.button} ${style[`button--${variant}`]}`;

    return <button className={className} {...props}>{children}</button>;
};