import {
  signInWithEmailAndPassword as fbSignIn,
  signOut as fbSignOut,
  configureAuthPersistence,
  onAuthStateChanged,
  refreshCurrentUser,
  getCurrentIdToken,
  mapFirebaseAuthError
} from '@/lib/firebase/auth'

import { auth } from '@/lib/firebase/firebase'
import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth'

import { apiFetch } from '@/lib/api/client'

import type { LoginInput, RegisterInput, ForgotInput, ResetInput } from '@/features/auth/schemas/authSchemas' 
import type { User } from '@/lib/firebase/auth'

export async function login(data: LoginInput, remember = true) {
  await configureAuthPersistence(remember)
  const res = await fbSignIn(data.email, data.password)
  return res
}

export async function register(data: RegisterInput) {
  // Backend must be source of truth for user creation. Call backend signup endpoint.
  const res = await apiFetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Registration failed')

  // After backend creates the Firebase user, sign in client-side and trigger
  // the verification email via the Firebase Client SDK.
  try {
    await configureAuthPersistence(true)
    await fbSignIn(data.email, data.password)
    if (auth.currentUser) {
        const actionCodeSettings = {
          url: `${window.location.origin}/auth/login?emailVerified=true`,
          handleCodeInApp: true
        }
        await sendEmailVerification(auth.currentUser, actionCodeSettings)
      console.log('Email de vérification envoyé avec redirection vers:', actionCodeSettings.url)
    }
  } catch (err) {
    // If client-side sign-in or verification sending fails, we still return
    // backend response (user created). Caller can prompt user to sign in.
    console.warn('Client-side sign-in / verification failed', err)
  }

  return json
}

export async function registerOrganization(data: {
  fullName: string
  email: string
  password: string
  organizationName: string
  branchName: string
  phone?: string
  cuisineType?: string
  city?: string
}) {
  const res = await apiFetch('/auth/register-organization', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Organization registration failed')

  try {
    await configureAuthPersistence(true)
    await fbSignIn(data.email, data.password)
    if (auth.currentUser) {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/login?emailVerified=true`,
        handleCodeInApp: true
      }
      await sendEmailVerification(auth.currentUser, actionCodeSettings)
    }
  } catch (err) {
    console.warn('Client-side sign-in / verification failed', err)
  }

  return json
}

export async function registerFranchise(data: {
  fullName: string
  email: string
  password: string
  organizationName: string
  expectedBranches?: number
  enterprisePlan?: string
  phone?: string
}) {
  const res = await apiFetch('/auth/register-franchise', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Franchise registration failed')

  try {
    await configureAuthPersistence(true)
    await fbSignIn(data.email, data.password)
    if (auth.currentUser) {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/login?emailVerified=true`,
        handleCodeInApp: true
      }
      await sendEmailVerification(auth.currentUser, actionCodeSettings)
    }
  } catch (err) {
    console.warn('Client-side sign-in / verification failed', err)
  }

  return json
}

export async function getAuthMe(forceRefreshToken = false) {
  const token = await getCurrentIdToken(forceRefreshToken)
  if (!token) return null

  const res = await apiFetch('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to load auth context')
  return json.data
}

export async function logout() {
  return fbSignOut()
}

export async function forgotPassword(data: ForgotInput) {
  // Use Firebase Client SDK to trigger password reset email
  try {
    await sendPasswordResetEmail(auth, data.email)
    return { success: true, message: 'Si cet email existe, un lien de reinitialisation vous a ete envoye.' }
  } catch (err) {
    // Map Firebase errors to user-friendly messages elsewhere; return generic success
    console.warn('sendPasswordResetEmail failed', err)
    return { success: true, message: 'Si cet email existe, un lien de reinitialisation vous a ete envoye.' }
  }
}

export async function resetPassword(data: ResetInput) {
  const res = await apiFetch('/auth/confirm-password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oobCode: data.oobCode, password: data.password })
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to reset password')
  return json
}

export async function resendVerificationEmail(user: User) {
  // Prefer client-side sending via Firebase SDK. The user must be signed in.
  if (auth.currentUser) {
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/login?emailVerified=true`,
        handleCodeInApp: true
      }
      await sendEmailVerification(auth.currentUser, actionCodeSettings)
      return { success: true, message: 'Email de verification renvoyé' }
    } catch (err) {
      console.warn('sendEmailVerification failed', err)
      throw new Error('Impossible de renvoyer l email de verification')
    }
  }

  // If no current user, fall back to backend endpoint to avoid blocking UX
  const res = await apiFetch('/auth/resend-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid: user?.uid, email: user?.email })
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to resend verification email')
  return json
}

export async function verifyResetCode(oobCode: string) {
  // Validation of reset codes is handled by backend now
  const res = await apiFetch('/auth/validate-reset-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oobCode })
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Invalid or expired reset code')
  return json
}

export async function applyAction(code: string) {
  const res = await apiFetch('/auth/apply-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Failed to apply action code')
  return json
}

export async function refreshUser() {
  return refreshCurrentUser()
}

export function getAuthErrorMessage(err: unknown) {
  return mapFirebaseAuthError(err)
}

export function subscribeAuth(callback: (u: User | null) => void) {
  return onAuthStateChanged(callback)
}

export async function configurePersistence(remember = true) {
  return configureAuthPersistence(remember)
}
