import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Dropdown.css'

export interface DropdownItem {
  key: string
  label: React.ReactNode
  disabled?: boolean
  danger?: boolean
  divided?: boolean
  icon?: React.ReactNode
  onClick?: () => void
}

export interface DropdownProps {
  children: React.ReactNode
  items: DropdownItem[]
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  trigger?: 'click' | 'hover' | 'context'
  disabled?: boolean
  className?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  placement = 'bottom-left',
  trigger = 'click',
  disabled = false,
  className = ''
}) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const updatePosition = () => {
    if (!triggerRef.current || !dropdownRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const dropdownRect = dropdownRef.current.getBoundingClientRect()
    const scrollX = window.pageXOffset
    const scrollY = window.pageYOffset
    
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const margin = 8

    let top = 0
    let left = 0

    if (placement.startsWith('bottom')) {
      const bottomTop = triggerRect.bottom + scrollY + 4
      if (bottomTop + dropdownRect.height > scrollY + viewportHeight - margin) {
        const topTop = triggerRect.top + scrollY - dropdownRect.height - 4
        if (topTop >= scrollY + margin) {
          top = topTop
        } else {
          top = Math.max(scrollY + margin, scrollY + viewportHeight - dropdownRect.height - margin)
        }
      } else {
        top = bottomTop
      }
    } else {
      const topTop = triggerRect.top + scrollY - dropdownRect.height - 4
      if (topTop < scrollY + margin) {
        const bottomTop = triggerRect.bottom + scrollY + 4
        if (bottomTop + dropdownRect.height <= scrollY + viewportHeight - margin) {
          top = bottomTop
        } else {
          top = Math.max(scrollY + margin, scrollY + margin)
        }
      } else {
        top = topTop
      }
    }

    if (placement.endsWith('left')) {
      const leftLeft = triggerRect.left + scrollX
      if (leftLeft + dropdownRect.width > scrollX + viewportWidth - margin) {
        const rightLeft = triggerRect.right + scrollX - dropdownRect.width
        if (rightLeft >= scrollX + margin) {
          left = rightLeft
        } else {
          left = Math.max(scrollX + margin, scrollX + viewportWidth - dropdownRect.width - margin)
        }
      } else {
        left = leftLeft
      }
    } else {
      const rightLeft = triggerRect.right + scrollX - dropdownRect.width
      if (rightLeft < scrollX + margin) {
        const leftLeft = triggerRect.left + scrollX
        if (leftLeft + dropdownRect.width <= scrollX + viewportWidth - margin) {
          left = leftLeft
        } else {
          left = Math.max(scrollX + margin, scrollX + margin)
        }
      } else {
        left = rightLeft
      }
    }

    setPosition({ top, left })
  }

  const showDropdown = () => {
    if (!disabled) {
      setVisible(true)
    }
  }

  const hideDropdown = () => {
    setVisible(false)
  }

  const handleTrigger = () => {
    if (trigger === 'click') {
      if (visible) {
        hideDropdown()
      } else {
        showDropdown()
      }
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    if (trigger === 'context') {
      e.preventDefault()
      showDropdown()
    }
  }

  const handleItemClick = (item: DropdownItem, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!item.disabled) {
      item.onClick?.()
      hideDropdown()
    }
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      showDropdown()
    }
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hoverTimeoutRef.current = setTimeout(() => {
        hideDropdown()
      }, 100) // 延迟100ms隐藏，避免意外关闭
    }
  }

  const handleDropdownMouseEnter = () => {
    if (trigger === 'hover' && hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  const handleDropdownMouseLeave = () => {
    if (trigger === 'hover') {
      hideDropdown()
    }
  }

  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        updatePosition()
      }, 0)
      
      const handleResize = () => updatePosition()
      const handleClickOutside = (e: MouseEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target as Node) && 
            dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          hideDropdown()
        }
      }
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          hideDropdown()
        }
      }
      
      window.addEventListener('resize', handleResize)
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
      
      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [visible])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={triggerRef}
      className={`bedi-dropdown-trigger ${disabled ? 'bedi-dropdown-disabled' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTrigger}
      onContextMenu={handleContextMenu}
    >
      {children}
      
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={dropdownRef}
            className="bedi-dropdown-menu"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ top: position.top, left: position.left }}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            {items.map((item, index) => (
              <div
                key={item.key}
                className={`bedi-dropdown-item ${item.disabled ? 'bedi-dropdown-item-disabled' : ''} ${item.danger ? 'bedi-dropdown-item-danger' : ''} ${item.divided ? 'bedi-dropdown-item-divided' : ''}`}
                onClick={(e) => handleItemClick(item, e)}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {item.icon && <span className="bedi-dropdown-item-icon">{item.icon}</span>}
                <span className="bedi-dropdown-item-label">{item.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
