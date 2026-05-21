import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

type TextSize = 'base' | 'sm' | 'xs'
export type TextProps = ComponentPropsWithoutRef<'p'> & {
  size?: TextSize
}

const sizeMap: Record<TextSize, string> = {
  base: 'text-base leading-7',
  sm: 'text-sm leading-6',
  xs: 'text-xs leading-5'
}

export function Text({ className, size = 'base', ...props }: TextProps) {
  return <p className={cn('text-foreground', sizeMap[size], className)} {...props} />
}
