'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '@/lib/auth'
import { getZecPrice, createOrder } from '@/lib/api'
import { PRICE_REFRESH_INTERVAL } from '@/lib/constants'
import Navbar from '@/components/Navbar'
import PriceDisplay from '@/components/PriceDisplay'
import OrderForm from '@/components/OrderForm'

export default function DashboardPage() {
  const router = useRouter()
  const [zecPrice, setZecPrice] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login')
      return
    }

    async function fetchPrice() {
      try {
        const data = await getZecPrice()
        setZecPrice(data.price_usd)
      } catch {
        // silent
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, PRICE_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [router])

  async function handleOrder(amountUsd: number, zecAddress: string) {
    setSubmitting(true)
    try {
      const res = await createOrder(amountUsd, zecAddress)
      // In real flow, would redirect to res.approve_url (PayPal)
      // For mock, go to order status page
      router.push(`/orders/${res.order.id}`)
    } catch {
      // TODO: show error toast
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-8 space-y-6">
        <PriceDisplay />
        <OrderForm zecPrice={zecPrice} onSubmit={handleOrder} submitting={submitting} />
      </main>
    </>
  )
}
