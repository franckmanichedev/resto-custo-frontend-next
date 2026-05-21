import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'
import { routes } from '@/config/routes'

type Props = { children: ReactNode; fallback?: ReactElement }

export default function ProtectedRoute({ children, fallback }: Props): ReactElement | null {
  const location = useLocation()
  const { state, isLoading } = useAuthStatus()

  if (isLoading) return fallback ?? null

  if (state.status === 'unauthenticated') {
    return <Navigate to={routes.auth.login} state={{ from: location }} replace />
  }

  if (state.status === 'email-unverified') {
    return <Navigate to={routes.auth.verifyEmail} state={{ from: location }} replace />
  }

  if (state.status === 'onboarding') {
    return <Navigate to="/onboarding" state={{ from: location }} replace />
  }

  return (children as ReactElement) ?? null
}
