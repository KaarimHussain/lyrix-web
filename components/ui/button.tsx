import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base classes: Added border-box, transitions, and unified structural classes
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-[color-mix(in_oklch,var(--color-primary)_40%,black)] shadow-[0_4px_0_0_color-mix(in_oklch,var(--color-primary)_40%,black)] hover:shadow-[0_6px_0_0_color-mix(in_oklch,var(--color-primary)_40%,black)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_color-mix(in_oklch,var(--color-primary)_40%,black)] active:translate-y-1",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-[color-mix(in_oklch,var(--color-destructive)_40%,black)] shadow-[0_4px_0_0_color-mix(in_oklch,var(--color-destructive)_40%,black)] hover:shadow-[0_6px_0_0_color-mix(in_oklch,var(--color-destructive)_40%,black)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_color-mix(in_oklch,var(--color-destructive)_40%,black)] active:translate-y-1",
        outline:
          "bg-transparent text-foreground border-2 border-foreground shadow-[0_4px_0_0_var(--color-foreground)] hover:bg-accent hover:text-accent-foreground hover:shadow-[0_6px_0_0_var(--color-foreground)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_var(--color-foreground)] active:translate-y-1",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-[color-mix(in_oklch,var(--color-secondary)_40%,black)] shadow-[0_4px_0_0_color-mix(in_oklch,var(--color-secondary)_40%,black)] hover:shadow-[0_6px_0_0_color-mix(in_oklch,var(--color-secondary)_40%,black)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_color-mix(in_oklch,var(--color-secondary)_40%,black)] active:translate-y-1",
        ghost:
          "bg-transparent text-foreground border-2 border-transparent hover:bg-accent hover:text-accent-foreground active:translate-y-1",
        link:
          "text-primary underline-offset-4 hover:underline active:translate-y-1",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-4",
        sm: "h-9 px-4 py-1.5 text-xs has-[>svg]:px-3",
        lg: "h-14 px-8 py-3 text-base has-[>svg]:px-6",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
