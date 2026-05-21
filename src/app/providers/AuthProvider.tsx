import type { ReactNode, ReactElement } from 'react'
import { useEffect } from 'react'
import { subscribeAuth } from '@/features/auth/api'
import { useAuthStore } from '@/stores/authStore'
import initAuthPersistence from '@/features/auth/config/persistence'
import { restoreSession } from '@/features/auth/init/sessionRestore'

import type { User } from '@/lib/firebase/auth'
import type { AuthStateName } from '@/features/auth/types/auth-state'

type Props = { children?: ReactNode }

function resolveStateFromUser(user: User | null): AuthStateName {
  if (!user) return 'unauthenticated'
  if (user.email && user.emailVerified === false) return 'email-unverified'
  return 'authenticated'
}

export function AuthProvider({ children }: Props): ReactElement {
  const setAuthState = useAuthStore((s) => s.setAuthState)
  const clear = useAuthStore((s) => s.clear)

  useEffect(() => {
    void initAuthPersistence()

    const unsubscribe = subscribeAuth(async (user: User | null) => {
      if (!user) {
        clear()
        return
      }

      const status = resolveStateFromUser(user)
      setAuthState({ status, user, initializing: false, error: null })

      if (status === 'authenticated') {
        await restoreSession()
      }
    })

    return () => unsubscribe()
  }, [clear, setAuthState])

  return (children as ReactElement) ?? (null as unknown as ReactElement)
}

export default AuthProvider
