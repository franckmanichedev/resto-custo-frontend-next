import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

export type CardVariant = 'default' | 'elevated' | 'glass' | 'interactive'
export type CardProps = ComponentPropsWithoutRef<'div'> & {
  shadow?: boolean
  variant?: CardVariant
}

export function Card({ className, shadow = true, variant = 'default', ...props }: CardProps) {
  const variants: Record<CardVariant, string> = {
    default: 'bg-card border border-border shadow-soft',
    elevated: 'bg-surface border border-border shadow-card',
    glass: 'bg-surface/80 backdrop-blur-xl border border-border/50 shadow-soft',
    interactive: 'bg-surface border border-border shadow-soft transition hover:bg-elevated hover:shadow-card cursor-pointer'
  }

  return (
    <div className={cn('rounded-sm p-4', variants[variant], shadow && 'shadow-card', className)} {...props} />
  )
}
