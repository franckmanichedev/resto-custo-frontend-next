import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Bell, Settings } from 'lucide-react'

type TopbarActionsProps = {
  onNotifications?: () => void
  onSettings?: () => void
}

export function TopbarActions({ onNotifications, onSettings }: TopbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onNotifications}
        className="p-2 rounded-md text-muted-foreground hover:bg-surface hover:text-foreground transition-colors relative"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full" />
      </button>
      <button
        onClick={onSettings}
        className="p-2 rounded-md text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
      >
        <Settings className="h-5 w-5" />
      </button>
    </div>
  )
}
