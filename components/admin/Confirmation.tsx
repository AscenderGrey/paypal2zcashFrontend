'use client'

import type { Order } from '@/lib/types'
import { truncateAddress } from '@/lib/format'

interface ConfirmationProps {
  order: Order
  onConfirm: () => void
  onRetry: () => void
}

export default function Confirmation({ order, onConfirm, onRetry }: ConfirmationProps) {
  return (
    <div className="animate-fade-up space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center animate-scale-in mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M27 9L12 24L5 17" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#FAFAFA]">ZEC Sent!</h2>
        <p className="mt-2 text-sm text-[#888888]">
          Transaction submitted to the Zcash network
        </p>
      </div>

      {/* Details */}
      <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#888888]">Amount</span>
          <span className="text-[#F4B728] font-mono font-semibold">{order.zec_amount?.toFixed(4)} ZEC</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#888888]">USD Paid</span>
          <span className="text-[#FAFAFA] font-mono">${order.amount_usd.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#888888]">Price</span>
          <span className="text-[#FAFAFA] font-mono">${order.zec_price?.toFixed(2)}/ZEC</span>
        </div>
        <div className="border-t border-white/[0.06] my-1" />
        <div className="flex justify-between">
          <span className="text-[#888888]">Sent to</span>
          <span className="text-[#FAFAFA] font-mono text-xs">{truncateAddress(order.zec_address)}</span>
        </div>
      </div>

      {/* Question */}
      <div className="text-center">
        <p className="text-sm text-[#888888] mb-4">Did you receive your ZEC?</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-[#F4B728] px-4 py-3 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 active:scale-[0.98]"
          >
            Yes, received!
          </button>
          <button
            onClick={onRetry}
            className="flex-1 rounded-lg border border-white/[0.08] px-4 py-3 text-sm text-[#888888] hover:text-[#FAFAFA] hover:border-white/[0.16] transition-all"
          >
            No, check again
          </button>
        </div>
      </div>
    </div>
  )
}
