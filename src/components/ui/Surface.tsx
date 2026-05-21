import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

export type SurfaceProps = ComponentPropsWithoutRef<'div'> & {
  variant?: 'surface' | 'card' | 'floating'
}

const variantStyles: Record<NonNullable<SurfaceProps['variant']>, string> = {
  surface: 'bg-surface shadow-soft',
  card: 'bg-card shadow-card',
  floating: 'bg-surface/90 shadow-floating'
}

export function Surface({ className, variant = 'surface', ...props }: SurfaceProps) {
  return <div className={cn('rounded-sm p-4', variantStyles[variant], className)} {...props} />
}
