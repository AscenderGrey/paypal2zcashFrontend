'use client'

import { useState } from 'react'
import { validateZecAddress } from '@/lib/api'
import { ZEC_ADDRESS_REGEX } from '@/lib/constants'
import Spinner from '@/components/ui/Spinner'

interface AddressInputProps {
  onValidated: (address: string) => void
}

export default function AddressInput({ onValidated }: AddressInputProps) {
  const [address, setAddress] = useState('')
  const [validating, setValidating] = useState(false)
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')

  const isFormatValid = ZEC_ADDRESS_REGEX.test(address)

  async function handleValidate() {
    if (!isFormatValid) return
    setValidating(true)
    setError('')

    try {
      const res = await validateZecAddress(address)
      if (res.valid) {
        setValidated(true)
      } else {
        setError('Address not found on chain')
      }
    } catch {
      setError('Validation failed. Please try again.')
    } finally {
      setValidating(false)
    }
  }

  return (
    <div className="animate-fade-up space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#FAFAFA]">Enter ZEC Address</h2>
        <p className="mt-2 text-sm text-[#888888]">Your Zcash transparent address to receive funds</p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value)
            setValidated(false)
            setError('')
          }}
          placeholder="t1..."
          disabled={validated}
          className={`w-full rounded-lg border bg-white/[0.04] px-4 py-3.5 text-sm text-[#FAFAFA] font-mono outline-none transition-colors ${
            validated
              ? 'border-[#22C55E]/50 bg-[#22C55E]/[0.04]'
              : error
              ? 'border-[#EF4444]/50'
              : 'border-white/[0.08] focus:border-[#F4B728]/50'
          }`}
        />

        {error && <p className="text-xs text-[#EF4444]">{error}</p>}

        {validated ? (
          <div className="flex items-center gap-2 text-sm text-[#22C55E] animate-scale-in">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Address verified
          </div>
        ) : (
          <button
            onClick={handleValidate}
            disabled={!isFormatValid || validating}
            className="w-full rounded-lg border border-white/[0.08] px-4 py-3 text-sm text-[#888888] hover:text-[#FAFAFA] hover:border-white/[0.16] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {validating ? (
              <>
                <Spinner size={14} />
                Validating on chain...
              </>
            ) : (
              'Validate Address'
            )}
          </button>
        )}

        {!isFormatValid && address.length > 2 && (
          <p className="text-xs text-[#555]">Must start with &quot;t&quot; followed by 33 characters</p>
        )}
      </div>

      {validated && (
        <button
          onClick={() => onValidated(address)}
          className="w-full rounded-lg bg-[#F4B728] px-4 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 active:scale-[0.98] animate-fade-up"
        >
          Continue to Payment
        </button>
      )}
    </div>
  )
}
