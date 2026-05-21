import { useQuery } from '@tanstack/react-query'
import type { QueryFunction, QueryKey, UseQueryOptions } from '@tanstack/react-query'
import { useAuthStatus } from '@/features/auth/hooks/useAuthStatus'

// 💡 On exclut explicitement les clés gérées en interne pour éviter les conflits
type ProtectedOptions<TData> = Omit<
  UseQueryOptions<TData, Error, TData, QueryKey>, 
  'queryKey' | 'queryFn' | 'enabled'
>

export function useProtectedQuery<TData = unknown>(
  key: QueryKey, 
  fn: QueryFunction<TData>, 
  options?: ProtectedOptions<TData>
) {
  const { state } = useAuthStatus()

  // Détermination stricte du booléen
  const isEnabled = state.status === 'authenticated'

  return useQuery<TData, Error, TData, QueryKey>({ 
    ...options,
    queryKey: key,
    queryFn: fn, 
    enabled: isEnabled 
  })
}

export default useProtectedQuery
