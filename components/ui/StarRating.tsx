'use client'

import { useState } from 'react'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: number
}

export default function StarRating({ value, onChange, readonly = false, size = 24 }: StarRatingProps) {
  const [hover, setHover] = useState(0)

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`star ${star <= (hover || value) ? 'filled' : 'empty'} ${readonly ? 'cursor-default' : ''}`}
          style={{ fontSize: size }}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => onChange?.(star)}
        >
          ★
        </button>
      ))}
    </div>
  )
}
