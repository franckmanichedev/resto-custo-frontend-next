import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode, ReactElement } from 'react'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'

type Props = { children: ReactNode; fallback?: ReactElement }

export default function RequireAuth({ children, fallback }: Props): ReactElement | null {
  const location = useLocation()
  const { state, isLoading } = useAuthStatus()

  if (isLoading) return fallback ?? null

  if (state.status === 'unauthenticated') return <Navigate to="/auth/login" state={{ from: location }} replace />

  if (state.status === 'email-unverified') return <Navigate to="/auth/verify-email" state={{ from: location }} replace />

  if (state.status === 'onboarding') return <Navigate to="/onboarding" state={{ from: location }} replace />

  return (children as ReactElement) ?? null
}
