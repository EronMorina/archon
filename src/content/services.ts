import {
  Bot,
  Cloud,
  Code2,
  Cog,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Search,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'

/**
 * Ten service lines.
 *
 * Language-neutral fields (slug, icon, price) live in `base`; everything a
 * reader sees lives in `copy`, keyed by locale then slug. Slugs are shared
 * across languages so `/services#ai-integrations` and `/de/services#ai-integrations`
 * anchor to the same card and hreflang pairs line up.
 */
export type ServiceSlug =
  | 'website-development'
  | 'custom-web-applications'
  | 'ai-integrations'
  | 'business-automation'
  | 'mobile-applications'
  | 'ui-ux-design'
  | 'cloud-deployment'
  | 'maintenance-support'
  | 'seo-optimization'

type ServiceBase = { slug: ServiceSlug; icon: LucideIcon; startingAt: string }

type ServiceCopy = {
  title: string
  summary: string
  description: string
  benefits: string[]
  deliverables: string[]
}

export type Service = ServiceBase & ServiceCopy

/** Order is the order they appear on /services and the home grid. */
const base: ServiceBase[] = [
  { slug: 'website-development', icon: Globe, startingAt: '$12k' },
  { slug: 'custom-web-applications', icon: Code2, startingAt: '$35k' },
  { slug: 'ai-integrations', icon: Bot, startingAt: '$28k' },
  { slug: 'business-automation', icon: Cog, startingAt: '$18k' },
  { slug: 'mobile-applications', icon: Smartphone, startingAt: '$40k' },
  { slug: 'ui-ux-design', icon: LayoutDashboard, startingAt: '$15k' },
  { slug: 'cloud-deployment', icon: Cloud, startingAt: '$14k' },
  { slug: 'maintenance-support', icon: LifeBuoy, startingAt: '$3k/mo' },
  { slug: 'seo-optimization', icon: Search, startingAt: '$8k' },
]

const copy: Record<Locale, Record<ServiceSlug, ServiceCopy>> = {
  en: {
    'website-development': {
      title: 'Website Development',
      summary: 'Marketing sites that load instantly and rank on their own merits.',
      description:
        'We build marketing sites on Next.js with a headless CMS behind them, so your team ships a landing page without filing a ticket. Every build leaves our hands with a Lighthouse score above 95 on mobile.',
      benefits: [
        'Sub-second first paint on mid-range mobile hardware',
        'Content editable by marketing without a developer',
        'Technical SEO, schema and sitemaps handled at build time',
      ],
      deliverables: ['Design system', 'CMS schema', 'Analytics + consent', 'Deployment pipeline'],
    },
    'custom-web-applications': {
      title: 'Custom Web Applications',
      summary: 'Internal tools and customer platforms built to your exact workflow.',
      description:
        'When the off-the-shelf tool stops fitting, we replace it. Multi-tenant dashboards, billing, permissions, audit trails — typed end to end and tested where failure would cost you money.',
      benefits: [
        'Type-safe from database schema to UI component',
        'Role-based access control and audit logging by default',
        'Handover docs your own engineers can build on',
      ],
      deliverables: ['Architecture doc', 'API + database', 'Admin surface', 'Test suite'],
    },
    'ai-integrations': {
      title: 'AI Integrations',
      summary: 'Retrieval, agents and copilots wired into the software you already run.',
      description:
        'We put language models where they earn their keep: triaging tickets, drafting replies, extracting fields from documents. Grounded in your data with retrieval, evaluated against real cases before launch.',
      benefits: [
        'Answers grounded in your own documents, with citations',
        'Evaluation harness so quality is measured, not assumed',
        'Cost and latency budgets set per feature',
      ],
      deliverables: ['Eval dataset', 'Retrieval pipeline', 'Guardrails', 'Usage dashboard'],
    },
    'business-automation': {
      title: 'Business Automation',
      summary: 'The manual handoffs between your tools, removed.',
      description:
        'We map the work your team does by copy-paste, then delete it. Event-driven pipelines between your CRM, finance stack and support desk, with retries and alerting so nothing silently stalls.',
      benefits: [
        'Reclaim the hours currently lost to spreadsheet reconciliation',
        'Idempotent jobs with retries — no duplicate records',
        'Alerting when an integration upstream changes',
      ],
      deliverables: ['Process map', 'Integration layer', 'Monitoring', 'Runbook'],
    },
    'mobile-applications': {
      title: 'Mobile Applications',
      summary: 'One React Native codebase, two stores, native-feeling motion.',
      description:
        'Cross-platform apps with offline-first data, push notifications and over-the-air updates. We handle store submission, review responses and the release train after launch.',
      benefits: [
        'Ship iOS and Android from a single codebase',
        'Offline-first sync for field and warehouse teams',
        'Over-the-air updates without a store review cycle',
      ],
      deliverables: ['Design system', 'App builds', 'Store listings', 'Release pipeline'],
    },
    'ui-ux-design': {
      title: 'UI/UX Design',
      summary: 'Interface design that survives contact with real users.',
      description:
        'Research, flows, prototypes and a component library your engineers can implement without guessing. We design in the browser as early as possible, because static mockups hide the hard parts.',
      benefits: [
        'Prototypes tested with your users before code is written',
        'A component library, not a folder of screens',
        'WCAG 2.2 AA contrast and focus states designed in',
      ],
      deliverables: ['User research', 'Flows', 'Design system', 'Prototype'],
    },
    'cloud-deployment': {
      title: 'Cloud Deployment',
      summary: 'Infrastructure as code, with a deploy you can trust on a Friday.',
      description:
        'Containerised services on AWS or Vercel, defined in Terraform, shipped through CI with preview environments per pull request. Rollback is one command and it is tested.',
      benefits: [
        'Preview environment for every pull request',
        'Zero-downtime deploys with automated rollback',
        'Infrastructure reproducible from a git clone',
      ],
      deliverables: ['Terraform modules', 'CI/CD', 'Observability', 'Disaster recovery plan'],
    },
    'maintenance-support': {
      title: 'Maintenance & Support',
      summary: 'A named engineer, a response time in writing.',
      description:
        'Ongoing dependency upgrades, security patching, performance regression tracking and a support channel with an SLA. Retainers include a monthly improvement budget so the product keeps moving.',
      benefits: [
        'Response times committed in the contract, not implied',
        'Dependency and security patching handled monthly',
        'Performance budgets monitored with alerts on regression',
      ],
      deliverables: ['SLA', 'Shared channel', 'Monthly report', 'Improvement backlog'],
    },
    'seo-optimization': {
      title: 'SEO Optimization',
      summary: 'Technical SEO that compounds instead of chasing algorithms.',
      description:
        'Crawl budget, Core Web Vitals, structured data and internal linking — the parts of search you can actually control. Paired with content architecture that matches how your buyers search.',
      benefits: [
        'Core Web Vitals in the green on real-user data',
        'Structured data that earns rich results',
        'Keyword architecture mapped to buying intent',
      ],
      deliverables: ['Technical audit', 'Schema markup', 'Content map', 'Rank tracking'],
    },
  },

  de: {
    'website-development': {
      title: 'Website-Entwicklung',
      summary: 'Marketing-Websites, die sofort laden und aus eigener Kraft ranken.',
      description:
        'Wir bauen Marketing-Websites auf Next.js mit einem Headless-CMS dahinter, damit Ihr Team eine Landingpage veröffentlicht, ohne ein Ticket zu schreiben. Jede Website verlässt uns mit einem Lighthouse-Wert über 95 auf Mobilgeräten.',
      benefits: [
        'Erster Seitenaufbau unter einer Sekunde auf durchschnittlicher Mobilhardware',
        'Inhalte vom Marketing pflegbar, ohne Entwicklerin',
        'Technisches SEO, Schema und Sitemaps zur Build-Zeit erledigt',
      ],
      deliverables: ['Designsystem', 'CMS-Schema', 'Analytics + Einwilligung', 'Deployment-Pipeline'],
    },
    'custom-web-applications': {
      title: 'Individuelle Webanwendungen',
      summary: 'Interne Werkzeuge und Kundenplattformen, exakt auf Ihren Ablauf zugeschnitten.',
      description:
        'Wenn die Standardlösung nicht mehr passt, ersetzen wir sie. Mandantenfähige Dashboards, Abrechnung, Berechtigungen, Audit-Trails — durchgängig typisiert und dort getestet, wo ein Fehler Geld kostet.',
      benefits: [
        'Typsicher vom Datenbankschema bis zur UI-Komponente',
        'Rollenbasierte Zugriffskontrolle und Audit-Logging von Anfang an',
        'Übergabedokumentation, auf der Ihre eigenen Entwickler aufbauen können',
      ],
      deliverables: ['Architekturdokument', 'API + Datenbank', 'Administrationsoberfläche', 'Testsuite'],
    },
    'ai-integrations': {
      title: 'KI-Integrationen',
      summary: 'Retrieval, Agenten und Copiloten, eingebaut in die Software, die Sie ohnehin nutzen.',
      description:
        'Wir setzen Sprachmodelle dort ein, wo sie sich rechnen: Tickets vorsortieren, Antworten entwerfen, Felder aus Dokumenten auslesen. Mit Retrieval in Ihren Daten verankert und vor dem Start an echten Fällen evaluiert.',
      benefits: [
        'Antworten, die in Ihren eigenen Dokumenten verankert sind, mit Quellenangabe',
        'Evaluationsaufbau, damit Qualität gemessen und nicht angenommen wird',
        'Kosten- und Latenzbudgets pro Funktion festgelegt',
      ],
      deliverables: ['Evaluationsdatensatz', 'Retrieval-Pipeline', 'Schutzmechanismen', 'Nutzungs-Dashboard'],
    },
    'business-automation': {
      title: 'Prozessautomatisierung',
      summary: 'Die manuellen Übergaben zwischen Ihren Werkzeugen — abgeschafft.',
      description:
        'Wir kartieren die Arbeit, die Ihr Team per Copy-and-paste erledigt, und schaffen sie ab. Ereignisgesteuerte Strecken zwischen CRM, Finanzsystem und Support-Desk, mit Wiederholungen und Alarmen, damit nichts stillschweigend hängen bleibt.',
      benefits: [
        'Die Stunden zurückholen, die heute im Abgleich von Tabellen verloren gehen',
        'Idempotente Jobs mit Wiederholungen — keine Dubletten',
        'Alarm, wenn sich eine vorgelagerte Schnittstelle ändert',
      ],
      deliverables: ['Prozesskarte', 'Integrationsschicht', 'Monitoring', 'Betriebshandbuch'],
    },
    'mobile-applications': {
      title: 'Mobile Anwendungen',
      summary: 'Eine React-Native-Codebasis, zwei Stores, nativ wirkende Bewegung.',
      description:
        'Plattformübergreifende Apps mit Offline-first-Daten, Push-Benachrichtigungen und Over-the-air-Updates. Store-Einreichung, Antworten auf Reviews und den Release-Zyklus nach dem Start übernehmen wir.',
      benefits: [
        'iOS und Android aus einer einzigen Codebasis ausliefern',
        'Offline-first-Synchronisation für Außendienst und Lager',
        'Over-the-air-Updates ohne Store-Review-Zyklus',
      ],
      deliverables: ['Designsystem', 'App-Builds', 'Store-Einträge', 'Release-Pipeline'],
    },
    'ui-ux-design': {
      title: 'UI/UX-Design',
      summary: 'Interfacedesign, das den Kontakt mit echten Nutzern übersteht.',
      description:
        'Research, Flows, Prototypen und eine Komponentenbibliothek, die Ihre Entwickler ohne Rätselraten umsetzen können. Wir gestalten so früh wie möglich im Browser, weil statische Mockups die schwierigen Stellen verdecken.',
      benefits: [
        'Prototypen, mit Ihren Nutzern getestet, bevor Code entsteht',
        'Eine Komponentenbibliothek statt eines Ordners voller Screens',
        'Kontrast und Fokuszustände nach WCAG 2.2 AA von vornherein mitgedacht',
      ],
      deliverables: ['Nutzerforschung', 'Flows', 'Designsystem', 'Prototyp'],
    },
    'cloud-deployment': {
      title: 'Cloud-Deployment',
      summary: 'Infrastruktur als Code — mit einem Deployment, dem Sie auch freitags trauen.',
      description:
        'Containerisierte Dienste auf AWS oder Vercel, in Terraform definiert, über CI ausgeliefert, mit Preview-Umgebung je Pull Request. Der Rollback ist ein Befehl, und er ist getestet.',
      benefits: [
        'Preview-Umgebung für jeden Pull Request',
        'Deployments ohne Ausfallzeit, mit automatischem Rollback',
        'Infrastruktur aus einem Git-Clone reproduzierbar',
      ],
      deliverables: ['Terraform-Module', 'CI/CD', 'Observability', 'Notfallwiederherstellungsplan'],
    },
    'maintenance-support': {
      title: 'Wartung & Support',
      summary: 'Eine namentlich benannte Entwicklerin, eine Reaktionszeit schriftlich.',
      description:
        'Laufende Abhängigkeits-Updates, Sicherheitspatches, Überwachung von Performance-Regressionen und ein Supportkanal mit SLA. Wartungsverträge enthalten ein monatliches Verbesserungsbudget, damit das Produkt in Bewegung bleibt.',
      benefits: [
        'Reaktionszeiten vertraglich zugesagt, nicht angedeutet',
        'Abhängigkeits- und Sicherheitspatches monatlich erledigt',
        'Performance-Budgets überwacht, mit Alarm bei Regression',
      ],
      deliverables: ['SLA', 'Gemeinsamer Kanal', 'Monatsbericht', 'Verbesserungs-Backlog'],
    },
    'seo-optimization': {
      title: 'SEO-Optimierung',
      summary: 'Technisches SEO, das sich aufsummiert, statt Algorithmen hinterherzulaufen.',
      description:
        'Crawl-Budget, Core Web Vitals, strukturierte Daten und interne Verlinkung — die Teile der Suche, die Sie tatsächlich beeinflussen können. Kombiniert mit einer Inhaltsarchitektur, die dazu passt, wie Ihre Käufer suchen.',
      benefits: [
        'Core Web Vitals im grünen Bereich, gemessen an echten Nutzerdaten',
        'Strukturierte Daten, die Rich Results verdienen',
        'Keyword-Architektur, zugeordnet zur Kaufabsicht',
      ],
      deliverables: ['Technisches Audit', 'Schema-Markup', 'Content-Karte', 'Ranking-Tracking'],
    },
  },

  fr: {
    'website-development': {
      title: 'Développement de sites web',
      summary: 'Des sites vitrines qui se chargent instantanément et se classent par leurs propres mérites.',
      description:
        'Nous construisons des sites vitrines sur Next.js avec un CMS headless derrière, pour que votre équipe publie une landing page sans ouvrir de ticket. Chaque site sort de chez nous avec un score Lighthouse supérieur à 95 sur mobile.',
      benefits: [
        'Premier affichage sous la seconde sur un mobile de milieu de gamme',
        'Contenu modifiable par le marketing, sans développeur',
        'SEO technique, données structurées et sitemaps traités à la compilation',
      ],
      deliverables: ['Design system', 'Schéma CMS', 'Analytics + consentement', 'Pipeline de déploiement'],
    },
    'custom-web-applications': {
      title: 'Applications web sur mesure',
      summary: 'Outils internes et plateformes client conçus pour votre flux de travail exact.',
      description:
        'Quand l’outil du marché ne convient plus, nous le remplaçons. Tableaux de bord multi-locataires, facturation, permissions, pistes d’audit — typés de bout en bout et testés là où une panne vous coûterait de l’argent.',
      benefits: [
        'Typage sûr du schéma de base de données jusqu’au composant d’interface',
        'Contrôle d’accès par rôles et journalisation d’audit par défaut',
        'Documentation de transfert sur laquelle vos développeurs peuvent bâtir',
      ],
      deliverables: ['Document d’architecture', 'API + base de données', 'Interface d’administration', 'Suite de tests'],
    },
    'ai-integrations': {
      title: 'Intégrations IA',
      summary: 'Recherche augmentée, agents et copilotes branchés sur les logiciels que vous utilisez déjà.',
      description:
        'Nous plaçons les modèles de langage là où ils sont rentables : trier des tickets, rédiger des réponses, extraire des champs de documents. Ancrés dans vos données par recherche documentaire, évalués sur des cas réels avant la mise en production.',
      benefits: [
        'Des réponses ancrées dans vos propres documents, avec citations',
        'Un dispositif d’évaluation, pour que la qualité soit mesurée et non supposée',
        'Des budgets de coût et de latence fixés par fonctionnalité',
      ],
      deliverables: ['Jeu d’évaluation', 'Pipeline de recherche', 'Garde-fous', 'Tableau de bord d’usage'],
    },
    'business-automation': {
      title: 'Automatisation des processus',
      summary: 'Les transferts manuels entre vos outils, supprimés.',
      description:
        'Nous cartographions le travail que votre équipe fait au copier-coller, puis nous le supprimons. Des chaînes événementielles entre votre CRM, votre système financier et votre support, avec reprises et alertes pour que rien ne s’arrête en silence.',
      benefits: [
        'Récupérer les heures perdues aujourd’hui à rapprocher des tableurs',
        'Des traitements idempotents avec reprise — aucun doublon',
        'Une alerte dès qu’une intégration en amont change',
      ],
      deliverables: ['Cartographie des processus', 'Couche d’intégration', 'Supervision', 'Manuel d’exploitation'],
    },
    'mobile-applications': {
      title: 'Applications mobiles',
      summary: 'Une base de code React Native, deux magasins, des animations qui font natif.',
      description:
        'Des applications multiplateformes avec données hors ligne d’abord, notifications push et mises à jour à distance. Nous gérons la soumission aux magasins, les réponses aux évaluations et le cycle de publication après le lancement.',
      benefits: [
        'Livrer iOS et Android depuis une seule base de code',
        'Synchronisation hors ligne d’abord pour les équipes terrain et entrepôt',
        'Mises à jour à distance sans cycle de validation en magasin',
      ],
      deliverables: ['Design system', 'Builds applicatifs', 'Fiches magasin', 'Pipeline de publication'],
    },
    'ui-ux-design': {
      title: 'Design UI/UX',
      summary: 'Un design d’interface qui survit au contact d’utilisateurs réels.',
      description:
        'Recherche, parcours, prototypes et une bibliothèque de composants que vos développeurs implémentent sans deviner. Nous concevons dans le navigateur le plus tôt possible, car les maquettes statiques cachent les parties difficiles.',
      benefits: [
        'Des prototypes testés avec vos utilisateurs avant d’écrire du code',
        'Une bibliothèque de composants, pas un dossier d’écrans',
        'Contrastes et états de focus WCAG 2.2 AA intégrés dès la conception',
      ],
      deliverables: ['Recherche utilisateur', 'Parcours', 'Design system', 'Prototype'],
    },
    'cloud-deployment': {
      title: 'Déploiement cloud',
      summary: 'L’infrastructure en tant que code, avec un déploiement fiable même un vendredi.',
      description:
        'Des services conteneurisés sur AWS ou Vercel, définis en Terraform, livrés par intégration continue avec un environnement de prévisualisation par pull request. Le retour arrière tient en une commande, et il est testé.',
      benefits: [
        'Un environnement de prévisualisation pour chaque pull request',
        'Des déploiements sans interruption, avec retour arrière automatisé',
        'Une infrastructure reproductible depuis un clone git',
      ],
      deliverables: ['Modules Terraform', 'CI/CD', 'Observabilité', 'Plan de reprise d’activité'],
    },
    'maintenance-support': {
      title: 'Maintenance & support',
      summary: 'Un ingénieur nommé, un délai de réponse écrit.',
      description:
        'Mises à jour continues des dépendances, correctifs de sécurité, suivi des régressions de performance et un canal de support avec engagement de service. Les contrats incluent un budget mensuel d’amélioration, pour que le produit continue d’avancer.',
      benefits: [
        'Des délais de réponse engagés au contrat, pas sous-entendus',
        'Dépendances et correctifs de sécurité traités chaque mois',
        'Des budgets de performance surveillés, avec alerte en cas de régression',
      ],
      deliverables: ['Engagement de service', 'Canal partagé', 'Rapport mensuel', 'Backlog d’améliorations'],
    },
    'seo-optimization': {
      title: 'Optimisation SEO',
      summary: 'Un SEO technique qui capitalise au lieu de courir après les algorithmes.',
      description:
        'Budget d’exploration, Core Web Vitals, données structurées et maillage interne — les parties de la recherche que vous contrôlez réellement. Associées à une architecture de contenu calée sur la façon dont vos acheteurs cherchent.',
      benefits: [
        'Des Core Web Vitals au vert sur les données d’utilisateurs réels',
        'Des données structurées qui obtiennent des résultats enrichis',
        'Une architecture de mots-clés alignée sur l’intention d’achat',
      ],
      deliverables: ['Audit technique', 'Balisage schema', 'Cartographie de contenu', 'Suivi de positions'],
    },
  },
}

export function getServices(locale: Locale): Service[] {
  return base.map((service) => ({ ...service, ...copy[locale][service.slug] }))
}

export function getService(locale: Locale, slug: string): Service | undefined {
  return getServices(locale).find((service) => service.slug === slug)
}
