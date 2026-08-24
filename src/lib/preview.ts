/**
 * Card artwork for a repository.
 *
 * A repository has no picture of its own, so there are two sources and each
 * card gets whichever one is honest about what exists:
 *
 * - `screenshot` — the repo has a `homepage`, so there is a deployed page to
 *   photograph. thum.io renders that URL on demand and returns the image.
 *   Nothing is stored here, so redeploying the site behind a card updates the
 *   card, and a repo that gets deployed tomorrow gets its photo tomorrow.
 * - `card` — no homepage, so there is no site and a screenshot would be a
 *   fiction. GitHub's own repository card fills the frame instead of a blank
 *   panel or stock art that would imply a product nobody can visit.
 *
 * Both go through next/image, which optimises them and caches the result at
 * the edge. That is what keeps a keyless free tier viable: visitors are served
 * the cached copy, so thum.io sees roughly one request per repo per cache
 * period rather than one per visitor.
 */

/** thum.io renders at this size; the frame is 3:2 and crops to fit. */
const SHOT_WIDTH = 1200
const SHOT_HEIGHT = 900

export type Preview = {
  src: string
  /**
   * `screenshot` is a photograph of a real deployed page. `card` is GitHub's
   * generated repo image. The card uses this to pick an object-fit — a
   * screenshot is cropped from the top so the hero shows, while the GitHub
   * card is letterboxed whole, because cropping it would cut off its text.
   */
  kind: 'screenshot' | 'card'
}

/**
 * Whether a `homepage` value can be handed to a screenshot renderer.
 *
 * GitHub stores this field as free text, so it can hold anything an owner
 * typed. Anything that is not a resolvable http(s) URL falls through to the
 * GitHub card rather than building a request URL around a malformed value.
 */
function isPhotographable(homepage: string | null): homepage is string {
  if (!homepage) return false
  try {
    const { protocol } = new URL(homepage)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

export function previewFor(repo: { fullName: string; homepage: string | null }): Preview {
  if (isPhotographable(repo.homepage)) {
    return {
      // Options precede the target URL in a thum.io path. `noanimate` settles
      // CSS animation first, so a page that fades its hero in is captured
      // finished rather than half-transparent.
      src: `https://image.thum.io/get/width/${SHOT_WIDTH}/crop/${SHOT_HEIGHT}/noanimate/${repo.homepage}`,
      kind: 'screenshot',
    }
  }

  return { src: `https://opengraph.githubassets.com/1/${repo.fullName}`, kind: 'card' }
}
