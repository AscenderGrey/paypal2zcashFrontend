'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { isLoggedIn } from '@/lib/auth'
import { getOrder } from '@/lib/api'
import type { Order } from '@/lib/types'
import Navbar from '@/components/Navbar'
import OrderStatus from '@/components/OrderStatus'

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login')
      return
    }

    async function fetchOrder() {
      try {
        const data = await getOrder(params.id as string)
        setOrder(data)
      } catch {
        // handle error
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
    // TODO: add polling for real-time status updates
  }, [params.id, router])

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 space-y-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#F4B728] border-t-transparent" />
          </div>
        ) : order ? (
          <>
            <OrderStatus currentStatus={order.status} errorMessage={order.error_message} />

            <div className="rounded-lg border border-white/[0.08] bg-[#141414] p-6 space-y-3 text-sm">
              <h3 className="font-semibold text-[#FAFAFA]">Order Details</h3>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-[#888888]">Order ID</span>
                <span className="text-[#FAFAFA] font-mono text-xs truncate">{order.id}</span>

                <span className="text-[#888888]">Amount</span>
                <span className="text-[#FAFAFA] font-mono">${order.amount_usd.toFixed(2)}</span>

                <span className="text-[#888888]">ZEC Amount</span>
                <span className="text-[#F4B728] font-mono">{order.zec_amount?.toFixed(4) ?? '—'}</span>

                <span className="text-[#888888]">Address</span>
                <span className="text-[#FAFAFA] font-mono text-xs truncate">{order.zec_address}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full rounded-md border border-white/[0.08] px-4 py-2.5 text-sm text-[#888888] hover:text-[#FAFAFA] hover:border-white/[0.16] transition-colors"
            >
              ← Back to Dashboard
            </button>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#888888]">Order not found</p>
          </div>
        )}
      </main>
    </>
  )
}
