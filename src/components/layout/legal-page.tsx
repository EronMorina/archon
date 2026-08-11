import { getLegalDoc, type LegalKey } from '@/content/legal'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { formatDate } from '@/lib/utils'
import { PageHeader } from './page-header'

/** Shared renderer for the four legal documents. */
export function LegalPage({ locale, doc: key }: { locale: Locale; doc: LegalKey }) {
  const doc = getLegalDoc(locale, key)
  const t = getDictionary(locale)

  return (
    <>
      <PageHeader
        eyebrow={t.legal.updated(formatDate(doc.updated, locale))}
        title={doc.title}
        lead={doc.intro}
      />
      <div className="container max-w-3xl py-16 md:py-20">
        {doc.sections.map((section) => (
          <section key={section.heading} className="mb-12 last:mb-0">
            <h2 className="text-xl">{section.heading}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-4 leading-relaxed text-muted-foreground text-pretty">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </>
  )
}
