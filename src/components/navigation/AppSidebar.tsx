import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { filterNavigationByPermissions } from '@/config/permissions'
import { navigation } from '@/config/navigation'
import { useTenant } from '@/hooks/useTenant'
import { useNavigationStore } from '@/stores/navigationStore'
import { SidebarCollapse } from '@/components/navigation/SidebarCollapse'
import { SidebarItem } from '@/components/navigation/SidebarItem'
import { MobileSidebar } from '@/components/navigation/MobileSidebar'
import { cn } from '@/lib/utils/cn'
import { Button } from '../ui/Button'

export function AppSidebar() {
  const location = useLocation()
  const permissions = useTenant().permissions
  const collapsed = useNavigationStore((state) => state.sidebarCollapsed)
  const toggleCollapsed = useNavigationStore((state) => state.toggleSidebarCollapsed)
  const mobileOpen = useNavigationStore((state) => state.mobileSidebarOpen)
  const setMobileOpen = useNavigationStore((state) => state.setMobileSidebarOpen)

  const items = useMemo(() => filterNavigationByPermissions(navigation, permissions), [permissions])
  const isActive = location.pathname

  return (
    <>
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} items={items} />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 hidden h-screen w-72 flex-col border-r border-slate-200 bg-white py-4 transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 md:flex',
          collapsed && 'w-20'
        )}
      >
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="space-y-1">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">Resto SaaS</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Multi-tenants</p>
          </div>
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={toggleCollapsed}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {items.map((item) =>
            item.children && item.children.length > 0 ? (
              <SidebarCollapse key={item.id} item={item} collapsed={collapsed} activePath={isActive} />
            ) : (
              <SidebarItem key={item.id} item={item} collapsed={collapsed} activePath={isActive} />
            )
          )}
        </nav>

        <div className="mt-auto px-4 pt-4">
          <Button
            variant="outline"
            // type="button"
            onClick={() => setMobileOpen(true)}
            // className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            Ouvrir le menu mobile
          </Button>
        </div>
      </aside>

      <div className="fixed left-0 top-0 z-20 flex w-full items-center justify-between bg-slate-950/90 p-3 text-white shadow-md shadow-slate-950/40 md:hidden">
        <div className="font-semibold">Resto SaaS</div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-md bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
        >
          Menu
        </button>
      </div>
    </>
  )
}
