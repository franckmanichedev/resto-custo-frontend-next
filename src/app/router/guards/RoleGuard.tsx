import { Navigate } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useTenant } from '@/hooks/useTenant'
import { hasRole } from '@/config/permissions'

type Props = {
  children: ReactNode
  roles: string[]
  fallback?: ReactElement
}

export default function RoleGuard({ children, roles, fallback }: Props): ReactElement | null {
  const tenant = useTenant()

  if (!hasRole(tenant.role, roles as any)) {
    return fallback ?? <Navigate to="/unauthorized" replace />
  }

  return (children as ReactElement) ?? null
}
