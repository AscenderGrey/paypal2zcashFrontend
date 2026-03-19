'use client'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-4 py-12">
      <div className="mx-auto max-w-5xl text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-lg font-semibold text-[#F4B728]">P2Z</span>
          <span className="text-sm text-[#888888]">PayPal → Zcash</span>
        </div>

        <p className="text-sm text-[#888888]">
          A hackathon project built with{' '}
          <a
            href="https://x.com/balajis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FAFAFA] hover:text-[#F4B728] transition-colors"
          >
            Network School
          </a>
          {' '}and{' '}
          <a
            href="https://x.com/zcash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FAFAFA] hover:text-[#F4B728] transition-colors"
          >
            Zcash
          </a>
        </p>

        <div className="flex items-center justify-center gap-6 text-xs text-[#555]">
          <a
            href="https://z.cash"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#888888] transition-colors"
          >
            Zcash.org
          </a>
          <a
            href="https://ns.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#888888] transition-colors"
          >
            Network School
          </a>
        </div>

        <p className="text-xs text-[#333]">
          Not financial advice. Prototype only. Demo amounts only ($10–$50).
        </p>
      </div>
    </footer>
  )
}
