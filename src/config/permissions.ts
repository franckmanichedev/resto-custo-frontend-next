import { isFeatureFlagEnabled } from './featureFlags'
import type { NavigationItem } from './navigation'

export enum RoleKey {
  PLATFORM_OWNER = 'platform_owner',
  PLATFORM_ADMIN = 'platform_admin',
  PLATFORM_SUPPORT = 'platform_support',
  ORGANIZATION_OWNER = 'organization_owner',
  ORGANIZATION_MANAGER = 'organization_manager',
  BRANCH_MANAGER = 'branch_manager',
  CASHIER = 'cashier',
  WAITER = 'waiter',
  KITCHEN = 'kitchen',
  ADMIN = 'admin',
  MENU_MANAGER = 'menu_manager',
  KITCHEN_STAFF = 'kitchen_staff',
  CUSTOMER = 'customer'
}

export type TenantRole = `${RoleKey}`
export type Permission = string

export const PERMISSION_KEY = {
  DASHBOARD_VIEW: 'platform:analytics:read',
  ORDER_READ: 'orders:read',
  ORDER_UPDATE_STATUS: 'orders:update_status',
  MENU_READ: 'plats:read',
  MENU_CATEGORY_READ: 'categories:read',
  SUPPORT_IMPERSONATE: 'platform:support:impersonate'
} as const

export const ROLE_PERMISSIONS: Record<TenantRole, Permission[]> = {
  [RoleKey.PLATFORM_OWNER]: ['platform:analytics:read', 'platform:tenants:read', 'users:manage_roles', 'platform:billing:update'],
  [RoleKey.PLATFORM_ADMIN]: ['platform:analytics:read', 'platform:tenants:read', 'users:manage_roles'],
  [RoleKey.PLATFORM_SUPPORT]: ['platform:analytics:read', 'platform:logs:read', 'platform:support:impersonate'],
  [RoleKey.ORGANIZATION_OWNER]: ['restaurant:read', 'restaurant:update', 'users:read', 'orders:read'],
  [RoleKey.ORGANIZATION_MANAGER]: ['restaurant:read', 'tables:read', 'users:read', 'orders:read'],
  [RoleKey.BRANCH_MANAGER]: ['restaurant:read', 'tables:read', 'orders:read', 'plats:read'],
  [RoleKey.CASHIER]: ['orders:read', 'orders:read_own'],
  [RoleKey.WAITER]: ['orders:read_own'],
  [RoleKey.KITCHEN]: ['orders:read', 'orders:update_status'],
  [RoleKey.ADMIN]: ['restaurant:update', 'users:manage_roles', 'plats:read', 'orders:read'],
  [RoleKey.MENU_MANAGER]: ['plats:read', 'plats:update', 'categories:read'],
  [RoleKey.KITCHEN_STAFF]: ['orders:read', 'plats:read'],
  [RoleKey.CUSTOMER]: ['plats:read', 'orders:read_own']
}

export function hasRole(currentRole: string | undefined, allowedRoles?: TenantRole[]): boolean {
  if (!allowedRoles || allowedRoles.length === 0) return true
  return allowedRoles.includes(currentRole as TenantRole)
}

export function hasPermission(userPermissions: Permission[], requiredPermissions?: Permission[]): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) return true
  return requiredPermissions.some((permission) => userPermissions.includes(permission))
}

export function canAccessNavigationItem(item: NavigationItem, userPermissions: Permission[]): boolean {
  if (item.featureFlag && !isFeatureFlagEnabled(item.featureFlag)) return false
  if (!hasPermission(userPermissions, item.permissions)) {
    if (!item.children || item.children.length === 0) return false
  }

  if (item.children && item.children.length > 0) {
    return item.children.some((child) => canAccessNavigationItem(child, userPermissions))
  }

  return true
}

export function filterNavigationByPermissions(items: NavigationItem[], userPermissions: Permission[]): NavigationItem[] {
  return items
    .filter((item) => canAccessNavigationItem(item, userPermissions))
    .map((item) => ({
      ...item,
      children: item.children ? filterNavigationByPermissions(item.children, userPermissions) : undefined
    }))
}

export function canAccessRoute(routePermissions: Permission[] | undefined, userPermissions: Permission[]): boolean {
  return hasPermission(userPermissions, routePermissions)
}
