'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button — shadcn pattern with an added `apex` variant carrying the mark's
 * value ramp. Reserved for one primary action per view.
 *
 * The ramp is dark on paper and light on ink, so the label is `text-background`
 * rather than a fixed white — white would vanish on the light-mode-inverted
 * ramp in dark theme. Hover dips opacity instead of brightness for the same
 * reason: brightening an already near-white surface does nothing.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 ease-apex disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]',
  {
    variants: {
      variant: {
        apex: 'bg-apex-gradient text-background shadow-[0_10px_30px_-12px_hsl(var(--foreground)/0.35)] hover:shadow-[0_16px_40px_-12px_hsl(var(--foreground)/0.45)] hover:opacity-90',
        default: 'bg-foreground text-background hover:bg-foreground/90',
        outline: 'border border-border bg-transparent hover:border-foreground/25 hover:bg-muted/60',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-muted hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        default: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-[0.95rem]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
