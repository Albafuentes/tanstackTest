import { createRoute, Outlet } from '@tanstack/react-router'
import { Route as RootRoute } from "../../__root";
import { AnimatePresence, motion } from 'motion/react';

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "quiz",
  component: QuizLayout,
});

function QuizLayout() {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 1 }}
      >
        <Outlet />
      </motion.main>
    </AnimatePresence>)
}

export default QuizLayout