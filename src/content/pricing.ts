import type { Locale } from '@/lib/i18n/config'

export type PlanId = 'landing' | 'smallBusiness' | 'standard' | 'premium'

type PlanBase = {
  id: PlanId
  /**
   * Default price string, in the English number format. German and French
   * override it in `copy` — the decimal separator and the position of the €
   * sign both change (€1,500 / 1.500 € / 1 500 €), so this is one of the few
   * places where a number is not language-neutral.
   */
  price: string
  ctaHref: string
  highlighted?: boolean
}

type PlanCopy = {
  name: string
  price?: string
  cadence: string
  pitch: string
  bestFor: string
  features: string[]
  ctaLabel: string
}

export type Plan = Omit<PlanBase, 'ctaHref'> &
  Omit<PlanCopy, 'price' | 'ctaLabel'> & { cta: { label: string; href: string } }

const base: PlanBase[] = [
  { id: 'landing', price: '€1,500–€3,500', ctaHref: '/contact' },
  { id: 'smallBusiness', price: '€2,500–€4,500', ctaHref: '/contact' },
  { id: 'standard', price: '€6,500–€12,000', ctaHref: '/contact', highlighted: true },
  { id: 'premium', price: '€12,000–€25,000', ctaHref: '/contact' },
]

const copy: Record<Locale, Record<PlanId, PlanCopy>> = {
  en: {
    landing: {
      name: 'Landing page / one-pager',
      cadence: 'fixed project',
      pitch: 'A single focused page that explains one offer and collects enquiries.',
      bestFor: 'Product launches, events, solo founders',
      features: [
        'One page, up to six sections',
        'Responsive layout down to 360px',
        'Contact form with spam protection',
        'SEO baseline: metadata, sitemap, structured data',
        'Analytics with cookie consent',
        'Live in two to three weeks',
      ],
      ctaLabel: 'Start a project',
    },
    smallBusiness: {
      name: 'Small business site',
      cadence: '3–5 pages, fixed project',
      pitch: 'The essentials done properly: who you are, what you do, how to reach you.',
      bestFor: 'Local businesses and practices',
      features: [
        'Everything in the landing page tier',
        'Three to five pages',
        'Simple CMS so you can edit text yourself',
        'Google Business profile and map embed',
        'Image optimisation and Core Web Vitals in the green',
        'Live in three to four weeks',
      ],
      ctaLabel: 'Start a project',
    },
    standard: {
      name: 'Standard business site',
      cadence: '8–15 pages, fixed project',
      pitch: 'A full site with a real content structure, built to grow with you.',
      bestFor: 'Established companies publishing regularly',
      features: [
        'Everything in the small business tier',
        'Eight to fifteen pages',
        'Headless CMS with editable page sections',
        'Blog or case study system',
        'Lead forms routed to your inbox or CRM',
        'Technical SEO audit at handover',
        '90 days post-launch support',
      ],
      ctaLabel: 'Book a scoping call',
    },
    premium: {
      name: 'Premium / multilingual',
      cadence: '20+ pages, custom scope',
      pitch: 'Several languages, custom features and integrations, scoped together first.',
      bestFor: 'Multi-market and regulated businesses',
      features: [
        'Everything in the standard tier',
        'Twenty or more pages',
        'Multilingual with hreflang and per-language content',
        'Custom integrations: CRM, booking, payments',
        'Design system and component library',
        'Accessibility audit to WCAG 2.2 AA',
        'Support retainer available',
      ],
      ctaLabel: 'Talk to us',
    },
  },

  de: {
    landing: {
      name: 'Landing-Page / One-Pager',
      price: '1.500–3.500 €',
      cadence: 'Festpreisprojekt',
      pitch: 'Eine einzelne, fokussierte Seite, die ein Angebot erklärt und Anfragen einsammelt.',
      bestFor: 'Produktstarts, Events, Einzelgründer',
      features: [
        'Eine Seite mit bis zu sechs Abschnitten',
        'Responsives Layout bis hinunter zu 360 px',
        'Kontaktformular mit Spam-Schutz',
        'SEO-Grundlage: Metadaten, Sitemap, strukturierte Daten',
        'Analytics mit Cookie-Einwilligung',
        'Live in zwei bis drei Wochen',
      ],
      ctaLabel: 'Projekt starten',
    },
    smallBusiness: {
      name: 'Kleine Unternehmenswebsite',
      price: '2.500–4.500 €',
      cadence: '3–5 Seiten, Festpreisprojekt',
      pitch: 'Das Wesentliche, sauber umgesetzt: wer Sie sind, was Sie tun, wie man Sie erreicht.',
      bestFor: 'Lokale Betriebe und Praxen',
      features: [
        'Alles aus der Landing-Page',
        'Drei bis fünf Seiten',
        'Einfaches CMS, damit Sie Texte selbst ändern',
        'Google-Unternehmensprofil und Karteneinbindung',
        'Bildoptimierung und Core Web Vitals im grünen Bereich',
        'Live in drei bis vier Wochen',
      ],
      ctaLabel: 'Projekt starten',
    },
    standard: {
      name: 'Standard-Unternehmenswebsite',
      price: '6.500–12.000 €',
      cadence: '8–15 Seiten, Festpreisprojekt',
      pitch: 'Eine vollständige Website mit echter Inhaltsstruktur, die mit Ihnen wächst.',
      bestFor: 'Etablierte Unternehmen mit laufenden Inhalten',
      features: [
        'Alles aus der kleinen Unternehmenswebsite',
        'Acht bis fünfzehn Seiten',
        'Headless-CMS mit bearbeitbaren Seitenabschnitten',
        'Blog- oder Fallstudien-System',
        'Anfrageformulare an Ihr Postfach oder CRM',
        'Technisches SEO-Audit bei der Übergabe',
        '90 Tage Support nach dem Start',
      ],
      ctaLabel: 'Scoping-Gespräch buchen',
    },
    premium: {
      name: 'Premium / mehrsprachig',
      price: '12.000–25.000 €',
      cadence: '20+ Seiten, individueller Umfang',
      pitch: 'Mehrere Sprachen, individuelle Funktionen und Integrationen — vorher gemeinsam zugeschnitten.',
      bestFor: 'Unternehmen in mehreren Märkten und regulierten Branchen',
      features: [
        'Alles aus der Standard-Unternehmenswebsite',
        'Zwanzig Seiten oder mehr',
        'Mehrsprachig mit hreflang und Inhalten je Sprache',
        'Individuelle Integrationen: CRM, Buchung, Zahlungen',
        'Designsystem und Komponentenbibliothek',
        'Barrierefreiheits-Audit nach WCAG 2.2 AA',
        'Wartungsvertrag auf Wunsch',
      ],
      ctaLabel: 'Sprechen Sie uns an',
    },
  },

  fr: {
    landing: {
      name: 'Landing page / one-pager',
      price: '1 500–3 500 €',
      cadence: 'projet au forfait',
      pitch: 'Une page unique et ciblée qui présente une offre et recueille les demandes.',
      bestFor: 'Lancements produit, événements, fondateurs solo',
      features: [
        'Une page, jusqu’à six sections',
        'Mise en page responsive jusqu’à 360 px',
        'Formulaire de contact avec protection anti-spam',
        'Socle SEO : métadonnées, sitemap, données structurées',
        'Analytics avec consentement aux cookies',
        'En ligne en deux à trois semaines',
      ],
      ctaLabel: 'Démarrer un projet',
    },
    smallBusiness: {
      name: 'Site vitrine',
      price: '2 500–4 500 €',
      cadence: '3 à 5 pages, projet au forfait',
      pitch: 'L’essentiel, bien fait : qui vous êtes, ce que vous faites, comment vous joindre.',
      bestFor: 'Commerces et cabinets locaux',
      features: [
        'Tout ce que contient la landing page',
        'Trois à cinq pages',
        'CMS simple pour modifier vos textes vous-même',
        'Fiche Google Business et carte intégrée',
        'Optimisation des images et Core Web Vitals au vert',
        'En ligne en trois à quatre semaines',
      ],
      ctaLabel: 'Démarrer un projet',
    },
    standard: {
      name: 'Site d’entreprise standard',
      price: '6 500–12 000 €',
      cadence: '8 à 15 pages, projet au forfait',
      pitch: 'Un site complet avec une vraie structure de contenu, conçu pour évoluer avec vous.',
      bestFor: 'Entreprises établies qui publient régulièrement',
      features: [
        'Tout ce que contient le site vitrine',
        'De huit à quinze pages',
        'CMS headless avec sections de page modifiables',
        'Système de blog ou d’études de cas',
        'Formulaires de contact routés vers votre boîte ou votre CRM',
        'Audit SEO technique à la livraison',
        '90 jours de support après le lancement',
      ],
      ctaLabel: 'Réserver un appel de cadrage',
    },
    premium: {
      name: 'Premium / multilingue',
      price: '12 000–25 000 €',
      cadence: '20+ pages, périmètre sur mesure',
      pitch: 'Plusieurs langues, fonctionnalités et intégrations sur mesure — cadrées ensemble au préalable.',
      bestFor: 'Entreprises multi-marchés et réglementées',
      features: [
        'Tout ce que contient le site standard',
        'Vingt pages ou plus',
        'Multilingue avec hreflang et contenu par langue',
        'Intégrations sur mesure : CRM, réservation, paiements',
        'Design system et bibliothèque de composants',
        'Audit d’accessibilité WCAG 2.2 AA',
        'Contrat de maintenance en option',
      ],
      ctaLabel: 'Parlons-en',
    },
  },
}

export function getPlans(locale: Locale): Plan[] {
  return base.map(({ ctaHref, ...plan }) => {
    const { price, ctaLabel, ...localised } = copy[locale][plan.id]
    return {
      ...plan,
      ...localised,
      price: price ?? plan.price,
      cta: { label: ctaLabel, href: ctaHref },
    }
  })
}
