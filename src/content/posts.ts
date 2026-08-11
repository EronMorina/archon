import type { Locale } from '@/lib/i18n/config'

/**
 * Engineering notes.
 *
 * Slug, date, category key, author name and reading time are language-neutral;
 * the title, excerpt, author's job title and body are translated. Bodies are
 * markdown-ish plain text — swap for MDX or CMS rich text later.
 */
export type PostCategory = 'engineering' | 'ai' | 'design' | 'product' | 'performance'

export type PostSlug =
  | 'grounding-llm-features-in-your-own-data'
  | 'what-a-lighthouse-score-does-not-tell-you'
  | 'the-handover-is-the-product'
  | 'designing-for-gloves-and-bad-light'
  | 'scoping-fixed-price-software-honestly'
  | 'when-not-to-automate-a-process'

type PostBase = {
  slug: PostSlug
  category: PostCategory
  date: string
  readingTime: string
  author: { name: string; initials: string }
  featured?: boolean
}

type PostCopy = {
  title: string
  excerpt: string
  authorRole: string
  body: string[]
}

export type Post = Omit<PostBase, 'author'> &
  Omit<PostCopy, 'authorRole'> & {
    author: { name: string; initials: string; role: string }
  }

const base: PostBase[] = [
  {
    slug: 'grounding-llm-features-in-your-own-data',
    category: 'ai',
    date: '2026-07-28',
    readingTime: '9 min',
    author: { name: 'Ines Duarte', initials: 'ID' },
    featured: true,
  },
  {
    slug: 'what-a-lighthouse-score-does-not-tell-you',
    category: 'performance',
    date: '2026-07-09',
    readingTime: '7 min',
    author: { name: 'Marcus Ainsley', initials: 'MA' },
    featured: true,
  },
  {
    slug: 'the-handover-is-the-product',
    category: 'engineering',
    date: '2026-06-22',
    readingTime: '6 min',
    author: { name: 'Marcus Ainsley', initials: 'MA' },
  },
  {
    slug: 'designing-for-gloves-and-bad-light',
    category: 'design',
    date: '2026-06-03',
    readingTime: '8 min',
    author: { name: 'Yuki Tanaka', initials: 'YT' },
  },
  {
    slug: 'scoping-fixed-price-software-honestly',
    category: 'product',
    date: '2026-05-19',
    readingTime: '7 min',
    author: { name: 'Sofia Ferreira', initials: 'SF' },
  },
  {
    slug: 'when-not-to-automate-a-process',
    category: 'engineering',
    date: '2026-04-30',
    readingTime: '5 min',
    author: { name: 'Sofia Ferreira', initials: 'SF' },
  },
]

const copy: Record<Locale, Record<PostSlug, PostCopy>> = {
  en: {
    'grounding-llm-features-in-your-own-data': {
      title: 'Grounding LLM features in your own data without shipping a hallucination',
      excerpt:
        'Retrieval is the easy half. The hard half is deciding what your system does when it is not confident — and measuring that before launch.',
      authorRole: 'ML Engineer',
      body: [
        'Most AI features fail in the same place. Not retrieval, not the prompt, but the moment the model is asked something the documents do not answer. A system with no defined behaviour for that moment will invent one.',
        'We start every AI engagement by building an evaluation set before choosing a model. A hundred real questions with known-correct answers, labelled by someone who does the job. It takes a week and it changes every decision that follows.',
        'The second commitment is confidence gating. A field extracted below threshold is left blank and flagged for a human, not filled with the best guess. An empty field costs a nurse ten seconds. A wrong date of birth costs considerably more.',
        'Finally, log every human correction. Corrections are the only honest signal about where your system is weak, and they arrive free of charge from the people already using it.',
      ],
    },
    'what-a-lighthouse-score-does-not-tell-you': {
      title: 'What a Lighthouse score does not tell you',
      excerpt:
        'A perfect lab score and a slow site are entirely compatible. Here is how we instrument real-user performance instead.',
      authorRole: 'Principal Engineer',
      body: [
        "Lighthouse runs on a simulated connection, on a machine that is not your customer's, once. Real-user monitoring runs on every device that visits you, forever. Only one of those tells you whether the site is fast.",
        "The gap usually shows up in two places: third-party scripts loaded after the audit, and images sized for the developer's laptop rather than a 390px viewport.",
        'We ship a performance budget with every build and wire it into CI. A pull request that pushes JavaScript past the budget fails, which turns performance from a launch-week push into a constraint the team designs within.',
        'Keep the lab score. It catches regressions early and cheaply. Just do not confuse it with the experience your customers are having.',
      ],
    },
    'the-handover-is-the-product': {
      title: 'The handover is the product',
      excerpt:
        'Agency work has a failure mode: excellent software nobody internally can extend. Documentation is not the fix.',
      authorRole: 'Principal Engineer',
      body: [
        "Six months after a build, the measure of quality is not the Lighthouse score. It is whether the client's own engineer can add a feature on a Tuesday without calling us.",
        'Written documentation decays. What survives is legible structure: consistent naming, obvious file locations, tests that describe intent, and a README that gets someone running locally in under ten minutes.',
        'We now run a handover exercise before the final invoice. A client engineer implements a small real feature while we watch and answer nothing unless asked. Whatever they get stuck on is what we fix.',
        'It has never once gone smoothly on the first attempt, which is exactly why we do it while we are still under contract.',
      ],
    },
    'designing-for-gloves-and-bad-light': {
      title: 'Designing for gloves, bad light and no signal',
      excerpt:
        'Field software breaks every assumption a desktop dashboard is built on. What we learned shipping to 1,100 engineers.',
      authorRole: 'Design Lead',
      body: [
        'A substation at 7am in January is the real design environment: low light, thick gloves, no signal, one free hand. Every convention from web dashboard design has to be re-earned there.',
        'Touch targets went to 56px minimum. Contrast went well past WCAG AA because AA assumes an office. The primary action moved to the bottom third of the screen, inside thumb reach.',
        'The single highest-impact change was not a control at all. It was a per-job sync status chip. Engineers had abandoned the previous app because they could not tell whether their work had saved.',
        'Trust is a design requirement. If people cannot see that the system did what they asked, they will keep the paper backup — and then you have two systems.',
      ],
    },
    'scoping-fixed-price-software-honestly': {
      title: 'How we scope fixed-price software honestly',
      excerpt:
        'Fixed price only works when the discovery phase is real. Here is the shape of the estimate we actually stand behind.',
      authorRole: 'Delivery Lead',
      body: [
        'A fixed price on a vague scope is not a commitment, it is a bet — and the client pays for the hedge either way.',
        'We separate discovery from delivery and price them separately. Discovery produces an architecture document, a prioritised backlog and a range. If the range does not work for you, you own the document and can take it elsewhere.',
        'Inside delivery we fix the price and the deadline, and keep scope as the variable. Every sprint the client chooses what enters, and the backlog absorbs the surprises that always exist.',
        'This is less profitable on the projects that go smoothly and considerably less painful on the ones that do not. Averaged across a year it is the only version we have found that keeps both sides honest.',
      ],
    },
    'when-not-to-automate-a-process': {
      title: 'When not to automate a process',
      excerpt:
        'Automating a broken process makes it faster and harder to fix. Three tests we apply before writing a pipeline.',
      authorRole: 'Delivery Lead',
      body: [
        'The first question in an automation project is not how, it is whether. Cementing a bad process in code costs more than the manual version, because now changing it requires an engineer.',
        'Test one: does the process still exist for a reason? We find steps that were introduced for a system retired years ago and never removed.',
        'Test two: is the judgement in the step real? Approvals that always approve should be deleted, not automated. Approvals that genuinely gate risk should stay human.',
        'Test three: can the step be run twice safely? If not, that is the work — idempotency before automation, or every retry becomes a duplicate record.',
      ],
    },
  },

  de: {
    'grounding-llm-features-in-your-own-data': {
      title: 'LLM-Funktionen in eigenen Daten verankern, ohne eine Halluzination auszuliefern',
      excerpt:
        'Retrieval ist die leichte Hälfte. Die schwere ist die Entscheidung, was Ihr System tut, wenn es unsicher ist — und das vor dem Start zu messen.',
      authorRole: 'ML-Engineer',
      body: [
        'Die meisten KI-Funktionen scheitern an derselben Stelle. Nicht am Retrieval, nicht am Prompt, sondern in dem Moment, in dem das Modell etwas gefragt wird, das die Dokumente nicht beantworten. Ein System ohne definiertes Verhalten für diesen Moment erfindet sich eines.',
        'Wir beginnen jedes KI-Projekt damit, einen Evaluationsdatensatz aufzubauen, bevor wir ein Modell wählen. Hundert echte Fragen mit bekannt richtigen Antworten, annotiert von jemandem, der die Arbeit tatsächlich macht. Das dauert eine Woche und verändert jede Entscheidung danach.',
        'Die zweite Zusage ist die Konfidenzschwelle. Ein Feld, das unterhalb der Schwelle extrahiert wurde, bleibt leer und wird einem Menschen vorgelegt, statt mit der besten Vermutung gefüllt zu werden. Ein leeres Feld kostet eine Pflegekraft zehn Sekunden. Ein falsches Geburtsdatum kostet erheblich mehr.',
        'Und schließlich: Protokollieren Sie jede menschliche Korrektur. Korrekturen sind das einzige ehrliche Signal dafür, wo Ihr System schwach ist — und sie kommen kostenlos von den Menschen, die es ohnehin benutzen.',
      ],
    },
    'what-a-lighthouse-score-does-not-tell-you': {
      title: 'Was ein Lighthouse-Wert Ihnen nicht sagt',
      excerpt:
        'Ein perfekter Laborwert und eine langsame Website schließen einander nicht aus. So messen wir stattdessen die Performance echter Nutzer.',
      authorRole: 'Principal Engineer',
      body: [
        'Lighthouse läuft auf einer simulierten Verbindung, auf einem Gerät, das nicht Ihrem Kunden gehört, ein einziges Mal. Real-User-Monitoring läuft auf jedem Gerät, das Sie besucht, dauerhaft. Nur eines von beiden sagt Ihnen, ob die Website schnell ist.',
        'Die Lücke zeigt sich meist an zwei Stellen: bei Drittanbieter-Skripten, die erst nach dem Audit geladen werden, und bei Bildern, die für das Entwickler-Notebook dimensioniert sind statt für einen 390-Pixel-Viewport.',
        'Wir liefern mit jedem Build ein Performance-Budget aus und verankern es in der CI. Ein Pull Request, der das JavaScript-Budget überschreitet, schlägt fehl. Damit wird Performance von einem Kraftakt in der Startwoche zu einer Randbedingung, innerhalb derer das Team entwirft.',
        'Behalten Sie den Laborwert. Er findet Regressionen früh und günstig. Verwechseln Sie ihn nur nicht mit dem Erlebnis, das Ihre Kunden tatsächlich haben.',
      ],
    },
    'the-handover-is-the-product': {
      title: 'Die Übergabe ist das Produkt',
      excerpt:
        'Agenturarbeit hat einen typischen Fehlermodus: hervorragende Software, die intern niemand erweitern kann. Dokumentation ist nicht die Lösung.',
      authorRole: 'Principal Engineer',
      body: [
        'Ein halbes Jahr nach dem Projekt ist der Maßstab für Qualität nicht der Lighthouse-Wert. Er lautet: Kann der Entwickler des Kunden an einem Dienstag eine Funktion ergänzen, ohne uns anzurufen?',
        'Geschriebene Dokumentation verfällt. Was bleibt, ist lesbare Struktur: einheitliche Benennung, naheliegende Dateipfade, Tests, die die Absicht beschreiben, und eine README, mit der jemand in unter zehn Minuten lokal läuft.',
        'Wir führen inzwischen vor der Schlussrechnung eine Übergabeübung durch. Eine Entwicklerin des Kunden setzt eine kleine, echte Funktion um, während wir zusehen und nichts sagen, sofern nicht gefragt wird. Woran sie hängen bleibt, ist genau das, was wir beheben.',
        'Beim ersten Versuch lief das noch nie glatt — und genau deshalb machen wir es, solange wir noch unter Vertrag stehen.',
      ],
    },
    'designing-for-gloves-and-bad-light': {
      title: 'Gestalten für Handschuhe, schlechtes Licht und keinen Empfang',
      excerpt:
        'Software für den Außendienst bricht jede Annahme, auf der ein Desktop-Dashboard beruht. Was wir bei der Auslieferung an 1.100 Techniker gelernt haben.',
      authorRole: 'Design Lead',
      body: [
        'Ein Umspannwerk um sieben Uhr morgens im Januar ist die eigentliche Gestaltungsumgebung: wenig Licht, dicke Handschuhe, kein Empfang, eine freie Hand. Jede Konvention aus dem Design von Web-Dashboards muss sich dort neu verdienen.',
        'Bedienflächen wurden auf mindestens 56 Pixel vergrößert. Der Kontrast ging deutlich über WCAG AA hinaus, weil AA ein Büro voraussetzt. Die Hauptaktion wanderte ins untere Bildschirmdrittel, in Daumenreichweite.',
        'Die Änderung mit der größten Wirkung war überhaupt kein Bedienelement. Es war ein Statuschip für den Synchronisationsstand je Auftrag. Die Techniker hatten die alte App aufgegeben, weil sie nicht erkennen konnten, ob ihre Arbeit gespeichert worden war.',
        'Vertrauen ist eine Gestaltungsanforderung. Wenn Menschen nicht sehen können, dass das System getan hat, worum sie gebeten haben, behalten sie die Papiersicherung — und dann haben Sie zwei Systeme.',
      ],
    },
    'scoping-fixed-price-software-honestly': {
      title: 'Wie wir Festpreis-Software ehrlich zuschneiden',
      excerpt:
        'Ein Festpreis funktioniert nur, wenn die Discovery-Phase echt ist. So sieht die Schätzung aus, hinter der wir tatsächlich stehen.',
      authorRole: 'Delivery Lead',
      body: [
        'Ein Festpreis auf einen vagen Umfang ist keine Zusage, sondern eine Wette — und der Kunde bezahlt die Absicherung so oder so.',
        'Wir trennen Discovery von Umsetzung und kalkulieren beides getrennt. Die Discovery liefert ein Architekturdokument, ein priorisiertes Backlog und eine Spanne. Passt die Spanne nicht, gehört Ihnen das Dokument, und Sie können damit zu jemand anderem gehen.',
        'In der Umsetzung fixieren wir Preis und Termin und halten den Umfang variabel. In jedem Sprint entscheidet der Kunde, was hineinkommt, und das Backlog fängt die Überraschungen ab, die es immer gibt.',
        'Bei Projekten, die glattlaufen, ist das weniger profitabel, und bei denen, die es nicht tun, deutlich weniger schmerzhaft. Übers Jahr gemittelt ist es die einzige Variante, die wir gefunden haben, die beide Seiten ehrlich hält.',
      ],
    },
    'when-not-to-automate-a-process': {
      title: 'Wann man einen Prozess nicht automatisieren sollte',
      excerpt:
        'Einen kaputten Prozess zu automatisieren macht ihn schneller und schwerer reparierbar. Drei Prüfungen, die wir anwenden, bevor wir eine Strecke bauen.',
      authorRole: 'Delivery Lead',
      body: [
        'Die erste Frage in einem Automatisierungsprojekt lautet nicht wie, sondern ob. Einen schlechten Prozess in Code zu gießen kostet mehr als die manuelle Variante, denn ihn zu ändern erfordert nun eine Entwicklerin.',
        'Prüfung eins: Gibt es den Prozess noch aus einem Grund? Wir finden regelmäßig Schritte, die für ein vor Jahren abgeschaltetes System eingeführt und nie entfernt wurden.',
        'Prüfung zwei: Steckt in dem Schritt echtes Ermessen? Freigaben, die immer freigeben, gehören gelöscht, nicht automatisiert. Freigaben, die tatsächlich Risiko begrenzen, sollten bei Menschen bleiben.',
        'Prüfung drei: Lässt sich der Schritt gefahrlos zweimal ausführen? Wenn nicht, ist genau das die Arbeit — Idempotenz vor Automatisierung, sonst wird jede Wiederholung zu einem doppelten Datensatz.',
      ],
    },
  },

  fr: {
    'grounding-llm-features-in-your-own-data': {
      title: 'Ancrer des fonctions LLM dans vos propres données sans livrer d’hallucination',
      excerpt:
        'La recherche documentaire est la moitié facile. La moitié difficile, c’est décider ce que fait votre système quand il n’est pas sûr — et le mesurer avant la mise en production.',
      authorRole: 'Ingénieure ML',
      body: [
        'La plupart des fonctions d’IA échouent au même endroit. Ni sur la recherche, ni sur le prompt, mais au moment où l’on demande au modèle quelque chose que les documents ne couvrent pas. Un système sans comportement défini pour ce moment-là en inventera un.',
        'Nous commençons chaque mission IA en construisant un jeu d’évaluation avant de choisir un modèle. Cent questions réelles dont on connaît la bonne réponse, annotées par quelqu’un qui fait le métier. Cela prend une semaine et cela change toutes les décisions qui suivent.',
        'Le deuxième engagement, c’est le seuil de confiance. Un champ extrait sous le seuil reste vide et est signalé à un humain, au lieu d’être rempli avec la meilleure hypothèse. Un champ vide coûte dix secondes à une infirmière. Une date de naissance erronée coûte bien plus cher.',
        'Enfin, journalisez chaque correction humaine. Les corrections sont le seul signal honnête sur les faiblesses de votre système, et elles arrivent gratuitement, de la part de ceux qui l’utilisent déjà.',
      ],
    },
    'what-a-lighthouse-score-does-not-tell-you': {
      title: 'Ce qu’un score Lighthouse ne vous dit pas',
      excerpt:
        'Un score de laboratoire parfait et un site lent sont parfaitement compatibles. Voici comment nous mesurons plutôt la performance des utilisateurs réels.',
      authorRole: 'Ingénieur principal',
      body: [
        'Lighthouse s’exécute sur une connexion simulée, sur une machine qui n’est pas celle de votre client, une seule fois. La supervision des utilisateurs réels s’exécute sur chaque appareil qui vous visite, en permanence. Un seul des deux vous dit si le site est rapide.',
        'L’écart apparaît généralement à deux endroits : les scripts tiers chargés après l’audit, et les images dimensionnées pour l’ordinateur du développeur plutôt que pour une fenêtre de 390 pixels.',
        'Nous livrons un budget de performance avec chaque build et nous le branchons sur l’intégration continue. Une pull request qui dépasse le budget JavaScript échoue, ce qui transforme la performance d’un coup de collier avant lancement en une contrainte à l’intérieur de laquelle l’équipe conçoit.',
        'Gardez le score de laboratoire. Il détecte les régressions tôt et pour pas cher. Ne le confondez simplement pas avec l’expérience que vivent vos clients.',
      ],
    },
    'the-handover-is-the-product': {
      title: 'Le transfert est le produit',
      excerpt:
        'Le travail en agence a un mode de défaillance : un excellent logiciel que personne en interne ne peut faire évoluer. La documentation n’est pas la solution.',
      authorRole: 'Ingénieur principal',
      body: [
        'Six mois après la livraison, la mesure de la qualité n’est pas le score Lighthouse. C’est de savoir si le développeur du client peut ajouter une fonctionnalité un mardi sans nous appeler.',
        'La documentation écrite se périme. Ce qui survit, c’est une structure lisible : un nommage cohérent, des emplacements de fichiers évidents, des tests qui décrivent l’intention, et un README qui permet de démarrer en local en moins de dix minutes.',
        'Nous menons désormais un exercice de transfert avant la facture finale. Un développeur du client implémente une petite fonctionnalité réelle pendant que nous observons sans rien dire, sauf si on nous le demande. Ce qui le bloque, c’est ce que nous corrigeons.',
        'Cela ne s’est jamais bien passé du premier coup, et c’est précisément pour cela que nous le faisons tant que nous sommes encore sous contrat.',
      ],
    },
    'designing-for-gloves-and-bad-light': {
      title: 'Concevoir pour des gants, une mauvaise lumière et pas de réseau',
      excerpt:
        'Le logiciel de terrain casse toutes les hypothèses sur lesquelles repose un tableau de bord de bureau. Ce que nous avons appris en livrant à 1 100 techniciens.',
      authorRole: 'Directrice du design',
      body: [
        'Un poste électrique à sept heures du matin en janvier, voilà le véritable environnement de conception : peu de lumière, des gants épais, pas de réseau, une seule main libre. Chaque convention du design de tableaux de bord web doit s’y mériter à nouveau.',
        'Les cibles tactiles sont passées à 56 pixels minimum. Le contraste est allé bien au-delà du WCAG AA, parce que le AA suppose un bureau. L’action principale a migré vers le tiers inférieur de l’écran, à portée de pouce.',
        'Le changement le plus déterminant n’était pas un contrôle du tout. C’était une pastille d’état de synchronisation par intervention. Les techniciens avaient abandonné l’application précédente parce qu’ils ne pouvaient pas savoir si leur travail avait été enregistré.',
        'La confiance est une exigence de conception. Si les gens ne voient pas que le système a fait ce qu’ils demandaient, ils conserveront la sauvegarde papier — et vous vous retrouvez avec deux systèmes.',
      ],
    },
    'scoping-fixed-price-software-honestly': {
      title: 'Comment nous chiffrons honnêtement un forfait logiciel',
      excerpt:
        'Le forfait ne fonctionne que si la phase de cadrage est réelle. Voici la forme de l’estimation que nous assumons vraiment.',
      authorRole: 'Responsable de livraison',
      body: [
        'Un prix ferme sur un périmètre flou n’est pas un engagement, c’est un pari — et le client paie la couverture dans les deux cas.',
        'Nous séparons le cadrage de la réalisation et les chiffrons séparément. Le cadrage produit un document d’architecture, un backlog priorisé et une fourchette. Si la fourchette ne vous convient pas, le document vous appartient et vous pouvez l’emporter ailleurs.',
        'Pendant la réalisation, nous fixons le prix et l’échéance, et gardons le périmètre comme variable. À chaque sprint, le client choisit ce qui entre, et le backlog absorbe les surprises, qui existent toujours.',
        'C’est moins rentable sur les projets qui se passent bien, et nettement moins douloureux sur ceux qui se passent mal. Lissé sur une année, c’est la seule formule que nous ayons trouvée qui garde les deux parties honnêtes.',
      ],
    },
    'when-not-to-automate-a-process': {
      title: 'Quand ne pas automatiser un processus',
      excerpt:
        'Automatiser un processus défaillant le rend plus rapide et plus difficile à réparer. Trois tests que nous appliquons avant d’écrire une chaîne.',
      authorRole: 'Responsable de livraison',
      body: [
        'La première question d’un projet d’automatisation n’est pas comment, mais s’il faut le faire. Couler un mauvais processus dans du code coûte plus cher que la version manuelle, car le modifier exige désormais un développeur.',
        'Test un : ce processus existe-t-il encore pour une raison ? Nous trouvons régulièrement des étapes introduites pour un système retiré du service depuis des années et jamais supprimées.',
        'Test deux : le jugement contenu dans l’étape est-il réel ? Les approbations qui approuvent toujours doivent être supprimées, pas automatisées. Celles qui encadrent vraiment un risque doivent rester humaines.',
        'Test trois : l’étape peut-elle s’exécuter deux fois sans danger ? Sinon, c’est là qu’est le travail — l’idempotence avant l’automatisation, faute de quoi chaque reprise crée un doublon.',
      ],
    },
  },
}

/** Category filter keys — 'all' plus every category, in display order. */
export const postCategoryKeys = ['all', 'engineering', 'ai', 'design', 'product', 'performance'] as const
export type PostCategoryKey = (typeof postCategoryKeys)[number]

export function getPosts(locale: Locale): Post[] {
  return base.map(({ author, ...post }) => {
    const { authorRole, ...localised } = copy[locale][post.slug]
    return { ...post, ...localised, author: { ...author, role: authorRole } }
  })
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return getPosts(locale).find((post) => post.slug === slug)
}

/** Slugs are shared across locales, so static params never depend on language. */
export const postSlugs: PostSlug[] = base.map((post) => post.slug)
