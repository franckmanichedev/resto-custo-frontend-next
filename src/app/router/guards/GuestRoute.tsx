import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'
import { routes } from '@/config/routes'

type Props = { children: ReactNode; fallback?: ReactElement }

export default function GuestRoute({ children, fallback }: Props): ReactElement | null {
  const location = useLocation()
  const { state, isLoading } = useAuthStatus()

  if (isLoading) return fallback ?? null

  if (state.status === 'authenticated') {
    return <Navigate to={routes.dashboard.root} state={{ from: location }} replace />
  }

  const allowedForUnverified = [routes.auth.verifyEmail, routes.auth.forgotPassword, routes.auth.resetPassword]
  if (state.status === 'email-unverified' && !allowedForUnverified.includes(location.pathname)) {
    return <Navigate to={routes.auth.verifyEmail} state={{ from: location }} replace />
  }

  return (children as ReactElement) ?? null
}
