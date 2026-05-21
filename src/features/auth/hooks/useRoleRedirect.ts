import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useSaasStore } from '@/stores/saasStore'

const roleRedirects: Record<string, string> = {
  platform_owner: '/platform',
  platform_admin: '/platform',
  platform_support: '/platform',
  organization_owner: '/organization',
  organization_manager: '/organization',
  branch_manager: '/branch',
  cashier: '/workspace',
  waiter: '/workspace',
  kitchen: '/workspace',
  admin: '/branch',
  menu_manager: '/branch/menu',
  kitchen_staff: '/branch/kitchen',
  customer: '/workspace'
}

export function useRoleRedirect() {
  const navigate = useNavigate()
  const { status, initializing } = useAuthStore((s) => ({ status: s.status, initializing: s.initializing }))
  const role = useSaasStore((s) => s.role)

  const getRedirectPath = (): string | null => {
    if (status === 'unauthenticated') return '/auth/login'
    if (status === 'email-unverified') return '/auth/verify-email'
    if (status === 'authenticated') {
      return roleRedirects[role] || '/platform'
    }
    return null
  }

  const redirectByRole = () => {
    const path = getRedirectPath()
    if (path && !initializing) {
      navigate(path, { replace: true })
    }
  }

  return { redirectByRole, getRedirectPath }
}
