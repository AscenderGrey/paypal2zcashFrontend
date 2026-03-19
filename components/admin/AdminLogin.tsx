'use client'

import { useState } from 'react'
import { login } from '@/lib/api'
import { setToken } from '@/lib/auth'

interface AdminLoginProps {
  onSuccess: () => void
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(password)
      setToken(res.access_token)
      onSuccess()
    } catch {
      setError('Invalid password')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className={`w-full max-w-sm ${shake ? 'animate-shake' : ''}`}>
        <div className="rounded-xl border border-white/[0.08] bg-[#141414] p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#F4B728]">P2Z</h1>
            <p className="text-sm text-[#888888] mt-1">Admin Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username — pre-filled, read-only */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#555]">Username</label>
              <input
                type="text"
                value="admin"
                readOnly
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm text-[#555] outline-none cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#555]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-[#FAFAFA] outline-none placeholder:text-[#555] focus:border-[#F4B728]/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-[#EF4444] text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-lg bg-[#F4B728] px-4 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
