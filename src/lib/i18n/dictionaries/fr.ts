import type { Dictionary } from './en'

/**
 * French UI dictionary. Formal address (vous) throughout, and French
 * typography — narrow no-break spaces before `: ; ? !` are handled by the
 * copy itself where they appear.
 *
 * Typed as `Dictionary`, so a missing or renamed key is a compile error.
 */
export const fr: Dictionary = {
  site: {
    tagline: 'Nous créons des logiciels qui font avancer les entreprises.',
    description:
      'Arclight est un studio logiciel qui conçoit et développe des sites web, des applications web sur mesure, des solutions basées sur l’IA et l’automatisation des processus pour les start-up et les entreprises en croissance.',
    remoteFirst: 'Télétravail d’abord',
  },

  a11y: {
    skipToContent: 'Aller au contenu',
    mainNavigation: 'Navigation principale',
    home: 'accueil',
    technologiesUsed: 'Technologies utilisées',
    outputsOf: (phase: string) => `Livrables de la phase ${phase}`,
  },

  nav: {
    links: {
      services: 'Services',
      portfolio: 'Réalisations',
      about: 'À propos',
      blog: 'Blog',
      contact: 'Contact',
    },
    cta: 'Planifier un appel',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },

  language: {
    label: 'Langue',
    change: 'Changer de langue',
    current: (name: string) => `Langue actuelle : ${name}`,
  },

  theme: {
    toggle: 'Changer de thème',
    toLight: 'Passer au thème clair',
    toDark: 'Passer au thème sombre',
  },

  footer: {
    groups: {
      services: {
        heading: 'Services',
        links: {
          websiteDevelopment: 'Développement de sites web',
          customWebApps: 'Applications web sur mesure',
          aiIntegrations: 'Intégrations IA',
          businessAutomation: 'Automatisation des processus',
          cloudDeployment: 'Déploiement cloud',
        },
      },
      company: {
        heading: 'Entreprise',
        links: {
          about: 'À propos',
          caseStudies: 'Études de cas',
          portfolio: 'Réalisations',
          blog: 'Blog',
          contact: 'Contact',
        },
      },
      legal: {
        heading: 'Mentions légales',
        links: {
          privacy: 'Politique de confidentialité',
          terms: 'Conditions d’utilisation',
          cookies: 'Politique relative aux cookies',
          accessibility: 'Accessibilité',
        },
      },
    },
    newsletter: {
      heading: 'Newsletter',
      emailLabel: 'Adresse e-mail',
      placeholder: 'vous@entreprise.fr',
      subscribe: 'S’abonner',
      note: 'Une note d’ingénierie par mois. Aucune séquence, aucune relance commerciale.',
      invalid: 'Indiquez une adresse e-mail à laquelle nous pouvons vous joindre.',
      success: 'Vous êtes inscrit. Un numéro par mois.',
      failed: 'L’envoi a échoué. Réessayez, ou écrivez à hello@arclight.studio.',
    },
  },

  cookies: {
    label: 'Préférences de cookies',
    message:
      'Nous utilisons des cookies de mesure d’audience pour savoir quelles pages sont utiles. Rien ne se charge avant votre choix.',
    policy: 'Politique relative aux cookies',
    accept: 'Accepter',
    decline: 'Refuser',
  },

  hero: {
    eyebrow: 'Studio logiciel · Depuis 2017',
    titleLine1: 'Nous créons des logiciels qui',
    titleLine2Before: 'font avancer les ',
    titleLine2Highlight: 'entreprises',
    titleLine2After: '.',
    lead: 'Nous concevons et développons des sites web, des applications web sur mesure, des solutions basées sur l’IA et l’automatisation des processus pour les start-up et les entreprises en croissance.',
    primaryCta: 'Planifier un appel',
    secondaryCta: 'Voir les réalisations',
    stats: {
      projects: 'Projets livrés',
      years: 'Années d’expérience',
      returning: 'Clients qui reviennent',
    },
    cards: {
      uptime: 'Disponibilité, 90 jours',
      lcp: 'LCP médian',
      deploys: 'Déploiements cette semaine',
      ci: 'Contrôles CI réussis',
    },
  },

  servicesSection: {
    eyebrow: 'Ce que nous faisons',
    title: 'Dix domaines d’intervention, une seule équipe.',
    lead: 'Aucun relais entre agences, aucun sous-traitant que vous ne rencontrerez jamais. Ceux qui cadrent votre projet sont ceux qui le construisent.',
    allServices: 'Tous les services',
    from: (price: string) => `À partir de ${price}`,
  },

  portfolioSection: {
    eyebrow: 'Réalisations choisies',
    title: 'Trois projets, et ce qu’ils ont changé.',
    lead: 'Nous publions les chiffres que nos clients ont accepté de partager, y compris ceux des projets qui ont pris plus de temps que prévu.',
    allWork: 'Toutes les réalisations',
    viewCaseStudy: 'Voir l’étude de cas',
    readCaseStudy: 'Lire l’étude de cas',
    cardAria: (title: string, client: string) => `${title} — lire l’étude de cas ${client}`,
    readAria: (client: string) => `Lire l’étude de cas ${client}`,
    viewCode: 'Code',
    viewLive: 'Site en ligne',
    codeAria: (title: string) => `Code source de ${title} (ouvre un nouvel onglet)`,
    liveAria: (title: string) => `Site en ligne de ${title} (ouvre un nouvel onglet)`,
  },

  stats: {
    projects: { label: 'Projets livrés', note: 'Logistique, santé, fintech et commerce' },
    returning: { label: 'Clients qui reviennent', note: 'Mesuré sur les missions répétées depuis 2019' },
    savings: { label: 'Économies annuelles clients', note: 'Sur les seuls projets d’automatisation de 2025' },
    uptime: { label: 'Disponibilité des systèmes infogérés', note: 'Moyenne glissante sur douze mois' },
  },

  process: {
    eyebrow: 'Notre méthode',
    title: 'Sept phases, et vous voyez à l’intérieur de chacune.',
    lead: 'Chaque phase produit un livrable que vous pouvez examiner. Une phase qui ne produit rien à lire ou à cliquer n’en était pas une.',
  },

  tech: {
    eyebrow: 'Technologies',
    title: 'Des technologies ennuyeuses, choisies exprès.',
    lead: 'Nous retenons des outils au support durable et au vivier de recrutement large, pour que votre équipe puisse maintenir ce que nous livrons.',
    screenReaderList: (list: string) => `Technologies que nous utilisons : ${list}.`,
  },

  testimonials: {
    eyebrow: 'Clients',
    title: 'Ce que les clients disent une fois le projet terminé.',
    lead: 'Chaque témoignage provient d’un client identifié, sur un projet dont vous pouvez lire l’étude de cas.',
  },

  pricing: {
    eyebrow: 'Modes de collaboration',
    title: 'Un prix issu d’un périmètre, jamais d’une supposition.',
    lead: 'Le cadrage est facturé séparément et produit l’estimation. Si la fourchette ne convient pas, vous gardez le document et ne devez rien de plus.',
    mostChosen: 'Le plus choisi',
    footnote:
      'Toutes nos missions incluent la propriété du code source, la documentation et un exercice de transfert avec vos développeurs.',
  },

  faq: {
    eyebrow: 'Questions',
    title: 'Ce que les clients demandent au premier appel.',
    leadBefore: 'Votre question n’est pas là ? ',
    leadLink: 'Posez-la nous directement',
    leadAfter: ' — un humain répond, généralement sous 24 heures.',
  },

  cta: {
    title: 'Dites-nous ce qui freine votre entreprise.',
    lead: 'Un appel de 30 minutes, sans présentation. Nous vous dirons si c’est un projet que nous devrions prendre, et par quoi nous commencerions.',
    button: 'Planifier un appel',
    portfolioTitle: 'Vous avez un projet similaire en tête ?',
    blogTitle: 'On regarde votre cas ?',
    aboutTitle: 'Envie de rencontrer l’équipe qui le construirait ?',
    postTitle: 'Vous travaillez sur un sujet proche ?',
    postLead:
      'Si ce qui précède ressemble à votre situation, un appel de 30 minutes reste le moyen le plus rapide de savoir si nous pouvons aider.',
  },

  categories: {
    all: 'Tous',
    webApp: 'Application web',
    website: 'Site web',
    ai: 'IA',
    automation: 'Automatisation',
    mobile: 'Mobile',
    ecommerce: 'E-commerce',
  },

  postCategories: {
    all: 'Tous',
    engineering: 'Ingénierie',
    ai: 'IA',
    design: 'Design',
    product: 'Produit',
    performance: 'Performance',
  },

  filters: {
    projectsGroupLabel: 'Filtrer les projets par type',
    articlesGroupLabel: 'Filtrer les articles par catégorie',
    searchProjectsLabel: 'Rechercher des projets',
    searchProjectsPlaceholder: 'Rechercher une réalisation ou une technologie',
    searchArticlesLabel: 'Rechercher des articles',
    searchArticlesPlaceholder: 'Rechercher des articles',
    clearSearch: 'Effacer la recherche',
    clearFilters: 'Réinitialiser les filtres',
    projectCount: (n: number) => `${n} ${n <= 1 ? 'projet' : 'projets'}`,
    inCategory: (category: string) => ` en ${category}`,
    articleCount: (n: number) => `${n} ${n <= 1 ? 'article' : 'articles'}`,
    noProjectsTitle: 'Aucun projet ne correspond encore',
    noProjectsBody:
      'Nous l’avons probablement déjà fait — tout n’est pas publié. Réinitialisez les filtres, ou demandez-nous directement.',
    noArticlesTitle: 'Rien n’a encore été publié là-dessus',
    noArticlesBody:
      'Essayez un terme plus large, ou dites-nous ce que vous espériez lire et nous l’écrirons.',
  },

  pages: {
    home: {
      metaTitle: 'Studio logiciel : sites web, applications web et IA',
    },
    services: {
      eyebrow: 'Services',
      title: 'Dix façons d’aider, et le moment où chacune cesse d’en valoir la peine.',
      lead: 'La plupart des missions en combinent deux ou trois. Si un outil moins cher règle votre problème, nous vous le dirons dès le premier appel et nous vous enverrons le lien.',
      metaTitle: 'Services',
      metaDescription:
        'Développement de sites web, applications web sur mesure, intégrations IA, automatisation des processus, applications mobiles, e-commerce, design UI/UX, déploiement cloud, support et SEO — livrés par une seule équipe.',
    },
    portfolio: {
      eyebrow: 'Réalisations',
      title: 'Un travail que l’on peut mesurer, pas seulement regarder.',
      lead: 'Chaque projet ci-dessous est publié avec l’accord du client, chiffres compris. Filtrez par type ou cherchez par technologie.',
      metaTitle: 'Réalisations',
      metaDescription:
        'Réalisations choisies d’Arclight : plateformes de gestion du fret, triage clinique par IA, portails investisseurs, commerce headless, applications mobiles de terrain et automatisation de l’onboarding.',
    },
    caseStudies: {
      eyebrow: 'Études de cas',
      title: 'Toute l’histoire, y compris les passages gênants.',
      lead: 'Problème, solution, technologies, résultats. Rédigées avec le client et publiées avec son accord.',
      metaTitle: 'Études de cas',
      metaDescription:
        'Comptes rendus complets des missions Arclight : le problème, la solution, les technologies et les résultats mesurés — y compris ce qui a pris plus de temps que prévu.',
    },
    blog: {
      eyebrow: 'Écrits',
      title: 'Des notes prises à l’intérieur du travail.',
      lead: 'Ce que nous avons appris sur des missions réelles, y compris les décisions que nous prendrions autrement. Un numéro par mois, aucune séquence.',
      metaTitle: 'Blog',
      metaDescription:
        'Notes d’ingénierie de l’équipe Arclight sur l’évaluation de l’IA, la performance réelle, la qualité du transfert, la conception de logiciels de terrain et le chiffrage honnête.',
    },
    about: {
      eyebrow: 'À propos',
      title: 'Quatorze personnes, aucun commercial.',
      lead: (founded: string) =>
        `Fondé en ${founded}. Nous travaillons en petites équipes expérimentées, publions les chiffres que nos clients acceptent de partager, et nous évaluons à une seule aune : vos développeurs peuvent-ils faire évoluer notre travail six mois plus tard ?`,
      metaTitle: 'À propos',
      metaDescription:
        'Arclight est un studio logiciel de 14 personnes fondé en 2017. Nous travaillons en petites équipes expérimentées, publions nos chiffres et livrons du code que vos propres développeurs peuvent faire évoluer.',
      principlesEyebrow: 'Notre façon de travailler',
      principlesTitle: 'Quatre engagements qui nous ont fait refuser des projets.',
      principlesLead:
        'Ce ne sont pas des valeurs affichées au mur. Chacune nous a déjà coûté un projet, et c’est le seul test qui compte.',
      principles: {
        fieldwork: {
          title: 'Nous commençons là où le travail se fait',
          detail:
            'Le cadrage, c’est s’asseoir auprès de ceux qui utiliseront le logiciel. Deux semaines dans un dépôt ont changé plus de décisions d’architecture que n’importe quel cahier des charges.',
        },
        honesty: {
          title: 'Il nous arrive de vous dissuader',
          detail:
            'Trois fois l’an dernier, nous avons dit à un prospect qu’un outil à 40 dollars réglerait son problème. Deux d’entre eux sont revenus plus tard avec un sujet où nous étions vraiment utiles.',
        },
        handover: {
          title: 'Le transfert est un livrable',
          detail:
            'Avant la facture finale, un de vos développeurs livre une vraie fonctionnalité pendant que nous observons sans intervenir. Ce qui le bloque, nous le corrigeons encore sous contrat.',
        },
        teams: {
          title: 'Petites équipes, profils expérimentés',
          detail:
            'De deux à quatre personnes par projet, qui toutes codent ou conçoivent. Aucune couche de gestion de compte entre vous et ceux qui font le travail.',
        },
      },
      numbersEyebrow: 'En chiffres',
      numbersTitle: 'Neuf ans, et les preuves.',
      numbersLead:
        'Nous communiquons chaque mois le taux d’occupation et la précision de livraison à nos clients sous contrat. Voici les chiffres annuels issus des mêmes données.',
      numbers: {
        projects: 'Projets livrés depuis 2017',
        people: 'Personnes, qui toutes construisent',
        sprints: 'Sprints livrés dans le périmètre',
        timezones: 'Fuseaux horaires couverts chaque jour',
      },
      teamEyebrow: 'Équipe',
      teamTitle: 'Les personnes qui seraient sur votre projet.',
      teamLead:
        'Chaque nom ici écrit du code ou conçoit des interfaces. Les deux fondateurs sont toujours dans les équipes de livraison.',
      team: {
        marcus: { role: 'Ingénieur principal & cofondateur', focus: 'Architecture, performance' },
        yuki: { role: 'Directrice du design & cofondatrice', focus: 'Design produit, accessibilité' },
        ines: { role: 'Ingénieure ML', focus: 'Recherche d’information, évaluation' },
        sofia: { role: 'Responsable de livraison', focus: 'Cadrage, automatisation' },
        daniel: { role: 'Ingénieur senior', focus: 'Backend, infrastructure cloud' },
        hana: { role: 'Ingénieure senior', focus: 'Front-end, design systems' },
      },
      historyEyebrow: 'Histoire',
      historyTitle: 'Comment nous en sommes arrivés là.',
      milestones: {
        '2017': 'Fondé à San Francisco par deux ingénieurs qui s’étaient rencontrés dans une agence en perdition.',
        '2019': 'Premier grand compte. Contrat réécrit pour que la variable soit le périmètre, pas l’échéance.',
        '2021': 'Passage au télétravail sur quatre fuseaux horaires, et fin du recrutement par localisation.',
        '2023': 'Création d’une pratique machine learning après que deux clients ont demandé la même chose en un mois.',
        '2025': 'Publication de nos premiers post-mortem de livraison, y compris les projets qui ont dérapé.',
        '2026': '14 personnes, 112 projets livrés, et toujours aucun commercial.',
      },
      curiousBefore: 'Curieux du travail derrière ces années ? ',
      curiousLink: 'Lisez les études de cas',
      curiousAfter: '.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Dites-nous ce qui vous ralentit.',
      lead: 'Envoyez-nous les détails, ou réservez directement un créneau. Dans les deux cas, vous parlez d’abord à un responsable technique — nous n’avons pas de filtre commercial.',
      metaTitle: 'Contact',
      metaDescription:
        'Démarrez un projet avec Arclight. Écrivez-nous ou réservez 30 minutes directement dans l’agenda d’un responsable technique — sans appel de qualification préalable.',
      formHeading: 'Formulaire de demande',
      details: {
        email: 'E-mail',
        phone: 'Téléphone',
        studio: 'Studio',
        replyTime: 'Délai de réponse',
        replyValue: 'Un jour ouvré, par un humain',
      },
    },
    notFound: {
      eyebrow: 'Erreur 404',
      title: 'Cette page n’existe pas.',
      lead: 'Le lien est peut-être obsolète, ou nous avons déplacé la page. Les réalisations et les articles sont toujours là.',
      home: 'Retour à l’accueil',
      work: 'Parcourir les réalisations',
      metaTitle: 'Page introuvable',
    },
  },

  caseStudy: {
    backToAll: 'Toutes les études de cas',
    duration: 'Durée',
    team: 'Équipe',
    industry: 'Secteur',
    delivered: 'Livré',
    problem: 'Le problème',
    solution: 'La solution',
    approach: 'Notre approche',
    results: 'Résultats',
    technologies: 'Technologies',
    startProject: 'Lancer un projet comme celui-ci',
    nextCaseStudy: 'Étude de cas suivante',
    breadcrumbHome: 'Accueil',
    breadcrumbCaseStudies: 'Études de cas',
  },

  post: {
    backToAll: 'Tous les écrits',
    readingTime: (time: string) => `${time} de lecture`,
    keepReading: 'À lire ensuite',
    read: 'Lire',
  },

  legal: {
    updated: (date: string) => `Mis à jour le ${date}`,
  },

  calendly: {
    eyebrow: 'Réserver directement',
    title: 'Choisissez un créneau de 30 minutes',
    body: 'Directement dans l’agenda d’un responsable technique. Sans appel de qualification, sans présentation.',
    open: 'Ouvrir',
  },

  contactForm: {
    nameLabel: 'Nom complet',
    namePlaceholder: 'Alex Dupont',
    emailLabel: 'E-mail professionnel',
    emailPlaceholder: 'alex@entreprise.fr',
    companyLabel: 'Entreprise',
    companyPlaceholder: 'Northwind Logistics',
    optional: 'Facultatif',
    topicLegend: 'De quoi avez-vous besoin ?',
    budgetLegend: 'Fourchette budgétaire',
    messageLabel: 'Quel problème cherchez-vous à résoudre ?',
    messagePlaceholder:
      'Nous coordonnons 4 000 chargements par jour dans des tableurs, et deux dépôts acceptent régulièrement le même chargement…',
    consent:
      'Arclight peut m’écrire au sujet de cette demande. Aucune liste de diffusion, aucun partage avec des tiers.',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours',
    sentTitle: 'Message envoyé',
    sentBody:
      'Un humain lit chaque demande — réponse généralement sous un jour ouvré. Si c’est urgent, le lien d’agenda de cette page réserve directement un créneau.',
    sendAnother: 'Envoyer un autre message',
    failed:
      'L’envoi a échoué. Vérifiez votre connexion et réessayez, ou écrivez directement à hello@arclight.studio.',
    topics: {
      newProject: 'Un nouveau produit ou site',
      existingProduct: 'Améliorer un existant',
      aiAutomation: 'IA ou automatisation',
      retainer: 'Accompagnement continu',
      other: 'Autre chose',
    },
    budgets: {
      under15k: 'Moins de 15 000 $',
      '15kTo50k': '15 000 $ – 50 000 $',
      '50kTo150k': '50 000 $ – 150 000 $',
      '150kPlus': 'Plus de 150 000 $',
      notSure: 'Pas encore défini',
    },
    errors: {
      name: 'Indiquez votre nom complet.',
      email: 'Indiquez une adresse e-mail à laquelle nous pouvons répondre.',
      budget: 'Choisissez la fourchette la plus proche — une estimation suffit.',
      topic: 'Dites-nous ce qui s’en rapproche le plus.',
      messageShort: 'Une ou deux phrases sur le problème nous aident à répondre utilement.',
      messageLong: 'Restez sous 4 000 caractères — nous approfondirons pendant l’appel.',
      consent: 'Nous avons besoin de votre accord pour répondre par e-mail.',
    },
  },
}
