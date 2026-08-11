import type { Locale } from '@/lib/i18n/config'

export type Faq = { q: string; a: string }

/** Fully translated — there is no language-neutral part of a question. */
const faqs: Record<Locale, Faq[]> = {
  en: [
    {
      q: 'How quickly can you start?',
      a: 'Usually within two to three weeks. Discovery can often begin sooner, since it runs in parallel with whatever our squads are finishing. If timing is critical, tell us the date on the first call and we will be direct about whether we can hold it.',
    },
    {
      q: 'Do you work fixed price or time and materials?',
      a: 'Both, but never fixed price on an unscoped project. We price discovery separately, and it produces an architecture document, a prioritised backlog and a cost range. From there most clients choose fixed price and fixed deadline, with scope as the variable each sprint.',
    },
    {
      q: 'Who owns the code and the design files?',
      a: 'You do, from the first commit. Work happens in your repository or transfers to it at no cost, including infrastructure definitions, design files and documentation. There are no licence fees on anything we build for you.',
    },
    {
      q: 'What happens after launch?',
      a: 'Every project includes post-launch support — 30 days on Starter, 90 on Professional. After that, roughly two thirds of clients move to a retainer covering patching, monitoring, a named engineer and a monthly improvement budget. It is optional, and we will tell you if we think you do not need it.',
    },
    {
      q: 'Can you work with our existing engineering team?',
      a: 'Yes, and it is often the best version of this. We embed in your repositories, follow your review process, and treat your conventions as the standard. On several engagements we have worked purely as a capacity extension on your own backlog.',
    },
    {
      q: 'How do you handle AI features responsibly?',
      a: 'We build an evaluation set with your domain experts before choosing a model, gate low-confidence outputs to a human instead of guessing, and log every correction. If a use case does not survive evaluation, we say so rather than shipping something that reads well in a demo.',
    },
    {
      q: 'What is your process for security and compliance?',
      a: 'Threat modelling in discovery, dependency and secret scanning in CI, least-privilege infrastructure defined in Terraform, and a documented access model. For regulated clients we coordinate penetration testing and support SOC 2 or ISO evidence collection.',
    },
    {
      q: 'Do you sign NDAs and work with procurement?',
      a: 'Routinely. We can sign your NDA or MSA, complete security questionnaires, and provide insurance certificates and references. Our contracts team turns most paperwork around within three business days.',
    },
  ],

  de: [
    {
      q: 'Wie schnell können Sie anfangen?',
      a: 'In der Regel innerhalb von zwei bis drei Wochen. Die Discovery kann oft früher beginnen, weil sie parallel zu dem läuft, was unsere Teams gerade abschließen. Wenn der Zeitpunkt kritisch ist, nennen Sie uns im ersten Gespräch das Datum — wir sagen Ihnen offen, ob wir es halten können.',
    },
    {
      q: 'Arbeiten Sie zum Festpreis oder nach Aufwand?',
      a: 'Beides, aber nie zum Festpreis auf einen ungeklärten Umfang. Die Discovery kalkulieren wir separat; sie liefert ein Architekturdokument, ein priorisiertes Backlog und eine Kostenspanne. Von dort aus wählen die meisten Kunden Festpreis und festen Termin, mit dem Umfang als Variable in jedem Sprint.',
    },
    {
      q: 'Wem gehören der Code und die Designdateien?',
      a: 'Ihnen, ab dem ersten Commit. Wir arbeiten in Ihrem Repository oder übertragen alles kostenfrei dorthin, einschließlich Infrastrukturdefinitionen, Designdateien und Dokumentation. Auf nichts, was wir für Sie bauen, fallen Lizenzgebühren an.',
    },
    {
      q: 'Was passiert nach dem Start?',
      a: 'Jedes Projekt enthält Support nach dem Start — 30 Tage bei Starter, 90 bei Professional. Danach wechseln rund zwei Drittel der Kunden in einen Wartungsvertrag mit Patches, Monitoring, einer namentlich benannten Entwicklerin und einem monatlichen Verbesserungsbudget. Das ist optional, und wir sagen Ihnen, wenn wir finden, dass Sie es nicht brauchen.',
    },
    {
      q: 'Können Sie mit unserem bestehenden Entwicklungsteam arbeiten?',
      a: 'Ja, und häufig ist das die beste Variante. Wir arbeiten in Ihren Repositories, folgen Ihrem Review-Prozess und behandeln Ihre Konventionen als Maßstab. In mehreren Projekten haben wir rein als Kapazitätserweiterung auf Ihrem eigenen Backlog gearbeitet.',
    },
    {
      q: 'Wie gehen Sie verantwortungsvoll mit KI-Funktionen um?',
      a: 'Wir bauen mit Ihren Fachleuten einen Evaluationsdatensatz auf, bevor wir ein Modell wählen, leiten Ausgaben mit geringer Konfidenz an einen Menschen weiter statt zu raten, und protokollieren jede Korrektur. Übersteht ein Anwendungsfall die Evaluation nicht, sagen wir das, statt etwas auszuliefern, das sich in einer Demo gut liest.',
    },
    {
      q: 'Wie sieht Ihr Vorgehen bei Sicherheit und Compliance aus?',
      a: 'Bedrohungsmodellierung in der Discovery, Abhängigkeits- und Secret-Scanning in der CI, Infrastruktur nach dem Least-Privilege-Prinzip in Terraform definiert und ein dokumentiertes Zugriffsmodell. Für regulierte Kunden koordinieren wir Penetrationstests und unterstützen die Nachweiserhebung für SOC 2 oder ISO.',
    },
    {
      q: 'Unterzeichnen Sie NDAs und arbeiten Sie mit dem Einkauf?',
      a: 'Regelmäßig. Wir unterzeichnen Ihre Geheimhaltungs- oder Rahmenvereinbarung, füllen Sicherheitsfragebögen aus und stellen Versicherungsnachweise und Referenzen bereit. Unser Vertragsteam bearbeitet die meisten Unterlagen innerhalb von drei Werktagen.',
    },
  ],

  fr: [
    {
      q: 'Sous quel délai pouvez-vous démarrer ?',
      a: 'Généralement sous deux à trois semaines. Le cadrage peut souvent commencer plus tôt, car il se déroule en parallèle de ce que nos équipes terminent. Si le calendrier est critique, donnez-nous la date dès le premier appel : nous vous dirons franchement si nous pouvons la tenir.',
    },
    {
      q: 'Travaillez-vous au forfait ou en régie ?',
      a: 'Les deux, mais jamais au forfait sur un projet non cadré. Nous chiffrons le cadrage séparément ; il produit un document d’architecture, un backlog priorisé et une fourchette de coûts. Ensuite, la plupart des clients choisissent un prix et une échéance fermes, avec le périmètre comme variable à chaque sprint.',
    },
    {
      q: 'À qui appartiennent le code et les fichiers de design ?',
      a: 'À vous, dès le premier commit. Le travail se fait dans votre dépôt ou y est transféré sans frais, y compris les définitions d’infrastructure, les fichiers de design et la documentation. Aucune redevance de licence sur ce que nous construisons pour vous.',
    },
    {
      q: 'Que se passe-t-il après le lancement ?',
      a: 'Chaque projet inclut un support après lancement — 30 jours sur Starter, 90 sur Professional. Ensuite, environ deux tiers des clients passent à un contrat récurrent couvrant correctifs, supervision, un ingénieur nommé et un budget mensuel d’amélioration. C’est optionnel, et nous vous dirons si nous pensons que vous n’en avez pas besoin.',
    },
    {
      q: 'Pouvez-vous travailler avec notre équipe technique existante ?',
      a: 'Oui, et c’est souvent la meilleure formule. Nous nous intégrons à vos dépôts, suivons votre processus de revue et considérons vos conventions comme la norme. Sur plusieurs missions, nous avons travaillé uniquement comme extension de capacité sur votre propre backlog.',
    },
    {
      q: 'Comment abordez-vous les fonctions d’IA de façon responsable ?',
      a: 'Nous construisons un jeu d’évaluation avec vos experts métier avant de choisir un modèle, renvoyons les sorties peu fiables vers un humain au lieu de deviner, et journalisons chaque correction. Si un cas d’usage ne survit pas à l’évaluation, nous le disons plutôt que de livrer quelque chose qui se présente bien en démonstration.',
    },
    {
      q: 'Quel est votre processus en matière de sécurité et de conformité ?',
      a: 'Modélisation des menaces au cadrage, analyse des dépendances et des secrets en intégration continue, infrastructure au moindre privilège définie en Terraform, et un modèle d’accès documenté. Pour les clients réglementés, nous coordonnons les tests d’intrusion et appuyons la collecte de preuves SOC 2 ou ISO.',
    },
    {
      q: 'Signez-vous des accords de confidentialité et travaillez-vous avec les achats ?',
      a: 'Couramment. Nous signons votre accord de confidentialité ou votre contrat-cadre, remplissons les questionnaires de sécurité et fournissons attestations d’assurance et références. Notre équipe contrats traite la plupart des documents en trois jours ouvrés.',
    },
  ],
}

export function getFaqs(locale: Locale): Faq[] {
  return faqs[locale]
}
