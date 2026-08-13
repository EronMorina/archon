import { ApexBackdrop } from '@/components/ui/apex-backdrop'

/** Shared inner-page header: arc backdrop, eyebrow, display title, lead. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border pb-16 pt-32 md:pb-20 md:pt-40">
      <ApexBackdrop intensity="soft" />
      <div className="container relative">
        <p className="eyebrow">
          <span aria-hidden className="h-px w-7 bg-apex-gradient" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl text-display-sm md:text-display-md">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">{lead}</p>
        )}
        {children}
      </div>
    </section>
  )
}
