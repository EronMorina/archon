import { buildMetadata } from '@/lib/seo'
import { getLegalDoc } from '@/content/legal'
import { toLocale } from '@/lib/i18n/config'
import { LegalPage } from '@/components/layout/legal-page'

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const doc = getLegalDoc(locale, 'privacy')
  return buildMetadata({ locale, title: doc.title, description: doc.intro, path: '/privacy' })
}

export default function Page({ params }: { params: { locale: string } }) {
  return <LegalPage locale={toLocale(params.locale)} doc="privacy" />
}
