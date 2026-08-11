/**
 * Single source of truth for brand and contact details.
 *
 * Everything here is language-neutral. Navigation carries stable `key`s and
 * locale-neutral `href`s; the visible labels come from the UI dictionary
 * (`src/lib/i18n/dictionaries`), and hrefs are prefixed per locale at render
 * time with `localePath()`.
 */
export const site = {
  name: 'Arclight',
  legalName: 'Arclight Studio Ltd.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arclight.studio',
  email: 'hello@arclight.studio',
  phone: '+1 (415) 555-0132',
  address: { street: '2 Pier Road, Suite 400', city: 'San Francisco', region: 'CA', postal: '94111', country: 'US' },
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/arclight-studio/intro-call',
  founded: '2017',
  socials: [
    { label: 'GitHub', href: 'https://github.com/arclight-studio' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/arclight-studio' },
    { label: 'X', href: 'https://x.com/arclightstudio' },
    { label: 'Dribbble', href: 'https://dribbble.com/arclight-studio' },
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
      { key: 'caseStudies', href: '/case-studies' },
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
