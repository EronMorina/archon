# Arclight — software studio website

A production-ready marketing site for a software development agency. Next.js App Router,
TypeScript, Tailwind, Framer Motion, shadcn/ui primitives, Lucide icons.

```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs without any of it
npm run dev                  # http://localhost:3000
```

## Design system

Named **Arclight** because the signature element is an arc of light: a soft elliptical
bloom with a 1px luminous curve at its horizon, and a highlight that sweeps along it.
It recurs at four scales — hero backdrop, section eyebrow rules, the process timeline's
filling progress line, and the closing CTA — so the brand is structural rather than decorative.

| Token | Value | Role |
| --- | --- | --- |
| Ink | `hsl(231 24% 5%)` | Dark canvas |
| Paper | `hsl(240 20% 99%)` | Light canvas |
| Arc blue | `hsl(231 92% 62%)` | Gradient start, primary |
| Arc violet | `hsl(262 88% 66%)` | Gradient middle, glow |
| Arc cyan | `hsl(189 88% 55%)` | Gradient end, confirmations |

Typography: **Instrument Sans** for display (tight, −0.035em at large sizes), **Inter** for
body, **IBM Plex Mono** for eyebrows, metrics and labels. All self-hosted via `next/font`
with the `latin` and `latin-ext` subsets — German and French need the latter for ß, œ and
the accented capitals — so there is no external request and no layout shift.

Every colour is an HSL triplet behind a CSS variable, so `.dark` on `<html>` flips the
whole palette without a single duplicated utility class.

## Structure

```
src/
├── middleware.ts               Locale routing (rewrite / redirect)
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          Fonts, theme + motion + locale providers, nav/footer
│   │   ├── template.tsx        Route transition (remounts per navigation)
│   │   ├── page.tsx            Home
│   │   ├── services/           10 service lines with benefits + deliverables
│   │   ├── portfolio/          Filterable, searchable project grid
│   │   ├── case-studies/[slug]/ Problem · Solution · Approach · Results · Quote
│   │   ├── blog/[slug]/        Article with related posts
│   │   ├── about/  contact/    Team, principles, history · form + Calendly
│   │   ├── privacy|terms|cookies|accessibility/
│   │   └── [...notFound]/      Localised 404 for unmatched URLs
│   ├── api/contact/route.ts    Validated, rate-limited, Resend delivery
│   ├── api/og/route.tsx        Dynamic Open Graph cards at the edge
│   └── sitemap.ts robots.ts manifest.ts
├── components/
│   ├── ui/                     Button, Card, Badge, Input, Textarea, Label,
│   │                           Accordion, DropdownMenu, Skeleton, Reveal,
│   │                           Counter, SectionHeading, ArcBackdrop
│   ├── layout/                 Navbar, Footer, Logo, ThemeToggle, LanguageSwitcher,
│   │                           ScrollProgress, CookieConsent, Analytics,
│   │                           PageHeader, Newsletter, LocaleProvider, MotionProvider
│   ├── sections/               Hero, ServicesGrid, PortfolioPreview, ProjectCard,
│   │                           TechMarquee, ProcessTimeline, Stats, Testimonials,
│   │                           Pricing, Faq, Cta
│   └── features/               ProjectFilter, BlogExplorer, ContactForm, CalendlyEmbed
├── content/                    services · projects · posts · testimonials ·
│                               pricing · faqs · process · tech · legal
└── lib/
    ├── i18n/                   config · paths · dictionaries/{en,de,fr}
    └── utils · site · seo · contact-schema
```

`src/content/*` is the CMS seam. Each file exports typed, locale-keyed documents behind a
`getX(locale)` accessor, so swapping the `copy` object for `await getProjects(locale)` from
Sanity, Contentful or Payload touches the content module only — no component changes.

## Languages

English, German and French. English is served unprefixed and the others carry a path
prefix, so `/services`, `/de/services` and `/fr/services` are the same page:

| URL | Behaviour |
| --- | --- |
| `/services` | English. Rewritten to `/en/services` internally; the URL never changes |
| `/de/services` | German, served as-is |
| `/en/services` | 307 to `/services`, so each page has one canonical URL |

There is no `Accept-Language` auto-redirect. It makes the canonical URL depend on the
visitor's browser, which confuses crawlers and breaks shared links — the switcher in the
navbar is the only thing that changes language, and it keeps you on the page you are reading.

- **UI copy** lives in `src/lib/i18n/dictionaries/`. `en.ts` defines the shape;
  `de.ts` and `fr.ts` are typed as `Dictionary`, so a missing key is a compile error, not a
  blank space in production. Anything that varies by count is a function, because German and
  French do not pluralise the way English does.
- **Content** lives in `src/content/*`, split into a language-neutral base (slugs, images,
  technologies, prices) and per-locale `copy`. Slugs are shared across languages, so
  hreflang pairs line up and the switcher can map any URL to its translation.
- **Server components** call `getDictionary(locale)`; **client components** use
  `useDictionary()` from `LocaleProvider`. Only the locale string crosses the boundary — the
  dictionary is resolved from bundled modules, so nothing is re-serialised on navigation.
  Case-study and article bodies are passed to the filter components as props rather than
  imported, keeping three languages of long-form copy out of the client bundle.
- **Adding a language** means adding it to `locales` in `src/lib/i18n/config.ts`, adding a
  dictionary, and adding a `copy` block to each content module. TypeScript lists every
  remaining gap.

### Known limitation

Unmatched URLs render the correct localised 404 page but answer with HTTP 200 rather than
404. Next's `notFound()` boundary cannot be used here: with the root layout inside
`[locale]`, a nested `not-found.tsx` renders to an empty document on the server. The
affected pages send `robots: noindex`, so they stay out of search results. Closing it
properly means either moving `<html>` into a root `app/layout.tsx` — which costs per-locale
`<html lang>` — or handling unknown paths in the middleware against a generated route list.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonicals, sitemap, OG URLs |
| `NEXT_PUBLIC_CALENDLY_URL` | optional | Inline scheduling widget |
| `NEXT_PUBLIC_GA_ID` | optional | GA4, loaded only after consent |
| `RESEND_API_KEY` | optional | Contact form delivery |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | optional | Enquiry routing |

Without `RESEND_API_KEY` the contact route validates the payload, logs it and returns
success, so the form is testable locally with no credentials.

## Accessibility

- WCAG 2.2 AA colour contrast in both themes
- Skip-to-content link, visible `:focus-visible` ring on every interactive element
- Radix primitives for the accordion (correct roles, keyboard operation)
- Filter and search results announced via `aria-live`; form errors use `role="alert"`
  and `aria-describedby`, and the first invalid field receives focus on failed submit
- The marquee duplicate track is `aria-hidden` with a plain text list for screen readers
- `prefers-reduced-motion` is respected without branching the rendered tree, which would
  break hydration. CSS stops the arc sweep, aurora drift and marquee; Framer Motion's
  `<MotionConfig reducedMotion="user">` snaps every transform, width and height so only
  opacity cross-fades remain; counters jump to their final value; the process line fills
  in one step (`useReducedMotionSafe`, which stays `false` until after hydration)

## Performance

- Fonts self-hosted and preloaded by `next/font`; no CLS from webfont swap
- Technology marquee is a CSS transform animation, not a scroll listener
- Counters use `requestAnimationFrame` gated by `useInView`, so they never run offscreen
- Calendly's widget (~90KB) is deferred behind an `IntersectionObserver`
- GA4 is not requested at all until consent is granted
- Project imagery is SVG served through `next/image` with `sizes` set per breakpoint;
  only the first card in a grid gets `priority`
- `optimizePackageImports` for `lucide-react` and `framer-motion` keeps icon imports tree-shaken

Reaching Lighthouse 95+ also depends on hosting. Run `npm run build && npm start` and audit
the production build — `next dev` scores considerably lower by design.

## What to replace before launch

1. Legal copy in `src/content/legal.ts` — placeholders written in the brand voice, not reviewed
   by counsel, in any of the three languages. A translated privacy policy is not a compliant
   one, and a German-language site additionally needs an Impressum (§ 5 DDG) that this
   document set does not provide.
2. Client names, metrics and quotes in `src/content/projects.ts` and `testimonials.ts` are
   illustrative. Publishing figures requires client sign-off.
   The `repoUrl` / `liveUrl` on two of them point at `example.com` and a fictional GitHub
   org — replace or delete. Both are optional: omit either and its link stops rendering,
   which is the normal case for closed-source client work.
3. Team members in `src/app/about/page.tsx`.
4. Project artwork in `public/images/projects/` — generated placeholders; swap for real
   screenshots (keep the 16:10 ratio).
