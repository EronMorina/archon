import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/content/projects'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Badge } from '@/components/ui/badge'
import { ProjectLinks } from './project-links'
import { cn } from '@/lib/utils'

/** Shared portfolio card: image, technologies, description, results, case study link. */
export function ProjectCard({
  project,
  locale,
  priority = false,
}: {
  project: Project
  locale: Locale
  priority?: boolean
}) {
  const t = getDictionary(locale)
  const href = localePath(locale, `/case-studies/${project.slug}`)

  return (
    <article className="apex-ring group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-500 ease-apex hover:-translate-y-1">
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden border-b border-border"
        aria-label={t.portfolioSection.cardAria(project.title, project.client)}
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br', project.accent)} />
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-apex group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge variant="apex" className="backdrop-blur-md">
            {t.categories[project.category]}
          </Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {project.client} · {project.year}
        </p>
        <h3 className="mt-2.5 text-lg">
          <Link href={href} className="transition-colors hover:text-primary">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        {/* Results */}
        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dd className="font-display text-base font-semibold tracking-tight">{metric.value}</dd>
              <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Technologies */}
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={t.a11y.technologiesUsed}>
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
          <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            {t.portfolioSection.viewCaseStudy}
            <ArrowRight className="size-4 transition-transform duration-300 ease-apex group-hover:translate-x-1" />
          </Link>
          <ProjectLinks project={project} locale={locale} />
        </div>
      </div>
    </article>
  )
}
