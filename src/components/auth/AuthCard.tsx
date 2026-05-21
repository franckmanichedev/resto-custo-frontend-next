import React, { type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'

type AuthCardProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <div className={cn('w-full max-w-md rounded-2xl md:border border-border bg-card/95 backdrop-blur-xl p-3 md:p-8 md:shadow-card', className)}>
      {(title || subtitle) && (
        <div className="mb-8 space-y-2">
          {title && <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
