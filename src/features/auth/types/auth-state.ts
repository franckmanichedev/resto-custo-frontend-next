import type { User } from '@/lib/firebase/auth'

export type AuthStateName = 'loading' | 'authenticated' | 'unauthenticated' | 'email-unverified' | 'onboarding'

export interface AuthState {
  status: AuthStateName
  user: User | null
  initializing: boolean
  error?: string | null
}
