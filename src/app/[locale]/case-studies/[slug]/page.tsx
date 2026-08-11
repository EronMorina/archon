import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { getProject, getProjects, projectSlugs } from '@/content/projects'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { localeMeta, toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { ArcBackdrop } from '@/components/ui/arc-backdrop'
import { Cta } from '@/components/sections/cta'
import { ProjectLinks } from '@/components/sections/project-links'
import { NotFoundView } from '@/components/layout/not-found-view'
import { cn } from '@/lib/utils'

/**
 * Statically render every case study at build time.
 * Slugs are shared across locales, so Next pairs these with the locales from
 * the layout's own generateStaticParams.
 */
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const locale = toLocale(params.locale)
  const project = getProject(locale, params.slug)
  if (!project) {
    const t = getDictionary(locale).pages.notFound
    return { title: t.metaTitle, robots: { index: false, follow: true } }
  }
  return buildMetadata({
    locale,
    title: `${project.title} — ${project.client}`,
    description: project.summary,
    path: `/case-studies/${project.slug}`,
  })
}

export default function CaseStudyPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = toLocale(params.locale)
  const project = getProject(locale, params.slug)
  if (!project) return <NotFoundView locale={locale} />

  const t = getDictionary(locale)
  const projects = getProjects(locale)
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const { caseStudy } = project

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title} — ${project.client}`,
    description: project.summary,
    inLanguage: localeMeta[locale].tag,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    about: project.industry,
    url: `${site.url}${localePath(locale, `/case-studies/${project.slug}`)}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(
              [
                { name: t.caseStudy.breadcrumbHome, path: '/' },
                { name: t.caseStudy.breadcrumbCaseStudies, path: '/case-studies' },
                { name: project.title, path: `/case-studies/${project.slug}` },
              ],
              locale
            )
          ),
        }}
      />

      {/* Header */}
      <section className="relative isolate overflow-hidden pb-14 pt-32 md:pt-40">
        <ArcBackdrop intensity="soft" />
        <div className="container relative">
          <Link
            href={localePath(locale, '/case-studies')}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            {t.caseStudy.backToAll}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge variant="arc">{t.categories[project.category]}</Badge>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {project.client} · {project.industry} · {project.year}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-display-sm md:text-display-md">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
            {project.summary}
          </p>

          <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t.caseStudy.duration, value: caseStudy.duration },
              { label: t.caseStudy.team, value: caseStudy.team },
              { label: t.caseStudy.industry, value: project.industry },
              { label: t.caseStudy.delivered, value: project.year },
            ].map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Hero image */}
      <section className="container">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <div className={cn('absolute inset-0 bg-gradient-to-br', project.accent)} />
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Body */}
      <article className="section">
        <div className="container grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="max-w-2xl space-y-14">
            <Reveal>
              <div>
                <h2 className="eyebrow mb-5">
                  <span aria-hidden className="h-px w-7 bg-arc-gradient" />
                  {t.caseStudy.problem}
                </h2>
                <p className="text-lg leading-relaxed text-foreground/90 text-pretty">{caseStudy.problem}</p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="eyebrow mb-5">
                  <span aria-hidden className="h-px w-7 bg-arc-gradient" />
                  {t.caseStudy.solution}
                </h2>
                <p className="text-lg leading-relaxed text-foreground/90 text-pretty">{caseStudy.solution}</p>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="eyebrow mb-5">
                  <span aria-hidden className="h-px w-7 bg-arc-gradient" />
                  {t.caseStudy.approach}
                </h2>
                <ol className="space-y-7">
                  {caseStudy.approach.map((item, i) => (
                    <li key={item.title} className="flex gap-5">
                      <span className="font-mono text-sm text-primary">0{i + 1}</span>
                      <div>
                        <h3 className="text-lg">{item.title}</h3>
                        <p className="mt-2 leading-relaxed text-muted-foreground">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <h2 className="eyebrow mb-5">
                  <span aria-hidden className="h-px w-7 bg-arc-gradient" />
                  {t.caseStudy.results}
                </h2>
                <ul className="space-y-3.5">
                  {caseStudy.results.map((result) => (
                    <li key={result} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-arc-cyan" aria-hidden />
                      <span className="leading-relaxed text-foreground/90">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <figure className="rounded-xl border border-border bg-card p-7">
                <blockquote className="text-lg leading-relaxed text-pretty">{caseStudy.quote.text}</blockquote>
                <figcaption className="mt-5 border-t border-border pt-5 text-sm">
                  <span className="font-medium">{caseStudy.quote.author}</span>
                  <span className="text-muted-foreground"> — {caseStudy.quote.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {t.caseStudy.results}
              </h2>
              <dl className="mt-4 space-y-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <dd className="font-display text-2xl font-semibold tracking-tight">{metric.value}</dd>
                    <dt className="mt-0.5 text-xs text-muted-foreground">{metric.label}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {t.caseStudy.technologies}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <ProjectLinks project={project} locale={locale} variant="buttons" />

            <Button asChild variant="arc" size="lg" className="w-full">
              <Link href={localePath(locale, '/contact')}>{t.caseStudy.startProject}</Link>
            </Button>
          </aside>
        </div>
      </article>

      {/* Next */}
      <section className="border-t border-border">
        <div className="container py-12">
          <Link
            href={localePath(locale, `/case-studies/${next.slug}`)}
            className="group flex items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {t.caseStudy.nextCaseStudy}
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-2xl">
                {next.title}
              </p>
            </div>
            <ArrowRight
              aria-hidden
              className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-arc group-hover:translate-x-1.5 group-hover:text-primary"
            />
          </Link>
        </div>
      </section>

      <Cta locale={locale} />
    </>
  )
}
