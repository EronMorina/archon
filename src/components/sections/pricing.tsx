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

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {getPlans(locale).map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-xl border bg-card p-7 transition-all duration-500 ease-arc',
                  plan.highlighted
                    ? 'border-primary/40 shadow-lift lg:-mt-4 lg:pb-10'
                    : 'border-border hover:border-foreground/20'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-md bg-arc-gradient px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {t.mostChosen}
                  </span>
                )}

                <h3 className="text-lg">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{plan.pitch}</p>

                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tracking-tight">{plan.price}</span>
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {plan.cadence}
                  </span>
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {plan.bestFor}
                </p>

                <ul className="mt-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-arc-cyan" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild variant={plan.highlighted ? 'arc' : 'outline'} size="lg" className="mt-8 w-full">
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
