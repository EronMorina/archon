import { site } from '@/lib/site'

/**
 * Portfolio source: the public repositories on `site.github.user`.
 *
 * This replaces the hand-written project catalogue the site shipped with.
 * Nothing here is stored in the repo — the list is fetched from the GitHub
 * REST API when a page is rendered and cached by Next for an hour, so a repo
 * that is pushed, renamed, described or given a homepage on GitHub shows up on
 * the site without a deploy.
 *
 * The API is called unauthenticated by default, which is enough for a public
 * profile (60 requests an hour per IP, against one request an hour per build
 * host). Set `GITHUB_TOKEN` to a read-only personal access token if the host
 * shares an IP and starts getting rate-limited; it lifts the ceiling to 5,000.
 */

export type Repo = {
  id: number
  /** `arclight` — the display name. */
  name: string
  /** `EronMorina/arclight` — shown under the name, and unique across owners. */
  fullName: string
  description: string | null
  /** Repository page on GitHub. */
  url: string
  /** The repo's "Website" field — null unless it is set and answering today. */
  homepage: string | null
  /** GitHub's primary-language guess. Null on repos with no detected code. */
  language: string | null
  topics: string[]
  stars: number
  forks: number
  /** ISO date of the last push — "updated" as a reader understands it. */
  updatedAt: string
}

/**
 * Repositories to keep off the site without deleting them on GitHub. Forks,
 * archived and private repos are already excluded, so this is only for public
 * originals that are not work you want shown — scratch repos, tutorials.
 */
const hidden: string[] = []

/** One hour: fresh enough for a portfolio, far below any rate limit. */
const REVALIDATE_SECONDS = 60 * 60

/** How long a homepage gets to answer before it counts as not deployed. */
const LIVE_CHECK_TIMEOUT_MS = 6000

/**
 * Whether a repo's "Website" field actually serves a page today.
 *
 * The field is metadata an owner typed once, so it long outlives the thing it
 * points at — a deleted Vercel project keeps answering 404 at the same URL.
 * That matters more here than it would in a plain link, because the portfolio
 * photographs this URL: an unchecked dead homepage puts a screenshot of a
 * 404 page on the card, which is worse than showing no screenshot at all.
 *
 * A failure of any kind — timeout, DNS, 4xx, 5xx — is read as "not deployed",
 * and the card falls back to GitHub's repo image and drops its live link. The
 * check rides the same hourly cache as the repository list, so a repo that
 * gets deployed starts showing its screenshot within the hour, with nothing to
 * edit on GitHub and nothing to redeploy here.
 */
async function isDeployed(url: string): Promise<boolean> {
  const request = (method: 'HEAD' | 'GET') =>
    fetch(url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(LIVE_CHECK_TIMEOUT_MS),
      headers: { 'User-Agent': `${site.name.toLowerCase()}-website` },
      next: { revalidate: REVALIDATE_SECONDS },
    })

  try {
    const head = await request('HEAD')
    // Some static hosts answer HEAD with 405/501 but serve GET perfectly well.
    if (head.status === 405 || head.status === 501) return (await request('GET')).ok
    return head.ok
  } catch {
    return false
  }
}

/** Only the fields we read, out of the ~90 the API returns per repo. */
type GitHubRepo = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  forks_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
  private: boolean
}

/**
 * Every public, non-fork, non-archived repository, most recently pushed first.
 *
 * Never throws. GitHub being down, rate-limiting the build host or renaming
 * the account returns an empty list and logs the reason, because the
 * alternative — failing the render — takes the whole site offline over a
 * third-party outage. Callers show an explanatory empty state instead.
 */
export async function getRepos(): Promise<Repo[]> {
  const endpoint = `https://api.github.com/users/${site.github.user}/repos?per_page=100&sort=pushed&type=owner`
  const token = process.env.GITHUB_TOKEN?.trim()

  let payload: unknown
  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        // GitHub rejects API requests that arrive without a User-Agent.
        'User-Agent': `${site.name.toLowerCase()}-website`,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      console.warn(
        `[github] ${response.status} ${response.statusText} for ${site.github.user}'s repositories — rendering an empty portfolio.`
      )
      return []
    }

    payload = await response.json()
  } catch (error) {
    console.warn('[github] repository request failed — rendering an empty portfolio.', error)
    return []
  }

  if (!Array.isArray(payload)) return []

  const repos = (payload as GitHubRepo[])
    .filter((repo) => !repo.fork && !repo.archived && !repo.private && !hidden.includes(repo.name))
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description?.trim() || null,
      url: repo.html_url,
      // The API returns '' for an unset website, which is not a valid href.
      homepage: repo.homepage?.trim() || null,
      language: repo.language,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.pushed_at,
    }))

  // Checked in parallel: the whole list waits on the slowest homepage, and
  // most repos have none to check at all.
  const deployed = await Promise.all(
    repos.map((repo) => (repo.homepage ? isDeployed(repo.homepage) : Promise.resolve(false)))
  )

  return repos.map((repo, i) => (deployed[i] ? repo : { ...repo, homepage: null }))
}

/**
 * The handful shown on the home page.
 *
 * Described repos win: a card whose body is "No description on GitHub yet"
 * reads as unfinished work on the page that has to sell. If there are not
 * enough of those, recency decides and the fallback copy fills in.
 */
export async function getFeaturedRepos(limit = 3): Promise<Repo[]> {
  const repos = await getRepos()
  const described = repos.filter((repo) => repo.description)
  return (described.length >= limit ? described : repos).slice(0, limit)
}
