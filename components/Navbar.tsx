'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { removeToken } from '@/lib/auth'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  function handleLogout() {
    removeToken()
    router.push('/login')
  }

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/history', label: 'History' },
  ]

  return (
    <nav className="border-b border-white/[0.08] bg-[#0A0A0A]">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#F4B728]">P2Z</span>
          <span className="text-xs text-[#888888] hidden sm:inline">PayPal → Zcash</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-[#FAFAFA]'
                  : 'text-[#888888] hover:text-[#FAFAFA]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-sm text-[#888888] hover:text-[#EF4444] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
