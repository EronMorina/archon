import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm transition-colors',
        'placeholder:text-muted-foreground/70 hover:border-foreground/20',
        'focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
