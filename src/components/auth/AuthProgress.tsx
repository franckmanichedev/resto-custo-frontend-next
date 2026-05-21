import React, { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'

type AuthProgressProps = ComponentPropsWithoutRef<'div'> & {
  value: number
  max?: number
}

export function AuthProgress({ value, max = 100, className, ...props }: AuthProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="h-1 w-full rounded-full bg-muted/40 overflow-hidden">
        <div className="h-full bg-brand transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
