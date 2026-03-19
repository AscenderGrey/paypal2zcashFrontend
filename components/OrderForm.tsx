'use client'

import { useState, useMemo } from 'react'
import { ZEC_ADDRESS_REGEX, MIN_AMOUNT_USD, MAX_AMOUNT_USD, FEE_PERCENT } from '@/lib/constants'

interface OrderFormProps {
  zecPrice: number | null
  onSubmit: (amountUsd: number, zecAddress: string) => void
  submitting?: boolean
}

export default function OrderForm({ zecPrice, onSubmit, submitting }: OrderFormProps) {
  const [amount, setAmount] = useState(25)
  const [address, setAddress] = useState('')
  const [addressTouched, setAddressTouched] = useState(false)

  const isValidAddress = ZEC_ADDRESS_REGEX.test(address)
  const showAddressError = addressTouched && address.length > 0 && !isValidAddress

  const fee = useMemo(() => amount * FEE_PERCENT, [amount])
  const net = useMemo(() => amount - fee, [amount, fee])
  const estimatedZec = useMemo(
    () => (zecPrice ? net / zecPrice : null),
    [net, zecPrice]
  )

  const canSubmit = amount >= MIN_AMOUNT_USD && amount <= MAX_AMOUNT_USD && isValidAddress && zecPrice && !submitting

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit(amount, address)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-white/[0.08] bg-[#141414] p-6 space-y-5">
      <h2 className="text-lg font-semibold text-[#FAFAFA]">Buy ZEC</h2>

      {/* Amount */}
      <div className="space-y-2">
        <label className="text-sm text-[#888888]">Amount (USD)</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={MIN_AMOUNT_USD}
            max={MAX_AMOUNT_USD}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="flex-1 accent-[#F4B728]"
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] text-sm">$</span>
            <input
              type="number"
              min={MIN_AMOUNT_USD}
              max={MAX_AMOUNT_USD}
              value={amount}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v >= MIN_AMOUNT_USD && v <= MAX_AMOUNT_USD) setAmount(v)
              }}
              className="w-20 rounded-md border border-white/[0.08] bg-white/[0.04] py-2 pl-7 pr-2 text-sm text-[#FAFAFA] font-mono tabular-nums outline-none focus:border-[#F4B728]/50"
            />
          </div>
        </div>
      </div>

      {/* ZEC Address */}
      <div className="space-y-2">
        <label className="text-sm text-[#888888]">ZEC Address (t-address)</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => setAddressTouched(true)}
          placeholder="t1..."
          className={`w-full rounded-md border bg-white/[0.04] px-3 py-2 text-sm text-[#FAFAFA] font-mono outline-none transition-colors ${
            showAddressError
              ? 'border-[#EF4444]/50 focus:border-[#EF4444]'
              : 'border-white/[0.08] focus:border-[#F4B728]/50'
          }`}
        />
        {showAddressError && (
          <p className="text-xs text-[#EF4444]">
            Invalid t-address. Must start with &quot;t&quot; followed by 33 characters.
          </p>
        )}
      </div>

      {/* Fee Breakdown */}
      <div className="rounded-md bg-white/[0.02] border border-white/[0.06] p-4 space-y-1.5 text-sm font-mono tabular-nums">
        <div className="flex justify-between text-[#888888]">
          <span>Amount</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#888888]">
          <span>Fee (4%)</span>
          <span>-${fee.toFixed(2)}</span>
        </div>
        <div className="border-t border-white/[0.06] my-1" />
        <div className="flex justify-between text-[#FAFAFA]">
          <span>Net</span>
          <span>${net.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#F4B728]">
          <span>≈ ZEC</span>
          <span>{estimatedZec ? estimatedZec.toFixed(4) : '—'}</span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-md bg-[#F4B728] px-4 py-3 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? 'Processing...' : 'Pay with PayPal'}
      </button>
      <p className="text-center text-xs text-[#888888]">
        PayPal integration coming soon — mock mode active
      </p>
    </form>
  )
}
