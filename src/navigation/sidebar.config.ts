import { Activity, Bell, Building2, CreditCard, LayoutDashboard, List, Settings, ShoppingBag, Sparkles, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Permission } from './rbac'

export type SidebarItemConfig = {
  id: string
  label: string
  path: string
  icon: LucideIcon
  permissions?: Permission[]
  featureFlag?: string
  badge?: string | number
  children?: SidebarItemConfig[]
}

export const sidebarConfig: SidebarItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    path: '/platform',
    icon: LayoutDashboard,
    permissions: ['platform:analytics:read', 'orders:analytics', 'restaurant:view_analytics', 'orders:read']
  },
  {
    id: 'organizations',
    label: 'Organisations',
    path: '/organization',
    icon: Building2,
    permissions: ['platform:tenants:read', 'users:manage_roles', 'restaurant:update'],
    children: [
      {
        id: 'organization.overview',
        label: 'Vue organisation',
        path: '/organization',
        icon: Users,
        permissions: ['platform:tenants:read', 'restaurant:read', 'users:read']
      },
      {
        id: 'organization.branches',
        label: 'Agences',
        path: '/organization/branches',
        icon: List,
        permissions: ['restaurant:read', 'tables:read']
      }
    ]
  },
  {
    id: 'branch',
    label: 'Restaurant',
    path: '/branch',
    icon: ShoppingBag,
    permissions: ['restaurant:read', 'tables:read', 'orders:read'],
    children: [
      {
        id: 'branch.orders',
        label: 'Commandes',
        path: '/branch/orders',
        icon: CreditCard,
        permissions: ['orders:read', 'orders:read_own'],
        badge: '9'
      },
      {
        id: 'branch.menu',
        label: 'Menu',
        path: '/branch/menu',
        icon: List,
        permissions: ['plats:read', 'categories:read']
      },
      {
        id: 'branch.kitchen',
        label: 'Cuisine',
        path: '/branch/kitchen',
        icon: Sparkles,
        permissions: ['orders:update_status']
      }
    ]
  },
  {
    id: 'client',
    label: 'Clients',
    path: '/client',
    icon: Bell,
    permissions: ['users:read', 'platform:users:read'],
    children: [
      {
        id: 'client.support',
        label: 'Support',
        path: '/client/support',
        icon: Activity,
        permissions: ['platform:support:impersonate', 'platform:logs:read']
      }
    ]
  },
  {
    id: 'settings',
    label: 'Paramètres',
    path: '/settings',
    icon: Settings,
    permissions: ['restaurant:update', 'users:manage_roles', 'platform:billing:update'],
    featureFlag: 'settings'
  }
]
