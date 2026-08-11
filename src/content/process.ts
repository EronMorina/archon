import type { Locale } from '@/lib/i18n/config'

/** Seven phases. The numbering is meaningful here — these run in sequence. */
export type ProcessStep = { step: string; title: string; duration: string; detail: string; outputs: string[] }

const steps: Record<Locale, ProcessStep[]> = {
  en: [
    {
      step: '01',
      title: 'Discovery',
      duration: '1–2 weeks',
      detail:
        'We interview the people who do the work, map the real process rather than the documented one, and write down what success will be measured by.',
      outputs: ['Process map', 'Success metrics', 'Technical constraints'],
    },
    {
      step: '02',
      title: 'Planning',
      duration: '1 week',
      detail:
        'Architecture decisions, a prioritised backlog and a cost range you can take to a board. If the scope does not fit the budget, this is where we say so.',
      outputs: ['Architecture doc', 'Prioritised backlog', 'Cost range'],
    },
    {
      step: '03',
      title: 'Design',
      duration: '2–4 weeks',
      detail:
        'Flows, prototypes and a component library. We test with your users in the browser early, because static mockups hide the interactions that matter.',
      outputs: ['Design system', 'Clickable prototype', 'Accessibility spec'],
    },
    {
      step: '04',
      title: 'Development',
      duration: '4–20 weeks',
      detail:
        'Two-week sprints with a demo at the end of each. Every pull request gets a preview environment, so you review working software rather than a status report.',
      outputs: ['Sprint demos', 'Preview environments', 'Working software'],
    },
    {
      step: '05',
      title: 'Testing',
      duration: 'Continuous',
      detail:
        'Automated tests run on every commit, with manual QA on real devices. Performance and accessibility budgets fail the build rather than the launch.',
      outputs: ['Test suite', 'Performance budget', 'WCAG 2.2 AA audit'],
    },
    {
      step: '06',
      title: 'Launch',
      duration: '1 week',
      detail:
        'Staged rollout with monitoring and a tested rollback. We run the release with your team watching, then hand them the runbook.',
      outputs: ['Runbook', 'Monitoring + alerts', 'Rollback plan'],
    },
    {
      step: '07',
      title: 'Support',
      duration: 'Ongoing',
      detail:
        'A named engineer, response times in writing, and a monthly improvement budget so the product keeps moving after the launch post.',
      outputs: ['SLA', 'Monthly report', 'Improvement backlog'],
    },
  ],

  de: [
    {
      step: '01',
      title: 'Discovery',
      duration: '1–2 Wochen',
      detail:
        'Wir sprechen mit den Menschen, die die Arbeit machen, kartieren den echten Prozess statt des dokumentierten und halten fest, woran der Erfolg gemessen wird.',
      outputs: ['Prozesskarte', 'Erfolgskennzahlen', 'Technische Randbedingungen'],
    },
    {
      step: '02',
      title: 'Planung',
      duration: '1 Woche',
      detail:
        'Architekturentscheidungen, ein priorisiertes Backlog und eine Kostenspanne, die Sie in ein Gremium tragen können. Passt der Umfang nicht zum Budget, sagen wir es hier.',
      outputs: ['Architekturdokument', 'Priorisiertes Backlog', 'Kostenspanne'],
    },
    {
      step: '03',
      title: 'Design',
      duration: '2–4 Wochen',
      detail:
        'Flows, Prototypen und eine Komponentenbibliothek. Wir testen früh mit Ihren Nutzern im Browser, weil statische Mockups genau die Interaktionen verdecken, auf die es ankommt.',
      outputs: ['Designsystem', 'Klickbarer Prototyp', 'Barrierefreiheitsspezifikation'],
    },
    {
      step: '04',
      title: 'Entwicklung',
      duration: '4–20 Wochen',
      detail:
        'Zweiwöchige Sprints mit einer Demo am Ende jedes Sprints. Jeder Pull Request bekommt eine Preview-Umgebung, sodass Sie funktionierende Software prüfen statt eines Statusberichts.',
      outputs: ['Sprint-Demos', 'Preview-Umgebungen', 'Funktionierende Software'],
    },
    {
      step: '05',
      title: 'Testen',
      duration: 'Fortlaufend',
      detail:
        'Automatisierte Tests bei jedem Commit, dazu manuelles QA auf echten Geräten. Performance- und Barrierefreiheitsbudgets lassen den Build scheitern, nicht den Start.',
      outputs: ['Testsuite', 'Performance-Budget', 'WCAG-2.2-AA-Audit'],
    },
    {
      step: '06',
      title: 'Start',
      duration: '1 Woche',
      detail:
        'Stufenweiser Rollout mit Monitoring und getestetem Rollback. Wir fahren das Release, während Ihr Team zusieht, und übergeben anschließend das Betriebshandbuch.',
      outputs: ['Betriebshandbuch', 'Monitoring + Alarme', 'Rollback-Plan'],
    },
    {
      step: '07',
      title: 'Support',
      duration: 'Laufend',
      detail:
        'Eine namentlich benannte Entwicklerin, schriftlich zugesagte Reaktionszeiten und ein monatliches Verbesserungsbudget, damit das Produkt auch nach dem Start in Bewegung bleibt.',
      outputs: ['SLA', 'Monatsbericht', 'Verbesserungs-Backlog'],
    },
  ],

  fr: [
    {
      step: '01',
      title: 'Cadrage',
      duration: '1 à 2 semaines',
      detail:
        'Nous interrogeons les personnes qui font le travail, cartographions le processus réel plutôt que celui qui est documenté, et écrivons noir sur blanc ce à quoi le succès se mesurera.',
      outputs: ['Cartographie des processus', 'Indicateurs de succès', 'Contraintes techniques'],
    },
    {
      step: '02',
      title: 'Planification',
      duration: '1 semaine',
      detail:
        'Décisions d’architecture, backlog priorisé et fourchette de coûts présentable à un comité. Si le périmètre ne rentre pas dans le budget, c’est ici que nous le disons.',
      outputs: ['Document d’architecture', 'Backlog priorisé', 'Fourchette de coûts'],
    },
    {
      step: '03',
      title: 'Design',
      duration: '2 à 4 semaines',
      detail:
        'Parcours, prototypes et bibliothèque de composants. Nous testons tôt avec vos utilisateurs dans le navigateur, car les maquettes statiques cachent les interactions qui comptent.',
      outputs: ['Design system', 'Prototype cliquable', 'Spécification d’accessibilité'],
    },
    {
      step: '04',
      title: 'Développement',
      duration: '4 à 20 semaines',
      detail:
        'Des sprints de deux semaines, avec une démonstration à la fin de chacun. Chaque pull request obtient un environnement de prévisualisation : vous examinez un logiciel qui fonctionne, pas un rapport d’avancement.',
      outputs: ['Démonstrations de sprint', 'Environnements de prévisualisation', 'Logiciel fonctionnel'],
    },
    {
      step: '05',
      title: 'Tests',
      duration: 'En continu',
      detail:
        'Des tests automatisés à chaque commit, complétés par une recette manuelle sur appareils réels. Les budgets de performance et d’accessibilité font échouer le build, pas le lancement.',
      outputs: ['Suite de tests', 'Budget de performance', 'Audit WCAG 2.2 AA'],
    },
    {
      step: '06',
      title: 'Lancement',
      duration: '1 semaine',
      detail:
        'Déploiement progressif avec supervision et retour arrière testé. Nous menons la mise en production sous les yeux de votre équipe, puis nous lui remettons le manuel d’exploitation.',
      outputs: ['Manuel d’exploitation', 'Supervision + alertes', 'Plan de retour arrière'],
    },
    {
      step: '07',
      title: 'Support',
      duration: 'En continu',
      detail:
        'Un ingénieur nommé, des délais de réponse écrits et un budget mensuel d’amélioration pour que le produit continue d’avancer après la mise en ligne.',
      outputs: ['Engagement de service', 'Rapport mensuel', 'Backlog d’améliorations'],
    },
  ],
}

export function getProcessSteps(locale: Locale): ProcessStep[] {
  return steps[locale]
}
