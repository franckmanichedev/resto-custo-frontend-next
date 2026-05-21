import React, { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { Sidebar } from './Sidebar'
import { MobileSidebar } from './MobileSidebar'
import { Topbar } from './Topbar'

export type AppShellProps = {
  children: ReactNode
  sidebarOpen?: boolean
  onSidebarChange?: (open: boolean) => void
}

export function AppShell({ children, sidebarOpen: controlledOpen, onSidebarChange }: AppShellProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const handleSidebarChange = (open: boolean) => {
    if (controlledOpen === undefined) setUncontrolledOpen(open)
    onSidebarChange?.(open)
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen bg-surface border-r border-border transition-all duration-300 ease-out z-40',
          sidebarOpen ? 'w-sidebar' : 'w-sidebar-collapsed'
        )}
      >
        <Sidebar collapsed={!sidebarOpen} onCollapse={handleSidebarChange} />
      </aside>

      {/* Main Content Area */}
      <div className={cn('flex flex-col flex-1', sidebarOpen ? 'lg:ml-sidebar' : 'lg:ml-sidebar-collapsed')}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-navbar bg-app border-b border-border shadow-soft">
          <Topbar onSidebarToggle={() => handleSidebarChange(!sidebarOpen)} onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} />
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="min-h-full bg-app">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-screen w-64 bg-surface border-r border-border">
            <MobileSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
