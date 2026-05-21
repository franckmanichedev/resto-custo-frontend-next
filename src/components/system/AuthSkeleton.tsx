import type { ReactElement } from 'react'

export function AuthSkeleton(): ReactElement {
  return (
    <div className="p-4">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-10 bg-gray-200 rounded w-1/2 mt-4" />
      </div>
    </div>
  )
}

export default AuthSkeleton
