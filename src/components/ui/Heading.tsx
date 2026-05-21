import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

type HeadingSize = 'xl' | 'lg' | 'md' | 'sm'
export type HeadingProps = ComponentPropsWithoutRef<'h1'> & {
  size?: HeadingSize
}

const sizeMap: Record<HeadingSize, string> = {
  xl: 'text-4xl leading-tight',
  lg: 'text-3xl leading-tight',
  md: 'text-2xl leading-tight',
  sm: 'text-xl leading-snug'
}

export function Heading({ className, size = 'lg', ...props }: HeadingProps) {
  return <h1 className={cn('font-semibold text-foreground', sizeMap[size], className)} {...props} />
}
