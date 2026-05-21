import { useSaasStore } from '@/stores/saasStore'
import { getAuthMe } from '@/features/auth/api'

const normalizeStoredValue = (value: string | null): string | null => {
  if (!value) return null
  const normalized = value.trim()
  return normalized.length === 0 || normalized === 'null' ? null : normalized
}

export async function restoreSession(): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    const context = await getAuthMe()
    if (context) {
      useSaasStore.getState().hydrateFromAccessContext(context)
      return
    }
  } catch {
    // Keep legacy optimistic hydration when the backend context is temporarily unavailable.
  }

  const organizationId = normalizeStoredValue(window.localStorage.getItem('tenant.organizationId'))
  const branchId = normalizeStoredValue(window.localStorage.getItem('tenant.branchId'))

  if (organizationId || branchId) {
    useSaasStore.getState().switchBranch(organizationId, branchId)
  }
}

export default restoreSession
