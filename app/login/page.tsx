'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api'
import { setToken } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
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
      router.push('/dashboard')
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
        <div className="rounded-lg border border-white/[0.08] bg-[#141414] p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#F4B728]">P2Z</h1>
            <p className="text-sm text-[#888888] mt-1">PayPal → Zcash</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-[#FAFAFA] outline-none placeholder:text-[#888888] focus:border-[#F4B728]/50 transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-[#EF4444] text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-md bg-[#F4B728] px-4 py-2.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Enter'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#888888] mt-4">
          Admin access only
        </p>
      </div>
    </div>
  )
}
