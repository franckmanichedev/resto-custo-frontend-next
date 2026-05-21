import { create } from 'zustand'
import { legacyRolePermissions, normalizeTenantRole, type TenantRole, type Permission } from '@/navigation/rbac'

export type BranchOption = {
  organizationId: string
  branchId: string
  label: string
  organizationName: string
  branchName: string
}

export type TenantMetadata = {
  organizationName: string | null
  branchName: string | null
  branchLocation?: string | null
}

type SaasState = {
  organizationId: string | null
  branchId: string | null
  role: TenantRole
  permissions: Permission[]
  metadata: TenantMetadata
  recentBranches: BranchOption[]
  setOrganization: (id: string | null) => void
  setBranch: (id: string | null) => void
  setRole: (role: TenantRole) => void
  setPermissions: (permissions: Permission[]) => void
  hydrateFromAccessContext: (context: BackendAccessContext) => void
  setMetadata: (metadata: Partial<TenantMetadata>) => void
  switchBranch: (organizationId: string | null, branchId: string | null, metadata?: Partial<TenantMetadata>) => void
  addRecentBranch: (branch: BranchOption) => void
}

const normalizeStoredValue = (value: string | null): string | null => {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length === 0 || trimmed === 'null' ? null : trimmed
}

const loadRecentBranches = (): BranchOption[] => {
  if (typeof window === 'undefined') return []

  const raw = window.localStorage.getItem('tenant.recentBranches')
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as BranchOption[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const loadTenantSession = (): { organizationId: string | null; branchId: string | null } => {
  if (typeof window === 'undefined') return { organizationId: null, branchId: null }
  return {
    organizationId: normalizeStoredValue(window.localStorage.getItem('tenant.organizationId')) ?? import.meta.env.VITE_DEFAULT_ORGANIZATION_ID ?? null,
    branchId: normalizeStoredValue(window.localStorage.getItem('tenant.branchId')) ?? import.meta.env.VITE_DEFAULT_BRANCH_ID ?? null
  }
}

const persistRecentBranches = (branches: BranchOption[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem('tenant.recentBranches', JSON.stringify(branches))
}

const { organizationId: initialOrganizationId, branchId: initialBranchId } = loadTenantSession()

export type BackendAccessContext = {
  profile?: {
    role?: string | null
  }
  permissions?: string[]
  access?: {
    activeOrganizationId?: string | null
    activeBranchId?: string | null
    platformRole?: string | null
    activeOrganizationRole?: string | null
    activeBranchRole?: string | null
  }
  activeOrganization?: {
    id?: string
    name?: string | null
  } | null
  activeBranch?: {
    id?: string
    name?: string | null
    city?: string | null
  } | null
}

export const useSaasStore = create<SaasState>((set) => ({
  organizationId: initialOrganizationId,
  branchId: initialBranchId,
  role: 'customer',
  permissions: [],
  metadata: {
    organizationName: null,
    branchName: null,
    branchLocation: null
  },
  recentBranches: loadRecentBranches(),
  setOrganization: (id) => set({ organizationId: id }),
  setBranch: (id) => set({ branchId: id }),
  setRole: (role) => set({ role, permissions: legacyRolePermissions[role] ?? [] }),
  setPermissions: (permissions) => set({ permissions }),
  hydrateFromAccessContext: (context) =>
    set((state) => {
      const activeOrganizationId = context.access?.activeOrganizationId ?? state.organizationId
      const activeBranchId = context.access?.activeBranchId ?? state.branchId
      const role = normalizeTenantRole(
        context.access?.platformRole ??
          context.access?.activeOrganizationRole ??
          context.access?.activeBranchRole ??
          context.profile?.role
      )

      if (typeof window !== 'undefined') {
        if (activeOrganizationId) window.localStorage.setItem('tenant.organizationId', activeOrganizationId)
        if (activeBranchId) window.localStorage.setItem('tenant.branchId', activeBranchId)
      }

      return {
        organizationId: activeOrganizationId ?? null,
        branchId: activeBranchId ?? null,
        role,
        permissions: context.permissions ?? legacyRolePermissions[role] ?? [],
        metadata: {
          ...state.metadata,
          organizationName: context.activeOrganization?.name ?? state.metadata.organizationName,
          branchName: context.activeBranch?.name ?? state.metadata.branchName,
          branchLocation: context.activeBranch?.city ?? state.metadata.branchLocation
        }
      }
    }),
  setMetadata: (metadata) =>
    set((state) => ({
      metadata: {
        ...state.metadata,
        ...metadata
      }
    })),
  switchBranch: (organizationId, branchId, metadata = {}) =>
    set((state) => {
      const next = {
        organizationId,
        branchId,
        metadata: {
          ...state.metadata,
          ...metadata
        }
      }

      if (typeof window !== 'undefined') {
        if (organizationId === null) {
          window.localStorage.removeItem('tenant.organizationId')
        } else {
          window.localStorage.setItem('tenant.organizationId', organizationId)
        }

        if (branchId === null) {
          window.localStorage.removeItem('tenant.branchId')
        } else {
          window.localStorage.setItem('tenant.branchId', branchId)
        }
      }

      return next
    }),
  addRecentBranch: (branch) =>
    set((state) => {
      const next = [branch, ...state.recentBranches.filter((item) => item.branchId !== branch.branchId)].slice(0, 7)
      persistRecentBranches(next)
      return { recentBranches: next }
    })
}))
