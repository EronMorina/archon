'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { formatNumber } from '@/lib/utils'
import { defaultLocale, type Locale } from '@/lib/i18n/config'

/**
 * Counter that animates once when scrolled into view.
 * Uses requestAnimationFrame with an ease-out curve rather than an interval,
 * so it stays smooth and stops immediately when the tab is backgrounded.
 *
 * Number formatting follows the locale (1,000 / 1.000 / 1 000) and is
 * deterministic, so the server and the hydrating client agree.
 */
export function Counter({
  to,
  from = 0,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  locale = defaultLocale,
  className,
}: {
  to: number
  from?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  locale?: Locale
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo — fast start, gentle settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(from + (to - from) * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(value, locale, decimals)}
      {suffix}
    </span>
  )
}
