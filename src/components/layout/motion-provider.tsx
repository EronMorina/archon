'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Global motion policy.
 *
 * `reducedMotion="user"` makes every `motion.*` component read the OS setting
 * and skip transform, width, height and position animations — they snap to
 * their target instead — while opacity still cross-fades.
 *
 * This is deliberately the only place reduced motion touches Framer Motion.
 * Branching the *rendered tree* on `useReducedMotion()` cannot work under SSR:
 * the hook returns `null` on the server and the real preference on the client's
 * very first render, so the two trees disagree and hydration fails. Framer
 * reads this config after mount, so the server and client markup stay identical.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
