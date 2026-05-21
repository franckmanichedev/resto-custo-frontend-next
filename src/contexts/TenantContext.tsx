import { createContext, useMemo } from 'react'
import { useSaasStore } from '@/stores/saasStore'
import type { TenantRole, Permission } from '@/navigation/rbac'

export type TenantMetadata = {
  organizationName: string | null
  branchName: string | null
  branchLocation?: string | null
}

type TenantContextValue = {
  organizationId: string | null
  branchId: string | null
  role: TenantRole
  permissions: Permission[]
  metadata: TenantMetadata
  switchBranch: (organizationId: string | null, branchId: string | null, metadata?: Partial<TenantMetadata>) => void
  setRole: (role: TenantRole) => void
  setPermissions: (permissions: Permission[]) => void
}

export const TenantContext = createContext<TenantContextValue>({
  organizationId: null,
  branchId: null,
  role: 'customer',
  permissions: [],
  metadata: { organizationName: null, branchName: null },
  switchBranch: () => undefined,
  setRole: () => undefined,
  setPermissions: () => undefined
})

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const organizationId = useSaasStore((s) => s.organizationId)
  const branchId = useSaasStore((s) => s.branchId)
  const role = useSaasStore((s) => s.role)
  const permissions = useSaasStore((s) => s.permissions)
  const metadata = useSaasStore((s) => s.metadata)
  const switchBranch = useSaasStore((s) => s.switchBranch)
  const setRole = useSaasStore((s) => s.setRole)
  const setPermissions = useSaasStore((s) => s.setPermissions)

  const value = useMemo(
    () => ({
      organizationId,
      branchId,
      role,
      permissions,
      metadata,
      switchBranch,
      setRole,
      setPermissions
    }),
    [branchId, metadata, organizationId, permissions, role, setPermissions, setRole, switchBranch]
  )

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
}
