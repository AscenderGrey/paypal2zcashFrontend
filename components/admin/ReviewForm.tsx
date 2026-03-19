'use client'

import { useState } from 'react'
import { submitReview } from '@/lib/api'
import StarRating from '@/components/ui/StarRating'

interface ReviewFormProps {
  onComplete: () => void
  onSkip: () => void
}

export default function ReviewForm({ onComplete, onSkip }: ReviewFormProps) {
  const [stars, setStars] = useState(5)
  const [comment, setComment] = useState('Fast and easy conversion!')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitReview({
        stars,
        comment,
        name: name || 'Anonymous',
      })
      onComplete()
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <div className="animate-fade-up space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#FAFAFA]">Leave a Review</h2>
        <p className="mt-2 text-sm text-[#888888]">Help others discover P2Z</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Stars */}
        <div className="flex justify-center">
          <StarRating value={stars} onChange={setStars} size={32} />
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs text-[#555]">Your name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anonymous"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-[#FAFAFA] outline-none placeholder:text-[#555] focus:border-[#F4B728]/50 transition-colors"
          />
        </div>

        {/* Comment */}
        <div className="space-y-1.5">
          <label className="text-xs text-[#555]">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-[#FAFAFA] outline-none placeholder:text-[#555] focus:border-[#F4B728]/50 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !comment.trim()}
          className="w-full rounded-lg bg-[#F4B728] px-4 py-3 text-sm font-semibold text-[#0A0A0A] transition-all hover:bg-[#F4B728]/90 active:scale-[0.98] disabled:opacity-40"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="w-full text-sm text-[#555] hover:text-[#888888] transition-colors py-2"
        >
          Skip
        </button>
      </form>
    </div>
  )
}
