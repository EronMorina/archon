import Link from 'next/link'
import { footerNav, site } from '@/lib/site'
import { getDictionary } from '@/lib/i18n'
import { localePath } from '@/lib/i18n/paths'
import type { Locale } from '@/lib/i18n/config'
import { Logo } from './logo'
import { NewsletterForm } from './newsletter-form'

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <footer className="relative border-t border-border">
      {/* A final, faint arc closing the page. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden">
        <div className="h-64 w-[min(120rem,150%)] rounded-[50%] bg-[radial-gradient(closest-side,hsl(var(--apex-mid)/0.12),transparent_70%)]" />
      </div>

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr]">
          <div className="max-w-xs">
            <Logo locale={locale} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.site.tagline}</p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {site.address.city}, {site.address.region} · {t.site.remoteFirst}
            </p>
          </div>

          {footerNav.map((group) => {
            const groupCopy = t.footer.groups[group.key]
            return (
              <nav key={group.key} aria-label={groupCopy.heading}>
                <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {groupCopy.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localePath(locale, link.href)}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {(groupCopy.links as Record<string, string>)[link.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}

          <div>
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.footer.newsletter.heading}
            </h2>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-5">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
