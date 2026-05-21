import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
export type AvatarProps = ComponentPropsWithoutRef<'div'> & {
  src?: string | null
  alt?: string
  size?: AvatarSize
}

const sizeMap: Record<AvatarSize, string> = {
  xs: 'h-[var(--avatar-size-xs)] w-[var(--avatar-size-xs)]',
  sm: 'h-[var(--avatar-size-sm)] w-[var(--avatar-size-sm)]',
  md: 'h-[var(--avatar-size-md)] w-[var(--avatar-size-md)]',
  lg: 'h-[var(--avatar-size-lg)] w-[var(--avatar-size-lg)]'
}

export function Avatar({ className, src, alt = 'avatar', size = 'md', ...props }: AvatarProps) {
  const sizeClass = sizeMap[size]

  return (
    <div className={cn('inline-flex items-center justify-center overflow-hidden rounded-full', sizeClass, className)} {...props}>
      {src ? (
        <img src={src} alt={alt} className={cn('object-cover', sizeClass)} />
      ) : (
        <div className={cn('flex items-center justify-center rounded-full bg-surface text-muted-foreground', sizeClass)}>{alt?.[0]?.toUpperCase() ?? ''}</div>
      )}
    </div>
  )
}
