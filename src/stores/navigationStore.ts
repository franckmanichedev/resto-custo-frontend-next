import { create } from 'zustand'

export type BreadcrumbItem = { label: string; href: string }

type NavigationState = {
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
  breadcrumbs: BreadcrumbItem[]
  recentRoutes: string[]
  commandPaletteOpen: boolean
  activeRoute: string
  setSidebarCollapsed: (value: boolean) => void
  toggleSidebarCollapsed: () => void
  setMobileSidebarOpen: (value: boolean) => void
  setBreadcrumbs: (items: BreadcrumbItem[]) => void
  addRecentRoute: (route: string) => void
  setCommandPaletteOpen: (value: boolean) => void
  setActiveRoute: (route: string) => void
}

const initialCollapsed = typeof window !== 'undefined' && localStorage.getItem('sidebar-collapsed') === 'true'

export const useNavigationStore = create<NavigationState>((set) => ({
  sidebarCollapsed: initialCollapsed ?? false,
  mobileSidebarOpen: false,
  breadcrumbs: [],
  recentRoutes: [],
  commandPaletteOpen: false,
  activeRoute: '/',
  setSidebarCollapsed: (value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', String(value))
    }
    set({ sidebarCollapsed: value })
  },
  toggleSidebarCollapsed: () =>
    set((state) => {
      const next = !state.sidebarCollapsed
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebar-collapsed', String(next))
      }
      return { sidebarCollapsed: next }
    }),
  setMobileSidebarOpen: (value) => set({ mobileSidebarOpen: value }),
  setBreadcrumbs: (items) => set({ breadcrumbs: items }),
  addRecentRoute: (route) =>
    set((state) => {
      const next = [route, ...state.recentRoutes.filter((item) => item !== route)].slice(0, 10)
      return { recentRoutes: next }
    }),
  setCommandPaletteOpen: (value) => set({ commandPaletteOpen: value }),
  setActiveRoute: (route) => set({ activeRoute: route })
}))
