import React, { type ComponentPropsWithoutRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { Eye, EyeOff } from 'lucide-react'

type ErrorMessage = string | { message?: string } | undefined

type AuthPasswordInputProps = ComponentPropsWithoutRef<'input'> & {
  error?: ErrorMessage
  label?: string
}

export function AuthPasswordInput({ label, error, className, ...props }: AuthPasswordInputProps) {
  const message = typeof error === 'string' ? error : error?.message
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'w-full h-[var(--input-height)] rounded-sm border border-border bg-background text-foreground placeholder:text-muted-foreground px-[var(--input-padding-x)] py-[var(--input-padding-y)] pr-10 text-sm transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-error focus:border-error focus:ring-error/50' : 'focus:border-primary focus:ring-ring',
            className
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {message && <p className="text-xs font-medium text-error">{message}</p>}
    </div>
  )
}
