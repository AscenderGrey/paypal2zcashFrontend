'use client'

import { useEffect, useState, useCallback } from 'react'
import { getZecPrice } from '@/lib/api'
import { PRICE_REFRESH_INTERVAL } from '@/lib/constants'

export default function PriceDisplay() {
  const [price, setPrice] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPrice = useCallback(async () => {
    try {
      const data = await getZecPrice()
      setPrice(data.price_usd)
      setLastUpdated(data.last_updated)
    } catch {
      // keep previous price on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrice()
    const interval = setInterval(fetchPrice, PRICE_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchPrice])

  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString()
    : '—'

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#141414] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#888888]">ZEC / USD</p>
          <p className="mt-1 text-3xl font-semibold text-[#FAFAFA] font-mono tabular-nums">
            {loading ? (
              <span className="inline-block h-9 w-28 animate-pulse rounded bg-white/[0.06]" />
            ) : (
              `$${price?.toFixed(2)}`
            )}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs text-[#888888]">Auto-refresh</span>
          </div>
          <p className="mt-1 text-xs text-[#888888]">
            Updated {formattedTime}
          </p>
        </div>
      </div>
    </div>
  )
}
