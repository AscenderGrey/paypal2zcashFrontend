'use client'

import { useEffect } from 'react'
import type { Order } from '@/lib/types'
import { truncateAddress } from '@/lib/format'
import Spinner from '@/components/ui/Spinner'

interface SendingZecProps {
  order: Order
  onComplete: () => void
}

export default function SendingZec({ order, onComplete }: SendingZecProps) {
  useEffect(() => {
    // Mock: auto-complete after 3.5 seconds
    // Real: would poll getOrder() until status === 'completed'
    const timer = setTimeout(onComplete, 3500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="animate-fade-up flex flex-col items-center text-center py-8 space-y-6">
      <Spinner size={48} />

      <div>
        <h2 className="text-xl font-semibold text-[#F4B728]">Sending ZEC</h2>
        <p className="mt-2 text-sm text-[#888888]">
          Sending to {truncateAddress(order.zec_address)}
        </p>
      </div>

      <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] px-6 py-4 font-mono tabular-nums">
        <p className="text-2xl font-semibold text-[#F4B728]">
          {order.zec_amount?.toFixed(4)} ZEC
        </p>
        <p className="text-sm text-[#888888] mt-1">
          ${order.amount_usd.toFixed(2)} USD
        </p>
      </div>

      <p className="text-xs text-[#555]">
        Processing via Kraken exchange...
      </p>
    </div>
  )
}
