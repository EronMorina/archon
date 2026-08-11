import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { getProjects } from '@/content/projects'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { PageHeader } from '@/components/layout/page-header'
import { Reveal } from '@/components/ui/reveal'
import { Badge } from '@/components/ui/badge'
import { Cta } from '@/components/sections/cta'
import { ProjectLinks } from '@/components/sections/project-links'
import { cn } from '@/lib/utils'

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.caseStudies
  return buildMetadata({ locale, title: t.metaTitle, description: t.metaDescription, path: '/case-studies' })
}

export default function CaseStudiesPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale)

  return (
    <>
      <PageHeader
        eyebrow={t.pages.caseStudies.eyebrow}
        title={t.pages.caseStudies.title}
        lead={t.pages.caseStudies.lead}
      />

      <section className="section pt-14 md:pt-20">
        <div className="container space-y-6">
          {getProjects(locale).map((project, i) => {
            const href = localePath(locale, `/case-studies/${project.slug}`)
            return (
              <Reveal key={project.slug} delay={i * 0.05}>
                <article className="arc-ring group overflow-hidden rounded-xl border border-border bg-card transition-transform duration-500 ease-arc hover:-translate-y-1">
                  <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                    <Link
                      href={href}
                      className="relative block aspect-[16/10] overflow-hidden border-b border-border lg:aspect-auto lg:border-b-0 lg:border-r"
                      aria-label={t.portfolioSection.readAria(project.client)}
                    >
                      <div className={cn('absolute inset-0 bg-gradient-to-br', project.accent)} />
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        className="object-cover transition-transform duration-700 ease-arc group-hover:scale-[1.03]"
                      />
                    </Link>

                    <div className="p-7 md:p-9">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="arc">{t.categories[project.category]}</Badge>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          {project.client} · {project.industry} · {project.year}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl md:text-[1.75rem]">
                        <Link href={href} className="transition-colors group-hover:text-primary">
                          {project.title}
                        </Link>
                      </h2>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{project.summary}</p>

                      <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-5 border-y border-border py-5">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <dd className="font-display text-xl font-semibold tracking-tight">{metric.value}</dd>
                            <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                              {metric.label}
                            </dt>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <ul className="flex flex-wrap gap-1.5" aria-label={t.a11y.technologiesUsed}>
                          {project.technologies.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                        <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
                          <ProjectLinks project={project} locale={locale} />
                          <Link
                            href={href}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                          >
                            {t.portfolioSection.readCaseStudy}
                            <ArrowRight className="size-4 transition-transform duration-300 ease-arc group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Cta locale={locale} />
    </>
  )
}
