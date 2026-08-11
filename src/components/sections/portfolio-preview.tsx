import Link from 'next/link'
import { getFeaturedProjects } from '@/content/projects'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { ProjectCard } from './project-card'

export function PortfolioPreview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).portfolioSection

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Button asChild variant="outline" className="shrink-0">
            <Link href={localePath(locale, '/portfolio')}>{t.allWork}</Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {getFeaturedProjects(locale).map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} locale={locale} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
