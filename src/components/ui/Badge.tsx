import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
export type BadgeProps = ComponentPropsWithoutRef<'span'> & {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-muted text-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  info: 'bg-info/10 text-info'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
