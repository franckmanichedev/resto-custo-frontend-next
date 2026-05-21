import type { Timestamp } from 'firebase/firestore'

export type FirestoreTimestamp = Timestamp

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

export type PermissionScope = 'platform' | 'organization' | 'branch' | 'tenant' | 'customer'
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked'
export type OrganizationStatus = 'active' | 'suspended' | 'archived'

export interface Organization {
  id: string
  name: string
  slug: string
  ownerId: string
  status: OrganizationStatus
  isActive: boolean
  metadata?: Record<string, unknown>
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export interface Branch {
  id: string
  organizationId: string
  name: string
  location: string
  address?: string | null
  isActive: boolean
  metadata?: Record<string, unknown>
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export interface OrganizationMembership {
  id: string
  userId: string
  organizationId: string
  role: TenantRole
  isActive: boolean
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export interface BranchMembership {
  id: string
  userId: string
  organizationId: string
  branchId: string
  role: TenantRole
  isActive: boolean
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export interface Invitation {
  id: string
  email: string
  invitedBy: string
  organizationId?: string | null
  branchId?: string | null
  role: TenantRole
  status: InvitationStatus
  token: string
  createdAt: FirestoreTimestamp
  expiresAt: FirestoreTimestamp
  acceptedAt?: FirestoreTimestamp | null
  metadata?: Record<string, unknown>
}

export interface UserProfile {
  id: string
  uid: string
  email: string
  displayName: string | null
  emailVerified: boolean
  phoneNumber?: string | null
  organizationIds: string[]
  branchIds: string[]
  organizationMemberships: OrganizationMembership[]
  branchMemberships: BranchMembership[]
  activeOrganizationId: string | null
  activeBranchId: string | null
  role: TenantRole | null
  customClaims?: Record<string, unknown>
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}

export interface RoleDefinition {
  id: string
  name: string
  description: string
  permissions: string[]
  scope: PermissionScope
  createdAt: FirestoreTimestamp
  updatedAt: FirestoreTimestamp
}
