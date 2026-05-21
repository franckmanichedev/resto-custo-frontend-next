import { create } from 'zustand'
import type { User } from '@/lib/firebase/auth'
import type { AuthStateName } from '@/features/auth/types/auth-state'

export type AuthStatus = AuthStateName
export type AuthUser = User | null

type AuthState = {
  status: AuthStatus
  user: AuthUser
  initializing: boolean
  error: string | null
  setAuthState: (next: Partial<Omit<AuthState, 'setAuthState'>>) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,
  initializing: true,
  error: null,
  setAuthState: (next) => set((state) => ({ ...state, ...next })),
  clear: () =>
    set({
      status: 'unauthenticated',
      user: null,
      initializing: false,
      error: null
    })
}))
