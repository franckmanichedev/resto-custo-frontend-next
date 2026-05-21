import { Outlet } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer'

export default function PublicLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageContainer>
        <Outlet />
      </PageContainer>
    </main>
  )
}
