import type { Locale } from '@/lib/i18n/config'

export type PlanId = 'starter' | 'professional' | 'enterprise'

type PlanBase = {
  id: PlanId
  /** Prices stay in USD across locales — the studio quotes in one currency. */
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
  { id: 'starter', price: '$12k', ctaHref: '/contact' },
  { id: 'professional', price: '$35k', ctaHref: '/contact', highlighted: true },
  { id: 'enterprise', price: 'Custom', ctaHref: '/contact' },
]

const copy: Record<Locale, Record<PlanId, PlanCopy>> = {
  en: {
    starter: {
      name: 'Starter',
      cadence: 'fixed project',
      pitch: 'A marketing site or focused MVP, live in six weeks.',
      bestFor: 'Pre-seed and seed startups',
      features: [
        'Up to 8 pages or one core product flow',
        'Design system and CMS setup',
        'Lighthouse 95+ on mobile',
        'Analytics, consent and SEO baseline',
        'Deployment pipeline on Vercel',
        '30 days post-launch support',
      ],
      ctaLabel: 'Start a project',
    },
    professional: {
      name: 'Professional',
      cadence: 'from, per phase',
      pitch: 'A custom application with a dedicated squad and a fixed deadline.',
      bestFor: 'Series A to Series C companies',
      features: [
        'Everything in Starter',
        'Dedicated squad: 2 engineers, 1 designer, 1 PM',
        'Custom backend, API and database design',
        'AI or automation workstream included',
        'Role-based access control and audit logging',
        'Automated test suite and CI/CD',
        'Handover exercise with your engineers',
        '90 days post-launch support',
      ],
      ctaLabel: 'Book a scoping call',
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Custom',
      cadence: 'retainer or programme',
      pitch: 'Multi-team programmes with compliance, SLAs and procurement in scope.',
      bestFor: 'Regulated and multi-region organisations',
      features: [
        'Everything in Professional',
        'Named technical lead and monthly steering',
        'SOC 2 and GDPR-aligned delivery process',
        'Security review and penetration test coordination',
        'SLA with contractual response times',
        'Infrastructure as code and disaster recovery plan',
        'Team training and documented architecture',
        'Ongoing improvement budget each month',
      ],
      ctaLabel: 'Talk to us',
    },
  },

  de: {
    starter: {
      name: 'Starter',
      cadence: 'Festpreisprojekt',
      pitch: 'Eine Marketing-Website oder ein fokussiertes MVP, live in sechs Wochen.',
      bestFor: 'Start-ups in der Pre-Seed- und Seed-Phase',
      features: [
        'Bis zu 8 Seiten oder ein zentraler Produktablauf',
        'Designsystem und CMS-Einrichtung',
        'Lighthouse 95+ auf Mobilgeräten',
        'Analytics, Einwilligung und SEO-Grundlage',
        'Deployment-Pipeline auf Vercel',
        '30 Tage Support nach dem Start',
      ],
      ctaLabel: 'Projekt starten',
    },
    professional: {
      name: 'Professional',
      cadence: 'ab, pro Phase',
      pitch: 'Eine individuelle Anwendung mit festem Team und festem Termin.',
      bestFor: 'Unternehmen von Series A bis Series C',
      features: [
        'Alles aus Starter',
        'Festes Team: 2 Entwickler, 1 Designerin, 1 PM',
        'Individuelles Backend-, API- und Datenbankdesign',
        'KI- oder Automatisierungsstrang inklusive',
        'Rollenbasierte Zugriffskontrolle und Audit-Logging',
        'Automatisierte Testsuite und CI/CD',
        'Übergabeübung mit Ihren Entwicklern',
        '90 Tage Support nach dem Start',
      ],
      ctaLabel: 'Scoping-Gespräch buchen',
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Individuell',
      cadence: 'Wartungsvertrag oder Programm',
      pitch: 'Programme über mehrere Teams, mit Compliance, SLAs und Einkauf im Umfang.',
      bestFor: 'Regulierte Organisationen und Mehrländer-Setups',
      features: [
        'Alles aus Professional',
        'Namentlich benannter technischer Lead und monatliche Steuerung',
        'Lieferprozess ausgerichtet an SOC 2 und DSGVO',
        'Security-Review und Koordination von Penetrationstests',
        'SLA mit vertraglich zugesagten Reaktionszeiten',
        'Infrastruktur als Code und Notfallwiederherstellungsplan',
        'Teamschulung und dokumentierte Architektur',
        'Laufendes Verbesserungsbudget jeden Monat',
      ],
      ctaLabel: 'Sprechen Sie uns an',
    },
  },

  fr: {
    starter: {
      name: 'Starter',
      cadence: 'projet au forfait',
      pitch: 'Un site vitrine ou un MVP ciblé, en ligne en six semaines.',
      bestFor: 'Start-up en pre-seed et seed',
      features: [
        'Jusqu’à 8 pages ou un parcours produit principal',
        'Design system et mise en place du CMS',
        'Lighthouse 95+ sur mobile',
        'Analytics, consentement et socle SEO',
        'Pipeline de déploiement sur Vercel',
        '30 jours de support après le lancement',
      ],
      ctaLabel: 'Démarrer un projet',
    },
    professional: {
      name: 'Professional',
      cadence: 'à partir de, par phase',
      pitch: 'Une application sur mesure, avec une équipe dédiée et une échéance ferme.',
      bestFor: 'Entreprises de série A à série C',
      features: [
        'Tout ce que contient Starter',
        'Équipe dédiée : 2 ingénieurs, 1 designer, 1 chef de projet',
        'Backend, API et base de données sur mesure',
        'Chantier IA ou automatisation inclus',
        'Contrôle d’accès par rôles et journalisation d’audit',
        'Suite de tests automatisés et CI/CD',
        'Exercice de transfert avec vos développeurs',
        '90 jours de support après le lancement',
      ],
      ctaLabel: 'Réserver un appel de cadrage',
    },
    enterprise: {
      name: 'Enterprise',
      price: 'Sur devis',
      cadence: 'contrat récurrent ou programme',
      pitch: 'Des programmes multi-équipes incluant conformité, engagements de service et achats.',
      bestFor: 'Organisations réglementées et multirégions',
      features: [
        'Tout ce que contient Professional',
        'Responsable technique nommé et comité de pilotage mensuel',
        'Processus de livraison aligné SOC 2 et RGPD',
        'Revue de sécurité et coordination des tests d’intrusion',
        'Engagement de service avec délais de réponse contractuels',
        'Infrastructure en tant que code et plan de reprise d’activité',
        'Formation des équipes et architecture documentée',
        'Budget d’amélioration continu chaque mois',
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
