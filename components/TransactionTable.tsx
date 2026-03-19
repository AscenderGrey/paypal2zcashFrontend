'use client'

import { STATUS_COLORS, STATUS_LABELS } from '@/lib/constants'
import type { Order } from '@/lib/types'

interface TransactionTableProps {
  orders: Order[]
}

export default function TransactionTable({ orders }: TransactionTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-lg border border-white/[0.08] bg-[#141414] p-12 text-center">
        <div className="text-3xl mb-3 opacity-30">📭</div>
        <p className="text-sm text-[#888888]">No transactions yet</p>
        <p className="text-xs text-[#888888] mt-1">
          Your orders will appear here after you make a purchase.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#141414] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] text-left text-xs text-[#888888]">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">USD</th>
            <th className="px-4 py-3 font-medium">ZEC</th>
            <th className="px-4 py-3 font-medium hidden sm:table-cell">Address</th>
            <th className="px-4 py-3 font-medium text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
              <td className="px-4 py-3 text-[#FAFAFA]">
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-[#FAFAFA] font-mono tabular-nums">
                ${order.amount_usd.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-[#F4B728] font-mono tabular-nums">
                {order.zec_amount?.toFixed(4) ?? '—'}
              </td>
              <td className="px-4 py-3 text-[#888888] font-mono hidden sm:table-cell">
                {order.zec_address.slice(0, 8)}...{order.zec_address.slice(-4)}
              </td>
              <td className="px-4 py-3 text-right">
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    color: STATUS_COLORS[order.status],
                    backgroundColor: STATUS_COLORS[order.status] + '15',
                  }}
                >
                  {STATUS_LABELS[order.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
