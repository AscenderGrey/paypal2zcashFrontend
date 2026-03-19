import { API_URL } from './constants'
import { getToken } from './auth'
import type { PriceResponse, LoginResponse, CreateOrderResponse, Order, WaitlistEntry, Review } from './types'

// ── Helpers ──

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

// ── Mock flag — flip to false once backend is live ──
const USE_MOCK = true

// ── Auth ──

export async function login(password: string): Promise<LoginResponse> {
  if (USE_MOCK) {
    if (password === 'SuperAdmin321') {
      return { access_token: 'mock-token-' + Date.now(), token_type: 'bearer' }
    }
    throw new Error('Invalid password')
  }
  return apiFetch<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

// ── Price ──

export async function getZecPrice(): Promise<PriceResponse> {
  if (USE_MOCK) {
    return { price_usd: 37.42, last_updated: new Date().toISOString() }
  }
  return apiFetch<PriceResponse>('/api/zec-price')
}

// ── Orders ──

export async function createOrder(amount_usd: number, zec_address: string): Promise<CreateOrderResponse> {
  if (USE_MOCK) {
    const price = 37.42
    const net = amount_usd * 0.96
    const zec = net / price
    const order: Order = {
      id: 'mock-' + Date.now(),
      amount_usd,
      zec_amount: zec,
      zec_price: price,
      zec_address,
      paypal_order_id: null,
      kraken_ref_id: null,
      status: 'created',
      error_message: null,
      created_at: new Date().toISOString(),
      updated_at: null,
    }
    return { order, approve_url: '#mock-paypal', estimated_zec: zec }
  }
  return apiFetch<CreateOrderResponse>('/api/orders/create', {
    method: 'POST',
    body: JSON.stringify({ amount_usd, zec_address }),
  })
}

export async function getOrder(orderId: string): Promise<Order> {
  if (USE_MOCK) {
    return {
      id: orderId,
      amount_usd: 25,
      zec_amount: 0.641,
      zec_price: 37.42,
      zec_address: 't1MockAddressXXXXXXXXXXXXXXXXXXXXXX',
      paypal_order_id: 'PAYPAL-123',
      kraken_ref_id: null,
      status: 'paid',
      error_message: null,
      created_at: new Date().toISOString(),
      updated_at: null,
    }
  }
  return apiFetch<Order>(`/api/orders/${orderId}`)
}

export async function getOrders(): Promise<Order[]> {
  if (USE_MOCK) {
    return []
  }
  return apiFetch<Order[]>('/api/orders')
}

// ── Waitlist ──

const WAITLIST_KEY = 'p2z_waitlist'

export async function submitWaitlist(entry: Omit<WaitlistEntry, 'submitted_at'>): Promise<{ success: boolean }> {
  const full: WaitlistEntry = { ...entry, submitted_at: new Date().toISOString() }
  const existing = JSON.parse(localStorage.getItem(WAITLIST_KEY) || '[]')
  existing.push(full)
  localStorage.setItem(WAITLIST_KEY, JSON.stringify(existing))
  return { success: true }
}

// ── Reviews ──

const REVIEWS_KEY = 'p2z_reviews'

const SEED_REVIEWS: Review[] = [
  { id: 'seed-1', stars: 5, comment: 'Finally freed my PayPal funds. Took less than 2 minutes.', name: 'Alex K.', created_at: '2026-03-15T10:00:00Z' },
  { id: 'seed-2', stars: 5, comment: 'Clean UI, instant ZEC. This is what crypto should feel like.', name: 'Sarah M.', created_at: '2026-03-16T14:30:00Z' },
  { id: 'seed-3', stars: 4, comment: 'Simple and effective. PayPal had my $2,000 locked for months.', name: 'James R.', created_at: '2026-03-17T09:15:00Z' },
]

function getStoredReviews(): Review[] {
  if (typeof window === 'undefined') return SEED_REVIEWS
  const stored = localStorage.getItem(REVIEWS_KEY)
  if (!stored) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(SEED_REVIEWS))
    return SEED_REVIEWS
  }
  return JSON.parse(stored)
}

export async function getReviews(): Promise<Review[]> {
  return getStoredReviews()
}

export async function submitReview(review: { stars: number; comment: string; name: string }): Promise<Review> {
  const full: Review = {
    id: 'review-' + Date.now(),
    ...review,
    created_at: new Date().toISOString(),
  }
  const existing = getStoredReviews()
  existing.push(full)
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(existing))
  return full
}

// ── Address Validation ──

export async function validateZecAddress(address: string): Promise<{ valid: boolean }> {
  // Simulate chain validation delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  const regex = /^t[1-9A-HJ-NP-Za-km-z]{33}$/
  return { valid: regex.test(address) }
}
