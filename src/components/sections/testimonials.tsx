import { getTestimonials } from '@/content/testimonials'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

/**
 * Testimonials on a uniform grid.
 *
 * `auto-rows-fr` makes every row the same height and `h-full` makes each card
 * fill its cell, so all six are identical whatever the quote length. The
 * blockquote takes the slack with `flex-1`, which also lines the attributions
 * up along one baseline across the whole section.
 *
 * A CSS multi-column layout was the obvious alternative and is what this used
 * to be — it packs tighter, but every card ends up a different height.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).testimonials

  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="center" />

        <div className="mt-14 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getTestimonials(locale).map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={(i % 3) * 0.08} className="h-full">
              <figure className="arc-ring relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-500 hover:border-transparent">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-6 shrink-0 text-primary/30"
                  fill="currentColor"
                >
                  <path d="M9.5 5C6.46 5 4 7.46 4 10.5S6.46 16 9.5 16v3c-5.24 0-9.5-4.26-9.5-9.5S4.26 0 9.5 0v5zm14 0c-3.04 0-5.5 2.46-5.5 5.5s2.46 5.5 5.5 5.5v3c-5.24 0-9.5-4.26-9.5-9.5S18.26 0 23.5 0v5z" />
                </svg>
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/90">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    aria-hidden
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-mono text-xs font-medium text-white',
                      testimonial.avatarClass
                    )}
                  >
                    {testimonial.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{testimonial.author}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
