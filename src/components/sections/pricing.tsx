import Link from 'next/link'
import { Check } from 'lucide-react'
import { getPlans } from '@/content/pricing'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'

export function Pricing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).pricing

  return (
    <section id="pricing" className="section border-y border-border bg-muted/20">
      <div className="container">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="center" />

        {/*
          Four tiers: two-up from `sm`, four-up from `xl`. Both divide evenly,
          so no row is ever left with a dead cell. The highlighted card only
          lifts in the four-across layout — in the 2x2 grid it would just look
          misaligned against its neighbour.
        */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {getPlans(locale).map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-xl border bg-card p-7 transition-all duration-500 ease-apex',
                  plan.highlighted
                    ? 'border-primary/40 shadow-lift xl:-mt-4 xl:pb-10'
                    : 'border-border hover:border-foreground/20'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-md bg-apex-gradient px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-background">
                    {t.mostChosen}
                  </span>
                )}

                <h3 className="text-lg">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{plan.pitch}</p>

                {/*
                  A range is far wider than the single figure this used to
                  show, so the price drops to text-2xl and the cadence moves
                  below it rather than sitting alongside. whitespace-nowrap
                  keeps a range from breaking across its en dash.
                */}
                <p className="mt-6 whitespace-nowrap font-display text-2xl font-semibold tracking-tight">
                  {plan.price}
                </p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {plan.cadence}
                </p>
                <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">{plan.bestFor}</p>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-apex-soft" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={plan.highlighted ? 'apex' : 'outline'} size="lg" className="mt-8 w-full">
                  <Link href={localePath(locale, plan.cta.href)}>{plan.cta.label}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">{t.footnote}</p>
      </div>
    </section>
  )
}
