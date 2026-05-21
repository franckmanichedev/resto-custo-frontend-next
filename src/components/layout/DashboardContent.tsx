import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type DashboardContentProps = {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingMap = {
  none: 'p-0',
  sm: 'p-4 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
}

export function DashboardContent({ children, className, padding = 'md' }: DashboardContentProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className={cn('rounded-card bg-surface border border-border shadow-card', paddingMap[padding], className)}>
        {children}
      </div>
    </main>
  )
}
