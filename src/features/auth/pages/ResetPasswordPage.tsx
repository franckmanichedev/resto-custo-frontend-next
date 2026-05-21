import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { resetSchema, type ResetInput } from '@/features/auth/schemas/authSchemas'
import { resetPassword, verifyResetCode, getAuthErrorMessage } from '@/features/auth/api'
import { toast } from 'sonner'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthPasswordInput } from '@/components/auth/AuthPasswordInput'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthAlert } from '@/components/auth/AuthAlert'
import type { ReactElement } from 'react'

export function ResetPasswordPage(): ReactElement {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'ready' | 'invalid' | 'success'>('loading')
  const [formError, setFormError] = useState<string | null>(null)
  const oobCode = searchParams.get('oobCode') ?? ''
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm<ResetInput>({ resolver: zodResolver(resetSchema), defaultValues: { oobCode } })

  useEffect(() => {
    if (!oobCode) {
      setStatus('invalid')
      return
    }

    void verifyResetCode(oobCode)
      .then(() => setStatus('ready'))
      .catch((err: unknown) => {
        console.error(err)
        setFormError(getAuthErrorMessage(err))
        setStatus('invalid')
      })
  }, [oobCode])

  const onSubmit: SubmitHandler<ResetInput> = async (data) => {
    setFormError(null)

    try {
      await resetPassword(data)
      toast.success('Mot de passe mis à jour')
      setStatus('success')
      setTimeout(() => navigate('/auth/login'), 1800)
    } catch (err: unknown) {
      console.error(err)
      const message = getAuthErrorMessage(err)
      setFormError(message)
      toast.error(message)
    }
  }

  return (
    <ToastProvider>
      <AuthLayout>
        <AuthCard title="Réinitialiser le mot de passe" subtitle="Définissez un nouveau mot de passe pour sécuriser votre compte">
          {status === 'loading' && (
            <div className="text-center py-12 text-sm text-muted-foreground">Vérification du lien de réinitialisation…</div>
          )}

          {status === 'invalid' && (
            <div className="space-y-4">
              <AuthAlert type="error" title="Lien invalide" message={formError ?? 'Ce lien de réinitialisation est invalide ou expiré.'} />
              <AuthButton onClick={() => navigate('/auth/forgot-password')}>
                Demander un nouveau lien
              </AuthButton>
            </div>
          )}

          {status === 'ready' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...register('oobCode')} />

              <AuthPasswordInput
                label="Nouveau mot de passe"
                placeholder="••••••••"
                {...register('password')}
                error={formState.errors.password?.message}
              />

              <AuthPasswordInput
                label="Confirmer le mot de passe"
                placeholder="••••••••"
                {...register('confirmPassword')}
                error={formState.errors.confirmPassword?.message}
              />

              {formError && <AuthAlert type="error" title="Impossible de réinitialiser" message={formError} />}

              <AuthButton type="submit" isLoading={formState.isSubmitting} className="mt-6">
                Mettre à jour le mot de passe
              </AuthButton>
            </form>
          )}

          {status === 'success' && (
            <div className="space-y-4 text-center">
              <AuthAlert type="success" title="Mot de passe réinitialisé" message="Votre mot de passe a bien été mis à jour. Vous allez être redirigé vers la connexion." />
            </div>
          )}
        </AuthCard>
      </AuthLayout>
    </ToastProvider>
  )
}
