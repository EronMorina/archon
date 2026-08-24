import { Compass, HeartHandshake, Ruler, Scale } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { PageHeader } from '@/components/layout/page-header'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Counter } from '@/components/ui/counter'
import { Testimonials } from '@/components/sections/testimonials'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { Cta } from '@/components/sections/cta'

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.about
  return buildMetadata({ locale, title: t.metaTitle, description: t.metaDescription, path: '/about' })
}

/** Icons, names and gradients are language-neutral; roles and details are not. */
const principleIcons = [
  { key: 'fieldwork', icon: Compass },
  { key: 'honesty', icon: Scale },
  { key: 'handover', icon: Ruler },
  { key: 'teams', icon: HeartHandshake },
] as const

const numbers = [
  { key: 'projects', value: 112, suffix: '+' },
  { key: 'people', value: 14 },
  { key: 'sprints', value: 91, suffix: '%' },
  { key: 'timezones', value: 4 },
] as const

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const dict = getDictionary(locale)
  const t = dict.pages.about

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead(site.founded)} />

      {/* Principles */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={t.principlesEyebrow}
            title={t.principlesTitle}
            lead={t.principlesLead}
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {principleIcons.map((principle, i) => (
              <Reveal key={principle.key} delay={i * 0.06} className="bg-background">
                <div className="h-full p-8 transition-colors duration-500 hover:bg-muted/40">
                  <principle.icon className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-5 text-lg">{t.principles[principle.key].title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t.principles[principle.key].detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="section border-y border-border bg-muted/20">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <SectionHeading eyebrow={t.numbersEyebrow} title={t.numbersTitle} lead={t.numbersLead} />
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
            {numbers.map((stat) => (
              <div key={stat.key}>
                <dd className="font-display text-4xl font-semibold tracking-tight">
                  <Counter
                    to={stat.value}
                    suffix={'suffix' in stat ? stat.suffix : undefined}
                    locale={locale}
                  />
                </dd>
                <dt className="mt-2 text-sm text-muted-foreground">{t.numbers[stat.key]}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ProcessTimeline locale={locale} />
      <Testimonials locale={locale} />
      <Cta locale={locale} title={dict.cta.aboutTitle} />
    </>
  )
}
