export interface Order {
  id: string
  amount_usd: number
  zec_amount: number | null
  zec_price: number | null
  zec_address: string
  paypal_order_id: string | null
  kraken_ref_id: string | null
  status: 'created' | 'paypal_approved' | 'paid' | 'sending_zec' | 'completed' | 'failed'
  error_message: string | null
  created_at: string
  updated_at: string | null
}

export interface PriceResponse {
  price_usd: number
  last_updated: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface CreateOrderResponse {
  order: Order
  approve_url: string
  estimated_zec: number
}

export type OrderStatus = Order['status']

export interface WaitlistEntry {
  email: string
  zec_address?: string
  hostage_amount_usd?: number
  willing_to_pay_usd?: number
  submitted_at: string
}

export interface Review {
  id: string
  stars: number
  comment: string
  name: string
  created_at: string
}

export type AdminFlowStep = 'address' | 'payment' | 'sending' | 'confirm' | 'review' | 'done'
