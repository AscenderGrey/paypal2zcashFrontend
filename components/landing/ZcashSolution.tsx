'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'

const FEATURES = [
  {
    icon: '🛡️',
    title: 'Shielded Transactions',
    description: 'Zcash uses zero-knowledge proofs (zk-SNARKs) to encrypt transaction details. Your balance, your business.',
  },
  {
    icon: '🔗',
    title: 'No Third Party',
    description: 'No company can freeze your ZEC. No account limitations. No 180-day holds. True peer-to-peer digital cash.',
  },
  {
    icon: '⚡',
    title: 'Instant Settlement',
    description: 'Send and receive ZEC in seconds, not days. No bank holds, no pending periods, no "under review" status.',
  },
]

export default function ZcashSolution() {
  return (
    <section id="solution" className="px-4 py-24 sm:py-32 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[#F4B728] mb-3">The Solution</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
              Digital Cash That&apos;s Actually Private
            </h2>
            <p className="mt-4 text-[#888888] max-w-2xl mx-auto">
              Zcash is the gold standard for private cryptocurrency. Convert your trapped PayPal
              balance into ZEC and take back control of your money.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 100}>
              <div className="rounded-xl border border-white/[0.06] bg-[#141414] p-6 h-full text-center transition-colors hover:border-[#F4B728]/20">
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-4 text-base font-semibold text-[#FAFAFA]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#888888] leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#888888]">
              Learn more about Zcash at{' '}
              <a
                href="https://z.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4B728] hover:underline"
              >
                z.cash
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
