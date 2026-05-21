import React, { type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { AuthIllustration } from './AuthIllustration'

type AuthLayoutProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  showHero?: boolean
}

export function AuthLayout({ children, showHero = false, className, ...props }: AuthLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background text-foreground', className)} {...props}>
      {showHero ? (
        <div className="grid min-h-screen lg:grid-cols-2">
          <div className="hidden lg:flex flex-col justify-between bg-brand text-white p-8 shadow-soft">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Resto QR Code</h1>
              <p className="mt-2 text-muted-foreground">Système SaaS pour restaurants modernes</p>
            </div>

            <AuthIllustration />

            <div className="border-t border-border pt-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Testé par</p>
              <p className="mt-3 text-sm font-semibold text-white">+500 restaurants en Europe</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 sm:py-8">
            {children}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 sm:py-8">
          {children}
        </div>
      )}
    </div>
  )
}
