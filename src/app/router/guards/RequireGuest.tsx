import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'

type Props = { children: ReactNode; fallback?: ReactElement }

export default function RequireGuest({ children, fallback }: Props): ReactElement | null {
  const location = useLocation()
  const { state, isLoading } = useAuthStatus()

  if (isLoading) return fallback ?? null

  if (state.status === 'authenticated') {
    return <Navigate to="/platform" state={{ from: location }} replace />
  }

  const allowedForUnverified = ['/auth/verify-email', '/auth/action', '/auth/reset-password', '/auth/forgot-password']
  if (state.status === 'email-unverified' && !allowedForUnverified.includes(location.pathname)) {
    return <Navigate to="/auth/verify-email" state={{ from: location }} replace />
  }

  return (children as ReactElement) ?? null
}
