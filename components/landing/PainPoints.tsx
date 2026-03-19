'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'

const PAIN_POINTS = [
  {
    icon: '🔒',
    title: '180-Day Fund Freezes',
    description: 'PayPal locks your money for up to 6 months with zero explanation. No appeal. No recourse. Just a generic email and silence.',
  },
  {
    icon: '🚫',
    title: 'Account Limitations',
    description: 'Receive a large payment? Account flagged. Successful product launch? Frozen. Your own money, held hostage by an algorithm.',
  },
  {
    icon: '⚖️',
    title: 'Class Action Lawsuits',
    description: 'PayPal settled for $6M in Hawaii (Dec 2025) for freezing funds without prior notice. Millions affected. The pattern continues.',
  },
  {
    icon: '👁️',
    title: 'Zero Privacy',
    description: 'Every transaction tracked, reported, and shared. Your financial life is an open book to PayPal and anyone they share data with.',
  },
]

export default function PainPoints() {
  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[#EF4444] mb-3">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
              PayPal Holds Billions Hostage
            </h2>
            <p className="mt-4 text-[#888888] max-w-2xl mx-auto">
              Thousands of users report frozen accounts, seized funds, and zero customer support.
              Your money shouldn&apos;t need permission to move.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PAIN_POINTS.map((point, i) => (
            <AnimatedSection key={point.title} delay={i * 100}>
              <div className="rounded-xl border border-white/[0.06] bg-[#141414] p-6 h-full transition-colors hover:border-white/[0.12]">
                <span className="text-2xl">{point.icon}</span>
                <h3 className="mt-3 text-base font-semibold text-[#FAFAFA]">{point.title}</h3>
                <p className="mt-2 text-sm text-[#888888] leading-relaxed">{point.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
