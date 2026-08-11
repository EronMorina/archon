import { toLocale } from '@/lib/i18n/config'
import { getFaqs } from '@/content/faqs'
import { Hero } from '@/components/sections/hero'
import { ServicesGrid } from '@/components/sections/services-grid'
import { PortfolioPreview } from '@/components/sections/portfolio-preview'
import { TechMarquee } from '@/components/sections/tech-marquee'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { Stats } from '@/components/sections/stats'
import { Testimonials } from '@/components/sections/testimonials'
import { Pricing } from '@/components/sections/pricing'
import { Faq } from '@/components/sections/faq'
import { Cta } from '@/components/sections/cta'

/**
 * Home. Section order follows the buying question sequence:
 * what → proof → how → who → cost → objections → ask.
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getFaqs(locale).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero locale={locale} />
      <ServicesGrid locale={locale} limit={6} />
      <PortfolioPreview locale={locale} />
      <Stats locale={locale} />
      <ProcessTimeline locale={locale} />
      <TechMarquee locale={locale} />
      <Testimonials locale={locale} />
      <Pricing locale={locale} />
      <Faq locale={locale} />
      <Cta locale={locale} />
    </>
  )
}
