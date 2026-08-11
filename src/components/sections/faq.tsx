import Link from 'next/link'
import { getFaqs } from '@/content/faqs'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeading } from '@/components/ui/section-heading'

export function Faq({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).faq

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={t.eyebrow}
              title={t.title}
              lead={
                <>
                  {t.leadBefore}
                  <Link href={localePath(locale, '/contact')} className="text-foreground underline underline-offset-4">
                    {t.leadLink}
                  </Link>
                  {t.leadAfter}
                </>
              }
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {getFaqs(locale).map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
