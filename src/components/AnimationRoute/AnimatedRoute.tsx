
import { AnimatePresence, motion, type MotionProps, type Variants } from 'motion/react'
import { useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'

type RouteVariant = 'fade' | 'slide' | 'scale' | 'slideUp'
interface AnimatedRouteProps extends MotionProps {
    children: ReactNode
    variant?: RouteVariant
}

const routeVariants: Record<RouteVariant, Variants> = {
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


    const navigationStatus = useRouterState({
        select: (state) => state.status,
    })

    const isNavigating = navigationStatus === 'pending'

    return (
        <AnimatePresence mode="wait">
            {!isNavigating && (
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
            )}
        </AnimatePresence>
    );
}