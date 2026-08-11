import { buildMetadata } from '@/lib/seo'
import { getServices } from '@/content/services'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { PageHeader } from '@/components/layout/page-header'
import { ServicesGrid } from '@/components/sections/services-grid'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { Pricing } from '@/components/sections/pricing'
import { Faq } from '@/components/sections/faq'
import { Cta } from '@/components/sections/cta'

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.services
  return buildMetadata({ locale, title: t.metaTitle, description: t.metaDescription, path: '/services' })
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.services

  /** Service catalogue as structured data so each line can surface in search. */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${site.name} services`,
    itemListElement: getServices(locale).map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        provider: { '@type': 'Organization', name: site.name },
        url: `${site.url}${localePath(locale, '/services')}#${service.slug}`,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ServicesGrid locale={locale} detailed />
      <ProcessTimeline locale={locale} />
      <Pricing locale={locale} />
      <Faq locale={locale} />
      <Cta locale={locale} />
    </>
  )
}
