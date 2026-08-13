'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { getProcessSteps } from '@/content/process'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { useReducedMotionSafe } from '@/lib/use-reduced-motion-safe'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'

/**
 * Seven-phase timeline.
 * The vertical rule fills as the section scrolls — the arc, redrawn as a line,
 * so progress through the process is literally visible.
 */
export function ProcessTimeline({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const t = getDictionary(locale)
  const steps = getProcessSteps(locale)
  // Scroll-linked, so MotionConfig's reduced-motion handling does not cover it.
  // The safe hook stays false through hydration, then fills the line in one go.
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 60%'] })
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 140,
    damping: 30,
  })

  return (
    <section id="process" className="section">
      <div className="container">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} lead={t.process.lead} />

        <div ref={ref} className="relative mt-16 pl-8 md:pl-0">
          {/* Track */}
          <div aria-hidden className="absolute left-[7px] top-2 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          {/* Progress fill */}
          <motion.div
            aria-hidden
            style={reduce ? { height: '100%' } : { height }}
            className="absolute left-[7px] top-2 w-px bg-apex-gradient md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-12 md:space-y-0">
            {steps.map((phase, i) => {
              const isLeft = i % 2 === 0
              return (
                <li key={phase.step} className="relative md:grid md:grid-cols-2 md:gap-16 md:py-8">
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-[-25px] top-1.5 flex size-[15px] items-center justify-center rounded-full border border-border bg-background md:left-1/2 md:top-11 md:-translate-x-1/2"
                  >
                    <span className="size-[5px] rounded-full bg-apex-gradient" />
                  </span>

                  <Reveal
                    delay={0.04 * i}
                    className={
                      isLeft
                        ? 'md:col-start-1 md:pr-4 md:text-right'
                        : 'md:col-start-2 md:row-start-auto md:pl-4'
                    }
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                      {phase.step} · {phase.duration}
                    </p>
                    <h3 className="mt-2.5 text-xl">{phase.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{phase.detail}</p>
                    <ul
                      className={`mt-4 flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}
                      aria-label={t.a11y.outputsOf(phase.title)}
                    >
                      {phase.outputs.map((output) => (
                        <li
                          key={output}
                          className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {output}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
