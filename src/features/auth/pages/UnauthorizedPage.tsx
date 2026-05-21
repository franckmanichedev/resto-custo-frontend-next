import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthButton } from '@/components/auth/AuthButton'
import type { ReactElement } from 'react'

export function UnauthorizedPage(): ReactElement {
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <AuthCard className="max-w-md text-center">
        <div className="space-y-4">
          <div className="text-5xl">🔒</div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Accès non autorisé</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <AuthButton onClick={() => navigate(-1)}>
              Retour à la page précédente
            </AuthButton>
            <AuthButton variant="outline" onClick={() => navigate('/')}>
              Retour à l'accueil
            </AuthButton>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}

export default UnauthorizedPage
