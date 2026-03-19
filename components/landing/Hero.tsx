'use client'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F4B728]/[0.06] blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="relative z-10 max-w-3xl animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F4B728]/20 bg-[#F4B728]/[0.06] px-4 py-1.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F4B728]" />
          <span className="text-xs font-medium text-[#F4B728]">Built at Network School Hackathon</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#FAFAFA] leading-[1.1]">
          Your Money.
          <br />
          <span className="text-[#F4B728]">Your Rules.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#888888] max-w-xl mx-auto leading-relaxed">
          PayPal freezes billions in user funds every year. We turn your trapped balance into
          private, censorship-resistant <span className="text-[#FAFAFA]">Zcash</span> — instantly.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="rounded-lg bg-[#F4B728] px-8 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 active:scale-[0.98]"
          >
            Join the Waitlist
          </a>
          <a
            href="#solution"
            className="rounded-lg border border-white/[0.08] px-8 py-3.5 text-sm font-medium text-[#888888] transition-all hover:text-[#FAFAFA] hover:border-white/[0.16]"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#888888]">
        <span className="text-xs">Scroll</span>
        <div className="h-6 w-[1px] bg-gradient-to-b from-[#888888] to-transparent" />
      </div>
    </section>
  )
}
