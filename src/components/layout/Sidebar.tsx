import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DashboardSidebar } from './DashboardSidebar'

type SidebarProps = {
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-full">
      <DashboardSidebar collapsed={collapsed} />

      {/* Collapse Button */}
      <button
        onClick={() => onCollapse?.(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-24 h-6 w-6 items-center justify-center rounded-full bg-surface border border-border shadow-soft hover:bg-elevated transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  )
}
