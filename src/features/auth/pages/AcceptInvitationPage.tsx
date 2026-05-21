import React, { type ReactElement } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthButton } from '@/components/auth/AuthButton'

export function AcceptInvitationPage(): ReactElement {
  const { token: tokenParam } = useParams<{ token: string }>()
  const [searchParams] = useSearchParams()
  const token = tokenParam || searchParams.get('token') || ''
  const inviterName = searchParams.get('inviter') || 'Unknown'
  const organizationName = searchParams.get('org') || 'Unknown'
  const branchName = searchParams.get('branch') || 'Unknown'
  const role = searchParams.get('role') || 'team_member'

  const roleLabels: Record<string, string> = {
    branch_manager: 'Chef de succursale',
    cashier: 'Caissier',
    waiter: 'Serveur',
    kitchen: 'Personnel cuisine'
  }

  const navigate = useNavigate()

  return (
    <AuthLayout showHero>
      <AuthCard title="Rejoindre une équipe" subtitle="Vous avez été invité à rejoindre un restaurant">
        <div className="space-y-6">
          <div className="rounded-lg bg-muted/50 p-6 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Invitant</p>
              <p className="mt-1 font-semibold text-foreground">{inviterName}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Restaurant</p>
              <p className="mt-1 font-semibold text-foreground">{organizationName}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Succursale</p>
              <p className="mt-1 font-semibold text-foreground">{branchName}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Rôle assigné</p>
              <p className="mt-1 font-semibold text-foreground">{roleLabels[role] || role}</p>
            </div>
          </div>

          <div className="space-y-3">
            <AuthButton
              onClick={() => {
                if (!token) {
                  alert('Token invalide')
                  return
                }
                navigate(`/auth/register-join?token=${encodeURIComponent(token)}`)
              }}
            >
              Accepter l'invitation
            </AuthButton>

            <AuthButton variant="outline" onClick={() => navigate('/') }>
              Décliner
            </AuthButton>
          </div>

          {!token && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 dark:bg-red-950 dark:border-red-900 dark:text-red-100">
              Lien d'invitation invalide ou expiré
            </div>
          )}
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
