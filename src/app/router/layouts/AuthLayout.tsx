import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="relative min-h-screen flex items-center justify-center ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>
        <div className="relative w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
