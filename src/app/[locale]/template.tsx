'use client'

import { motion } from 'framer-motion'

/**
 * Route transition.
 * `template.tsx` remounts on every navigation, which is what makes the
 * animation replay — a layout would not. Kept deliberately short (280ms) so
 * navigation still feels instant rather than choreographed.
 *
 * Reduced motion is handled by <MotionProvider>, not by returning a different
 * tree here: the wrapper must exist identically on the server and on the
 * hydrating client render, or hydration fails.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
