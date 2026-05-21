import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg'
export type SpinnerProps = ComponentPropsWithoutRef<'span'> & {
  size?: SpinnerSize
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-4',
  lg: 'h-[var(--button-height-lg)] w-[var(--button-height-lg)] border-4'
}

export function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
  return (
    <span
      className={cn(
        'inline-flex animate-spin items-center justify-center rounded-full border-border border-t-brand text-brand',
        sizeMap[size],
        className
      )}
      {...props}
    />
  )
}
