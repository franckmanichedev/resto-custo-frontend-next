import type { ComponentPropsWithoutRef } from 'react'

export type LabelProps = ComponentPropsWithoutRef<'label'>

export function Label({ className, ...props }: LabelProps) {
  return <label className={['block text-sm font-medium', className].filter(Boolean).join(' ')} {...props} />
}
