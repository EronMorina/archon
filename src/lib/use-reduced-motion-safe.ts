'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Hydration-safe reduced-motion preference.
 *
 * Framer's `useReducedMotion()` returns `null` on the server but the real
 * preference on the client's first render, so using it directly to decide what
 * to render — an element, a class, an inline style — produces a hydration
 * mismatch on every machine that has "reduce motion" enabled.
 *
 * This returns `false` for the server render *and* the hydrating render, then
 * the true preference once mounted. Use it only for motion that Framer's own
 * `reducedMotion="user"` config cannot reach, such as scroll-linked motion
 * values, and only where the post-mount change swaps a style rather than an
 * element type (swapping the type would remount the subtree).
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted && reduce === true
}
