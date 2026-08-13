import { cn } from '@/lib/utils'

/**
 * The site's one heading pattern: a mono eyebrow with a short arc rule,
 * a display title, and an optional lead paragraph.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
  as: Heading = 'h2',
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-5', align === 'center' && 'justify-center')}>
          <span aria-hidden className="h-px w-7 bg-apex-gradient" />
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl md:text-[2.6rem] md:leading-[1.08]">{title}</Heading>
      {lead && <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{lead}</p>}
    </div>
  )
}
