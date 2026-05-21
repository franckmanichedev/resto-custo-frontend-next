import React from 'react'
import { Outlet } from 'react-router-dom'

export default function OrganizationLayout() {
  return (
    <div className="min-h-screen">
      <header className="p-4 border-b">Organization shell</header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
