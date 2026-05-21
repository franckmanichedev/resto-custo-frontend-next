import { configurePersistence } from '@/features/auth/api'

export async function initAuthPersistence(): Promise<void> {
  try {
    await configurePersistence()
  } catch (err: unknown) {
    // Persistence failure should not block the app startup; log for diagnostics
    // Keep typing strict: do not use `any`.
    // eslint-disable-next-line no-console
    console.error('Failed to configure auth persistence', err)
  }
}

export default initAuthPersistence
