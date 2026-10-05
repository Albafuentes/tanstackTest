import React from 'react';
import styles from './Badge.module.css';
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode | React.ReactNode[];
    variant?: 'solid' | 'tag';
    color?:
    | 'black'
    | 'outline-black'
    | 'red'
    | 'outline-red'
    | 'green'
    | 'outline-green'
    | 'gray'
    | 'outline-gray';
    className?: string;
}

export const Badge = ({
    children,
    variant = 'solid',
    color = 'black',
    className,
    ...props
}: BadgeProps) => {
    const classNameCompounded = `${styles.badge} ${variant ? styles[`badge--${variant}`] : ''} ${color ? styles[`badge--${color}`] : ''} ${className ?? ''}`;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            props.onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
    };

    return (
        <div
            className={classNameCompounded}
            {...props}
            {...(props.onClick
                ? {
                    role: 'button',
                    tabIndex: 0,
                    onKeyDown: handleKeyDown,
                }
                : {})}

        >
            {children}
        </div>
    );
};
