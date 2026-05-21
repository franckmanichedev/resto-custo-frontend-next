import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', disabled, type = 'button', ...props }, ref) => {
    const base = 'inline-flex w-full items-center justify-center gap-2 rounded-sm px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-sm font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60'
    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: 'bg-brand text-white shadow-card hover:bg-brand/90',
      secondary: 'bg-surface text-foreground shadow-soft hover:bg-elevated',
      ghost: 'bg-transparent text-foreground hover:bg-surface',
      outline: 'border border-border bg-background text-foreground hover:bg-surface',
      danger: 'bg-error text-white shadow-soft hover:bg-error/90',
      success: 'bg-success text-white shadow-soft hover:bg-success/90'
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
