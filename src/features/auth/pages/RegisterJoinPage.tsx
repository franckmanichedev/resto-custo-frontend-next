import React, { type ReactElement } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthButton } from '@/components/auth/AuthButton'

export function RegisterJoinPage(): ReactElement {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  return (
    <AuthLayout showHero>
      <AuthCard title="Rejoindre une équipe" subtitle="Complétez votre inscription pour accepter l'invitation">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Merci pour votre invitation. Pour rejoindre l'équipe, créez un mot de passe et terminez votre profil.
          </p>

          <div className="rounded-3xl bg-muted/50 p-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Token d'invitation</p>
            <p className="mt-2 break-all">{token || 'Aucun token trouvé'}</p>
          </div>

          <div className="space-y-3">
            <AuthButton onClick={() => navigate('/auth/login')}>
              Se connecter
            </AuthButton>
            <AuthButton variant="outline" onClick={() => navigate('/auth/register')}>
              Créer un compte
            </AuthButton>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
