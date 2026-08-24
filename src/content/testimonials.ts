import type { Locale } from '@/lib/i18n/config'

export type TestimonialId = 'northwind' | 'lumen' | 'atlas' | 'verdance' | 'cadence' | 'meridian'

type TestimonialBase = {
  id: TestimonialId
  author: string
  company: string
  initials: string
  /** Tailwind gradient classes for the generated avatar — no image request needed. */
  avatarClass: string
}

type TestimonialCopy = { quote: string; role: string }

export type Testimonial = TestimonialBase & TestimonialCopy

const base: TestimonialBase[] = [
  {
    id: 'northwind',
    author: 'Marta Kowalczyk',
    company: 'Northwind Logistics',
    initials: 'MK',
    avatarClass: 'from-apex-strong to-apex-mid',
  },
  {
    id: 'lumen',
    author: 'Dr. Priya Raman',
    company: 'Lumen Health',
    initials: 'PR',
    avatarClass: 'from-apex-mid to-apex-soft',
  },
  {
    id: 'atlas',
    author: 'Daniel Osei',
    company: 'Atlas Capital',
    initials: 'DO',
    avatarClass: 'from-apex-soft to-apex-strong',
  },
  {
    id: 'verdance',
    author: 'Amelia Fournier',
    company: 'Verdance',
    initials: 'AF',
    avatarClass: 'from-apex-strong to-apex-soft',
  },
  {
    id: 'cadence',
    author: 'Tom Bridger',
    company: 'Cadence Utilities',
    initials: 'TB',
    avatarClass: 'from-apex-mid to-apex-strong',
  },
  {
    id: 'meridian',
    author: 'Sarah Lindqvist',
    company: 'Meridian Advisory',
    initials: 'SL',
    avatarClass: 'from-apex-soft to-apex-mid',
  },
]

const copy: Record<Locale, Record<TestimonialId, TestimonialCopy>> = {
  en: {
    northwind: {
      quote:
        'They spent two weeks in our depots before writing any code. The result is the first internal system our managers have asked for more of.',
      role: 'Chief Operating Officer',
    },
    lumen: {
      quote:
        'ARCHON refused to launch until the evaluation numbers satisfied our clinical governance board. No vendor had ever pushed back on our timeline for the right reason before.',
      role: 'Clinical Director',
    },
    atlas: {
      quote:
        'Our auditors asked how we produced a full row-level access log so quickly. It was a single export. That answer paid for the project.',
      role: 'Chief Financial Officer',
    },
    verdance: {
      quote:
        'They told us our conversion problem was shipping copy, not our design, and talked us out of a rebuild we had already budgeted for.',
      role: 'Founder',
    },
    cadence: {
      quote:
        'Six months after handover our own engineers ship features without calling them. That is the part most agencies never get right.',
      role: 'Head of Field Operations',
    },
    meridian: {
      quote:
        'The first fortnight was them documenting how we actually work, including nine steps our own process diagram had missed. The automation almost built itself after that.',
      role: 'Managing Partner',
    },
  },

  de: {
    northwind: {
      quote:
        'Sie haben zwei Wochen in unseren Depots verbracht, bevor eine Zeile Code entstand. Das Ergebnis ist das erste interne System, von dem unsere Führungskräfte mehr haben wollten.',
      role: 'Chief Operating Officer',
    },
    lumen: {
      quote:
        'ARCHON weigerte sich zu starten, bis die Evaluationszahlen unser klinisches Governance-Gremium zufriedenstellten. Kein Dienstleister hatte je zuvor aus dem richtigen Grund gegen unseren Zeitplan argumentiert.',
      role: 'Ärztliche Direktorin',
    },
    atlas: {
      quote:
        'Unsere Prüfer fragten, wie wir so schnell ein vollständiges, zeilengenaues Zugriffsprotokoll erzeugt hätten. Es war ein einziger Export. Diese Antwort hat das Projekt bezahlt.',
      role: 'Chief Financial Officer',
    },
    verdance: {
      quote:
        'Sie sagten uns, unser Konversionsproblem sei der Versandtext und nicht das Design — und redeten uns einen Relaunch aus, den wir bereits budgetiert hatten.',
      role: 'Gründerin',
    },
    cadence: {
      quote:
        'Ein halbes Jahr nach der Übergabe liefern unsere eigenen Entwickler Funktionen aus, ohne dort anzurufen. Das ist der Teil, den die meisten Agenturen nie hinbekommen.',
      role: 'Leiter Außendienst',
    },
    meridian: {
      quote:
        'Die ersten vierzehn Tage haben sie dokumentiert, wie wir tatsächlich arbeiten, inklusive neun Schritten, die unser eigenes Prozessdiagramm übersehen hatte. Danach hat sich die Automatisierung fast von selbst gebaut.',
      role: 'Geschäftsführende Partnerin',
    },
  },

  fr: {
    northwind: {
      quote:
        'Ils ont passé deux semaines dans nos dépôts avant d’écrire la moindre ligne de code. Le résultat est le premier système interne dont nos responsables aient redemandé.',
      role: 'Directrice des opérations',
    },
    lumen: {
      quote:
        'ARCHON a refusé de lancer tant que les chiffres d’évaluation ne satisfaisaient pas notre comité de gouvernance clinique. Aucun prestataire n’avait jamais contesté notre calendrier pour la bonne raison.',
      role: 'Directrice médicale',
    },
    atlas: {
      quote:
        'Nos auditeurs ont demandé comment nous avions produit un journal d’accès complet, à la ligne près, aussi vite. C’était un seul export. Cette réponse a payé le projet.',
      role: 'Directeur financier',
    },
    verdance: {
      quote:
        'Ils nous ont dit que notre problème de conversion venait du texte sur la livraison, pas de notre design, et nous ont dissuadés d’une refonte déjà budgétée.',
      role: 'Fondatrice',
    },
    cadence: {
      quote:
        'Six mois après le transfert, nos propres développeurs livrent des fonctionnalités sans les appeler. C’est la partie que la plupart des agences ne réussissent jamais.',
      role: 'Directeur des opérations terrain',
    },
    meridian: {
      quote:
        'Les quinze premiers jours, ils ont documenté notre façon réelle de travailler, y compris neuf étapes que notre propre schéma de processus avait oubliées. Ensuite, l’automatisation s’est presque construite toute seule.',
      role: 'Associée gérante',
    },
  },
}

export function getTestimonials(locale: Locale): Testimonial[] {
  return base.map((testimonial) => ({ ...testimonial, ...copy[locale][testimonial.id] }))
}
