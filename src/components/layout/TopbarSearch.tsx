import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Menu, Search, Bell, Settings } from 'lucide-react'

type TopbarSearchProps = {
  placeholder?: string
  onSearch?: (query: string) => void
}

export function TopbarSearch({ placeholder = 'Rechercher...', onSearch }: TopbarSearchProps) {
  return (
    <div className="relative hidden sm:flex flex-1 max-w-xs items-center">
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className="w-full rounded-md pl-10 pr-3 py-2 text-sm bg-surface text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
      />
    </div>
  )
}
