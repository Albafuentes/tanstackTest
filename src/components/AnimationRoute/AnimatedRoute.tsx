
import { AnimatePresence, motion, type MotionProps, type Variants } from 'motion/react'
import { useLocation, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'


interface AnimatedRouteProps extends MotionProps {
    children: ReactNode
    variant?: 'fade' | 'slide' | 'scale' | 'slideUp'
}

const routeVariants: Record<string, Variants> = {
    fade: {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 },
    },
    slide: {
        initial: { opacity: 0, x: -20 },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: 20 },
    },
    scale: {
        initial: { opacity: 0, scale: 0.95 },
        in: { opacity: 1, scale: 1 },
        out: { opacity: 0, scale: 1.05 },
    },
    slideUp: {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 },
    },
}

const pageTransition: MotionProps['transition'] = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3,
}

export function AnimatedRoute({
    children,
    variant = 'fade',
    ...motionProps
}: AnimatedRouteProps) {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    });

    return (
        <AnimatePresence mode="wait">
            <motion.main
                key={pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={routeVariants[variant]}
                transition={pageTransition}
                {...motionProps}
            >
                {children}
            </motion.main>
        </AnimatePresence>
    );
}