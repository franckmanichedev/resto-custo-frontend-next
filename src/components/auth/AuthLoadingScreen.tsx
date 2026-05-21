import React, { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'

type AuthLoadingScreenProps = ComponentPropsWithoutRef<'div'> & {
  message?: string
}

export function AuthLoadingScreen({ message = 'Chargement...', className, ...props }: AuthLoadingScreenProps) {
  return (
    <div className={cn('min-h-screen flex flex-col items-center justify-center bg-background gap-4', className)} {...props}>
      <div className="space-y-3 text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}
