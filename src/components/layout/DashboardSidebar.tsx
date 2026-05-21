import React, { type ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { Menu, BarChart3, UtensilsCrossed, QrCode, Users, Settings, HelpCircle, LogOut } from 'lucide-react'

type SidebarItemProps = {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function SidebarItem({ icon, label, active = false, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200',
        active ? 'bg-brand text-white shadow-soft' : 'text-muted-foreground hover:bg-surface hover:text-foreground'
      )}
    >
      <span className="h-5 w-5">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="px-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export function DashboardSidebar({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <nav className="flex flex-col h-full overflow-y-auto">
      {/* Logo Section */}
      <div className="px-4 py-6 border-b border-border">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-md bg-brand flex items-center justify-center text-white font-bold text-sm">F</div>
          {!collapsed && <span className="font-semibold text-foreground">FETCHOUN</span>}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
        <SidebarSection title="Dashboard">
          <SidebarItem icon={<BarChart3 />} label="Analytics" active />
        </SidebarSection>

        <SidebarSection title="Management">
          <SidebarItem icon={<UtensilsCrossed />} label="Restaurants" />
          <SidebarItem icon={<QrCode />} label="QR Codes" />
          <SidebarItem icon={<Menu />} label="Menus" />
        </SidebarSection>

        <SidebarSection title="Team">
          <SidebarItem icon={<Users />} label="Staff" />
        </SidebarSection>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border px-2 py-4 space-y-1">
        <SidebarItem icon={<HelpCircle />} label="Help" />
        <SidebarItem icon={<Settings />} label="Settings" />
        <SidebarItem icon={<LogOut />} label="Logout" />
      </div>
    </nav>
  )
}
