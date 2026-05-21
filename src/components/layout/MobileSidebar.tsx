import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { X } from 'lucide-react'
import { DashboardSidebar } from './DashboardSidebar'

type MobileSidebarProps = {
  onClose?: () => void
}

export function MobileSidebar({ onClose }: MobileSidebarProps) {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Close Button */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span className="font-semibold text-foreground">Menu</span>
        <button onClick={onClose} className="p-1 hover:bg-surface rounded-md transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <DashboardSidebar />
    </div>
  )
}
