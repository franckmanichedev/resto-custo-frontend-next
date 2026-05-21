import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type PageSectionProps = {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

export function PageSection({ children, title, description, className }: PageSectionProps) {
  return (
    <section className={cn('space-y-4 sm:space-y-6', className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <div>{children}</div>
    </section>
  )
}
