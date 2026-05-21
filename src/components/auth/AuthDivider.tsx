import React, { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'

export function AuthDivider({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('relative my-6', className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-[0.12em]">
        <span className="bg-background px-3 py-1 text-muted-foreground">ou</span>
      </div>
    </div>
  )
}
