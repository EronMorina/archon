'use client'

import { cn } from '@/lib/utils'

/**
 * Signature element: the arc.
 * A wide, very soft elliptical light source plus a hairline arc stroke.
 * Purely decorative, so it is aria-hidden and never intercepts pointer events.
 */
export function ArcBackdrop({
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

      {/* Aurora bloom */}
      <div
        className={cn(
          'absolute left-1/2 top-[-32%] h-[52rem] w-[min(120rem,160%)] -translate-x-1/2 animate-aurora-drift rounded-[50%] blur-3xl',
          'bg-[radial-gradient(closest-side,hsl(var(--arc-violet)/0.30),hsl(var(--arc-blue)/0.18)_45%,transparent_72%)]',
          intensity === 'soft' && 'opacity-50'
        )}
      />
      <div
        className={cn(
          'absolute right-[-10%] top-[8%] h-[30rem] w-[30rem] animate-aurora-drift rounded-full blur-3xl [animation-delay:-6s]',
          'bg-[radial-gradient(closest-side,hsl(var(--arc-cyan)/0.20),transparent_70%)]',
          intensity === 'soft' && 'opacity-40'
        )}
      />

      {/* The arc itself: a 1px luminous curve at the horizon of the section. */}
      <div className="absolute inset-x-0 top-[38%] flex justify-center">
        <div className="h-[46rem] w-[min(150rem,180%)] rounded-[50%] border-t border-arc-violet/25 bg-transparent" />
      </div>

      {/* Light sweeping along the arc. */}
      <div className="absolute inset-x-0 top-[38%] h-px overflow-hidden">
        <div className="h-px w-1/3 animate-arc-sweep bg-gradient-to-r from-transparent via-arc-cyan to-transparent" />
      </div>
    </div>
  )
}
