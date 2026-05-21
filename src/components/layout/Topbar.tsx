import React from 'react'
import { cn } from '@/lib/utils/cn'
import { Menu } from 'lucide-react'
import { TopbarSearch } from './TopbarSearch'
import { TopbarActions } from './TopbarActions'
import { TopbarUser } from './TopbarUser'

type TopbarProps = {
  onSidebarToggle?: () => void
  onMobileMenuToggle?: () => void
  onSearch?: (query: string) => void
  onNotifications?: () => void
  onSettings?: () => void
  onUserMenu?: () => void
  userName?: string
  userAvatar?: string
}

export function Topbar({
  onSidebarToggle,
  onMobileMenuToggle,
  onSearch,
  onNotifications,
  onSettings,
  onUserMenu,
  userName = 'User',
  userAvatar,
}: TopbarProps) {
  return (
    <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
      {/* Left: Menu Button + Search */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <TopbarSearch placeholder="Rechercher..." onSearch={onSearch} />
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-4">
        <TopbarActions onNotifications={onNotifications} onSettings={onSettings} />
        <div className="h-6 w-px bg-border hidden sm:block" />
        <TopbarUser name={userName} avatar={userAvatar} onDropdown={onUserMenu} />
      </div>
    </div>
  )
}
