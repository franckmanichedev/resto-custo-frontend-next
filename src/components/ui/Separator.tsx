import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

export type SeparatorProps = ComponentPropsWithoutRef<'div'> & { vertical?: boolean }

export function Separator({ className, vertical = false, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      className={cn(vertical ? 'mx-2 w-px h-full bg-border' : 'my-2 h-px w-full bg-border', className)}
      {...props}
    />
  )
}
