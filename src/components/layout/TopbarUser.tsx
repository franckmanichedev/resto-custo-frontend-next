import React from 'react'
import { cn } from '@/lib/utils/cn'
import { ChevronDown } from 'lucide-react'

type TopbarUserProps = {
  name?: string
  avatar?: string
  onDropdown?: () => void
}

export function TopbarUser({ name = 'User', avatar, onDropdown }: TopbarUserProps) {
  return (
    <button
      onClick={onDropdown}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface text-foreground hover:bg-elevated transition-colors"
    >
      <div className="h-6 w-6 rounded-full bg-brand flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
        {avatar ? <img src={avatar} alt={name} className="h-full w-full rounded-full object-cover" /> : name[0]?.toUpperCase()}
      </div>
      <span className="text-sm font-medium hidden sm:inline">{name}</span>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </button>
  )
}
