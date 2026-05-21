import { createContext } from 'react'
import { useSaasStore } from '@/stores/saasStore'

export const SaaSContext = createContext({
  organizationId: null as string | null,
  branchId: null as string | null
})

export function SaaSProvider({ children }: { children: React.ReactNode }) {
  const org = useSaasStore((s) => s.organizationId)
  const branch = useSaasStore((s) => s.branchId)

  return <SaaSContext.Provider value={{ organizationId: org, branchId: branch }}>{children}</SaaSContext.Provider>
}

export default SaaSProvider
