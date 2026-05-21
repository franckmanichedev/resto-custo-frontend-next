import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'

export type SkeletonProps = ComponentPropsWithoutRef<'div'> & { radius?: 'sm' | 'md' | 'lg' }

export function Skeleton({ className, radius = 'md', ...props }: SkeletonProps) {
  const r = radius === 'sm' ? 'rounded-sm' : radius === 'lg' ? 'rounded-lg' : 'rounded-sm'
  return (
    <div
      className={cn('animate-pulse bg-surface/80 dark:bg-surface/50', r, className)}
      {...props}
    />
  )
}
