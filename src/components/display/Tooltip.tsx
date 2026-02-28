import React, { useState, useRef, useEffect } from 'react'
import './Tooltip.css'

export interface TooltipProps {
  children: React.ReactNode
  title: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click'
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  className?: string
  style?: React.CSSProperties
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  placement = 'top',
  trigger = 'hover',
  visible,
  onVisibleChange,
  className = '',
  style
}) => {
  const [internalVisible, setInternalVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const isControlled = visible !== undefined
  const currentVisible = isControlled ? visible : internalVisible

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollX = window.pageXOffset
    const scrollY = window.pageYOffset

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left + scrollX - tooltipRect.width - 8
        break
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + scrollX + 8
        break
    }

    setPosition({ top, left })
  }

  const showTooltip = () => {
    if (!isControlled) {
      setInternalVisible(true)
    }
    onVisibleChange?.(true)
  }

  const hideTooltip = () => {
    if (!isControlled) {
      setInternalVisible(false)
    }
    onVisibleChange?.(false)
  }

  const handleTrigger = () => {
    if (trigger === 'click') {
      if (currentVisible) {
        hideTooltip()
      } else {
        showTooltip()
      }
    }
  }

  useEffect(() => {
    if (currentVisible) {
      updatePosition()
      const handleResize = () => updatePosition()
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', updatePosition)
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', updatePosition)
      }
    }
  }, [currentVisible, placement])

  const triggerProps = {
    ref: triggerRef,
    className: 'bedi-tooltip-trigger',
    onMouseEnter: trigger === 'hover' ? showTooltip : undefined,
    onMouseLeave: trigger === 'hover' ? hideTooltip : undefined,
    onClick: trigger === 'click' ? handleTrigger : undefined
  }

  return (
    <>
      <div {...triggerProps}>{children}</div>
      {currentVisible && (
        <div
          ref={tooltipRef}
          className={`bedi-tooltip bedi-tooltip-${placement} ${className}`}
          style={{ top: position.top, left: position.left, ...style }}
        >
          <div className="bedi-tooltip-content">
            <div className="bedi-tooltip-arrow"></div>
            <div className="bedi-tooltip-inner">{title}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Tooltip
