'use client'

import { useState, useEffect, useMemo } from 'react'
import { getZecPrice, createOrder } from '@/lib/api'
import { MIN_AMOUNT_USD, MAX_AMOUNT_USD, FEE_PERCENT, PRICE_REFRESH_INTERVAL } from '@/lib/constants'
import type { Order } from '@/lib/types'
import Spinner from '@/components/ui/Spinner'
import Modal from '@/components/ui/Modal'

interface PayPalFlowProps {
  zecAddress: string
  onComplete: (order: Order) => void
}

export default function PayPalFlow({ zecAddress, onComplete }: PayPalFlowProps) {
  const [price, setPrice] = useState<number | null>(null)
  const [amount, setAmount] = useState(25)
  const [showPayPal, setShowPayPal] = useState(false)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    async function fetchPrice() {
      const data = await getZecPrice()
      setPrice(data.price_usd)
    }
    fetchPrice()
    const interval = setInterval(fetchPrice, PRICE_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const fee = useMemo(() => amount * FEE_PERCENT, [amount])
  const net = useMemo(() => amount - fee, [amount, fee])
  const estimatedZec = useMemo(() => (price ? net / price : null), [net, price])

  async function handlePayPalApprove() {
    setProcessing(true)
    try {
      const res = await createOrder(amount, zecAddress)
      // Simulate PayPal approval delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      const completedOrder: Order = { ...res.order, status: 'paid' }
      onComplete(completedOrder)
    } catch {
      setProcessing(false)
    }
  }

  return (
    <div className="animate-fade-up space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#FAFAFA]">Choose Amount</h2>
        <p className="mt-2 text-sm text-[#888888]">Select how much USD to convert to ZEC</p>
      </div>

      {/* Price display */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#888888]">ZEC / USD</p>
          <p className="text-lg font-semibold text-[#FAFAFA] font-mono tabular-nums">
            {price ? `$${price.toFixed(2)}` : '—'}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-xs text-[#888888]">Live</span>
        </div>
      </div>

      {/* Amount slider */}
      <div className="space-y-3">
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
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
            <input
              type="number"
              min={MIN_AMOUNT_USD}
              max={MAX_AMOUNT_USD}
              value={amount}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v >= MIN_AMOUNT_USD && v <= MAX_AMOUNT_USD) setAmount(v)
              }}
              className="w-20 rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 pl-7 pr-2 text-sm text-[#FAFAFA] font-mono tabular-nums outline-none focus:border-[#F4B728]/50"
            />
          </div>
        </div>
      </div>

      {/* Fee breakdown */}
      <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-4 space-y-2 text-sm font-mono tabular-nums">
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
        <div className="flex justify-between text-[#F4B728] font-semibold">
          <span>You receive</span>
          <span>{estimatedZec ? `${estimatedZec.toFixed(4)} ZEC` : '—'}</span>
        </div>
      </div>

      {/* Pay button */}
      <button
        onClick={() => setShowPayPal(true)}
        disabled={!price}
        className="w-full rounded-lg bg-[#0070BA] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#005EA6] active:scale-[0.98] disabled:opacity-40"
      >
        Pay with PayPal
      </button>

      {/* Mock PayPal Modal */}
      <Modal open={showPayPal} onClose={() => !processing && setShowPayPal(false)}>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0070BA] mb-1">PayPal</div>
            <p className="text-xs text-[#888888]">Sandbox Environment</p>
          </div>

          <div className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#888888]">Merchant</span>
              <span className="text-[#FAFAFA]">P2Z Exchange</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Amount</span>
              <span className="text-[#FAFAFA] font-mono">${amount.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Source</span>
              <span className="text-[#FAFAFA]">PayPal Balance</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handlePayPalApprove}
              disabled={processing}
              className="w-full rounded-lg bg-[#FFC439] px-4 py-3 text-sm font-semibold text-[#111] transition-all hover:bg-[#F0B929] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Spinner size={14} />
                  Processing...
                </>
              ) : (
                'Approve Payment'
              )}
            </button>
            {!processing && (
              <button
                onClick={() => setShowPayPal(false)}
                className="w-full text-sm text-[#888888] hover:text-[#FAFAFA] transition-colors py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
