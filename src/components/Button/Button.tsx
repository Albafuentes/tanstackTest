import React from 'react';
import { motion, type Variants, type HTMLMotionProps } from 'motion/react';
import style from './Button.module.css';

type ConflictingProps =
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onAnimationStart'
    | 'onAnimationEnd';

export type basicButtonProps = HTMLMotionProps<'button'> &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps>;

export interface ButtonProps extends basicButtonProps {
    children: React.ReactNode | React.ReactNode[];
    variant?: 'black' | 'red' | 'green' | 'outline-black' | 'link';
    isLoading?: boolean;
    className?: string;
}

export const Button = ({
    children,
    className,
    isLoading = false,
    variant = 'black',
    ...props
}: ButtonProps) => {
    const combinedClassName = `${style.button} ${style[`button--${variant}`]} ${className ?? ''}`;

    const buttonVariants: Variants = {
        idle: { opacity: 1 },
        loading: {
            opacity: [0.55, 0.25, 0.55],
            scale: [1, 0.97, 1],
            transition: {
                duration: 1.8,
                ease: [0.45, 0, 0.55, 1],
                repeat: Infinity,
            },
        },
    };

    return (
        <motion.button
            variants={buttonVariants}
            initial="idle"
            animate={isLoading ? 'loading' : 'idle'}
            className={combinedClassName}
            aria-disabled={isLoading}
            disabled={isLoading}
            {...props}
        >
            {children}
        </motion.button>
    );
};
