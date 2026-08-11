import { Skeleton } from '@/components/ui/skeleton'

/** Route-level loading state — matches the shape of a typical page header. */
export default function Loading() {
  return (
    <div className="container pb-24 pt-36">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-6 h-12 w-full max-w-2xl" />
      <Skeleton className="mt-3 h-12 w-full max-w-md" />
      <Skeleton className="mt-8 h-5 w-full max-w-xl" />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  )
}
