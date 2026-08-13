'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** Reading progress bar pinned under the navbar. Decorative, so aria-hidden. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-apex-gradient"
    />
  )
}
