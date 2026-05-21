import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { forgotSchema, type ForgotInput } from '@/features/auth/schemas/authSchemas'
import { AuthInput } from '@/components/auth/AuthInput'
import { AuthButton } from '@/components/auth/AuthButton'
import { AuthAlert } from '@/components/auth/AuthAlert'
import { forgotPassword, getAuthErrorMessage } from '@/features/auth/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export function ForgotPasswordForm() {
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { register, handleSubmit, formState } = useForm<ForgotInput>({ resolver: zodResolver(forgotSchema) })

  const onSubmit: SubmitHandler<ForgotInput> = async (data) => {
    setFormError(null)
    setSuccessMessage(null)

    try {
      await forgotPassword(data)
      const message = 'Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.'
      setSuccessMessage(message)
      toast.success(message)
    } catch (err: unknown) {
      console.error(err)
      const message = getAuthErrorMessage(err)
      setFormError(message)
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {formError && <AuthAlert type="error" title="Impossible d’envoyer l’email" message={formError} />}
      {successMessage && <AuthAlert type="success" title="Email envoyé" message={successMessage} />}

      <AuthInput
        id="email"
        label="Email"
        type="email"
        placeholder="franck@gmail.com"
        {...register('email')}
        error={formState.errors.email?.message}
      />

      <div>
        <AuthButton type="submit" isLoading={formState.isSubmitting}>
          Envoyer
        </AuthButton>
      </div>
    </form>
  )
}
