import React from 'react'
import { cn } from '@/lib/utils/cn'
import { ChevronRight } from 'lucide-react'

type BreadcrumbItem = {
  label: string
  href?: string
  onClick?: () => void
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null

  return (
    <nav className={cn('flex items-center gap-1 text-sm text-muted-foreground', className)} aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {item.href ? (
            <a href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ) : (
            <button
              onClick={item.onClick}
              className={cn(
                'hover:text-foreground transition-colors',
                idx === items.length - 1 && 'text-foreground font-medium'
              )}
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
