/**
 * Single source of truth for brand and contact details.
 *
 * Everything here is language-neutral. Navigation carries stable `key`s and
 * locale-neutral `href`s; the visible labels come from the UI dictionary
 * (`src/lib/i18n/dictionaries`), and hrefs are prefixed per locale at render
 * time with `localePath()`.
 */
const DEFAULT_SITE_URL = 'https://archon.studio'

/**
 * GitHub account the portfolio is built from — see `src/lib/github.ts`.
 * Changing it here repoints both the live repository list and the social link.
 */
const GITHUB_USER = 'EronMorina'

/**
 * Resolve NEXT_PUBLIC_SITE_URL into something `new URL()` will accept.
 *
 * `process.env.X ?? fallback` is not enough: `??` only catches null and
 * undefined, so a variable that exists but is blank — which is what a host
 * gives you when the field is added and left empty — passes straight through
 * and throws "TypeError: Invalid URL" during prerendering, with no indication
 * of which value was at fault.
 *
 * So: blank counts as unset, a missing scheme is assumed to be https, and a
 * trailing slash is dropped (every call site does `${site.url}${path}`, which
 * would otherwise produce `//services`). Anything still unparseable is a
 * genuine misconfiguration and fails loudly, naming the value.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return DEFAULT_SITE_URL

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`

  try {
    const url = new URL(withScheme)
    return url.origin + url.pathname.replace(/\/$/, '')
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL is not a valid URL: ${JSON.stringify(raw)}. ` +
        `Use an absolute origin such as ${DEFAULT_SITE_URL}, or leave it unset to fall back to it.`
    )
  }
}

export const site = {
  /** Set in caps to match the logotype; used verbatim in the wordmark and prose. */
  name: 'ARCHION',
  legalName: 'Archion Studio Ltd.',
  url: resolveSiteUrl(),
  email: 'archonisolutions@gmail.com',
  phone: '+1 (415) 555-0132',
  address: { street: '2 Pier Road, Suite 400', city: 'San Francisco', region: 'CA', postal: '94111', country: 'US' },
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/archon-studio/intro-call',
  founded: '2017',
  /** Source of the portfolio: `github.user`'s public repositories. */
  github: { user: GITHUB_USER, url: `https://github.com/${GITHUB_USER}` },
  socials: [
    { label: 'GitHub', href: `https://github.com/${GITHUB_USER}` },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/archon-studio' },
    { label: 'X', href: 'https://x.com/archonstudio' },
    { label: 'Dribbble', href: 'https://dribbble.com/archon-studio' },
  ],
} as const

export const mainNav = [
  { key: 'services', href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const

export const footerNav = [
  {
    key: 'services',
    links: [
      { key: 'websiteDevelopment', href: '/services#website-development' },
      { key: 'customWebApps', href: '/services#custom-web-applications' },
      { key: 'aiIntegrations', href: '/services#ai-integrations' },
      { key: 'businessAutomation', href: '/services#business-automation' },
      { key: 'cloudDeployment', href: '/services#cloud-deployment' },
    ],
  },
  {
    key: 'company',
    links: [
      { key: 'about', href: '/about' },
      { key: 'portfolio', href: '/portfolio' },
      { key: 'blog', href: '/blog' },
      { key: 'contact', href: '/contact' },
    ],
  },
  {
    key: 'legal',
    links: [
      { key: 'privacy', href: '/privacy' },
      { key: 'terms', href: '/terms' },
      { key: 'cookies', href: '/cookies' },
      { key: 'accessibility', href: '/accessibility' },
    ],
  },
] as const
