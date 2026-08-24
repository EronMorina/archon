import Link from 'next/link'
import { Compass, HeartHandshake, Ruler, Scale } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { PageHeader } from '@/components/layout/page-header'
import { SectionHeading } from '@/components/ui/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { Counter } from '@/components/ui/counter'
import { Testimonials } from '@/components/sections/testimonials'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { Cta } from '@/components/sections/cta'
import { cn } from '@/lib/utils'

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

const team = [
  { key: 'marcus', name: 'Marcus Ainsley', initials: 'MA', gradient: 'from-apex-strong to-apex-mid' },
  { key: 'yuki', name: 'Yuki Tanaka', initials: 'YT', gradient: 'from-apex-mid to-apex-soft' },
  { key: 'ines', name: 'Ines Duarte', initials: 'ID', gradient: 'from-apex-soft to-apex-strong' },
  { key: 'sofia', name: 'Sofia Ferreira', initials: 'SF', gradient: 'from-apex-strong to-apex-soft' },
  { key: 'daniel', name: 'Daniel Achebe', initials: 'DA', gradient: 'from-apex-mid to-apex-strong' },
  { key: 'hana', name: 'Hana Lindgren', initials: 'HL', gradient: 'from-apex-soft to-apex-mid' },
] as const

const milestoneYears = ['2017', '2019', '2021', '2023', '2025', '2026'] as const

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

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.teamEyebrow} title={t.teamTitle} lead={t.teamLead} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person, i) => (
              <Reveal key={person.key} delay={i * 0.05}>
                <div className="apex-ring flex h-full items-start gap-4 rounded-xl border border-border bg-card p-6">
                  <span
                    aria-hidden
                    className={cn(
                      'flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-mono text-sm text-background',
                      person.gradient
                    )}
                  >
                    {person.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base">{person.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{t.team[person.key].role}</p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {t.team[person.key].focus}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section border-t border-border">
        <div className="container">
          <SectionHeading eyebrow={t.historyEyebrow} title={t.historyTitle} />
          <ol className="mt-12 max-w-3xl">
            {milestoneYears.map((year, i) => (
              <Reveal key={year} delay={i * 0.05}>
                <li className="flex gap-6 border-b border-border py-6 last:border-0 sm:gap-10">
                  <span className="w-14 shrink-0 font-mono text-sm text-primary">{year}</span>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{t.milestones[year]}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 text-sm text-muted-foreground">
            {t.curiousBefore}
            <Link href={localePath(locale, '/portfolio')} className="text-foreground underline underline-offset-4">
              {t.curiousLink}
            </Link>
            {t.curiousAfter}
          </p>
        </div>
      </section>

      <ProcessTimeline locale={locale} />
      <Testimonials locale={locale} />
      <Cta locale={locale} title={dict.cta.aboutTitle} />
    </>
  )
}
