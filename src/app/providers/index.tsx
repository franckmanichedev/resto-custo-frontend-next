import QueryProvider from './QueryProvider'
import SaaSProvider from './SaaSProvider'
import { TenantProvider } from '@/contexts/TenantContext'
import AuthProvider from './AuthProvider'
import ThemeProvider from './ThemeProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SaaSProvider>
        <TenantProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </TenantProvider>
      </SaaSProvider>
    </QueryProvider>
  )
}
