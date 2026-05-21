import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

type PageContainerProps = {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  className?: string
}

const maxWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-none',
}

export function PageContainer({ children, maxWidth = 'lg', className }: PageContainerProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8', maxWidthMap[maxWidth], className)}>
      {children}
    </div>
  )
}
