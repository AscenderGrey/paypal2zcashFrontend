'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '@/lib/auth'
import { getOrders } from '@/lib/api'
import type { Order } from '@/lib/types'
import Navbar from '@/components/Navbar'
import TransactionTable from '@/components/TransactionTable'

export default function HistoryPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login')
      return
    }

    async function fetchOrders() {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch {
        // handle error
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 space-y-6">
        <h1 className="text-xl font-semibold text-[#FAFAFA]">Transaction History</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#F4B728] border-t-transparent" />
          </div>
        ) : (
          <TransactionTable orders={orders} />
        )}
      </main>
    </>
  )
}
