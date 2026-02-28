import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Slider.css'

export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  marks?: Record<number, React.ReactNode>
  included?: boolean
  vertical?: boolean
  reverse?: boolean
  tooltip?: boolean | ((value: number) => React.ReactNode)
  onChange?: (value: number) => void
  onChangeComplete?: (value: number) => void
}

export default function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  marks,
  included = true,
  vertical = false,
  reverse = false,
  tooltip = true,
  onChange,
  onChangeComplete
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const currentValue = value !== undefined ? value : internalValue

  const getValueFromPosition = (clientX: number, clientY: number) => {
    if (!trackRef.current) return currentValue

    const rect = trackRef.current.getBoundingClientRect()
    let position: number

    if (vertical) {
      position = reverse ? clientX - rect.left : rect.right - clientX
    } else {
      position = reverse ? rect.right - clientX : clientX - rect.left
    }

    const percentage = Math.max(0, Math.min(1, position / rect.width))
    const rawValue = min + percentage * (max - min)
    
    // Apply step
    const steppedValue = Math.round(rawValue / step) * step
    return Math.max(min, Math.min(max, steppedValue))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    setIsDragging(true)
    setShowTooltip(true)
    updateValue(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled) return
    updateValue(e.clientX, e.clientY)
  }

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging || disabled) return
    setIsDragging(false)
    setShowTooltip(false)
    const newValue = getValueFromPosition(e.clientX, e.clientY)
    onChangeComplete?.(newValue)
  }

  const updateValue = (clientX: number, clientY: number) => {
    const newValue = getValueFromPosition(clientX, clientY)
    if (newValue !== currentValue) {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }
  }

  const getPercentage = () => {
    return ((currentValue - min) / (max - min)) * 100
  }

  const getTrackStyle = () => {
    const percentage = getPercentage()
    if (vertical) {
      return {
        [reverse ? 'left' : 'right']: `${100 - percentage}%`,
        [reverse ? 'right' : 'left']: `${percentage}%`
      }
    } else {
      return {
        [reverse ? 'right' : 'left']: 0,
        [reverse ? 'left' : 'right']: `${100 - percentage}%`
      }
    }
  }

  const getHandleStyle = () => {
    const percentage = getPercentage()
    if (vertical) {
      return {
        [reverse ? 'left' : 'right']: `${percentage}%`
      }
    } else {
      return {
        [reverse ? 'right' : 'left']: `${percentage}%`
      }
    }
  }

  const renderTooltip = () => {
    if (!tooltip) return null

    const content = typeof tooltip === 'function' ? tooltip(currentValue) : currentValue

    return (
      <div className={`bedi-slider-tooltip ${showTooltip ? 'visible' : ''}`}>
        {content}
      </div>
    )
  }

  const renderMarks = () => {
    if (!marks) return null

    const markEntries = Object.entries(marks)
    const isDense = markEntries.length > 5 // 超过5个刻度认为是密集的

    return (
      <div className="bedi-slider-marks" data-dense={isDense}>
        {markEntries.map(([markValue, label]) => {
          const percentage = ((Number(markValue) - min) / (max - min)) * 100
          const isOverlap = isDense && markEntries.length > 8 // 超过8个刻度时隐藏重叠文字

          return (
            <div
              key={markValue}
              className="bedi-slider-mark"
              data-overlap={isOverlap}
              style={{
                [vertical ? (reverse ? 'left' : 'right') : (reverse ? 'right' : 'left')]: `${percentage}%`
              }}
            >
              <div className="bedi-slider-mark-dot"></div>
              {!isOverlap && (
                <div className="bedi-slider-mark-text">{label}</div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <div
      ref={sliderRef}
      className={`bedi-slider ${vertical ? 'vertical' : 'horizontal'} ${disabled ? 'disabled' : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div className="bedi-slider-rail" ref={trackRef}>
        {included && (
          <div className="bedi-slider-track" style={getTrackStyle()}></div>
        )}
        <div
          className={`bedi-slider-handle ${isDragging ? 'dragging' : ''}`}
          style={getHandleStyle()}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {renderTooltip()}
        </div>
      </div>
      {renderMarks()}
    </div>
  )
}
