import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'

type Props = { children: ReactNode; roles: string[]; fallback?: ReactElement }

export default function RequireRole({ children, roles, fallback }: Props): ReactElement | null {
  const location = useLocation()
  const { state, isLoading } = useAuthStatus()

  if (isLoading) return fallback ?? null

  if (state.status === 'unauthenticated') return <Navigate to="/auth/login" state={{ from: location }} replace />

  const userRole = state.user?.role
  if (!userRole || !roles.includes(userRole)) return <Navigate to="/unauthorized" replace />

  return (children as ReactElement) ?? null
}
