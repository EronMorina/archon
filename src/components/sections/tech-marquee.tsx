import type { CSSProperties } from 'react'
import { technologies } from '@/content/tech'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { SectionHeading } from '@/components/ui/section-heading'

/**
 * Technology row.
 * Two duplicated tracks translate -50% in a CSS animation, which the compositor
 * handles on the GPU — no scroll listener, no layout thrash. Paused on hover.
 *
 * Technology names are product names, so they are the one list on the site that
 * stays identical in every language.
 */
export function TechMarquee({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).tech
  const track = [...technologies, ...technologies]

  return (
    <section className="section border-y border-border bg-muted/20">
      <div className="container">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="center" />
      </div>

      <div
        className="mask-edges group mt-14 flex overflow-hidden"
        style={{ '--marquee-duration': '45s' } as CSSProperties}
      >
        {[0, 1].map((trackIndex) => (
          <ul
            key={trackIndex}
            aria-hidden={trackIndex === 1}
            className="flex shrink-0 animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused]"
          >
            {track.map((tech, i) => (
              <li
                key={`${trackIndex}-${tech.name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 transition-colors duration-300 hover:border-primary/40"
              >
                <svg
                  viewBox={tech.viewBox ?? '0 0 24 24'}
                  className="size-5 shrink-0 fill-current text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                  aria-hidden
                  focusable="false"
                >
                  <path d={tech.path} />
                </svg>
                <span className="whitespace-nowrap font-mono text-xs tracking-tight">{tech.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Screen readers get a plain list rather than a duplicated marquee. */}
      <p className="sr-only">{t.screenReaderList(technologies.map((tech) => tech.name).join(', '))}</p>
    </section>
  )
}
