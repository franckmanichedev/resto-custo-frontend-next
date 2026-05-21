import React, { type ComponentPropsWithoutRef } from 'react'
import { Chrome, Github, Apple } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/Button'

type AuthSocialButtonProps = ComponentPropsWithoutRef<'button'> & {
  icon?: React.ReactNode
  provider: 'google' | 'github' | 'apple'
}

const icons = {
  google: <Chrome className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
  apple: <Apple className="h-4 w-4" />
}

const labels = {
  google: 'Continuer avec Google',
  github: 'Continuer avec GitHub',
  apple: 'Continuer avec Apple'
}

export function AuthSocialButton({ provider, icon, className, ...props }: AuthSocialButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn('w-full justify-center gap-3', className)}
      {...props}
    >
      {icon || icons[provider]}
      <span>{labels[provider]}</span>
    </Button>
  )
}
