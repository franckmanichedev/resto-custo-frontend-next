import { useCallback } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function useAuthStatus() {
  const state = useAuthStore((s) => s)

  const isAuthenticated = state.status === 'authenticated'
  const isLoading = state.initializing || state.status === 'loading'

  const refresh = useCallback(() => {
    useAuthStore.setState((current) => ({ ...current }))
  }, [])

  return { state, isAuthenticated, isLoading, refresh }
}

export default useAuthStatus
