import { useState, useRef, useCallback } from 'react'
import './Rate.css'

export interface RateProps {
  value?: number
  defaultValue?: number
  count?: number
  allowHalf?: boolean
  allowClear?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  character?: React.ReactNode
  onChange?: (value: number) => void
}

export default function Rate({
  value,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  allowClear = false,
  disabled = false,
  size = 'medium',
  character = '★',
  onChange
}: RateProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue
  const rateRef = useRef<HTMLDivElement>(null)

  const calculateValue = useCallback((clientX: number) => {
    if (!rateRef.current) return 0

    const rect = rateRef.current.getBoundingClientRect()
    const starWidth = rect.width / count
    const offsetX = clientX - rect.left
    const index = Math.floor(offsetX / starWidth)
    
    let newValue = index + 1
    if (allowHalf) {
      const relativeX = offsetX - (index * starWidth)
      if (relativeX < starWidth / 2) {
        newValue = index + 0.5
      }
    }

    return Math.max(0, Math.min(count, newValue))
  }, [allowHalf, count])

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (disabled) return

    const newValue = calculateValue(event.clientX)

    if (allowClear && newValue === currentValue) {
      if (value === undefined) {
        setInternalValue(0)
      }
      onChange?.(0)
    } else {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }
  }, [disabled, allowClear, currentValue, value, onChange, calculateValue])

  const getStarClass = useCallback((index: number) => {
    const starValue = index + 1

    if (allowHalf) {
      if (currentValue >= starValue) {
        return 'full'
      } else if (currentValue >= starValue - 0.5) {
        return 'half'
      } else {
        return 'empty'
      }
    } else {
      return currentValue >= starValue ? 'full' : 'empty'
    }
  }, [allowHalf, currentValue])

  return (
    <div 
      ref={rateRef}
      className={`bedi-rate ${size} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="bedi-rate-star-wrapper"
        >
          <div className={`bedi-rate-star ${getStarClass(index)}`}>
            <span className="bedi-rate-star">{character}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
