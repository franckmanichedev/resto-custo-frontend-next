import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Bell,
  Building2,
  CreditCard,
  LayoutDashboard,
  List,
  Settings,
  ShoppingBag,
  Sparkles,
  Users
} from 'lucide-react'
import { routes } from './routes'
import type { FeatureFlag } from './featureFlags'
import type { TenantRole, Permission } from './permissions'

export type NavigationItem = {
  id: string
  label: string
  path: string
  icon: LucideIcon
  permissions?: Permission[]
  featureFlag?: FeatureFlag
  badge?: string | number
  roles?: TenantRole[]
  children?: NavigationItem[]
}

export const navigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    path: routes.dashboard.root,
    icon: LayoutDashboard,
    permissions: ['platform:analytics:read', 'orders:analytics', 'restaurant:view_analytics', 'orders:read']
  },
  {
    id: 'organizations',
    label: 'Organisations',
    path: routes.dashboard.organizations,
    icon: Building2,
    permissions: ['platform:tenants:read', 'users:manage_roles', 'restaurant:update'],
    children: [
      {
        id: 'organization.overview',
        label: 'Vue organisation',
        path: routes.dashboard.organizations,
        icon: Users,
        permissions: ['platform:tenants:read', 'restaurant:read', 'users:read']
      },
      {
        id: 'organization.branches',
        label: 'Agences',
        path: routes.dashboard.organizationBranches,
        icon: List,
        permissions: ['restaurant:read', 'tables:read']
      }
    ]
  },
  {
    id: 'branch',
    label: 'Restaurant',
    path: routes.dashboard.branch,
    icon: ShoppingBag,
    permissions: ['restaurant:read', 'tables:read', 'orders:read'],
    children: [
      {
        id: 'branch.orders',
        label: 'Commandes',
        path: routes.dashboard.branchOrders,
        icon: CreditCard,
        permissions: ['orders:read', 'orders:read_own'],
        badge: '9'
      },
      {
        id: 'branch.menu',
        label: 'Menu',
        path: routes.dashboard.branchMenu,
        icon: List,
        permissions: ['plats:read', 'categories:read']
      },
      {
        id: 'branch.kitchen',
        label: 'Cuisine',
        path: routes.dashboard.branchKitchen,
        icon: Sparkles,
        permissions: ['orders:update_status']
      }
    ]
  },
  {
    id: 'clients',
    label: 'Clients',
    path: routes.dashboard.clients,
    icon: Bell,
    permissions: ['users:read', 'platform:users:read'],
    children: [
      {
        id: 'client.support',
        label: 'Support',
        path: routes.dashboard.clientSupport,
        icon: Activity,
        permissions: ['platform:support:impersonate', 'platform:logs:read']
      }
    ]
  },
  {
    id: 'settings',
    label: 'Paramètres',
    path: routes.dashboard.settings,
    icon: Settings,
    permissions: ['restaurant:update', 'users:manage_roles', 'platform:billing:update'],
    featureFlag: 'settings'
  }
]

export const navigationGroups = [
  {
    title: 'Dashboard',
    items: ['dashboard']
  },
  {
    title: 'Gestion',
    items: ['organizations', 'branch']
  },
  {
    title: 'Relations',
    items: ['clients']
  },
  {
    title: 'Paramètres',
    items: ['settings']
  }
]
