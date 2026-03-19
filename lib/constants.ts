export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const STATUS_COLORS: Record<string, string> = {
  created: '#888888',
  paypal_approved: '#3B82F6',
  paid: '#3B82F6',
  sending_zec: '#F4B728',
  completed: '#22C55E',
  failed: '#EF4444',
}

export const STATUS_LABELS: Record<string, string> = {
  created: 'Created',
  paypal_approved: 'PayPal Approved',
  paid: 'Paid',
  sending_zec: 'Sending ZEC',
  completed: 'Completed',
  failed: 'Failed',
}

export const POLLING_INTERVAL = 3000
export const PRICE_REFRESH_INTERVAL = 30000
export const MIN_AMOUNT_USD = 10
export const MAX_AMOUNT_USD = 50
export const FEE_PERCENT = 0.04
export const ZEC_ADDRESS_REGEX = /^t[1-9A-HJ-NP-Za-km-z]{33}$/

// Brand
export const ZCASH_YELLOW = '#F4B728'
export const ZCASH_BLACK = '#0A0A0A'
export const SURFACE = '#141414'

// Admin flow
export const ADMIN_FLOW_STEPS = ['address', 'payment', 'sending', 'confirm', 'review', 'done'] as const
