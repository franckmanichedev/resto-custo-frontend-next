import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Building2 } from 'lucide-react'

type TenantBadgeProps = {
  name?: string
  logo?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-5 w-5 text-xs',
  md: 'h-6 w-6 text-sm',
  lg: 'h-8 w-8 text-base',
}

const textSizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export function TenantBadge({ name = 'Tenant', logo, size = 'md' }: TenantBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn('rounded-md bg-brand flex items-center justify-center text-white font-bold shrink-0', sizeMap[size])}>
        {logo ? (
          <img src={logo} alt={name} className="h-full w-full object-cover rounded-md" />
        ) : (
          <Building2 className="w-full h-full p-1" />
        )}
      </div>
      <span className={cn('font-medium text-foreground truncate', textSizeMap[size])}>{name}</span>
    </div>
  )
}
