import { site } from '@/lib/site'
import type { Locale } from '@/lib/i18n/config'

/**
 * Placeholder legal copy so the footer links resolve and the site can ship.
 *
 * Replace each `sections` array with text reviewed by your own counsel before
 * going live — these are honest summaries of intent, not legal advice. That
 * applies with extra force to the German and French versions: a translated
 * privacy policy is not a compliant one, and German-language sites additionally
 * need an Impressum (§ 5 DDG) that this document set does not provide.
 */
export type LegalKey = 'privacy' | 'terms' | 'cookies' | 'accessibility'

export type LegalDoc = {
  title: string
  updated: string
  intro: string
  sections: { heading: string; body: string[] }[]
}

const updated = '2026-07-01'

const docs: Record<Locale, Record<LegalKey, LegalDoc>> = {
  en: {
    privacy: {
      title: 'Privacy policy',
      updated,
      intro: `What ${site.name} collects, why, and how to have it removed.`,
      sections: [
        {
          heading: 'What we collect',
          body: [
            'When you send an enquiry we store your name, email, company, budget range and message. When you subscribe to the newsletter we store only your email address.',
            'If you accept analytics cookies we collect aggregate page views and referrers. We do not collect this if you decline, and nothing loads before you choose.',
          ],
        },
        {
          heading: 'Why we hold it',
          body: [
            'Enquiry details are used to reply to you and, if we work together, to administer the engagement. That is the only purpose.',
            'We do not sell data, share it with advertisers, or add enquiries to marketing lists without a separate opt-in.',
          ],
        },
        {
          heading: 'How long we keep it',
          body: [
            'Enquiries that do not become projects are deleted after 24 months. Project records are retained for seven years to meet accounting obligations.',
            'Newsletter subscriptions are held until you unsubscribe, and every issue includes a one-click unsubscribe link.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            `Email ${site.email} to access, correct, export or delete anything we hold about you. We respond within 30 days and there is no charge.`,
            'If you are in the UK or EU you may also complain to your supervisory authority.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of service',
      updated,
      intro:
        'The terms that apply to this website. Client engagements are governed by a separate signed agreement.',
      sections: [
        {
          heading: 'Using this site',
          body: [
            'The content here is provided for information. Case study figures are accurate as at publication and were approved by the client named.',
            'Nothing on this site is an offer to contract. Engagements begin only with a signed statement of work.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            `Text, design and code on this site belong to ${site.legalName} unless stated otherwise. Client names and logos belong to their owners and appear with permission.`,
            'Work we produce under a client engagement is owned by that client, including source code and design files, from the first commit.',
          ],
        },
        {
          heading: 'Liability',
          body: [
            'We take reasonable care over accuracy but do not warrant that this site is error-free or continuously available.',
            'Our liability for engagements is set out in the relevant signed agreement, not here.',
          ],
        },
      ],
    },
    cookies: {
      title: 'Cookie policy',
      updated,
      intro: 'Which cookies this site sets, and how to change your mind.',
      sections: [
        {
          heading: 'Strictly necessary',
          body: [
            'We store your theme preference and your cookie choice in local storage. Neither is sent to a server and neither can identify you.',
          ],
        },
        {
          heading: 'Analytics',
          body: [
            'If you accept, Google Analytics 4 sets cookies to measure page views and referrers with IP anonymisation enabled. If you decline, the script is never loaded.',
            'You can change your decision at any time by clearing site data for this domain, which brings the banner back.',
          ],
        },
        {
          heading: 'Third-party embeds',
          body: [
            'The scheduling widget on the contact page is provided by Calendly and loads only when that section scrolls into view. Calendly sets its own cookies under its own policy.',
          ],
        },
      ],
    },
    accessibility: {
      title: 'Accessibility statement',
      updated,
      intro: 'Our commitment for this site, what we have tested, and what is still outstanding.',
      sections: [
        {
          heading: 'Standard we aim for',
          body: [
            'This site targets WCAG 2.2 level AA. Colour contrast, focus visibility, keyboard operation and reduced-motion support are treated as build requirements, not launch-week fixes.',
            'When your operating system requests reduced motion, transform-based animation is disabled across the site and only opacity transitions remain.',
          ],
        },
        {
          heading: 'How we test',
          body: [
            'Automated checks run in CI on every pull request. We also test manually with keyboard-only navigation and with VoiceOver on macOS and iOS.',
          ],
        },
        {
          heading: 'Known gaps',
          body: [
            'The embedded scheduling widget is third-party and we do not control its markup. If it blocks you, email us and we will book the slot for you.',
          ],
        },
        {
          heading: 'Tell us about a barrier',
          body: [
            `Email ${site.email} with the page and what went wrong. We treat accessibility reports as bugs and aim to respond within two business days.`,
          ],
        },
      ],
    },
  },

  de: {
    privacy: {
      title: 'Datenschutzerklärung',
      updated,
      intro: `Was ${site.name} erhebt, warum, und wie Sie es löschen lassen.`,
      sections: [
        {
          heading: 'Was wir erheben',
          body: [
            'Wenn Sie eine Anfrage senden, speichern wir Ihren Namen, Ihre E-Mail-Adresse, Ihr Unternehmen, den Budgetrahmen und Ihre Nachricht. Beim Newsletter-Abonnement speichern wir ausschließlich Ihre E-Mail-Adresse.',
            'Wenn Sie Analyse-Cookies akzeptieren, erheben wir aggregierte Seitenaufrufe und Verweisquellen. Lehnen Sie ab, erheben wir das nicht, und vor Ihrer Entscheidung wird nichts geladen.',
          ],
        },
        {
          heading: 'Warum wir es speichern',
          body: [
            'Die Angaben aus Ihrer Anfrage nutzen wir, um Ihnen zu antworten und, falls wir zusammenarbeiten, um das Projekt abzuwickeln. Einen anderen Zweck gibt es nicht.',
            'Wir verkaufen keine Daten, geben sie nicht an Werbetreibende weiter und nehmen Anfragen ohne gesonderte Einwilligung nicht in Verteiler auf.',
          ],
        },
        {
          heading: 'Wie lange wir es aufbewahren',
          body: [
            'Anfragen, aus denen kein Projekt wird, löschen wir nach 24 Monaten. Projektunterlagen bewahren wir sieben Jahre auf, um handels- und steuerrechtliche Pflichten zu erfüllen.',
            'Newsletter-Abonnements bestehen, bis Sie sich abmelden; jede Ausgabe enthält einen Abmeldelink mit einem Klick.',
          ],
        },
        {
          heading: 'Ihre Rechte',
          body: [
            `Schreiben Sie an ${site.email}, um Auskunft, Berichtigung, Datenübertragung oder Löschung zu verlangen. Wir antworten innerhalb von 30 Tagen, kostenfrei.`,
            'Wenn Sie in der EU oder im Vereinigten Königreich ansässig sind, können Sie sich außerdem bei Ihrer Aufsichtsbehörde beschweren.',
          ],
        },
      ],
    },
    terms: {
      title: 'Nutzungsbedingungen',
      updated,
      intro:
        'Die Bedingungen für diese Website. Für Kundenprojekte gilt eine gesondert unterzeichnete Vereinbarung.',
      sections: [
        {
          heading: 'Nutzung dieser Website',
          body: [
            'Die Inhalte dienen der Information. Die Zahlen in den Fallstudien sind zum Zeitpunkt der Veröffentlichung zutreffend und wurden vom jeweils genannten Kunden freigegeben.',
            'Nichts auf dieser Website ist ein Vertragsangebot. Projekte beginnen ausschließlich mit einer unterzeichneten Leistungsbeschreibung.',
          ],
        },
        {
          heading: 'Geistiges Eigentum',
          body: [
            `Text, Design und Code dieser Website gehören ${site.legalName}, sofern nicht anders angegeben. Kundennamen und Logos gehören ihren Inhabern und erscheinen mit deren Erlaubnis.`,
            'Was wir im Rahmen eines Kundenprojekts erstellen, gehört ab dem ersten Commit dem jeweiligen Kunden, einschließlich Quellcode und Designdateien.',
          ],
        },
        {
          heading: 'Haftung',
          body: [
            'Wir achten mit angemessener Sorgfalt auf Richtigkeit, gewährleisten aber nicht, dass diese Website fehlerfrei oder durchgehend erreichbar ist.',
            'Unsere Haftung für Projekte ergibt sich aus der jeweils unterzeichneten Vereinbarung, nicht aus diesem Dokument.',
          ],
        },
      ],
    },
    cookies: {
      title: 'Cookie-Richtlinie',
      updated,
      intro: 'Welche Cookies diese Website setzt und wie Sie Ihre Entscheidung ändern.',
      sections: [
        {
          heading: 'Unbedingt erforderlich',
          body: [
            'Wir speichern Ihre Designeinstellung und Ihre Cookie-Entscheidung im lokalen Speicher Ihres Browsers. Beides wird nicht an einen Server gesendet und kann Sie nicht identifizieren.',
          ],
        },
        {
          heading: 'Analyse',
          body: [
            'Wenn Sie zustimmen, setzt Google Analytics 4 Cookies, um Seitenaufrufe und Verweisquellen mit aktivierter IP-Anonymisierung zu messen. Lehnen Sie ab, wird das Skript nie geladen.',
            'Sie können Ihre Entscheidung jederzeit ändern, indem Sie die Websitedaten für diese Domain löschen — dann erscheint der Hinweis erneut.',
          ],
        },
        {
          heading: 'Eingebettete Drittanbieter',
          body: [
            'Das Terminwidget auf der Kontaktseite stammt von Calendly und lädt erst, wenn dieser Abschnitt in den sichtbaren Bereich scrollt. Calendly setzt eigene Cookies nach eigener Richtlinie.',
          ],
        },
      ],
    },
    accessibility: {
      title: 'Erklärung zur Barrierefreiheit',
      updated,
      intro: 'Unsere Zusage für diese Website, was wir geprüft haben und was noch offen ist.',
      sections: [
        {
          heading: 'Standard, den wir anstreben',
          body: [
            'Diese Website zielt auf WCAG 2.2 Stufe AA. Farbkontrast, sichtbarer Fokus, Tastaturbedienung und Unterstützung für reduzierte Bewegung gelten als Anforderungen an den Bau, nicht als Nacharbeit in der Startwoche.',
            'Wenn Ihr Betriebssystem reduzierte Bewegung anfordert, werden transformationsbasierte Animationen auf der gesamten Website deaktiviert; es bleiben nur Übergänge der Deckkraft.',
          ],
        },
        {
          heading: 'Wie wir prüfen',
          body: [
            'Automatisierte Prüfungen laufen in der CI bei jedem Pull Request. Zusätzlich testen wir manuell rein per Tastatur sowie mit VoiceOver unter macOS und iOS.',
          ],
        },
        {
          heading: 'Bekannte Lücken',
          body: [
            'Das eingebettete Terminwidget stammt von einem Drittanbieter, dessen Markup wir nicht kontrollieren. Wenn es Sie blockiert, schreiben Sie uns — wir buchen den Termin für Sie.',
          ],
        },
        {
          heading: 'Melden Sie uns eine Barriere',
          body: [
            `Schreiben Sie an ${site.email} und nennen Sie die Seite und was nicht funktioniert hat. Wir behandeln Meldungen zur Barrierefreiheit wie Fehler und antworten in der Regel binnen zwei Werktagen.`,
          ],
        },
      ],
    },
  },

  fr: {
    privacy: {
      title: 'Politique de confidentialité',
      updated,
      intro: `Ce qu’${site.name} collecte, pourquoi, et comment le faire supprimer.`,
      sections: [
        {
          heading: 'Ce que nous collectons',
          body: [
            'Lorsque vous envoyez une demande, nous conservons votre nom, votre e-mail, votre entreprise, votre fourchette budgétaire et votre message. Lors d’une inscription à la newsletter, nous ne conservons que votre adresse e-mail.',
            'Si vous acceptez les cookies de mesure d’audience, nous collectons des pages vues et des sources de trafic agrégées. Si vous refusez, nous ne collectons rien, et rien ne se charge avant votre choix.',
          ],
        },
        {
          heading: 'Pourquoi nous les conservons',
          body: [
            'Les informations de votre demande servent à vous répondre et, si nous travaillons ensemble, à gérer la mission. C’est la seule finalité.',
            'Nous ne vendons pas de données, ne les partageons pas avec des annonceurs et n’ajoutons pas les demandes à des listes de diffusion sans un consentement distinct.',
          ],
        },
        {
          heading: 'Combien de temps nous les conservons',
          body: [
            'Les demandes qui ne débouchent pas sur un projet sont supprimées après 24 mois. Les dossiers de projet sont conservés sept ans pour satisfaire aux obligations comptables.',
            'Les abonnements à la newsletter sont conservés jusqu’à votre désinscription, et chaque numéro comporte un lien de désinscription en un clic.',
          ],
        },
        {
          heading: 'Vos droits',
          body: [
            `Écrivez à ${site.email} pour accéder, rectifier, exporter ou supprimer tout ce que nous détenons à votre sujet. Nous répondons sous 30 jours, sans frais.`,
            'Si vous résidez dans l’Union européenne ou au Royaume-Uni, vous pouvez également saisir votre autorité de contrôle.',
          ],
        },
      ],
    },
    terms: {
      title: 'Conditions d’utilisation',
      updated,
      intro:
        'Les conditions applicables à ce site. Les missions client sont régies par un contrat signé distinct.',
      sections: [
        {
          heading: 'Utilisation de ce site',
          body: [
            'Le contenu est fourni à titre d’information. Les chiffres des études de cas sont exacts à la date de publication et ont été approuvés par le client nommé.',
            'Rien sur ce site ne constitue une offre de contracter. Une mission ne commence qu’avec un cahier des charges signé.',
          ],
        },
        {
          heading: 'Propriété intellectuelle',
          body: [
            `Les textes, le design et le code de ce site appartiennent à ${site.legalName}, sauf mention contraire. Les noms et logos de clients appartiennent à leurs titulaires et figurent ici avec leur autorisation.`,
            'Ce que nous produisons dans le cadre d’une mission appartient au client concerné, code source et fichiers de design compris, dès le premier commit.',
          ],
        },
        {
          heading: 'Responsabilité',
          body: [
            'Nous apportons un soin raisonnable à l’exactitude, mais ne garantissons pas que ce site soit exempt d’erreurs ni disponible en permanence.',
            'Notre responsabilité au titre des missions est définie par le contrat signé correspondant, et non par le présent document.',
          ],
        },
      ],
    },
    cookies: {
      title: 'Politique relative aux cookies',
      updated,
      intro: 'Quels cookies ce site dépose, et comment changer d’avis.',
      sections: [
        {
          heading: 'Strictement nécessaires',
          body: [
            'Nous conservons votre préférence de thème et votre choix en matière de cookies dans le stockage local. Ni l’un ni l’autre n’est envoyé à un serveur et aucun ne permet de vous identifier.',
          ],
        },
        {
          heading: 'Mesure d’audience',
          body: [
            'Si vous acceptez, Google Analytics 4 dépose des cookies pour mesurer les pages vues et les sources de trafic, avec anonymisation des adresses IP activée. Si vous refusez, le script n’est jamais chargé.',
            'Vous pouvez modifier votre choix à tout moment en effaçant les données de site pour ce domaine, ce qui fait réapparaître la bannière.',
          ],
        },
        {
          heading: 'Contenus tiers intégrés',
          body: [
            'Le module de prise de rendez-vous sur la page contact est fourni par Calendly et ne se charge que lorsque cette section entre dans le champ de vision. Calendly dépose ses propres cookies selon sa propre politique.',
          ],
        },
      ],
    },
    accessibility: {
      title: 'Déclaration d’accessibilité',
      updated,
      intro: 'Notre engagement pour ce site, ce que nous avons testé et ce qui reste à faire.',
      sections: [
        {
          heading: 'La norme que nous visons',
          body: [
            'Ce site vise le niveau AA des WCAG 2.2. Contraste des couleurs, visibilité du focus, utilisation au clavier et prise en charge du mouvement réduit sont traités comme des exigences de conception, pas comme des correctifs de dernière minute.',
            'Lorsque votre système d’exploitation demande un mouvement réduit, les animations fondées sur les transformations sont désactivées sur tout le site ; seules subsistent les transitions d’opacité.',
          ],
        },
        {
          heading: 'Comment nous testons',
          body: [
            'Des contrôles automatisés s’exécutent en intégration continue à chaque pull request. Nous testons aussi manuellement en navigation clavier seule et avec VoiceOver sous macOS et iOS.',
          ],
        },
        {
          heading: 'Limites connues',
          body: [
            'Le module de prise de rendez-vous intégré provient d’un tiers dont nous ne maîtrisons pas le balisage. S’il vous bloque, écrivez-nous : nous réserverons le créneau pour vous.',
          ],
        },
        {
          heading: 'Signalez-nous un obstacle',
          body: [
            `Écrivez à ${site.email} en indiquant la page et ce qui n’a pas fonctionné. Nous traitons les signalements d’accessibilité comme des anomalies et visons une réponse sous deux jours ouvrés.`,
          ],
        },
      ],
    },
  },
}

export function getLegalDoc(locale: Locale, key: LegalKey): LegalDoc {
  return docs[locale][key]
}
