import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type DashboardHeaderProps = {
  title?: string
  subtitle?: string
  actions?: ReactNode
  onOpen?: () => void
  className?: string
}

export function DashboardHeader({ title, subtitle, actions, onOpen, className }: DashboardHeaderProps) {
  return (
    <header className={cn('flex items-center justify-between p-4 sm:p-6 border-b border-border bg-app', className)}>
      <div className="min-w-0">
        {title && <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">{title}</h1>}
        {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </header>
  )
}
