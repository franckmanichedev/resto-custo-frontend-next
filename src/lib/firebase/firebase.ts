import { getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, type Firestore, connectFirestoreEmulator } from 'firebase/firestore'

const isBrowser = typeof window !== 'undefined'

function assertEnv(name: string, value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required Firebase env var: ${name}`)
  }
  return value
}

const firebaseConfig = {
  apiKey: assertEnv('VITE_FIREBASE_API_KEY', import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: assertEnv('VITE_FIREBASE_AUTH_DOMAIN', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: assertEnv('VITE_FIREBASE_PROJECT_ID', import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: assertEnv('VITE_FIREBASE_STORAGE_BUCKET', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: assertEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: assertEnv('VITE_FIREBASE_APP_ID', import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? undefined
}

const app: FirebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)
const db: Firestore = getFirestore(app)

if (isBrowser && import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true') {
  const authHost = assertEnv('VITE_FIREBASE_AUTH_EMULATOR_HOST', import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST)
  const firestoreHost = assertEnv('VITE_FIREBASE_FIRESTORE_EMULATOR_HOST', import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST)
  const firestorePort = Number(assertEnv('VITE_FIREBASE_FIRESTORE_EMULATOR_PORT', import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT))

  connectAuthEmulator(auth, `http://${authHost}`)
  connectFirestoreEmulator(db, firestoreHost, firestorePort)
}

export { app, auth, db }
