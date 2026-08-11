import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { Counter } from '@/components/ui/counter'
import { Reveal } from '@/components/ui/reveal'

const stats = [
  { key: 'projects', value: 112, suffix: '+' },
  { key: 'returning', value: 96, suffix: '%' },
  { key: 'savings', value: 4.2, suffix: 'M', prefix: '$', decimals: 1 },
  { key: 'uptime', value: 99.98, suffix: '%', decimals: 2 },
] as const

/** Interactive statistics: counters animate once in view, and each has context. */
export function Stats({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).stats

  return (
    <section className="section border-y border-border bg-muted/20">
      <div className="container">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.06} className="bg-background">
              <div className="group h-full p-7 transition-colors duration-500 hover:bg-card">
                <p className="font-display text-4xl font-semibold tracking-tight md:text-[2.75rem]">
                  <Counter
                    to={stat.value}
                    prefix={'prefix' in stat ? stat.prefix : undefined}
                    suffix={stat.suffix}
                    decimals={'decimals' in stat ? stat.decimals : 0}
                    locale={locale}
                  />
                </p>
                <p className="mt-3 text-sm font-medium">{t[stat.key].label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{t[stat.key].note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
