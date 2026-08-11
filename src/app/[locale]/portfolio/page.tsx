import { buildMetadata } from '@/lib/seo'
import { getProjects } from '@/content/projects'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { PageHeader } from '@/components/layout/page-header'
import { ProjectFilter } from '@/components/features/project-filter'
import { Stats } from '@/components/sections/stats'
import { TechMarquee } from '@/components/sections/tech-marquee'
import { Cta } from '@/components/sections/cta'

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.portfolio
  return buildMetadata({ locale, title: t.metaTitle, description: t.metaDescription, path: '/portfolio' })
}

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale)

  return (
    <>
      <PageHeader eyebrow={t.pages.portfolio.eyebrow} title={t.pages.portfolio.title} lead={t.pages.portfolio.lead} />
      <section className="section pt-12 md:pt-16">
        <div className="container">
          <ProjectFilter projects={getProjects(locale)} />
        </div>
      </section>
      <Stats locale={locale} />
      <TechMarquee locale={locale} />
      <Cta locale={locale} title={t.cta.portfolioTitle} />
    </>
  )
}
