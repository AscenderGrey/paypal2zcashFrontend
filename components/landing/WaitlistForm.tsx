'use client'

import { useState } from 'react'
import { submitWaitlist } from '@/lib/api'
import { ZEC_ADDRESS_REGEX } from '@/lib/constants'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [zecAddress, setZecAddress] = useState('')
  const [hostageAmount, setHostageAmount] = useState('')
  const [willingToPay, setWillingToPay] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidAddress = !zecAddress || ZEC_ADDRESS_REGEX.test(zecAddress)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail) return
    setError('')
    setLoading(true)

    try {
      await submitWaitlist({
        email,
        zec_address: zecAddress || undefined,
        hostage_amount_usd: hostageAmount ? Number(hostageAmount) : undefined,
        willing_to_pay_usd: willingToPay ? Number(willingToPay) : undefined,
      })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section id="waitlist" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-lg">
          <AnimatedSection>
            <div className="rounded-xl border border-[#22C55E]/20 bg-[#22C55E]/[0.04] p-12 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-[#FAFAFA]">You&apos;re on the list</h3>
              <p className="mt-2 text-sm text-[#888888]">
                We&apos;ll notify you when P2Z is ready for early access.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    )
  }

  return (
    <section id="waitlist" className="px-4 py-24 sm:py-32 border-t border-white/[0.04]">
      <div className="mx-auto max-w-lg">
        <AnimatedSection>
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-[#F4B728] mb-3">Early Access</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
              Get Early Access
            </h2>
            <p className="mt-4 text-[#888888]">
              Be first in line when we launch. Tell us about your PayPal situation.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <form onSubmit={handleSubmit} className="rounded-xl border border-white/[0.08] bg-[#141414] p-6 sm:p-8 space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm text-[#888888]">Email address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-[#FAFAFA] outline-none placeholder:text-[#555] focus:border-[#F4B728]/50 transition-colors"
              />
            </div>

            {/* ZEC Address */}
            <div className="space-y-1.5">
              <label className="text-sm text-[#888888]">ZEC address <span className="text-[#555]">(optional)</span></label>
              <input
                type="text"
                value={zecAddress}
                onChange={(e) => setZecAddress(e.target.value)}
                placeholder="t1..."
                className={`w-full rounded-lg border bg-white/[0.04] px-4 py-3 text-sm text-[#FAFAFA] font-mono outline-none placeholder:text-[#555] transition-colors ${
                  zecAddress && !isValidAddress ? 'border-[#EF4444]/50' : 'border-white/[0.08] focus:border-[#F4B728]/50'
                }`}
              />
              {zecAddress && !isValidAddress && (
                <p className="text-xs text-[#EF4444]">Must be a valid t-address (starts with t, 34 characters)</p>
              )}
            </div>

            {/* Hostage Amount */}
            <div className="space-y-1.5">
              <label className="text-sm text-[#888888]">How much is PayPal holding hostage?</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
                <input
                  type="number"
                  value={hostageAmount}
                  onChange={(e) => setHostageAmount(e.target.value)}
                  placeholder="0"
                  min={0}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] pl-8 pr-4 py-3 text-sm text-[#FAFAFA] font-mono outline-none placeholder:text-[#555] focus:border-[#F4B728]/50 transition-colors"
                />
              </div>
            </div>

            {/* Willing to Pay */}
            <div className="space-y-1.5">
              <label className="text-sm text-[#888888]">How much would you pay to get it all out cleanly into ZEC?</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
                <input
                  type="number"
                  value={willingToPay}
                  onChange={(e) => setWillingToPay(e.target.value)}
                  placeholder="0"
                  min={0}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] pl-8 pr-4 py-3 text-sm text-[#FAFAFA] font-mono outline-none placeholder:text-[#555] focus:border-[#F4B728]/50 transition-colors"
                />
              </div>
            </div>

            {error && <p className="text-sm text-[#EF4444] text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading || !isValidEmail}
              className="w-full rounded-lg bg-[#F4B728] px-4 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Get Early Access'}
            </button>

            <p className="text-center text-xs text-[#555]">
              No spam. We&apos;ll only email you when it&apos;s ready.
            </p>
          </form>
        </AnimatedSection>
      </div>
    </section>
  )
}
