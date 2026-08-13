'use client'

import { cn } from '@/lib/utils'

/**
 * Signature element: the apex.
 *
 * A very shallow chevron spanning the section, echoing the mark, with a soft
 * bloom above it and a highlight that sweeps along one flank. Purely
 * decorative, so it is aria-hidden and never intercepts pointer events.
 *
 * Everything is derived from `--foreground` at low alpha rather than from a
 * fixed colour, which is what lets one component work in both themes: on ink
 * it reads as light blooming from the apex, on paper as a soft vignette
 * settling into it. The alphas are separately tuned per theme because a dark
 * haze on white needs to be far fainter than a light one on black before it
 * stops looking like a smudge.
 */
export function ApexBackdrop({
  className,
  intensity = 'full',
}: {
  className?: string
  intensity?: 'full' | 'soft'
}) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {/* Hairline grid, heavily masked — gives the surface a sense of scale. */}
      <div className="absolute inset-0 bg-hairline-grid bg-[size:64px_64px] opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent)]" />

      {/* Bloom above the apex */}
      <div
        className={cn(
          'absolute left-1/2 top-[-30%] h-[52rem] w-[min(120rem,160%)] -translate-x-1/2 animate-aurora-drift rounded-[50%] blur-3xl',
          'bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.06),transparent_72%)]',
          'dark:bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.16),hsl(var(--foreground)/0.06)_45%,transparent_72%)]',
          intensity === 'soft' && 'opacity-50'
        )}
      />
      <div
        className={cn(
          'absolute right-[-10%] top-[8%] h-[30rem] w-[30rem] animate-aurora-drift rounded-full blur-3xl [animation-delay:-6s]',
          'bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.04),transparent_70%)]',
          'dark:bg-[radial-gradient(closest-side,hsl(var(--foreground)/0.10),transparent_70%)]',
          intensity === 'soft' && 'opacity-40'
        )}
      />

      {/* The chevron itself: a hairline apex across the section. */}
      <svg
        className="absolute inset-x-0 top-[34%] h-[22rem] w-full text-foreground/15 dark:text-foreground/25"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 220 600 20 1200 220" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Light sweeping down one flank of the chevron. */}
      <div className="absolute inset-x-0 top-[34%] h-[22rem] overflow-hidden [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]">
        <div className="absolute left-0 top-0 h-px w-1/3 origin-left animate-apex-sweep bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
      </div>
    </div>
  )
}
