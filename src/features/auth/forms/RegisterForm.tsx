import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { registerSchema, type RegisterInput } from '@/features/auth/schemas/authSchemas'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { register as apiRegister, getAuthErrorMessage } from '@/features/auth/api'
import { AuthAlert } from '@/components/auth/AuthAlert'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export function RegisterForm() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const { register, handleSubmit, formState } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    setFormError(null)

    try {
      await apiRegister(data)
      toast.success('Votre compte est créé. Un email de confirmation a été envoyé.')
      navigate('/auth/verify-email?status=pending')
    } catch (err: unknown) {
      console.error(err)
      const message = getAuthErrorMessage(err)
      setFormError(message)
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {formError && <AuthAlert type="error" title="Inscription impossible" message={formError} />}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" className="mt-2" {...register('email')} />
        {formState.errors.email?.message && (
          <p className="mt-2 text-sm text-red-600" role="alert">{formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" type="password" className="mt-2" {...register('password')} />
        {formState.errors.password?.message && (
          <p className="mt-2 text-sm text-red-600" role="alert">{formState.errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <Input id="confirmPassword" type="password" className="mt-2" {...register('confirmPassword')} />
        {formState.errors.confirmPassword?.message && (
          <p className="mt-2 text-sm text-red-600" role="alert">{formState.errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Création..." : "S'inscrire"}
        </Button>
      </div>
    </form>
  )
}
