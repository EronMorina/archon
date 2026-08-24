/**
 * English UI dictionary — the reference shape.
 *
 * `Dictionary` is derived from this object, so `de.ts` and `fr.ts` fail to
 * compile the moment a key is missing, renamed or the wrong type. Anything
 * that varies grammatically by count is a function, not a template string,
 * because German and French do not pluralise the way English does.
 *
 * Long-form editorial copy (services, projects, posts, legal) lives in
 * `src/content/*`, not here — this file is chrome, headings and microcopy.
 */
export const en = {
  site: {
    tagline: 'Building software that moves businesses forward.',
    description:
      'ARCHION is a software studio that designs and builds websites, custom web applications, AI-powered solutions and business automation for startups and growing companies.',
    kicker: 'Software studio',
    remoteFirst: 'Remote-first',
  },

  a11y: {
    skipToContent: 'Skip to content',
    mainNavigation: 'Main',
    home: 'home',
    outputsOf: (phase: string) => `${phase} outputs`,
  },

  nav: {
    links: {
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
    },
    cta: 'Schedule a call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  language: {
    label: 'Language',
    change: 'Change language',
    current: (name: string) => `Current language: ${name}`,
  },

  theme: {
    toggle: 'Switch theme',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },

  footer: {
    groups: {
      services: {
        heading: 'Services',
        links: {
          websiteDevelopment: 'Website development',
          customWebApps: 'Custom web apps',
          aiIntegrations: 'AI integrations',
          businessAutomation: 'Business automation',
          cloudDeployment: 'Cloud deployment',
        },
      },
      company: {
        heading: 'Company',
        links: {
          about: 'About',
          portfolio: 'Portfolio',
          blog: 'Blog',
          contact: 'Contact',
        },
      },
      legal: {
        heading: 'Legal',
        links: {
          privacy: 'Privacy policy',
          terms: 'Terms of service',
          cookies: 'Cookie policy',
          accessibility: 'Accessibility',
        },
      },
    },
    newsletter: {
      heading: 'Newsletter',
      emailLabel: 'Email address',
      placeholder: 'you@company.com',
      subscribe: 'Subscribe',
      note: 'One engineering note a month. No sequences, no sales drips.',
      invalid: 'Enter an email address we can reach you at.',
      success: 'You are on the list. One issue a month.',
      failed: 'That did not send. Try again, or email archonisolutions@gmail.com.',
    },
  },

  cookies: {
    label: 'Cookie preferences',
    message:
      'We use analytics cookies to see which pages help people and which do not. Nothing loads until you choose.',
    policy: 'Cookie policy',
    accept: 'Accept',
    decline: 'Decline',
  },

  hero: {
    titleLine1: 'Building software that',
    titleLine2Before: 'moves ',
    titleLine2Highlight: 'businesses',
    titleLine2After: ' forward.',
    lead: 'We design and build websites, custom web applications, AI-powered solutions and business automation for startups and growing companies.',
    primaryCta: 'Schedule a call',
    secondaryCta: 'View portfolio',
    stats: {
      projects: 'Projects shipped',
      years: 'Years building',
      returning: 'Clients who return',
    },
    cards: {
      uptime: 'Uptime, 90 days',
      lcp: 'Median LCP',
      deploys: 'Deploys this week',
      ci: 'CI checks passing',
    },
  },

  servicesSection: {
    eyebrow: 'What we do',
    title: 'Nine service lines, one delivery team.',
    lead: 'No handoffs between agencies, no subcontractors you never meet. The people who scope your project are the people who build it.',
    allServices: 'All services',
    from: (price: string) => `From ${price}`,
  },

  portfolioSection: {
    eyebrow: 'From GitHub',
    title: 'What we are building, straight from the repositories.',
    lead: 'Pulled live from GitHub — the same repositories you can clone, read and run yourself.',
    allWork: 'All repositories',
  },

  stats: {
    projects: { label: 'Projects delivered', note: 'Across logistics, health, fintech and retail' },
    returning: { label: 'Clients who return', note: 'Measured on repeat engagements since 2019' },
    savings: { label: 'Annual client savings', note: 'From automation work in 2025 alone' },
    uptime: { label: 'Uptime on managed builds', note: 'Rolling 12-month average' },
  },

  process: {
    eyebrow: 'How we work',
    title: 'Seven phases, and you can see into all of them.',
    lead: 'Every phase has an output you can review. If a phase produces nothing you can read or click, it was not a phase.',
  },

  tech: {
    eyebrow: 'Stack',
    title: 'Boring technology, chosen on purpose.',
    lead: 'We pick tools with long support windows and large hiring pools, so your team can maintain what we build after we hand it over.',
    screenReaderList: (list: string) => `Technologies we work with: ${list}.`,
  },

  testimonials: {
    eyebrow: 'Clients',
    title: 'What people say when the project is over.',
    lead: 'Every quote below is from a named client on a project we delivered end to end.',
  },

  pricing: {
    eyebrow: 'Engagement models',
    title: 'Priced from a scope, never from a guess.',
    lead: 'Discovery is priced separately and produces the estimate. If the range does not work, you keep the document and owe nothing further.',
    mostChosen: 'Most chosen',
    footnote:
      'All engagements include source code ownership, documentation and a handover exercise with your engineers.',
  },

  faq: {
    eyebrow: 'Questions',
    title: 'The things clients ask on the first call.',
    leadBefore: 'Something not covered? ',
    leadLink: 'Ask us directly',
    leadAfter: ' — a person replies, usually within a day.',
  },

  cta: {
    title: 'Tell us what is slowing your business down.',
    lead: 'A 30-minute call, no deck. We will tell you whether this is a project we should take, and what we would do first.',
    button: 'Schedule a call',
    portfolioTitle: 'Have something similar in mind?',
    blogTitle: 'Want us to look at your version of this?',
    aboutTitle: 'Want to meet the team that would build it?',
    postTitle: 'Working on something this touches?',
    postLead:
      'If any of the above sounds like your situation, a 30-minute call is usually the fastest way to find out whether we can help.',
  },

  postCategories: {
    all: 'All',
    engineering: 'Engineering',
    ai: 'AI',
    design: 'Design',
    product: 'Product',
    performance: 'Performance',
  },

  filters: {
    articlesGroupLabel: 'Filter articles by category',
    searchArticlesLabel: 'Search articles',
    searchArticlesPlaceholder: 'Search articles',
    clearSearch: 'Clear search',
    clearFilters: 'Clear filters',
    articleCount: (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}`,
    noArticlesTitle: 'Nothing published on that yet',
    noArticlesBody: 'Try a broader term, or tell us what you were hoping to read and we will write it.',
  },

  /**
   * Chrome for the GitHub-backed portfolio. Repository names, languages and
   * topics come from the API as they are written on GitHub and are never
   * translated — only the labels around them are.
   */
  repos: {
    viewRepo: 'View repository',
    viewLive: 'Live site',
    viewCode: 'Code',
    liveBadge: 'Live',
    shotAlt: (name: string) => `Screenshot of the site deployed from ${name}`,
    cardAlt: (name: string) => `GitHub repository card for ${name}`,
    repoAria: (name: string) => `${name} on GitHub (opens in a new tab)`,
    liveAria: (name: string) => `Live site for ${name} (opens in a new tab)`,
    stars: 'Stars',
    forks: 'Forks',
    updated: 'Last push',
    topicsLabel: 'Repository topics',
    noDescription: 'No description on GitHub yet.',
    noLanguage: 'Other',
    allLanguages: 'All',
    groupLabel: 'Filter repositories by language',
    searchLabel: 'Search repositories',
    searchPlaceholder: 'Search name, topic or language',
    count: (n: number) => `${n} ${n === 1 ? 'repository' : 'repositories'}`,
    inLanguage: (language: string) => ` in ${language}`,
    noMatchTitle: 'No repositories match that',
    noMatchBody: 'Try a broader term, or clear the filters to see everything on the account.',
    profileLink: (user: string) => `See all repositories at github.com/${user}`,
    unavailableTitle: 'GitHub is not answering right now',
    unavailableBody:
      'The repository list could not be loaded. It is usually back within a few minutes — until then, the profile itself is the fastest route.',
  },

  pages: {
    home: {
      metaTitle: 'Software studio for websites, web apps and AI',
    },
    services: {
      eyebrow: 'Services',
      title: 'Nine ways we help, and the point at which each stops being worth it.',
      lead: 'Most engagements combine two or three of these. If a cheaper tool would solve your problem, we will tell you on the first call and send you the link.',
      metaTitle: 'Services',
      metaDescription:
        'Website development, custom web applications, AI integrations, business automation, mobile apps, e-commerce, UI/UX design, cloud deployment, support and SEO — delivered by one team.',
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Work you can read line by line.',
      lead: 'Every repository below is pulled live from GitHub, most recently pushed first. Filter by language, or search by name and topic.',
      metaTitle: 'Portfolio',
      metaDescription:
        'Public repositories from ARCHION on GitHub — each one with its language, topics, source code and, where there is one, the live build.',
    },
    blog: {
      eyebrow: 'Writing',
      title: 'Notes from inside the work.',
      lead: 'What we learned on real engagements, including the decisions we would make differently. One issue a month, no sequences.',
      metaTitle: 'Blog',
      metaDescription:
        'Engineering notes from the ARCHION team on AI evaluation, real-user performance, handover quality, field software design and honest scoping.',
    },
    about: {
      eyebrow: 'About',
      title: 'Fourteen people, no salespeople.',
      lead: (founded: string) =>
        `Founded in ${founded}. We work in small senior teams, publish the numbers our clients agree to share, and measure ourselves on whether your engineers can extend what we built six months later.`,
      metaTitle: 'About',
      metaDescription:
        'ARCHION is a 14-person software studio founded in 2017. We work in small senior teams, publish our numbers, and hand over code your own engineers can extend.',
      principlesEyebrow: 'How we operate',
      principlesTitle: 'Four commitments we have turned down work over.',
      principlesLead:
        'These are not values on a wall. Each one has cost us a project, which is the only test that means anything.',
      principles: {
        fieldwork: {
          title: 'We start where the work happens',
          detail:
            'Discovery means sitting with the people who will use the software. Two weeks in a depot has changed more of our architecture decisions than any requirements document.',
        },
        honesty: {
          title: 'We will talk you out of projects',
          detail:
            'Three times last year we told a prospective client that a $40 tool would solve their problem. Two of them came back later with something we were actually needed for.',
        },
        handover: {
          title: 'Handover is a deliverable',
          detail:
            'Before the final invoice, one of your engineers ships a real feature while we watch and stay quiet. Whatever they get stuck on, we fix while still under contract.',
        },
        teams: {
          title: 'Small teams, senior people',
          detail:
            'Two to four people per project, all of whom write code or design. No account layer between you and the person doing the work.',
        },
      },
      numbersEyebrow: 'By the numbers',
      numbersTitle: 'Nine years, and the receipts.',
      numbersLead:
        'We report utilisation and delivery accuracy to clients on retainer every month. These are the annual figures from the same data.',
      numbers: {
        projects: 'Projects shipped since 2017',
        people: 'People, all of whom build',
        sprints: 'Sprints delivered on scope',
        timezones: 'Time zones covered daily',
      },
      teamEyebrow: 'Team',
      teamTitle: 'The people who would be on your project.',
      teamLead: 'Every name here writes code or designs interfaces. The two founders are still on delivery teams.',
      team: {
        marcus: { role: 'Principal Engineer & co-founder', focus: 'Architecture, performance' },
        yuki: { role: 'Design Lead & co-founder', focus: 'Product design, accessibility' },
        ines: { role: 'ML Engineer', focus: 'Retrieval, evaluation' },
        sofia: { role: 'Delivery Lead', focus: 'Scoping, automation' },
        daniel: { role: 'Senior Engineer', focus: 'Backend, cloud infrastructure' },
        hana: { role: 'Senior Engineer', focus: 'Front-end, design systems' },
      },
      historyEyebrow: 'History',
      historyTitle: 'How we got here.',
      milestones: {
        '2017': 'Founded in San Francisco by two engineers who had met at a failing agency.',
        '2019': 'First enterprise client. Rewrote our contract so scope, not deadline, was the variable.',
        '2021': 'Went remote-first across four time zones and stopped hiring for locations.',
        '2023': 'Added a machine learning practice after two clients asked for the same thing in one month.',
        '2025': 'Published our first delivery post-mortems publicly, including the projects that slipped.',
        '2026': '14 people, 112 projects shipped, and still no salespeople.',
      },
      curiousBefore: 'Curious about the work behind those years? ',
      curiousLink: 'Read the case studies',
      curiousAfter: '.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what is slowing you down.',
      lead: 'Send the details below, or book a slot directly. Either way you speak to a technical lead first — we do not run a qualification layer.',
      metaTitle: 'Contact',
      metaDescription:
        'Start a project with ARCHION. Send a message or book a 30-minute call straight into a technical lead’s calendar — no qualification call first.',
      formHeading: 'Enquiry form',
      details: {
        email: 'Email',
        replyTime: 'Reply time',
        replyValue: 'One business day, from a person',
      },
    },
    notFound: {
      eyebrow: 'Error 404',
      title: 'This page does not exist.',
      lead: 'The link may be out of date, or we may have moved the page. The work and the writing are both still here.',
      home: 'Back to home',
      work: 'Browse the work',
      metaTitle: 'Page not found',
    },
  },

  post: {
    backToAll: 'All writing',
    readingTime: (time: string) => `${time} read`,
    keepReading: 'Keep reading',
    read: 'Read',
  },

  legal: {
    updated: (date: string) => `Updated ${date}`,
  },

  calendly: {
    eyebrow: 'Book directly',
    title: 'Pick a 30-minute slot',
    body: 'Straight into a technical lead’s calendar. No qualification call first, no deck.',
    open: 'Open',
  },

  contactForm: {
    nameLabel: 'Full name',
    namePlaceholder: 'Alex Whitfield',
    emailLabel: 'Work email',
    emailPlaceholder: 'alex@company.com',
    companyLabel: 'Company',
    companyPlaceholder: 'Northwind Logistics',
    optional: 'Optional',
    topicLegend: 'What do you need?',
    budgetLegend: 'Budget range',
    messageLabel: 'What are you trying to solve?',
    messagePlaceholder:
      'We coordinate 4,000 daily freight loads through spreadsheets, and two depots keep accepting the same load…',
    consent: 'ARCHION may email me about this enquiry. No marketing lists, and no sharing with anyone else.',
    submit: 'Send message',
    sending: 'Sending',
    sentTitle: 'Message sent',
    sentBody:
      'A person reads every enquiry — usually a reply within one business day. If it is urgent, the calendar link on this page books straight into a slot.',
    sendAnother: 'Send another message',
    failed: 'That did not send. Check your connection and try again, or email archonisolutions@gmail.com directly.',
    topics: {
      newProject: 'A new product or site',
      existingProduct: 'Improving something live',
      aiAutomation: 'AI or automation work',
      retainer: 'Ongoing support',
      other: 'Something else',
    },
    budgets: {
      under15k: 'Under $15k',
      '15kTo50k': '$15k – $50k',
      '50kTo150k': '$50k – $150k',
      '150kPlus': '$150k+',
      notSure: 'Not sure yet',
    },
    errors: {
      name: 'Enter your full name.',
      email: 'Enter an email address we can reply to.',
      budget: 'Pick the closest range — an estimate is fine.',
      topic: 'Tell us which of these is closest.',
      messageShort: 'A sentence or two about the problem helps us reply usefully.',
      messageLong: 'Keep it under 4,000 characters — we can go deeper on the call.',
      consent: 'We need your permission to reply by email.',
    },
  },
}

export type Dictionary = typeof en
