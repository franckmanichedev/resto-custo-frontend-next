import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import type { ComponentPropsWithoutRef } from 'react'

type InputStatus = 'default' | 'error' | 'success'
export type InputProps = ComponentPropsWithoutRef<'input'> & {
  status?: InputStatus
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, status = 'default', ...props }, ref) => {
    const statusStyles: Record<InputStatus, string> = {
      default: 'border-border focus:border-primary focus:ring-ring',
      error: 'border-error text-error focus:border-error focus:ring-error',
      success: 'border-success text-success focus:border-success focus:ring-success'
    }

    return (
      <input
        ref={ref}
        className={cn(
          'w-full h-[var(--input-height)] rounded-md border bg-background text-foreground placeholder:text-muted-foreground px-[var(--input-padding-x)] py-[var(--input-padding-y)] text-sm transition duration-200 ease-out focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
          statusStyles[status],
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
