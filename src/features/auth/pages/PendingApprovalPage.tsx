import React, { type ReactElement } from 'react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthButton } from '@/components/auth/AuthButton'

export function PendingApprovalPage(): ReactElement {
  return (
    <AuthLayout>
      <AuthCard className="max-w-md text-center">
        <div className="space-y-4">
          <div className="text-5xl">⏳</div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">En attente d'approbation</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Votre demande d'accès a été envoyée. Un administrateur examinera votre demande et vous notifiera par email.
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-left space-y-2">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-semibold">Que faire en attendant?</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Consultez votre email pour les mises à jour</li>
              <li>✓ Préparez vos documents</li>
              <li>✓ Configurez votre profil</li>
            </ul>
          </div>
          <AuthButton variant="outline" onClick={() => window.location.href = '/'}>
            Retour à l'accueil
          </AuthButton>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
