import { Navigate } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useTenant } from '@/hooks/useTenant'
import { hasPermission } from '@/config/permissions'

type Props = {
  children: ReactNode
  permissions?: string[]
  fallback?: ReactElement
}

export default function PermissionGuard({ children, permissions, fallback }: Props): ReactElement | null {
  const tenant = useTenant()

  if (!hasPermission(tenant.permissions, permissions)) {
    return fallback ?? <Navigate to="/unauthorized" replace />
  }

  return (children as ReactElement) ?? null
}
