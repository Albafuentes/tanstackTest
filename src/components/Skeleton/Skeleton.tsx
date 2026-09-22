import { motion, type HTMLMotionProps } from 'motion/react';
import styles from './Skeleton.module.css';

interface SkeletonProps extends HTMLMotionProps<'div'> {
    tag:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'badge'
    | 'button'
    | 'tag';
    width?: string;
    height?: string;
}

export const Skeleton = ({ tag, width, height, ...props }: SkeletonProps) => {
    return (
        <motion.div
            animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
            }}
            className={`${styles['skeleton']} ${styles[`skeleton--${tag}`]}`}
            style={{ width, height }}
            {...props}
        />
    );
};
