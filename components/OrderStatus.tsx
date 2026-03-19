'use client'

import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants'
import type { OrderStatus as OrderStatusType } from '@/lib/types'

const STEPS: OrderStatusType[] = ['created', 'paid', 'sending_zec', 'completed']

interface OrderStatusProps {
  currentStatus: OrderStatusType
  errorMessage?: string | null
}

export default function OrderStatus({ currentStatus, errorMessage }: OrderStatusProps) {
  const isFailed = currentStatus === 'failed'
  const currentIndex = STEPS.indexOf(currentStatus === 'paypal_approved' ? 'paid' : currentStatus)

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#141414] p-6 space-y-6">
      <h2 className="text-lg font-semibold text-[#FAFAFA]">Order Status</h2>

      <div className="flex items-center gap-2">
        {STEPS.map((step, i) => {
          const isActive = i <= currentIndex && !isFailed
          const color = isActive ? STATUS_COLORS[step] : '#333333'

          return (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="h-2 w-full rounded-full transition-colors"
                  style={{ backgroundColor: color }}
                />
                <span className="mt-2 text-xs text-[#888888]">
                  {STATUS_LABELS[step]}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {isFailed && (
        <div className="rounded-md bg-[#EF4444]/10 border border-[#EF4444]/20 p-3">
          <p className="text-sm text-[#EF4444]">
            {errorMessage || 'Order failed. Please try again.'}
          </p>
        </div>
      )}

      {currentStatus === 'completed' && (
        <div className="rounded-md bg-[#22C55E]/10 border border-[#22C55E]/20 p-3">
          <p className="text-sm text-[#22C55E]">
            ZEC sent successfully!
          </p>
        </div>
      )}
    </div>
  )
}
