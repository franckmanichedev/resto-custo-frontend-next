import type { SidebarItemConfig } from './sidebar.config'

export type TenantRole =
  | 'platform_owner'
  | 'platform_admin'
  | 'platform_support'
  | 'organization_owner'
  | 'organization_manager'
  | 'branch_manager'
  | 'cashier'
  | 'waiter'
  | 'kitchen'
  | 'admin'
  | 'menu_manager'
  | 'kitchen_staff'
  | 'customer'

export type Permission = string

export const backendRoles: TenantRole[] = [
  'platform_owner',
  'platform_admin',
  'platform_support',
  'organization_owner',
  'organization_manager',
  'branch_manager',
  'cashier',
  'waiter',
  'kitchen',
  'admin',
  'menu_manager',
  'kitchen_staff',
  'customer'
]

export const normalizeTenantRole = (role?: string | null): TenantRole => {
  return backendRoles.includes(role as TenantRole) ? (role as TenantRole) : 'customer'
}

// Fallback only. The backend /api/auth/me response is the RBAC source of truth.
export const legacyRolePermissions: Partial<Record<TenantRole, Permission[]>> = {
  admin: ['restaurant:read', 'restaurant:update', 'orders:read', 'plats:read', 'plats:update', 'users:manage_roles'],
  menu_manager: ['restaurant:read', 'orders:read', 'plats:read', 'plats:update', 'categories:update'],
  kitchen_staff: ['orders:read', 'orders:update_status', 'plats:read'],
  customer: ['plats:read', 'orders:read_own']
}

export function hasPermission(userPermissions: Permission[], requiredPermissions?: string[] | undefined): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) return true
  return requiredPermissions.some((permission) => userPermissions.includes(permission))
}

export function canAccess(item: SidebarItemConfig, userPermissions: Permission[]): boolean {
  if (!hasPermission(userPermissions, item.permissions)) return false

  if (item.children && item.children.length > 0) {
    return item.children.some((child) => canAccess(child, userPermissions))
  }

  return true
}

export function filterNavigationByRole(items: SidebarItemConfig[], userPermissions: Permission[]): SidebarItemConfig[] {
  return items
    .filter((item) => canAccess(item, userPermissions))
    .map((item) => ({
      ...item,
      children: item.children ? filterNavigationByRole(item.children, userPermissions) : undefined
    }))
}
