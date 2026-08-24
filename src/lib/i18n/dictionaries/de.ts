import type { Dictionary } from './en'

/**
 * German UI dictionary. Formal address (Sie) throughout, which is the register
 * a German-speaking B2B buyer expects from an agency site.
 *
 * Typed as `Dictionary`, so a missing or renamed key is a compile error.
 */
export const de: Dictionary = {
  site: {
    tagline: 'Wir bauen Software, die Unternehmen voranbringt.',
    description:
      'ARCHON ist ein Software-Studio, das Websites, individuelle Webanwendungen, KI-gestützte Lösungen und Geschäftsprozess-Automatisierung für Start-ups und wachsende Unternehmen konzipiert und entwickelt.',
    kicker: 'Software-Studio',
    remoteFirst: 'Remote-first',
  },

  a11y: {
    skipToContent: 'Zum Inhalt springen',
    mainNavigation: 'Hauptnavigation',
    home: 'Startseite',
    outputsOf: (phase: string) => `Ergebnisse der Phase ${phase}`,
  },

  nav: {
    links: {
      services: 'Leistungen',
      portfolio: 'Portfolio',
      about: 'Über uns',
      blog: 'Blog',
      contact: 'Kontakt',
    },
    cta: 'Gespräch vereinbaren',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
  },

  language: {
    label: 'Sprache',
    change: 'Sprache wechseln',
    current: (name: string) => `Aktuelle Sprache: ${name}`,
  },

  theme: {
    toggle: 'Design wechseln',
    toLight: 'Zum hellen Design wechseln',
    toDark: 'Zum dunklen Design wechseln',
  },

  footer: {
    groups: {
      services: {
        heading: 'Leistungen',
        links: {
          websiteDevelopment: 'Website-Entwicklung',
          customWebApps: 'Individuelle Webanwendungen',
          aiIntegrations: 'KI-Integrationen',
          businessAutomation: 'Prozessautomatisierung',
          cloudDeployment: 'Cloud-Deployment',
        },
      },
      company: {
        heading: 'Unternehmen',
        links: {
          about: 'Über uns',
          portfolio: 'Portfolio',
          blog: 'Blog',
          contact: 'Kontakt',
        },
      },
      legal: {
        heading: 'Rechtliches',
        links: {
          privacy: 'Datenschutzerklärung',
          terms: 'Nutzungsbedingungen',
          cookies: 'Cookie-Richtlinie',
          accessibility: 'Barrierefreiheit',
        },
      },
    },
    newsletter: {
      heading: 'Newsletter',
      emailLabel: 'E-Mail-Adresse',
      placeholder: 'sie@unternehmen.de',
      subscribe: 'Abonnieren',
      note: 'Eine Engineering-Notiz pro Monat. Keine Kampagnenstrecken, keine Verkaufsmails.',
      invalid: 'Bitte geben Sie eine E-Mail-Adresse an, unter der wir Sie erreichen.',
      success: 'Sie stehen auf der Liste. Eine Ausgabe pro Monat.',
      failed: 'Das hat nicht geklappt. Versuchen Sie es erneut oder schreiben Sie an archonisolutions@gmail.com.',
    },
  },

  cookies: {
    label: 'Cookie-Einstellungen',
    message:
      'Wir setzen Analyse-Cookies ein, um zu sehen, welche Seiten weiterhelfen und welche nicht. Vor Ihrer Entscheidung wird nichts geladen.',
    policy: 'Cookie-Richtlinie',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
  },

  hero: {
    titleLine1: 'Wir bauen Software, die',
    titleLine2Before: '',
    titleLine2Highlight: 'Unternehmen',
    titleLine2After: ' voranbringt.',
    lead: 'Wir konzipieren und entwickeln Websites, individuelle Webanwendungen, KI-gestützte Lösungen und Prozessautomatisierung für Start-ups und wachsende Unternehmen.',
    primaryCta: 'Gespräch vereinbaren',
    secondaryCta: 'Portfolio ansehen',
    stats: {
      projects: 'Projekte ausgeliefert',
      years: 'Jahre Erfahrung',
      returning: 'Kunden, die wiederkommen',
    },
    cards: {
      uptime: 'Verfügbarkeit, 90 Tage',
      lcp: 'Median LCP',
      deploys: 'Deployments diese Woche',
      ci: 'Bestandene CI-Prüfungen',
    },
  },

  servicesSection: {
    eyebrow: 'Was wir tun',
    title: 'Neun Leistungsbereiche, ein Umsetzungsteam.',
    lead: 'Keine Übergaben zwischen Agenturen, keine Subunternehmer, die Sie nie zu sehen bekommen. Wer Ihr Projekt zuschneidet, baut es auch.',
    allServices: 'Alle Leistungen',
    from: (price: string) => `Ab ${price}`,
  },

  portfolioSection: {
    eyebrow: 'Von GitHub',
    title: 'Woran wir arbeiten — direkt aus den Repositories.',
    lead: 'Live von GitHub geladen — dieselben Repositories, die Sie klonen, lesen und selbst starten können.',
    allWork: 'Alle Repositories',
  },

  stats: {
    projects: { label: 'Projekte umgesetzt', note: 'In Logistik, Gesundheit, Fintech und Handel' },
    returning: { label: 'Kunden, die wiederkommen', note: 'Gemessen an Folgeaufträgen seit 2019' },
    savings: { label: 'Jährliche Einsparungen der Kunden', note: 'Allein aus Automatisierungsprojekten in 2025' },
    uptime: { label: 'Verfügbarkeit betreuter Systeme', note: 'Gleitender Zwölfmonatsdurchschnitt' },
  },

  process: {
    eyebrow: 'Wie wir arbeiten',
    title: 'Sieben Phasen – und Sie sehen in jede einzelne hinein.',
    lead: 'Jede Phase liefert ein Ergebnis, das Sie prüfen können. Was nichts hervorbringt, das man lesen oder anklicken kann, war keine Phase.',
  },

  tech: {
    eyebrow: 'Technologie',
    title: 'Langweilige Technologie, ganz bewusst gewählt.',
    lead: 'Wir wählen Werkzeuge mit langen Supportzyklen und großem Bewerbermarkt, damit Ihr Team pflegen kann, was wir übergeben.',
    screenReaderList: (list: string) => `Technologien, mit denen wir arbeiten: ${list}.`,
  },

  testimonials: {
    eyebrow: 'Kunden',
    title: 'Was Kunden sagen, wenn das Projekt vorbei ist.',
    lead: 'Jedes Zitat stammt von einem namentlich genannten Kunden aus einem Projekt, das wir von Anfang bis Ende umgesetzt haben.',
  },

  pricing: {
    eyebrow: 'Zusammenarbeitsmodelle',
    title: 'Preise aus einem Scope, nie aus einer Schätzung ins Blaue.',
    lead: 'Die Discovery-Phase wird separat kalkuliert und liefert das Angebot. Passt die Spanne nicht, behalten Sie das Dokument und schulden uns nichts weiter.',
    mostChosen: 'Am häufigsten gewählt',
    footnote:
      'In allen Projekten enthalten: vollständige Rechte am Quellcode, Dokumentation und eine Übergabeübung mit Ihren Entwicklerinnen und Entwicklern.',
  },

  faq: {
    eyebrow: 'Fragen',
    title: 'Was Kunden im ersten Gespräch fragen.',
    leadBefore: 'Etwas nicht dabei? ',
    leadLink: 'Fragen Sie uns direkt',
    leadAfter: ' — es antwortet ein Mensch, meist innerhalb eines Tages.',
  },

  cta: {
    title: 'Sagen Sie uns, was Ihr Unternehmen ausbremst.',
    lead: 'Ein Gespräch von 30 Minuten, ohne Foliensatz. Wir sagen Ihnen, ob das ein Projekt für uns ist und was wir zuerst tun würden.',
    button: 'Gespräch vereinbaren',
    portfolioTitle: 'Haben Sie etwas Ähnliches vor?',
    blogTitle: 'Sollen wir uns Ihren Fall ansehen?',
    aboutTitle: 'Möchten Sie das Team kennenlernen, das es bauen würde?',
    postTitle: 'Arbeiten Sie gerade an etwas, das hier mitschwingt?',
    postLead:
      'Wenn Ihnen das bekannt vorkommt, ist ein Gespräch von 30 Minuten meist der schnellste Weg herauszufinden, ob wir helfen können.',
  },

  postCategories: {
    all: 'Alle',
    engineering: 'Engineering',
    ai: 'KI',
    design: 'Design',
    product: 'Produkt',
    performance: 'Performance',
  },

  filters: {
    articlesGroupLabel: 'Artikel nach Kategorie filtern',
    searchArticlesLabel: 'Artikel durchsuchen',
    searchArticlesPlaceholder: 'Artikel suchen',
    clearSearch: 'Suche zurücksetzen',
    clearFilters: 'Filter zurücksetzen',
    articleCount: (n: number) => `${n} ${n === 1 ? 'Artikel' : 'Artikel'}`,
    noArticlesTitle: 'Dazu ist noch nichts erschienen',
    noArticlesBody:
      'Versuchen Sie einen weiteren Begriff, oder sagen Sie uns, was Sie lesen wollten — dann schreiben wir es.',
  },

  repos: {
    viewRepo: 'Repository ansehen',
    viewLive: 'Live-Website',
    viewCode: 'Code',
    liveBadge: 'Live',
    shotAlt: (name: string) => `Screenshot der aus ${name} veröffentlichten Website`,
    cardAlt: (name: string) => `GitHub-Repository-Karte für ${name}`,
    repoAria: (name: string) => `${name} auf GitHub (öffnet in neuem Tab)`,
    liveAria: (name: string) => `Live-Website zu ${name} (öffnet in neuem Tab)`,
    stars: 'Sterne',
    forks: 'Forks',
    updated: 'Letzter Push',
    topicsLabel: 'Themen des Repositories',
    noDescription: 'Auf GitHub noch ohne Beschreibung.',
    noLanguage: 'Sonstige',
    allLanguages: 'Alle',
    groupLabel: 'Repositories nach Sprache filtern',
    searchLabel: 'Repositories durchsuchen',
    searchPlaceholder: 'Name, Thema oder Sprache suchen',
    count: (n: number) => `${n} ${n === 1 ? 'Repository' : 'Repositories'}`,
    inLanguage: (language: string) => ` in ${language}`,
    noMatchTitle: 'Dazu passt kein Repository',
    noMatchBody: 'Versuchen Sie einen weiteren Begriff, oder setzen Sie die Filter zurück, um alles zu sehen.',
    profileLink: (user: string) => `Alle Repositories auf github.com/${user}`,
    unavailableTitle: 'GitHub antwortet gerade nicht',
    unavailableBody:
      'Die Repository-Liste konnte nicht geladen werden. Meist ist sie nach wenigen Minuten wieder da — bis dahin führt das Profil selbst am schnellsten hin.',
  },

  pages: {
    home: {
      metaTitle: 'Software-Studio für Websites, Webanwendungen und KI',
    },
    services: {
      eyebrow: 'Leistungen',
      title: 'Neun Arten zu helfen – und der Punkt, ab dem sich jede nicht mehr lohnt.',
      lead: 'Die meisten Projekte kombinieren zwei oder drei davon. Wenn ein günstigeres Werkzeug Ihr Problem löst, sagen wir das im ersten Gespräch und schicken Ihnen den Link.',
      metaTitle: 'Leistungen',
      metaDescription:
        'Website-Entwicklung, individuelle Webanwendungen, KI-Integrationen, Prozessautomatisierung, Mobile Apps, E-Commerce, UI/UX-Design, Cloud-Deployment, Support und SEO — von einem Team umgesetzt.',
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Arbeit, die man Zeile für Zeile nachlesen kann.',
      lead: 'Jedes Repository hier wird live von GitHub geladen, zuletzt aktualisierte zuerst. Filtern Sie nach Sprache oder suchen Sie nach Name und Thema.',
      metaTitle: 'Portfolio',
      metaDescription:
        'Öffentliche Repositories von ARCHON auf GitHub — jeweils mit Sprache, Themen, Quellcode und, wo vorhanden, der laufenden Website.',
    },
    blog: {
      eyebrow: 'Texte',
      title: 'Notizen aus der laufenden Arbeit.',
      lead: 'Was wir in echten Projekten gelernt haben, samt der Entscheidungen, die wir heute anders treffen würden. Eine Ausgabe pro Monat, keine Kampagnenstrecken.',
      metaTitle: 'Blog',
      metaDescription:
        'Engineering-Notizen des ARCHON-Teams zu KI-Evaluation, Performance im Feld, Übergabequalität, Software für den Außendienst und ehrlicher Aufwandsschätzung.',
    },
    about: {
      eyebrow: 'Über uns',
      title: 'Vierzehn Menschen, kein Vertrieb.',
      lead: (founded: string) =>
        `Gegründet ${founded}. Wir arbeiten in kleinen, erfahrenen Teams, veröffentlichen die Zahlen, die unsere Kunden freigeben, und messen uns daran, ob Ihre Entwickler ein halbes Jahr später weiterbauen können, was wir gebaut haben.`,
      metaTitle: 'Über uns',
      metaDescription:
        'ARCHON ist ein Software-Studio mit 14 Mitarbeitenden, gegründet 2017. Wir arbeiten in kleinen, erfahrenen Teams, veröffentlichen unsere Zahlen und übergeben Code, den Ihre eigenen Entwickler erweitern können.',
      principlesEyebrow: 'Wie wir arbeiten',
      principlesTitle: 'Vier Zusagen, für die wir Aufträge abgelehnt haben.',
      principlesLead:
        'Das sind keine Werte an der Wand. Jede einzelne hat uns schon ein Projekt gekostet, und das ist der einzige Test, der zählt.',
      principles: {
        fieldwork: {
          title: 'Wir fangen dort an, wo die Arbeit passiert',
          detail:
            'Discovery heißt, bei den Menschen zu sitzen, die die Software später nutzen. Zwei Wochen in einem Speditionsdepot haben mehr Architekturentscheidungen verändert als jedes Lastenheft.',
        },
        honesty: {
          title: 'Wir reden Ihnen Projekte auch aus',
          detail:
            'Dreimal im vergangenen Jahr haben wir Interessenten gesagt, dass ein Werkzeug für 40 Dollar ihr Problem löst. Zwei davon kamen später mit etwas zurück, wofür man uns wirklich brauchte.',
        },
        handover: {
          title: 'Die Übergabe ist ein Liefergegenstand',
          detail:
            'Vor der Schlussrechnung setzt eine Entwicklerin aus Ihrem Team ein echtes Feature um, während wir zusehen und schweigen. Woran sie hängen bleibt, beheben wir noch während der Vertragslaufzeit.',
        },
        teams: {
          title: 'Kleine Teams, erfahrene Leute',
          detail:
            'Zwei bis vier Personen pro Projekt, die alle selbst programmieren oder gestalten. Keine Betreuungsebene zwischen Ihnen und den Menschen, die die Arbeit machen.',
        },
      },
      numbersEyebrow: 'In Zahlen',
      numbersTitle: 'Neun Jahre – und die Belege dazu.',
      numbersLead:
        'Kunden mit Wartungsvertrag berichten wir monatlich Auslastung und Liefertreue. Das hier sind die Jahreswerte aus denselben Daten.',
      numbers: {
        projects: 'Projekte seit 2017 ausgeliefert',
        people: 'Menschen, die alle selbst bauen',
        sprints: 'Sprints im vereinbarten Umfang geliefert',
        timezones: 'Zeitzonen täglich abgedeckt',
      },
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Sagen Sie uns, was Sie ausbremst.',
      lead: 'Schicken Sie uns die Details, oder buchen Sie direkt einen Termin. So oder so sprechen Sie zuerst mit einem technischen Lead — eine Qualifizierungsschleife gibt es bei uns nicht.',
      metaTitle: 'Kontakt',
      metaDescription:
        'Starten Sie ein Projekt mit ARCHON. Schreiben Sie uns oder buchen Sie 30 Minuten direkt im Kalender eines technischen Leads — ohne vorgeschaltetes Qualifizierungsgespräch.',
      formHeading: 'Anfrageformular',
      details: {
        email: 'E-Mail',
        replyTime: 'Antwortzeit',
        replyValue: 'Ein Werktag, von einem Menschen',
      },
    },
    notFound: {
      eyebrow: 'Fehler 404',
      title: 'Diese Seite gibt es nicht.',
      lead: 'Der Link ist womöglich veraltet, oder wir haben die Seite verschoben. Die Arbeiten und die Texte sind beide noch da.',
      home: 'Zurück zur Startseite',
      work: 'Arbeiten ansehen',
      metaTitle: 'Seite nicht gefunden',
    },
  },

  post: {
    backToAll: 'Alle Texte',
    readingTime: (time: string) => `${time} Lesezeit`,
    keepReading: 'Weiterlesen',
    read: 'Lesen',
  },

  legal: {
    updated: (date: string) => `Aktualisiert am ${date}`,
  },

  calendly: {
    eyebrow: 'Direkt buchen',
    title: 'Wählen Sie 30 Minuten',
    body: 'Direkt im Kalender eines technischen Leads. Kein Qualifizierungsgespräch vorab, kein Foliensatz.',
    open: 'Öffnen',
  },

  contactForm: {
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'Alex Weber',
    emailLabel: 'Geschäftliche E-Mail',
    emailPlaceholder: 'alex@unternehmen.de',
    companyLabel: 'Unternehmen',
    companyPlaceholder: 'Northwind Logistics',
    optional: 'Optional',
    topicLegend: 'Worum geht es?',
    budgetLegend: 'Budgetrahmen',
    messageLabel: 'Was möchten Sie lösen?',
    messagePlaceholder:
      'Wir koordinieren täglich 4.000 Frachtaufträge über Tabellen, und zwei Depots nehmen immer wieder denselben Auftrag an…',
    consent:
      'ARCHON darf mir zu dieser Anfrage schreiben. Keine Verteiler, keine Weitergabe an Dritte.',
    submit: 'Nachricht senden',
    sending: 'Wird gesendet',
    sentTitle: 'Nachricht gesendet',
    sentBody:
      'Jede Anfrage liest ein Mensch — die Antwort kommt meist innerhalb eines Werktags. Wenn es eilt, buchen Sie über den Kalenderlink auf dieser Seite direkt einen Termin.',
    sendAnother: 'Weitere Nachricht senden',
    failed:
      'Das hat nicht geklappt. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut, oder schreiben Sie direkt an archonisolutions@gmail.com.',
    topics: {
      newProject: 'Ein neues Produkt oder eine neue Website',
      existingProduct: 'Etwas Bestehendes verbessern',
      aiAutomation: 'KI oder Automatisierung',
      retainer: 'Laufende Betreuung',
      other: 'Etwas anderes',
    },
    budgets: {
      under15k: 'Unter 15.000 $',
      '15kTo50k': '15.000 $ – 50.000 $',
      '50kTo150k': '50.000 $ – 150.000 $',
      '150kPlus': 'Über 150.000 $',
      notSure: 'Noch unklar',
    },
    errors: {
      name: 'Bitte geben Sie Ihren vollständigen Namen an.',
      email: 'Bitte geben Sie eine E-Mail-Adresse an, unter der wir antworten können.',
      budget: 'Wählen Sie die nächstliegende Spanne — eine Schätzung genügt.',
      topic: 'Sagen Sie uns, was am ehesten zutrifft.',
      messageShort: 'Ein, zwei Sätze zum Problem helfen uns, sinnvoll zu antworten.',
      messageLong: 'Bitte unter 4.000 Zeichen bleiben — im Gespräch gehen wir tiefer.',
      consent: 'Wir brauchen Ihre Einwilligung, um per E-Mail zu antworten.',
    },
  },
}
