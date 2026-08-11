import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { locales, localeMeta, toLocale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/paths'
import { PageHeader } from '@/components/layout/page-header'
import { ContactForm } from '@/components/features/contact-form'
import { CalendlyEmbed } from '@/components/features/calendly-embed'
import { Faq } from '@/components/sections/faq'

export function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.contact
  return buildMetadata({ locale, title: t.metaTitle, description: t.metaDescription, path: '/contact' })
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale)
  const t = getDictionary(locale).pages.contact

  const details = [
    { icon: Mail, label: t.details.email, value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: t.details.phone, value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, '')}` },
    {
      icon: MapPin,
      label: t.details.studio,
      value: `${site.address.street}, ${site.address.city} ${site.address.postal}`,
    },
    { icon: Clock, label: t.details.replyTime, value: t.details.replyValue },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${site.name}`,
    url: `${site.url}${localePath(locale, '/contact')}`,
    inLanguage: localeMeta[locale].tag,
    mainEntity: {
      '@type': 'Organization',
      name: site.name,
      email: site.email,
      telephone: site.phone,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        availableLanguage: locales.map((l) => localeMeta[l].label),
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="section pt-14 md:pt-20">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h2 className="sr-only">{t.formHeading}</h2>
            <ContactForm />
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <CalendlyEmbed />

            <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3.5 bg-background p-5">
                  <detail.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {detail.label}
                    </dt>
                    <dd className="mt-1 break-words text-sm">
                      {detail.href ? (
                        <a href={detail.href} className="transition-colors hover:text-primary">
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Faq locale={locale} />
    </>
  )
}
