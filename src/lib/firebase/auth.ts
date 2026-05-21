import { FirebaseError } from 'firebase/app'
import { auth } from './firebase'
import {
  signInWithEmailAndPassword as fSignIn,
  signOut as fSignOut,
  onAuthStateChanged as fOnAuthStateChanged,
  User as FirebaseUser,
  getIdTokenResult,
  setPersistence as fSetPersistence,
  browserLocalPersistence as fBrowserLocalPersistence,
  browserSessionPersistence as fBrowserSessionPersistence
} from 'firebase/auth'

export interface UserClaims {
  role?: string | null
  organizationId?: string | null
  organizationIds?: string[] | null
  branchId?: string | null
  branchIds?: string[] | null
  activeOrganizationId?: string | null
  activeBranchId?: string | null
  [key: string]: unknown
}

export type User = {
  uid: string
  email: string | null
  displayName: string | null
  phoneNumber?: string | null
  emailVerified: boolean
  role: string | null
  organizationId: string | null
  organizationIds: string[]
  branchId: string | null
  branchIds: string[]
  activeOrganizationId: string | null
  activeBranchId: string | null
  customClaims: UserClaims
}

function isFirebaseError(err: unknown): err is FirebaseError {
  return typeof err === 'object' && err !== null && 'code' in err && typeof (err as any).code === 'string'
}

export function mapFirebaseAuthError(err: unknown): string {
  if (!isFirebaseError(err)) {
    return 'Une erreur est survenue. Réessayez plus tard.'
  }

  switch (err.code) {
    case 'auth/invalid-credential':
      return 'Identifiants invalides. Vérifiez vos informations.'
    case 'auth/email-already-in-use':
      return 'Cette adresse email est déjà utilisée. Essayez de vous connecter.'
    case 'auth/invalid-email':
      return 'L’adresse email n’est pas valide.'
    case 'auth/user-not-found':
      return 'Aucun compte n’est associé à cette adresse email.'
    case 'auth/wrong-password':
      return 'Mot de passe invalide. Vérifiez vos informations.'
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Réessayez dans quelques minutes.'
    case 'auth/network-request-failed':
      return 'Connexion impossible. Vérifiez votre connexion internet.'
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible. Choisissez-en un plus sécurisé.'
    case 'auth/user-disabled':
      return 'Ce compte a été désactivé. Contactez le support.'
    case 'auth/expired-action-code':
      return 'Le lien a expiré. Demandez un nouveau lien.'
    case 'auth/invalid-action-code':
      return 'Le lien est invalide ou déjà utilisé.'
    case 'auth/missing-action-code':
      return 'Le lien est incomplet. Vérifiez votre email.'
    default:
      return err.message || 'Une erreur est survenue. Réessayez plus tard.'
  }
}

export async function signInWithEmailAndPassword(email: string, password: string) {
  const cred = await fSignIn(auth, email, password)
  const fbUser = cred.user
  const claims = await detectUserClaims(fbUser)
  return { user: mapUser(fbUser, claims) }
}

export async function configureAuthPersistence(persistent = true) {
  const persistence = persistent ? fBrowserLocalPersistence : fBrowserSessionPersistence
  return fSetPersistence(auth, persistence)
}

export async function refreshCurrentUser(): Promise<User | null> {
  if (!auth.currentUser) {
    return null
  }

  await auth.currentUser.reload()
  const fbUser = auth.currentUser
  const claims = await detectUserClaims(fbUser)
  return mapUser(fbUser, claims)
}

export async function getCurrentIdToken(forceRefresh = false): Promise<string | null> {
  if (!auth.currentUser) return null
  return auth.currentUser.getIdToken(forceRefresh)
}

export async function signOut() {
  return fSignOut(auth)
}

export function onAuthStateChanged(callback: (u: User | null) => void) {
  return fOnAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
    if (!fbUser) {
      callback(null)
      return
    }

    const claims = await detectUserClaims(fbUser)
    callback(mapUser(fbUser, claims))
  })
}

async function detectUserClaims(fbUser: FirebaseUser): Promise<UserClaims> {
  try {
    const token = await getIdTokenResult(fbUser, false)
    return (token.claims as UserClaims) ?? {}
  } catch (err) {
    return {}
  }
}

function mapUser(fbUser: FirebaseUser, claims: UserClaims): User {
  return {
    uid: fbUser.uid,
    email: fbUser.email ?? null,
    displayName: fbUser.displayName ?? null,
    phoneNumber: fbUser.phoneNumber ?? null,
    emailVerified: fbUser.emailVerified,
    role: claims.role ?? null,
    organizationId: claims.organizationId ?? null,
    organizationIds: Array.isArray(claims.organizationIds) ? (claims.organizationIds as string[]) : [],
    branchId: claims.branchId ?? null,
    branchIds: Array.isArray(claims.branchIds) ? (claims.branchIds as string[]) : [],
    activeOrganizationId: claims.activeOrganizationId ?? null,
    activeBranchId: claims.activeBranchId ?? null,
    customClaims: claims
  }
}
