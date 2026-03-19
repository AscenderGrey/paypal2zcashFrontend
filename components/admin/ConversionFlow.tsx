'use client'

import { useState, useCallback } from 'react'
import type { AdminFlowStep, Order } from '@/lib/types'
import { ADMIN_FLOW_STEPS } from '@/lib/constants'
import AddressInput from './AddressInput'
import PayPalFlow from './PayPalFlow'
import SendingZec from './SendingZec'
import Confirmation from './Confirmation'
import ReviewForm from './ReviewForm'

const STEP_LABELS: Record<string, string> = {
  address: 'Address',
  payment: 'Payment',
  sending: 'Sending',
  confirm: 'Confirm',
  review: 'Review',
  done: 'Done',
}

export default function ConversionFlow() {
  const [step, setStep] = useState<AdminFlowStep>('address')
  const [zecAddress, setZecAddress] = useState('')
  const [order, setOrder] = useState<Order | null>(null)

  const handleSendingComplete = useCallback(() => {
    setStep('confirm')
  }, [])

  const currentIndex = ADMIN_FLOW_STEPS.indexOf(step)

  return (
    <div className="space-y-8">
      {/* Progress bar */}
      {step !== 'done' && (
        <div className="flex items-center gap-1">
          {ADMIN_FLOW_STEPS.slice(0, -1).map((s, i) => (
            <div key={s} className="flex items-center flex-1 gap-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="h-1 w-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i <= currentIndex ? '#F4B728' : 'rgba(255,255,255,0.06)',
                  }}
                />
                <span className={`mt-2 text-[10px] ${i <= currentIndex ? 'text-[#F4B728]' : 'text-[#555]'}`}>
                  {STEP_LABELS[s]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step content */}
      <div className="rounded-xl border border-white/[0.08] bg-[#141414] p-6 sm:p-8">
        {step === 'address' && (
          <AddressInput
            onValidated={(addr) => {
              setZecAddress(addr)
              setStep('payment')
            }}
          />
        )}

        {step === 'payment' && (
          <PayPalFlow
            zecAddress={zecAddress}
            onComplete={(o) => {
              setOrder(o)
              setStep('sending')
            }}
          />
        )}

        {step === 'sending' && order && (
          <SendingZec order={order} onComplete={handleSendingComplete} />
        )}

        {step === 'confirm' && order && (
          <Confirmation
            order={order}
            onConfirm={() => setStep('review')}
            onRetry={() => setStep('sending')}
          />
        )}

        {step === 'review' && (
          <ReviewForm
            onComplete={() => setStep('done')}
            onSkip={() => setStep('done')}
          />
        )}

        {step === 'done' && (
          <div className="animate-fade-up text-center py-8 space-y-6">
            <div className="text-4xl">🎉</div>
            <h2 className="text-xl font-semibold text-[#FAFAFA]">All Done!</h2>
            <p className="text-sm text-[#888888]">
              Your ZEC has been sent. Thank you for using P2Z.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setStep('address')
                  setZecAddress('')
                  setOrder(null)
                }}
                className="w-full rounded-lg bg-[#F4B728] px-4 py-3 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 active:scale-[0.98]"
              >
                Convert More
              </button>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#888888] hover:text-[#FAFAFA] transition-colors"
              >
                View Landing Page →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
