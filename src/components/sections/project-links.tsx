import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/content/projects'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Outbound links for a project: source repository and live site.
 *
 * Both are optional in the content, so this renders nothing at all when a
 * project has neither — client work is usually closed-source and not every
 * build is still online.
 *
 * These sit *alongside* the case-study link rather than replacing it. The
 * case study is the page that ranks, explains the work and stays under our
 * control; GitHub and the client's own site are somewhere the reader goes
 * after they are convinced, which is why both open in a new tab and say so
 * to a screen reader.
 *
 * `variant="inline"` for the compact row on cards, `"buttons"` for the
 * case-study sidebar.
 */
export function ProjectLinks({
  project,
  locale,
  variant = 'inline',
  className,
}: {
  project: Project
  locale: Locale
  variant?: 'inline' | 'buttons'
  className?: string
}) {
  const t = getDictionary(locale).portfolioSection
  if (!project.repoUrl && !project.liveUrl) return null

  const links = [
    project.repoUrl && {
      href: project.repoUrl,
      icon: Github,
      label: t.viewCode,
      aria: t.codeAria(project.title),
    },
    project.liveUrl && {
      href: project.liveUrl,
      icon: ExternalLink,
      label: t.viewLive,
      aria: t.liveAria(project.title),
    },
  ].filter(Boolean) as { href: string; icon: typeof Github; label: string; aria: string }[]

  if (variant === 'buttons') {
    return (
      <div className={cn('grid gap-2', className)}>
        {links.map((link) => (
          <Button key={link.href} asChild variant="outline" size="lg" className="w-full">
            <a href={link.href} target="_blank" rel="noreferrer noopener" aria-label={link.aria}>
              <link.icon className="size-4" aria-hidden />
              {link.label}
            </a>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <ul className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={link.aria}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <link.icon className="size-4" aria-hidden />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
