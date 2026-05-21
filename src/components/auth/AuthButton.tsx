import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

type AuthButtonProps = ComponentPropsWithoutRef<'button'> & {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
}

export function AuthButton({ className, children, isLoading, disabled, variant = 'primary', ...props }: AuthButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn('w-full h-button-md', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Chargement...' : children}
    </Button>
  )
}

export default AuthButton
