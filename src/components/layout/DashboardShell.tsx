import { lazy, Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from '@/components/navigation/AppSidebar'
import { DashboardContent } from '@/components/layout/DashboardContent'
import { PageHeader } from '@/components/layout/PageHeader'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { getRouteMeta } from '@/navigation/route-meta'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useNavigationStore } from '@/stores/navigationStore'
import type { ReactElement } from 'react'

const CommandPalette = lazy(() => import('@/components/system/CommandPalette'))

export function DashboardShell(): ReactElement {
  const location = useLocation()
  const routeMeta = getRouteMeta(location.pathname)
  const breadcrumbs = useBreadcrumbs()
  const collapse = useNavigationStore((state) => state.sidebarCollapsed)
  const setBreadcrumbs = useNavigationStore((state) => state.setBreadcrumbs)
  const addRecentRoute = useNavigationStore((state) => state.addRecentRoute)
  const setActiveRoute = useNavigationStore((state) => state.setActiveRoute)

  useEffect(() => {
    setBreadcrumbs(breadcrumbs)
    addRecentRoute(location.pathname)
    setActiveRoute(location.pathname)
  }, [location.pathname, breadcrumbs, addRecentRoute, setActiveRoute, setBreadcrumbs])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AppSidebar />
      <div className={collapse ? 'md:pl-20' : 'md:pl-72'}>
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <PageHeader title={routeMeta.title} subtitle={routeMeta.description} />
            <Breadcrumbs items={routeMeta.breadcrumbs} />
          </div>
        </div>
        <DashboardContent>
          <Outlet />
        </DashboardContent>
      </div>
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
    </div>
  )
}
