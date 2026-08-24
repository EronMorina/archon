# ARCHON — software studio website

A production-ready marketing site for a software development agency. Next.js App Router,
TypeScript, Tailwind, Framer Motion, shadcn/ui primitives, Lucide icons.

```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs without any of it
npm run dev                  # http://localhost:3000
```

## Design system

Monochrome, matching the mark. The signature element is the **apex**: a chevron drawn as
two strokes meeting at a point, with a solid triangle nested at its base. It recurs at four
scales — the logo, the hero backdrop's hairline chevron, section eyebrow rules, and the
closing CTA — so the brand is structural rather than decorative.

The palette carries no hue at all, only value. What saturation remains (6–12%) keeps greys
from looking muddy on OLED and cheap LCDs, and sits below the point where anyone would call
it a colour. Because the system is value-based, light and dark are true inversions rather
than two separately tuned palettes.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| Background | `hsl(220 14% 99%)` | `hsl(220 14% 5%)` | Paper / ink canvas |
| Foreground | `hsl(220 12% 8%)` | `hsl(220 10% 95%)` | Body text, and the source of every accent |
| Apex strong | `hsl(220 12% 10%)` | `hsl(220 10% 97%)` | Ramp anchor, primary surfaces |
| Apex mid | `hsl(220 8% 32%)` | `hsl(220 8% 74%)` | Ramp midpoint, glows |
| Apex soft | `hsl(220 7% 46%)` | `hsl(220 7% 58%)` | Confirmations, quiet marks |
| Destructive | `hsl(356 72% 47%)` | `hsl(356 76% 60%)` | The one surviving hue — errors must not rely on value alone |

`--apex-*` is a **value** ramp, not a colour one, so `bg-apex-gradient` is dark on paper and
light on ink. Anything placed on it uses `text-background` so it inverts in step — a
hard-coded `text-white` is only legible in one of the two themes, which is why the `apex`
button variant and every avatar avoid it.

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
│   │   ├── portfolio/          Live GitHub repositories, filterable by language
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
│   │                           Counter, SectionHeading, ApexBackdrop
│   ├── layout/                 Navbar, Footer, Logo, ThemeToggle, LanguageSwitcher,
│   │                           ScrollProgress, CookieConsent, Analytics,
│   │                           PageHeader, Newsletter, LocaleProvider, MotionProvider
│   ├── sections/               Hero, ServicesGrid, PortfolioPreview, RepoCard,
│   │                           TechMarquee, ProcessTimeline, Stats, Testimonials,
│   │                           Pricing, Faq, Cta
│   └── features/               RepoFilter, BlogExplorer, ContactForm, CalendlyEmbed
├── content/                    services · posts · testimonials ·
│                               pricing · faqs · process · tech · legal
└── lib/
    ├── i18n/                   config · paths · dictionaries/{en,de,fr}
    └── github · utils · site · seo · contact-schema
```

`src/content/*` is the CMS seam. Each file exports typed, locale-keyed documents behind a
`getX(locale)` accessor, so swapping the `copy` object for `await getPosts(locale)` from
Sanity, Contentful or Payload touches the content module only — no component changes.

## Portfolio

The portfolio is not written down anywhere in this repository. `src/lib/github.ts` reads the
public repositories of the account named in `site.github.user` (`src/lib/site.ts`) from the
GitHub REST API, and `/portfolio` renders them: name, description, language, topics, stars,
forks, last push, plus links to the repository and to its `homepage` where one is set. The
home page shows the three most recent described repositories.

Forks, archived and private repositories are excluded; anything else you want kept off the
site goes in the `hidden` array in `src/lib/github.ts`. So a repository that is pushed,
renamed, described, given topics or given a website appears on the site without a deploy —
the fetch is cached for an hour (`revalidate`), and the language filter tabs are derived
from whatever the account actually contains.

The call is unauthenticated by default and never throws: if GitHub is down, renamed or
rate-limiting the host, the list comes back empty, the page explains that and links to the
profile, and the home-page section removes itself rather than heading an empty grid.

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
  Article bodies are passed to the filter components as props rather than imported, keeping
  three languages of long-form copy out of the client bundle. Repositories are passed the
  same way, so the GitHub fetch stays on the server.
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
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonicals, sitemap, OG URLs. Absolute origin, e.g. `https://archon.studio`. A missing scheme is assumed to be `https`, a trailing slash is dropped, and blank counts as unset — leave it out entirely and it falls back to the production domain |
| `NEXT_PUBLIC_CALENDLY_URL` | optional | Inline scheduling widget |
| `NEXT_PUBLIC_GA_ID` | optional | GA4, loaded only after consent |
| `RESEND_API_KEY` | optional | Contact form delivery |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | optional | Enquiry routing |
| `GITHUB_TOKEN` | optional | Read-only token, purely to raise the GitHub API rate limit behind `/portfolio`. Unauthenticated requests allow 60 an hour per IP against one hourly fetch, so this is only needed if a shared host IP gets throttled |

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
  break hydration. CSS stops the apex sweep, bloom drift and marquee; Framer Motion's
  `<MotionConfig reducedMotion="user">` snaps every transform, width and height so only
  opacity cross-fades remain; counters jump to their final value; the process line fills
  in one step (`useReducedMotionSafe`, which stays `false` until after hydration)

## Performance

- Fonts self-hosted and preloaded by `next/font`; no CLS from webfont swap
- Technology marquee is a CSS transform animation, not a scroll listener
- Counters use `requestAnimationFrame` gated by `useInView`, so they never run offscreen
- Calendly's widget (~90KB) is deferred behind an `IntersectionObserver`
- GA4 is not requested at all until consent is granted
- Repository cards carry no imagery at all — the header block is typography, so the
  portfolio grid costs no image requests and cannot shift layout
- The GitHub list is fetched at build and revalidated hourly on the server; the browser
  never calls the API, and filtering runs against data already in the page
- `optimizePackageImports` for `lucide-react` and `framer-motion` keeps icon imports tree-shaken

Reaching Lighthouse 95+ also depends on hosting. Run `npm run build && npm start` and audit
the production build — `next dev` scores considerably lower by design.

## What to replace before launch

1. Legal copy in `src/content/legal.ts` — placeholders written in the brand voice, not reviewed
   by counsel, in any of the three languages. A translated privacy policy is not a compliant
   one, and a German-language site additionally needs an Impressum (§ 5 DDG) that this
   document set does not provide.
2. Client names, metrics and quotes in `src/content/testimonials.ts` are illustrative, as are
   the counters in `src/lib/i18n/dictionaries/*` under `stats`. Publishing figures requires
   client sign-off. The portfolio itself is real — it comes from GitHub — so the testimonials
   sitting beside it are now the least believable thing on the page.
3. Contact details in `src/lib/site.ts` — `phone` is a reserved fictional number
   (555-0132) and `address` is an invented San Francisco office. Neither is shown on the
   contact page any more, but **both are still published in the Schema.org graph on every
   page**, and the city still appears in the footer. Structured data is what search engines
   read, so invented location data is worse than none: either replace both with real
   details, or delete `phone` and `address` and strip `telephone` / `PostalAddress` from
   `organisationSchema` in `src/lib/seo.ts` and the contact page schema.
4. Team members in `src/app/[locale]/about/page.tsx` — names, initials and avatar gradients
   live in that file; their roles and focus areas are in `pages.about.team` in each
   dictionary, so a new hire needs editing in four places.
5. Repository descriptions, topics and website fields are edited on GitHub, not here. They
   are the portfolio copy now: a repository with no description renders as "No description
   on GitHub yet", and one with no `homepage` shows no live link.
