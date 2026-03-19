'use client'

import { useState, useEffect } from 'react'
import { isLoggedIn, removeToken } from '@/lib/auth'
import AdminLogin from '@/components/admin/AdminLogin'
import ConversionFlow from '@/components/admin/ConversionFlow'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    setAuthenticated(isLoggedIn())
    setChecking(false)
  }, [])

  if (checking) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-5 w-5 animate-spin-gold rounded-full border-2 border-[#F4B728] border-t-transparent" />
      </div>
    )
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin navbar */}
      <nav className="border-b border-white/[0.08]">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#F4B728]">P2Z</span>
            <span className="text-xs text-[#888888]">Admin</span>
          </div>
          <button
            onClick={() => {
              removeToken()
              setAuthenticated(false)
            }}
            className="text-sm text-[#888888] hover:text-[#EF4444] transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8">
        <ConversionFlow />
      </main>
    </div>
  )
}
