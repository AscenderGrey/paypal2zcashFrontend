'use client'

interface SpinnerProps {
  size?: number
  className?: string
}

export default function Spinner({ size = 20, className = '' }: SpinnerProps) {
  return (
    <div
      className={`animate-spin-gold rounded-full border-2 border-[#F4B728] border-t-transparent ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
