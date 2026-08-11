import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { getServices } from '@/content/services'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'

/**
 * Services grid.
 * `limit` renders the home-page subset; the full page passes no limit and
 * `detailed` to expose key benefits under each card.
 */
export function ServicesGrid({
  locale,
  limit,
  detailed = false,
}: {
  locale: Locale
  limit?: number
  detailed?: boolean
}) {
  const t = getDictionary(locale).servicesSection
  const services = getServices(locale)
  const list = limit ? services.slice(0, limit) : services

  return (
    <section id="services" className="section relative">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          {limit && (
            <Button asChild variant="outline" className="shrink-0">
              <Link href={localePath(locale, '/services')}>{t.allServices}</Link>
            </Button>
          )}
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05} className="bg-background">
              <article
                id={service.slug}
                className="group relative flex h-full scroll-mt-28 flex-col p-7 transition-colors duration-500 hover:bg-muted/40"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-card transition-colors duration-500 group-hover:border-primary/40">
                    <service.icon className="size-[18px] text-primary" aria-hidden />
                  </span>
                  <ArrowUpRight className="size-4 -translate-y-0.5 text-muted-foreground opacity-0 transition-all duration-500 ease-arc group-hover:translate-y-0 group-hover:opacity-100" />
                </div>

                <h3 className="mt-6 text-lg">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {detailed ? service.description : service.summary}
                </p>

                {detailed && (
                  <>
                    <ul className="mt-6 space-y-2.5">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-2.5 text-sm text-muted-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-arc-cyan" aria-hidden />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span>{t.from(service.startingAt)}</span>
                      <span aria-hidden className="text-border">|</span>
                      <span>{service.deliverables.join(' · ')}</span>
                    </div>
                  </>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
