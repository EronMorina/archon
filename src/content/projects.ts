import type { Locale } from '@/lib/i18n/config'

/**
 * Portfolio + case study source.
 *
 * Shape mirrors a headless CMS document with per-locale fields, so `copy` can
 * be swapped for an async `getProjects(locale)` fetch without touching a single
 * component. Slugs, imagery, client names and technology lists are shared
 * across locales; everything a reader reads is translated.
 */
export type ProjectCategory = 'webApp' | 'website' | 'ai' | 'automation' | 'mobile' | 'ecommerce'

export type ProjectSlug =
  | 'northwind-freight-platform'
  | 'lumen-health-triage'
  | 'atlas-capital-portal'
  | 'verdance-commerce'
  | 'cadence-field-app'
  | 'meridian-onboarding-automation'

type ProjectBase = {
  slug: ProjectSlug
  client: string
  category: ProjectCategory
  year: string
  image: string
  accent: string
  technologies: string[]
  featured: boolean
  /** Quote attribution — a person's name, never translated. */
  quoteAuthor: string
  /**
   * Outbound links, both optional. Omit either one and its button simply does
   * not render — client work is usually closed-source, and not every build is
   * still online. URLs are language-neutral, so they live in the base.
   */
  repoUrl?: string
  liveUrl?: string
}

type ProjectCopy = {
  title: string
  industry: string
  summary: string
  imageAlt: string
  metrics: { label: string; value: string }[]
  caseStudy: {
    problem: string
    solution: string
    approach: { title: string; detail: string }[]
    results: string[]
    quote: { text: string; role: string }
    duration: string
    team: string
  }
}

export type Project = Omit<ProjectBase, 'quoteAuthor'> &
  Omit<ProjectCopy, 'caseStudy'> & {
    caseStudy: Omit<ProjectCopy['caseStudy'], 'quote'> & {
      quote: { text: string; author: string; role: string }
    }
  }

const base: ProjectBase[] = [
  {
    slug: 'northwind-freight-platform',
    client: 'Northwind Logistics',
    category: 'webApp',
    year: '2026',
    image: '/images/projects/northwind.svg',
    accent: 'from-apex-strong/25 to-apex-soft/10',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Node.js', 'AWS', 'Docker'],
    featured: true,
    quoteAuthor: 'Marta Kowalczyk',
    // Placeholder links, same fictional org as `site.socials`. Replace or delete.
    repoUrl: 'https://github.com/archon-studio/northwind-freight-platform',
    liveUrl: 'https://northwind.example.com',
  },
  {
    slug: 'lumen-health-triage',
    client: 'Lumen Health',
    category: 'ai',
    year: '2025',
    image: '/images/projects/lumen.svg',
    accent: 'from-apex-mid/25 to-apex-strong/10',
    technologies: ['Python', 'Claude API', 'Next.js', 'PostgreSQL', 'AWS', 'TypeScript'],
    featured: true,
    quoteAuthor: 'Dr. Priya Raman',
  },
  {
    slug: 'atlas-capital-portal',
    client: 'Atlas Capital',
    category: 'webApp',
    year: '2025',
    image: '/images/projects/atlas.svg',
    accent: 'from-apex-soft/20 to-apex-mid/10',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Node.js', 'Docker', 'AWS'],
    featured: true,
    quoteAuthor: 'Daniel Osei',
  },
  {
    slug: 'verdance-commerce',
    client: 'Verdance',
    category: 'ecommerce',
    year: '2025',
    image: '/images/projects/verdance.svg',
    accent: 'from-apex-soft/25 to-apex-strong/10',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Firebase', 'Docker'],
    featured: false,
    quoteAuthor: 'Amelia Fournier',
    // Live-only: a commerce build with no public repo.
    liveUrl: 'https://verdance.example.com',
  },
  {
    slug: 'cadence-field-app',
    client: 'Cadence Utilities',
    category: 'mobile',
    year: '2024',
    image: '/images/projects/cadence.svg',
    accent: 'from-apex-mid/20 to-apex-soft/10',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    featured: false,
    quoteAuthor: 'Tom Bridger',
  },
  {
    slug: 'meridian-onboarding-automation',
    client: 'Meridian Advisory',
    category: 'automation',
    year: '2024',
    image: '/images/projects/meridian.svg',
    accent: 'from-apex-strong/20 to-apex-mid/10',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript'],
    featured: false,
    quoteAuthor: 'Sarah Lindqvist',
  },
]

const copy: Record<Locale, Record<ProjectSlug, ProjectCopy>> = {
  en: {
    'northwind-freight-platform': {
      title: 'Freight Operations Platform',
      industry: 'Logistics',
      summary:
        'Replaced fourteen spreadsheets and a shared inbox with one dispatch platform used by 240 operators across nine depots.',
      imageAlt: 'Dispatch board interface showing live freight loads across nine depots',
      metrics: [
        { label: 'Dispatch time', value: '−63%' },
        { label: 'Depots live', value: '9' },
        { label: 'Daily loads', value: '4.1k' },
      ],
      caseStudy: {
        problem:
          'Northwind coordinated 4,000 daily freight loads through spreadsheets emailed between depots. Two depots could accept the same load, and nobody knew until a driver arrived. Reconciliation ran four days behind, so margin per load was a monthly guess rather than a live number.',
        solution:
          'We built a single dispatch platform with optimistic locking on every load, live depot presence, and a pricing engine that calculates margin at the moment of assignment. The shared inbox became a structured queue with ownership and escalation.',
        approach: [
          {
            title: 'Two weeks in the depots',
            detail:
              'We sat with dispatchers in Leeds and Rotterdam before writing code, and recorded the twelve keyboard shortcuts they wanted most.',
          },
          {
            title: 'Migrated depot by depot',
            detail:
              'Each depot ran the new platform alongside spreadsheets for one week, so a rollback never risked a shipment.',
          },
          {
            title: 'Offline-tolerant by design',
            detail:
              'Depot networks drop. The dispatch board queues actions locally and reconciles on reconnect with conflict resolution.',
          },
        ],
        results: [
          'Average time to dispatch a load fell from 11 minutes to 4 minutes',
          'Double-booked loads went from roughly 30 a week to zero in six months',
          'Margin per load became visible in real time instead of monthly',
          'Finance closed the month in one day instead of four',
        ],
        quote: {
          text: 'The dispatch board is the first system our depot managers have ever asked for more of. Adoption took a fortnight, not a quarter.',
          role: 'COO, Northwind Logistics',
        },
        duration: '7 months',
        team: '2 engineers, 1 designer, 1 PM',
      },
    },
    'lumen-health-triage': {
      title: 'Clinical Intake Triage',
      industry: 'Healthcare',
      summary:
        'An AI intake assistant that reads referral letters, extracts structured fields and routes each patient to the right clinic.',
      imageAlt: 'Clinical triage queue with extracted referral fields and confidence indicators',
      metrics: [
        { label: 'Triage time', value: '−71%' },
        { label: 'Field accuracy', value: '98.4%' },
        { label: 'Letters/month', value: '52k' },
      ],
      caseStudy: {
        problem:
          'Lumen received 52,000 referral letters a month as scanned PDFs and faxes. Nurses spent the first two hours of every shift reading them and typing fields into the patient record. Urgent referrals occasionally sat in the queue for three days.',
        solution:
          'We built a document pipeline that OCRs each referral, extracts 23 structured fields with a language model, scores urgency against clinical criteria, and presents a nurse with a pre-filled record to confirm or correct. The human stayed in the loop on every decision.',
        approach: [
          {
            title: 'Built the eval set first',
            detail:
              'Clinicians labelled 1,200 historical referrals before we chose a model, so quality was measured against ground truth from day one.',
          },
          {
            title: 'Confidence-gated autofill',
            detail:
              'Fields below a confidence threshold are left blank and flagged rather than guessed, because a wrong date of birth is worse than an empty one.',
          },
          {
            title: 'Every correction is training data',
            detail: 'Nurse edits feed a weekly report showing exactly which field types still need work.',
          },
        ],
        results: [
          'Time to triage a referral fell from 9 minutes to 2.6 minutes',
          'Field extraction accuracy reached 98.4% on a held-out clinical test set',
          'Urgent referrals now flagged within 4 minutes of arrival',
          'Nursing time returned to direct patient care: roughly 310 hours a month',
        ],
        quote: {
          text: 'They refused to ship until the evaluation numbers satisfied our clinical governance board. That is not how our previous vendors worked.',
          role: 'Clinical Director, Lumen Health',
        },
        duration: '9 months',
        team: '2 engineers, 1 ML engineer, 1 designer',
      },
    },
    'atlas-capital-portal': {
      title: 'Investor Reporting Portal',
      industry: 'Financial Services',
      summary:
        'Quarterly investor reporting moved from 900 bespoke PDF emails to a self-serve portal with audit-grade permissions.',
      imageAlt: 'Investor portal dashboard showing fund performance and document vault',
      metrics: [
        { label: 'Reporting cycle', value: '3 wks → 2 days' },
        { label: 'LPs served', value: '900+' },
        { label: 'Audit findings', value: '0' },
      ],
      caseStudy: {
        problem:
          'Every quarter, Atlas assembled 900 individual PDF packs by hand and emailed them to limited partners. One misaddressed email meant one investor seeing another fund position — a reportable breach. The cycle consumed three weeks of the finance team.',
        solution:
          'A permissioned portal where each LP sees exactly their positions, with documents generated from a single data source and access logged to the row level. Reporting became a review-and-publish step rather than three weeks of assembly.',
        approach: [
          {
            title: 'Permissions modelled before UI',
            detail:
              'We wrote the access model as executable tests first, then built the interface on top of a layer that already refused wrong reads.',
          },
          {
            title: 'Documents generated, never assembled',
            detail: 'Every PDF renders from the same figures the portal shows, so the two can never disagree.',
          },
          {
            title: 'Immutable access log',
            detail:
              'Who viewed which document and when, append-only, ready for the annual audit without a data pull.',
          },
        ],
        results: [
          'Quarterly reporting cycle cut from three weeks to two days',
          'Zero findings on access control in the subsequent SOC 2 audit',
          '78% of LPs now self-serve documents instead of emailing the fund',
          'Finance team redeployed to fund analysis',
        ],
        quote: {
          text: 'Our auditors asked how we produced the access log so quickly. It was one export. That answer alone justified the project.',
          role: 'CFO, Atlas Capital',
        },
        duration: '6 months',
        team: '2 engineers, 1 designer',
      },
    },
    'verdance-commerce': {
      title: 'Direct-to-Consumer Storefront',
      industry: 'Retail',
      summary:
        'A headless storefront rebuild that took checkout from five steps to one screen and lifted conversion by 34%.',
      imageAlt: 'Product page and single-screen checkout for a plant care brand',
      metrics: [
        { label: 'Conversion', value: '+34%' },
        { label: 'LCP', value: '0.9s' },
        { label: 'Cart abandon', value: '−22%' },
      ],
      caseStudy: {
        problem:
          'Verdance had strong traffic and weak checkout. A five-step flow on a theme-based storefront took 6.4 seconds to render its first product image on mobile, and 71% of carts were abandoned at the shipping step.',
        solution:
          'We rebuilt the storefront headless on Next.js, collapsed checkout into a single screen with address autocomplete and wallet payments, and instrumented every step so the next decision came from data rather than opinion.',
        approach: [
          {
            title: 'Measured before touching design',
            detail:
              'Two weeks of funnel instrumentation showed the drop-off was shipping cost surprise, not payment friction.',
          },
          {
            title: 'Shipping shown on the product page',
            detail: 'The cost that was killing carts now appears before anyone adds to cart.',
          },
          {
            title: 'Images at the right size',
            detail: 'AVIF with responsive sources cut the median product page payload by 74%.',
          },
        ],
        results: [
          'Checkout conversion up 34% within two months of launch',
          'Largest Contentful Paint down from 6.4s to 0.9s on 4G mobile',
          'Cart abandonment down 22 percentage points',
          'Organic revenue up 41% year on year on flat ad spend',
        ],
        quote: {
          text: 'They told us our problem was shipping copy, not our design. They were right, and it cost us a fraction of a redesign.',
          role: 'Founder, Verdance',
        },
        duration: '4 months',
        team: '1 engineer, 1 designer',
      },
    },
    'cadence-field-app': {
      title: 'Field Engineer Mobile App',
      industry: 'Energy',
      summary:
        'An offline-first React Native app for 1,100 field engineers working in basements and substations with no signal.',
      imageAlt: 'Mobile job card interface with offline sync indicator and photo capture',
      metrics: [
        { label: 'Jobs offline', value: '100%' },
        { label: 'Paperwork', value: '−80%' },
        { label: 'Engineers', value: '1.1k' },
      ],
      caseStudy: {
        problem:
          'Cadence engineers completed job sheets on paper because the previous app required signal, and substations have none. Sheets were photographed at the end of a shift and typed up by an admin team, adding a two-day lag and a transcription error rate above 5%.',
        solution:
          'An offline-first app where the local database is the source of truth for the shift and syncs when signal returns. Photos, signatures and meter readings are captured on-site and reconciled server-side with conflict handling.',
        approach: [
          {
            title: 'Designed for one thumb and gloves',
            detail:
              'Targets are 56px minimum, and the primary action sits within thumb reach on a 6.1-inch screen.',
          },
          {
            title: 'Sync you can see',
            detail:
              'Engineers distrusted the old app because sync was invisible. A per-job status chip fixed adoption more than any feature.',
          },
          {
            title: 'Piloted with the sceptics',
            detail: 'We ran the pilot with the depot that complained most, and shipped their fixes first.',
          },
        ],
        results: [
          'Paper job sheets down 80% in the first quarter after rollout',
          'Transcription errors effectively eliminated',
          'Job data available to planners the same hour instead of two days later',
          '1,100 engineers onboarded across 14 depots in eight weeks',
        ],
        quote: {
          text: 'The sync indicator sounds trivial. It is the reason a thousand engineers trusted the app by week two.',
          role: 'Head of Field Operations, Cadence Utilities',
        },
        duration: '8 months',
        team: '2 engineers, 1 designer',
      },
    },
    'meridian-onboarding-automation': {
      title: 'Client Onboarding Automation',
      industry: 'Professional Services',
      summary:
        'Twenty-two manual handoffs across five systems reduced to one event-driven pipeline with full audit history.',
      imageAlt: 'Automation pipeline view showing onboarding stages and retry status',
      metrics: [
        { label: 'Onboarding', value: '11 days → 36 hrs' },
        { label: 'Manual steps', value: '22 → 3' },
        { label: 'Hours saved/mo', value: '340' },
      ],
      caseStudy: {
        problem:
          'Onboarding a Meridian client touched five systems and twenty-two manual steps, coordinated over email. Average time to first billable work was eleven days, and roughly one in six clients stalled because a step was silently skipped.',
        solution:
          'An event-driven pipeline where each onboarding stage emits an event and the next stage subscribes. Failed steps retry with backoff and escalate to a named owner after two attempts, so nothing waits in silence.',
        approach: [
          {
            title: 'Mapped the real process, not the documented one',
            detail:
              'Interviews surfaced nine undocumented steps that the official process diagram had never included.',
          },
          {
            title: 'Idempotent from the start',
            detail:
              'Every step can run twice without creating a duplicate record, which makes retries safe rather than risky.',
          },
          {
            title: 'Kept three humans in the loop',
            detail:
              'Approval, risk sign-off and the welcome call stayed manual on purpose. Automation served the judgement calls instead of replacing them.',
          },
        ],
        results: [
          'Time to first billable work down from 11 days to 36 hours',
          'Stalled onboardings dropped from 17% to under 2%',
          'Roughly 340 admin hours returned to the business each month',
          'Complete audit trail per client, generated automatically',
        ],
        quote: {
          text: 'ARCHON spent the first fortnight documenting how we actually work. The automation was almost a formality after that.',
          role: 'Managing Partner, Meridian Advisory',
        },
        duration: '5 months',
        team: '2 engineers, 1 PM',
      },
    },
  },

  de: {
    'northwind-freight-platform': {
      title: 'Plattform für den Speditionsbetrieb',
      industry: 'Logistik',
      summary:
        'Vierzehn Tabellen und ein Sammelpostfach ersetzt durch eine Dispositionsplattform, die 240 Disponenten in neun Depots nutzen.',
      imageAlt: 'Dispositionsoberfläche mit laufenden Frachtaufträgen über neun Depots hinweg',
      metrics: [
        { label: 'Dispositionszeit', value: '−63 %' },
        { label: 'Depots live', value: '9' },
        { label: 'Aufträge pro Tag', value: '4,1 Tsd.' },
      ],
      caseStudy: {
        problem:
          'Northwind koordinierte täglich 4.000 Frachtaufträge über Tabellen, die zwischen den Depots hin- und hergemailt wurden. Zwei Depots konnten denselben Auftrag annehmen, und niemand merkte es, bis ein Fahrer vor Ort stand. Der Abgleich hinkte vier Tage hinterher, sodass die Marge pro Auftrag eine monatliche Schätzung war statt einer laufenden Zahl.',
        solution:
          'Wir haben eine einzige Dispositionsplattform gebaut: optimistisches Sperren für jeden Auftrag, Live-Anwesenheit der Depots und eine Preislogik, die die Marge im Moment der Zuteilung berechnet. Aus dem Sammelpostfach wurde eine strukturierte Warteschlange mit klarer Zuständigkeit und Eskalation.',
        approach: [
          {
            title: 'Zwei Wochen in den Depots',
            detail:
              'Wir saßen mit den Disponenten in Leeds und Rotterdam zusammen, bevor eine Zeile Code entstand, und notierten die zwölf Tastenkürzel, die sie sich am meisten wünschten.',
          },
          {
            title: 'Depot für Depot migriert',
            detail:
              'Jedes Depot fuhr die neue Plattform eine Woche lang parallel zu den Tabellen, sodass ein Rollback nie eine Sendung gefährdete.',
          },
          {
            title: 'Offline-tolerant konzipiert',
            detail:
              'Depotnetze fallen aus. Die Dispositionsoberfläche puffert Aktionen lokal und gleicht sie bei Wiederverbindung mit Konfliktauflösung ab.',
          },
        ],
        results: [
          'Die durchschnittliche Zeit bis zur Disposition eines Auftrags sank von 11 auf 4 Minuten',
          'Doppelt vergebene Aufträge gingen binnen sechs Monaten von rund 30 pro Woche auf null zurück',
          'Die Marge pro Auftrag wurde in Echtzeit sichtbar statt monatlich',
          'Die Buchhaltung schloss den Monat in einem Tag ab statt in vier',
        ],
        quote: {
          text: 'Die Dispositionsoberfläche ist das erste System, von dem unsere Depotleiter je mehr haben wollten. Die Einführung dauerte vierzehn Tage, nicht ein Quartal.',
          role: 'COO, Northwind Logistics',
        },
        duration: '7 Monate',
        team: '2 Entwickler, 1 Designerin, 1 PM',
      },
    },
    'lumen-health-triage': {
      title: 'Klinische Aufnahme-Triage',
      industry: 'Gesundheitswesen',
      summary:
        'Ein KI-Assistent für die Aufnahme, der Überweisungsschreiben liest, strukturierte Felder extrahiert und jeden Patienten an die richtige Klinik weiterleitet.',
      imageAlt: 'Triage-Warteschlange mit extrahierten Überweisungsfeldern und Konfidenzanzeigen',
      metrics: [
        { label: 'Triage-Zeit', value: '−71 %' },
        { label: 'Feldgenauigkeit', value: '98,4 %' },
        { label: 'Schreiben/Monat', value: '52 Tsd.' },
      ],
      caseStudy: {
        problem:
          'Bei Lumen gingen monatlich 52.000 Überweisungsschreiben als gescannte PDFs und Faxe ein. Pflegekräfte verbrachten die ersten zwei Stunden jeder Schicht damit, sie zu lesen und Felder in die Patientenakte zu tippen. Dringende Überweisungen lagen gelegentlich drei Tage in der Warteschlange.',
        solution:
          'Wir haben eine Dokumentstrecke gebaut, die jede Überweisung per OCR erfasst, 23 strukturierte Felder mit einem Sprachmodell extrahiert, die Dringlichkeit an klinischen Kriterien bewertet und der Pflegekraft eine vorausgefüllte Akte zur Bestätigung oder Korrektur vorlegt. Bei jeder Entscheidung blieb ein Mensch im Prozess.',
        approach: [
          {
            title: 'Zuerst den Evaluationsdatensatz',
            detail:
              'Klinisches Personal hat 1.200 historische Überweisungen annotiert, bevor wir ein Modell wählten — so wurde Qualität vom ersten Tag an gegen Referenzdaten gemessen.',
          },
          {
            title: 'Autoausfüllen nur bei hoher Konfidenz',
            detail:
              'Felder unterhalb der Konfidenzschwelle bleiben leer und werden markiert statt geraten, denn ein falsches Geburtsdatum ist schlimmer als ein leeres.',
          },
          {
            title: 'Jede Korrektur ist Trainingsmaterial',
            detail:
              'Korrekturen der Pflegekräfte fließen in einen Wochenbericht, der genau zeigt, welche Feldtypen noch Arbeit brauchen.',
          },
        ],
        results: [
          'Die Zeit für die Triage einer Überweisung sank von 9 auf 2,6 Minuten',
          'Die Extraktionsgenauigkeit erreichte 98,4 % auf einem zurückgehaltenen klinischen Testdatensatz',
          'Dringende Überweisungen werden nun innerhalb von 4 Minuten nach Eingang markiert',
          'Rund 310 Pflegestunden pro Monat fließen zurück in die direkte Patientenversorgung',
        ],
        quote: {
          text: 'Sie weigerten sich auszuliefern, bis die Evaluationszahlen unser klinisches Governance-Gremium zufriedenstellten. So haben unsere bisherigen Dienstleister nicht gearbeitet.',
          role: 'Ärztliche Direktorin, Lumen Health',
        },
        duration: '9 Monate',
        team: '2 Entwickler, 1 ML-Engineer, 1 Designerin',
      },
    },
    'atlas-capital-portal': {
      title: 'Portal für Investorenberichte',
      industry: 'Finanzdienstleistungen',
      summary:
        'Die vierteljährliche Investorenberichterstattung ist von 900 einzeln erstellten PDF-Mails auf ein Self-Service-Portal mit auditfesten Berechtigungen umgezogen.',
      imageAlt: 'Investorenportal mit Fondsentwicklung und Dokumentenarchiv',
      metrics: [
        { label: 'Berichtszyklus', value: '3 Wo. → 2 Tage' },
        { label: 'Betreute LPs', value: '900+' },
        { label: 'Auditfeststellungen', value: '0' },
      ],
      caseStudy: {
        problem:
          'Jedes Quartal stellte Atlas 900 einzelne PDF-Pakete von Hand zusammen und mailte sie an die Kommanditisten. Eine falsch adressierte Mail bedeutete, dass ein Investor die Position eines anderen sah — ein meldepflichtiger Verstoß. Der Zyklus verschlang drei Wochen des Finanzteams.',
        solution:
          'Ein berechtigungsgesteuertes Portal, in dem jeder Kommanditist genau seine Positionen sieht, mit Dokumenten aus einer einzigen Datenquelle und zeilengenau protokolliertem Zugriff. Aus der Berichterstattung wurde ein Prüfen-und-Freigeben-Schritt statt drei Wochen Zusammenbau.',
        approach: [
          {
            title: 'Berechtigungen vor der Oberfläche modelliert',
            detail:
              'Wir haben das Zugriffsmodell zuerst als ausführbare Tests geschrieben und die Oberfläche dann auf einer Schicht gebaut, die falsche Zugriffe bereits verweigerte.',
          },
          {
            title: 'Dokumente werden erzeugt, nie zusammengestellt',
            detail:
              'Jedes PDF entsteht aus denselben Zahlen, die das Portal zeigt — die beiden können gar nicht auseinanderlaufen.',
          },
          {
            title: 'Unveränderliches Zugriffsprotokoll',
            detail:
              'Wer wann welches Dokument gesehen hat, ausschließlich anfügend, bereit für das Jahresaudit ohne Datenextraktion.',
          },
        ],
        results: [
          'Der Quartalszyklus verkürzte sich von drei Wochen auf zwei Tage',
          'Keine einzige Feststellung zur Zugriffskontrolle im darauffolgenden SOC-2-Audit',
          '78 % der Kommanditisten holen Dokumente jetzt selbst ab, statt den Fonds anzumailen',
          'Das Finanzteam arbeitet nun an der Fondsanalyse',
        ],
        quote: {
          text: 'Unsere Prüfer fragten, wie wir das Zugriffsprotokoll so schnell erzeugt hätten. Es war ein einziger Export. Diese Antwort allein hat das Projekt gerechtfertigt.',
          role: 'CFO, Atlas Capital',
        },
        duration: '6 Monate',
        team: '2 Entwickler, 1 Designerin',
      },
    },
    'verdance-commerce': {
      title: 'Direktvertriebs-Shop',
      industry: 'Handel',
      summary:
        'Ein Headless-Neubau des Shops, der den Checkout von fünf Schritten auf einen Bildschirm brachte und die Konversion um 34 % steigerte.',
      imageAlt: 'Produktseite und einseitiger Checkout einer Marke für Pflanzenpflege',
      metrics: [
        { label: 'Konversion', value: '+34 %' },
        { label: 'LCP', value: '0,9 s' },
        { label: 'Kaufabbrüche', value: '−22 %' },
      ],
      caseStudy: {
        problem:
          'Verdance hatte starken Traffic und einen schwachen Checkout. Ein fünfstufiger Ablauf auf einem themenbasierten Shop brauchte auf Mobilgeräten 6,4 Sekunden bis zum ersten Produktbild, und 71 % der Warenkörbe wurden beim Versandschritt abgebrochen.',
        solution:
          'Wir haben den Shop headless auf Next.js neu gebaut, den Checkout auf einen Bildschirm mit Adressvervollständigung und Wallet-Zahlungen zusammengezogen und jeden Schritt gemessen, damit die nächste Entscheidung aus Daten kam statt aus Meinungen.',
        approach: [
          {
            title: 'Gemessen, bevor am Design gearbeitet wurde',
            detail:
              'Zwei Wochen Funnel-Messung zeigten: Der Abbruch kam von der Überraschung über die Versandkosten, nicht von Reibung bei der Zahlung.',
          },
          {
            title: 'Versandkosten auf der Produktseite',
            detail:
              'Die Kosten, die Warenkörbe kosteten, erscheinen jetzt, bevor überhaupt jemand etwas in den Warenkorb legt.',
          },
          {
            title: 'Bilder in der richtigen Größe',
            detail: 'AVIF mit responsiven Quellen senkte die mediane Datenmenge der Produktseite um 74 %.',
          },
        ],
        results: [
          'Die Checkout-Konversion stieg binnen zwei Monaten nach dem Start um 34 %',
          'Largest Contentful Paint sank auf 4G-Mobilgeräten von 6,4 s auf 0,9 s',
          'Die Abbruchquote im Warenkorb sank um 22 Prozentpunkte',
          'Der organische Umsatz stieg im Jahresvergleich um 41 % bei gleichbleibendem Werbebudget',
        ],
        quote: {
          text: 'Sie sagten uns, unser Problem sei der Versandtext, nicht unser Design. Sie hatten recht, und es kostete uns einen Bruchteil eines Relaunchs.',
          role: 'Gründerin, Verdance',
        },
        duration: '4 Monate',
        team: '1 Entwickler, 1 Designerin',
      },
    },
    'cadence-field-app': {
      title: 'Mobile App für den Außendienst',
      industry: 'Energie',
      summary:
        'Eine Offline-first-App auf React Native für 1.100 Servicetechniker, die in Kellern und Umspannwerken ohne Empfang arbeiten.',
      imageAlt: 'Mobile Auftragskarte mit Offline-Synchronisationsanzeige und Fotoaufnahme',
      metrics: [
        { label: 'Aufträge offline', value: '100 %' },
        { label: 'Papierkram', value: '−80 %' },
        { label: 'Techniker', value: '1,1 Tsd.' },
      ],
      caseStudy: {
        problem:
          'Die Techniker von Cadence füllten Auftragsscheine auf Papier aus, weil die alte App Empfang brauchte — und Umspannwerke haben keinen. Die Scheine wurden am Schichtende fotografiert und von einem Backoffice abgetippt, was zwei Tage Verzug und eine Übertragungsfehlerquote über 5 % bedeutete.',
        solution:
          'Eine Offline-first-App, in der die lokale Datenbank für die Schicht die maßgebliche Quelle ist und synchronisiert, sobald wieder Empfang besteht. Fotos, Unterschriften und Zählerstände werden vor Ort erfasst und serverseitig mit Konfliktbehandlung abgeglichen.',
        approach: [
          {
            title: 'Für einen Daumen und Handschuhe entworfen',
            detail:
              'Bedienflächen sind mindestens 56 px groß, und die Hauptaktion liegt auf einem 6,1-Zoll-Bildschirm in Daumenreichweite.',
          },
          {
            title: 'Synchronisation, die man sieht',
            detail:
              'Die Techniker misstrauten der alten App, weil die Synchronisation unsichtbar war. Ein Statuschip je Auftrag hat für die Akzeptanz mehr getan als jede Funktion.',
          },
          {
            title: 'Pilot mit den Skeptikern',
            detail:
              'Wir haben den Pilotbetrieb im Depot mit den meisten Beschwerden gefahren und deren Korrekturen zuerst ausgeliefert.',
          },
        ],
        results: [
          'Papier-Auftragsscheine gingen im ersten Quartal nach dem Rollout um 80 % zurück',
          'Übertragungsfehler wurden praktisch beseitigt',
          'Auftragsdaten stehen der Planung in derselben Stunde zur Verfügung statt zwei Tage später',
          '1.100 Techniker in 14 Depots binnen acht Wochen eingeführt',
        ],
        quote: {
          text: 'Die Synchronisationsanzeige klingt banal. Sie ist der Grund, warum tausend Techniker der App schon in Woche zwei vertraut haben.',
          role: 'Leiter Außendienst, Cadence Utilities',
        },
        duration: '8 Monate',
        team: '2 Entwickler, 1 Designerin',
      },
    },
    'meridian-onboarding-automation': {
      title: 'Automatisiertes Kunden-Onboarding',
      industry: 'Professionelle Dienstleistungen',
      summary:
        'Zweiundzwanzig manuelle Übergaben über fünf Systeme, reduziert auf eine ereignisgesteuerte Strecke mit vollständiger Audit-Historie.',
      imageAlt: 'Ansicht der Automatisierungsstrecke mit Onboarding-Stufen und Wiederholungsstatus',
      metrics: [
        { label: 'Onboarding', value: '11 Tage → 36 Std.' },
        { label: 'Manuelle Schritte', value: '22 → 3' },
        { label: 'Gespart Std./Monat', value: '340' },
      ],
      caseStudy: {
        problem:
          'Das Onboarding eines Meridian-Kunden berührte fünf Systeme und zweiundzwanzig manuelle Schritte, koordiniert per E-Mail. Bis zur ersten abrechenbaren Arbeit vergingen im Schnitt elf Tage, und etwa jeder sechste Kunde blieb stecken, weil ein Schritt stillschweigend übersprungen wurde.',
        solution:
          'Eine ereignisgesteuerte Strecke, in der jede Onboarding-Stufe ein Ereignis aussendet und die nächste es abonniert. Fehlgeschlagene Schritte werden mit Backoff wiederholt und nach zwei Versuchen an eine benannte Zuständige eskaliert, damit nichts stumm liegen bleibt.',
        approach: [
          {
            title: 'Den echten Prozess kartiert, nicht den dokumentierten',
            detail:
              'In Interviews kamen neun undokumentierte Schritte zutage, die im offiziellen Prozessdiagramm nie vorkamen.',
          },
          {
            title: 'Von Anfang an idempotent',
            detail:
              'Jeder Schritt lässt sich zweimal ausführen, ohne einen doppelten Datensatz zu erzeugen — das macht Wiederholungen sicher statt riskant.',
          },
          {
            title: 'Drei Menschen bewusst im Prozess belassen',
            detail:
              'Freigabe, Risikoabnahme und das Willkommensgespräch blieben absichtlich manuell. Die Automatisierung diente den Ermessensentscheidungen, statt sie zu ersetzen.',
          },
        ],
        results: [
          'Die Zeit bis zur ersten abrechenbaren Arbeit sank von 11 Tagen auf 36 Stunden',
          'Steckengebliebene Onboardings fielen von 17 % auf unter 2 %',
          'Rund 340 Verwaltungsstunden pro Monat fließen zurück ins Geschäft',
          'Vollständiger Audit-Trail je Kunde, automatisch erzeugt',
        ],
        quote: {
          text: 'ARCHON hat die ersten vierzehn Tage damit verbracht zu dokumentieren, wie wir tatsächlich arbeiten. Die Automatisierung war danach fast eine Formsache.',
          role: 'Geschäftsführende Partnerin, Meridian Advisory',
        },
        duration: '5 Monate',
        team: '2 Entwickler, 1 PM',
      },
    },
  },

  fr: {
    'northwind-freight-platform': {
      title: 'Plateforme d’exploitation du fret',
      industry: 'Logistique',
      summary:
        'Quatorze tableurs et une boîte partagée remplacés par une plateforme de répartition utilisée par 240 opérateurs sur neuf dépôts.',
      imageAlt: 'Interface de répartition affichant les chargements en cours sur neuf dépôts',
      metrics: [
        { label: 'Temps de répartition', value: '−63 %' },
        { label: 'Dépôts en service', value: '9' },
        { label: 'Chargements par jour', value: '4,1 k' },
      ],
      caseStudy: {
        problem:
          'Northwind coordonnait 4 000 chargements par jour au moyen de tableurs échangés par e-mail entre les dépôts. Deux dépôts pouvaient accepter le même chargement, et personne ne le savait avant l’arrivée d’un chauffeur. Le rapprochement accusait quatre jours de retard : la marge par chargement était une estimation mensuelle, pas un chiffre en direct.',
        solution:
          'Nous avons construit une plateforme de répartition unique : verrouillage optimiste sur chaque chargement, présence des dépôts en temps réel, et un moteur tarifaire qui calcule la marge au moment de l’affectation. La boîte partagée est devenue une file structurée, avec responsable désigné et escalade.',
        approach: [
          {
            title: 'Deux semaines dans les dépôts',
            detail:
              'Nous nous sommes assis avec les répartiteurs de Leeds et de Rotterdam avant d’écrire la moindre ligne de code, et avons relevé les douze raccourcis clavier qu’ils réclamaient le plus.',
          },
          {
            title: 'Migration dépôt par dépôt',
            detail:
              'Chaque dépôt a fait tourner la nouvelle plateforme en parallèle des tableurs pendant une semaine : un retour arrière n’a jamais mis une expédition en risque.',
          },
          {
            title: 'Tolérant au hors-ligne par conception',
            detail:
              'Les réseaux des dépôts tombent. Le tableau de répartition met les actions en file localement et les réconcilie à la reconnexion, avec résolution de conflits.',
          },
        ],
        results: [
          'Le temps moyen pour affecter un chargement est passé de 11 à 4 minutes',
          'Les doubles affectations sont passées d’environ 30 par semaine à zéro en six mois',
          'La marge par chargement est devenue visible en temps réel, et non plus une fois par mois',
          'La clôture comptable mensuelle se fait en un jour au lieu de quatre',
        ],
        quote: {
          text: 'Le tableau de répartition est le premier système dont nos chefs de dépôt aient jamais redemandé. L’adoption a pris quinze jours, pas un trimestre.',
          role: 'Directrice des opérations, Northwind Logistics',
        },
        duration: '7 mois',
        team: '2 ingénieurs, 1 designer, 1 chef de projet',
      },
    },
    'lumen-health-triage': {
      title: 'Triage des admissions cliniques',
      industry: 'Santé',
      summary:
        'Un assistant d’admission par IA qui lit les lettres d’orientation, en extrait des champs structurés et oriente chaque patient vers le bon service.',
      imageAlt: 'File de triage clinique avec champs extraits et indicateurs de confiance',
      metrics: [
        { label: 'Temps de triage', value: '−71 %' },
        { label: 'Exactitude des champs', value: '98,4 %' },
        { label: 'Lettres/mois', value: '52 k' },
      ],
      caseStudy: {
        problem:
          'Lumen recevait 52 000 lettres d’orientation par mois, en PDF scannés et en fax. Les infirmières passaient les deux premières heures de chaque garde à les lire et à saisir des champs dans le dossier patient. Des orientations urgentes restaient parfois trois jours dans la file.',
        solution:
          'Nous avons construit une chaîne documentaire qui océrise chaque orientation, extrait 23 champs structurés avec un modèle de langage, note l’urgence selon des critères cliniques et présente à l’infirmière un dossier prérempli à confirmer ou corriger. L’humain est resté dans la boucle à chaque décision.',
        approach: [
          {
            title: 'Le jeu d’évaluation d’abord',
            detail:
              'Des cliniciens ont annoté 1 200 orientations historiques avant que nous choisissions un modèle : la qualité a été mesurée contre une vérité terrain dès le premier jour.',
          },
          {
            title: 'Préremplissage conditionné à la confiance',
            detail:
              'Les champs sous le seuil de confiance restent vides et sont signalés plutôt que devinés, car une date de naissance erronée est pire qu’une case vide.',
          },
          {
            title: 'Chaque correction est une donnée d’apprentissage',
            detail:
              'Les corrections des infirmières alimentent un rapport hebdomadaire qui montre exactement quels types de champs demandent encore du travail.',
          },
        ],
        results: [
          'Le temps de triage d’une orientation est passé de 9 à 2,6 minutes',
          'L’exactitude d’extraction a atteint 98,4 % sur un jeu de test clinique réservé',
          'Les orientations urgentes sont désormais signalées dans les 4 minutes suivant leur arrivée',
          'Environ 310 heures de soins par mois rendues aux patients',
        ],
        quote: {
          text: 'Ils ont refusé de livrer tant que les chiffres d’évaluation ne satisfaisaient pas notre comité de gouvernance clinique. Ce n’est pas ainsi que nos prestataires précédents travaillaient.',
          role: 'Directrice médicale, Lumen Health',
        },
        duration: '9 mois',
        team: '2 ingénieurs, 1 ingénieure ML, 1 designer',
      },
    },
    'atlas-capital-portal': {
      title: 'Portail de reporting investisseurs',
      industry: 'Services financiers',
      summary:
        'Le reporting trimestriel est passé de 900 envois de PDF sur mesure à un portail en libre-service, avec des permissions de niveau audit.',
      imageAlt: 'Tableau de bord du portail investisseurs avec performance des fonds et coffre documentaire',
      metrics: [
        { label: 'Cycle de reporting', value: '3 sem. → 2 jours' },
        { label: 'Investisseurs servis', value: '900+' },
        { label: 'Constats d’audit', value: '0' },
      ],
      caseStudy: {
        problem:
          'Chaque trimestre, Atlas assemblait à la main 900 dossiers PDF individuels et les envoyait par e-mail aux commanditaires. Un e-mail mal adressé, et un investisseur voyait la position d’un autre — une violation à déclarer. Le cycle consommait trois semaines de l’équipe financière.',
        solution:
          'Un portail à permissions où chaque commanditaire voit exactement ses positions, avec des documents générés depuis une source unique et des accès journalisés à la ligne près. Le reporting est devenu une étape de relecture et de publication au lieu de trois semaines d’assemblage.',
        approach: [
          {
            title: 'Les permissions modélisées avant l’interface',
            detail:
              'Nous avons d’abord écrit le modèle d’accès sous forme de tests exécutables, puis construit l’interface sur une couche qui refusait déjà les lectures illégitimes.',
          },
          {
            title: 'Des documents générés, jamais assemblés',
            detail:
              'Chaque PDF est produit à partir des chiffres que le portail affiche : les deux ne peuvent pas diverger.',
          },
          {
            title: 'Journal d’accès immuable',
            detail:
              'Qui a consulté quel document et quand, en ajout seul, prêt pour l’audit annuel sans extraction de données.',
          },
        ],
        results: [
          'Le cycle de reporting trimestriel est passé de trois semaines à deux jours',
          'Aucun constat sur le contrôle d’accès lors de l’audit SOC 2 suivant',
          '78 % des commanditaires récupèrent désormais leurs documents seuls au lieu d’écrire au fonds',
          'L’équipe financière a été redéployée sur l’analyse de fonds',
        ],
        quote: {
          text: 'Nos auditeurs ont demandé comment nous avions produit le journal d’accès aussi vite. C’était un seul export. Cette réponse a justifié le projet à elle seule.',
          role: 'Directeur financier, Atlas Capital',
        },
        duration: '6 mois',
        team: '2 ingénieurs, 1 designer',
      },
    },
    'verdance-commerce': {
      title: 'Boutique en vente directe',
      industry: 'Commerce de détail',
      summary:
        'Une refonte headless de la boutique qui a ramené le tunnel d’achat de cinq étapes à un seul écran et augmenté la conversion de 34 %.',
      imageAlt: 'Page produit et tunnel de commande sur un écran pour une marque de soin des plantes',
      metrics: [
        { label: 'Conversion', value: '+34 %' },
        { label: 'LCP', value: '0,9 s' },
        { label: 'Abandon de panier', value: '−22 %' },
      ],
      caseStudy: {
        problem:
          'Verdance avait un trafic solide et un tunnel d’achat faible. Un parcours en cinq étapes sur une boutique à thème mettait 6,4 secondes à afficher sa première image produit sur mobile, et 71 % des paniers étaient abandonnés à l’étape de livraison.',
        solution:
          'Nous avons reconstruit la boutique en headless sur Next.js, ramené le tunnel à un seul écran avec autocomplétion d’adresse et paiements par portefeuille, et instrumenté chaque étape pour que la décision suivante vienne des données et non des avis.',
        approach: [
          {
            title: 'Mesurer avant de toucher au design',
            detail:
              'Deux semaines d’instrumentation de l’entonnoir ont montré que l’abandon venait de la surprise des frais de port, pas d’une friction au paiement.',
          },
          {
            title: 'Frais de port affichés sur la page produit',
            detail: 'Le coût qui tuait les paniers apparaît désormais avant même l’ajout au panier.',
          },
          {
            title: 'Des images à la bonne taille',
            detail: 'L’AVIF avec sources responsives a réduit de 74 % le poids médian d’une page produit.',
          },
        ],
        results: [
          'La conversion du tunnel a augmenté de 34 % dans les deux mois suivant le lancement',
          'Le Largest Contentful Paint est passé de 6,4 s à 0,9 s sur mobile 4G',
          'L’abandon de panier a reculé de 22 points de pourcentage',
          'Le chiffre d’affaires organique a progressé de 41 % sur un an, à budget publicitaire constant',
        ],
        quote: {
          text: 'Ils nous ont dit que notre problème venait du texte sur la livraison, pas de notre design. Ils avaient raison, et cela nous a coûté une fraction d’une refonte.',
          role: 'Fondatrice, Verdance',
        },
        duration: '4 mois',
        team: '1 ingénieur, 1 designer',
      },
    },
    'cadence-field-app': {
      title: 'Application mobile pour techniciens de terrain',
      industry: 'Énergie',
      summary:
        'Une application React Native hors ligne d’abord pour 1 100 techniciens travaillant en sous-sol et en poste électrique, sans réseau.',
      imageAlt: 'Fiche d’intervention mobile avec indicateur de synchronisation hors ligne et prise de photo',
      metrics: [
        { label: 'Interventions hors ligne', value: '100 %' },
        { label: 'Paperasse', value: '−80 %' },
        { label: 'Techniciens', value: '1,1 k' },
      ],
      caseStudy: {
        problem:
          'Les techniciens de Cadence remplissaient les fiches d’intervention sur papier, car l’application précédente exigeait du réseau — et les postes électriques n’en ont pas. Les fiches étaient photographiées en fin de service puis ressaisies par une équipe administrative, ajoutant deux jours de délai et un taux d’erreur de transcription supérieur à 5 %.',
        solution:
          'Une application hors ligne d’abord, où la base locale fait foi pour la durée du service et se synchronise au retour du réseau. Photos, signatures et relevés de compteur sont saisis sur place et réconciliés côté serveur avec gestion des conflits.',
        approach: [
          {
            title: 'Conçue pour un pouce et des gants',
            detail:
              'Les cibles font 56 px au minimum, et l’action principale se situe à portée de pouce sur un écran de 6,1 pouces.',
          },
          {
            title: 'Une synchronisation visible',
            detail:
              'Les techniciens se méfiaient de l’ancienne application parce que la synchronisation était invisible. Une pastille d’état par intervention a fait plus pour l’adoption que n’importe quelle fonctionnalité.',
          },
          {
            title: 'Pilote mené avec les sceptiques',
            detail:
              'Nous avons lancé le pilote dans le dépôt qui se plaignait le plus, et livré leurs correctifs en premier.',
          },
        ],
        results: [
          'Les fiches papier ont reculé de 80 % dès le premier trimestre après le déploiement',
          'Les erreurs de transcription ont été pratiquement éliminées',
          'Les données d’intervention parviennent aux planificateurs dans l’heure au lieu de deux jours plus tard',
          '1 100 techniciens intégrés sur 14 dépôts en huit semaines',
        ],
        quote: {
          text: 'L’indicateur de synchronisation paraît anodin. C’est la raison pour laquelle un millier de techniciens ont fait confiance à l’application dès la deuxième semaine.',
          role: 'Directeur des opérations terrain, Cadence Utilities',
        },
        duration: '8 mois',
        team: '2 ingénieurs, 1 designer',
      },
    },
    'meridian-onboarding-automation': {
      title: 'Automatisation de l’onboarding client',
      industry: 'Services professionnels',
      summary:
        'Vingt-deux transferts manuels répartis sur cinq systèmes, ramenés à une seule chaîne événementielle avec historique d’audit complet.',
      imageAlt: 'Vue de la chaîne d’automatisation montrant les étapes d’onboarding et l’état des reprises',
      metrics: [
        { label: 'Onboarding', value: '11 jours → 36 h' },
        { label: 'Étapes manuelles', value: '22 → 3' },
        { label: 'Heures gagnées/mois', value: '340' },
      ],
      caseStudy: {
        problem:
          'L’intégration d’un client Meridian touchait cinq systèmes et vingt-deux étapes manuelles, coordonnées par e-mail. Le délai moyen jusqu’au premier travail facturable était de onze jours, et environ un client sur six restait bloqué parce qu’une étape avait été silencieusement omise.',
        solution:
          'Une chaîne événementielle où chaque étape d’onboarding émet un événement auquel la suivante s’abonne. Les étapes en échec sont reprises avec temporisation croissante et escaladées à un responsable nommé après deux tentatives : plus rien n’attend en silence.',
        approach: [
          {
            title: 'Cartographier le vrai processus, pas celui qui est documenté',
            detail:
              'Les entretiens ont révélé neuf étapes non documentées que le schéma officiel n’avait jamais mentionnées.',
          },
          {
            title: 'Idempotent dès le départ',
            detail:
              'Chaque étape peut s’exécuter deux fois sans créer de doublon, ce qui rend les reprises sûres plutôt que risquées.',
          },
          {
            title: 'Trois humains laissés dans la boucle',
            detail:
              'L’approbation, la validation des risques et l’appel de bienvenue sont restés manuels, volontairement. L’automatisation a servi les décisions de jugement au lieu de les remplacer.',
          },
        ],
        results: [
          'Le délai jusqu’au premier travail facturable est passé de 11 jours à 36 heures',
          'Les onboardings bloqués sont passés de 17 % à moins de 2 %',
          'Environ 340 heures administratives rendues à l’entreprise chaque mois',
          'Une piste d’audit complète par client, générée automatiquement',
        ],
        quote: {
          text: 'ARCHON a passé les quinze premiers jours à documenter notre façon réelle de travailler. L’automatisation n’a plus été qu’une formalité ensuite.',
          role: 'Associée gérante, Meridian Advisory',
        },
        duration: '5 mois',
        team: '2 ingénieurs, 1 chef de projet',
      },
    },
  },
}

/** Category filter keys — 'all' plus every category, in display order. */
export const categoryKeys = ['all', 'webApp', 'website', 'ai', 'automation', 'mobile', 'ecommerce'] as const
export type CategoryKey = (typeof categoryKeys)[number]

export function getProjects(locale: Locale): Project[] {
  return base.map(({ quoteAuthor, ...project }) => {
    const localised = copy[locale][project.slug]
    return {
      ...project,
      ...localised,
      caseStudy: {
        ...localised.caseStudy,
        quote: { ...localised.caseStudy.quote, author: quoteAuthor },
      },
    }
  })
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug)
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((project) => project.featured)
}

/** Slugs are shared across locales, so static params never depend on language. */
export const projectSlugs: ProjectSlug[] = base.map((project) => project.slug)
