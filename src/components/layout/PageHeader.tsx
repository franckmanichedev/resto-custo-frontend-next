import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type PageHeaderProps = {
  title: string
  subtitle?: string
  description?: string
  actions?: ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function PageHeader({
  title,
  subtitle,
  description,
  actions,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm font-medium text-muted-foreground">{subtitle}</p>
          )}
          {description && (
            <p className="mt-2 text-base text-muted-foreground line-clamp-2">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  )
}
