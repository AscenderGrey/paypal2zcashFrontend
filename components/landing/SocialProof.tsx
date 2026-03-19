'use client'

import { useEffect, useState } from 'react'
import { getReviews } from '@/lib/api'
import type { Review } from '@/lib/types'
import StarRating from '@/components/ui/StarRating'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function SocialProof() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    getReviews().then(setReviews)
  }, [])

  if (reviews.length === 0) return null

  const avgStars = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length

  return (
    <section className="px-4 py-24 sm:py-32 border-t border-white/[0.04]">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#F4B728] mb-3">Trusted</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
              What Early Users Say
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <StarRating value={Math.round(avgStars)} readonly size={20} />
              <span className="text-sm text-[#888888]">
                {avgStars.toFixed(1)} from {reviews.length} users
              </span>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.slice(0, 6).map((review, i) => (
            <AnimatedSection key={review.id} delay={i * 80}>
              <div className="rounded-xl border border-white/[0.06] bg-[#141414] p-5 h-full">
                <StarRating value={review.stars} readonly size={16} />
                <p className="mt-3 text-sm text-[#FAFAFA] leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <p className="mt-3 text-xs text-[#888888]">{review.name}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
