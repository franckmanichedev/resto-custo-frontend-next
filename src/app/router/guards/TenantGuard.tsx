import { Navigate } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useTenant } from '@/hooks/useTenant'

type Props = {
  children: ReactNode
  fallback?: ReactElement
  requireBranch?: boolean
  requireOrganization?: boolean
}

export default function TenantGuard({
  children,
  fallback,
  requireBranch = true,
  requireOrganization = true
}: Props): ReactElement | null {
  const tenant = useTenant()

  if (requireOrganization && !tenant.organizationId) {
    return fallback ?? <Navigate to="/unauthorized" replace />
  }

  if (requireBranch && !tenant.branchId) {
    return fallback ?? <Navigate to="/unauthorized" replace />
  }

  return (children as ReactElement) ?? null
}
