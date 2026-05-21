import type { TenantRole } from './rbac'

export type NavItem = {
  key: string
  label: string
  path: string
  roles: TenantRole[]
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'platform', label: 'Platform', path: '/platform', roles: ['platform_owner', 'platform_admin', 'platform_support'] },
  { key: 'organization', label: 'Organization', path: '/organization', roles: ['organization_owner', 'organization_manager', 'admin'] },
  { key: 'branch', label: 'Branch', path: '/branch', roles: ['branch_manager', 'cashier', 'waiter', 'kitchen', 'menu_manager', 'kitchen_staff'] },
  { key: 'client', label: 'Client', path: '/client', roles: ['customer'] }
]
