import Link from 'next/link'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'

/**
 * Wordmark. The glyph is the studio's arc: a rising curve with a light point
 * at its apex, drawn in the gradient so the brand mark states the theme.
 */
export function Logo({ locale, className }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale)

  return (
    <Link
      href={localePath(locale, '/')}
      className={`group inline-flex items-center gap-2.5 rounded-md ${className ?? ''}`}
      aria-label={`${site.name} — ${t.a11y.home}`}
    >
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden focusable="false">
        <defs>
          <linearGradient id="arc-mark" x1="0" y1="28" x2="28" y2="0">
            <stop offset="0%" stopColor="hsl(var(--arc-blue))" />
            <stop offset="55%" stopColor="hsl(var(--arc-violet))" />
            <stop offset="100%" stopColor="hsl(var(--arc-cyan))" />
          </linearGradient>
        </defs>
        <path
          d="M3 22.5C3 11.73 11.73 3 22.5 3"
          fill="none"
          stroke="url(#arc-mark)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M3 22.5c0-5.8 4.7-10.5 10.5-10.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle
          cx="22.5"
          cy="3"
          r="2.6"
          fill="hsl(var(--arc-cyan))"
          className="transition-transform duration-500 ease-arc group-hover:scale-125"
          style={{ transformOrigin: '22.5px 3px' }}
        />
      </svg>
      <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em]">{site.name}</span>
    </Link>
  )
}
