import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type DashboardGridProps = {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

const colMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const gapMap = {
  sm: 'gap-3 sm:gap-4',
  md: 'gap-4 sm:gap-6',
  lg: 'gap-6 sm:gap-8',
}

export function DashboardGrid({ children, cols = 3, gap = 'md', className }: DashboardGridProps) {
  return (
    <div className={cn('grid', colMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  )
}