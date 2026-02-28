import { useState } from 'react'
import { motion } from 'framer-motion'
import './Steps.css'

interface Step {
  title: string
  description?: string
  icon?: React.ReactNode
  status?: 'wait' | 'process' | 'finish' | 'error'
}

export interface StepsProps {
  current: number
  direction?: 'horizontal' | 'vertical'
  size?: 'small' | 'default'
  status?: 'wait' | 'process' | 'finish' | 'error'
  items: Step[]
  onChange?: (current: number) => void
}

export default function Steps({
  current,
  direction = 'horizontal',
  size = 'default',
  status = 'process',
  items,
  onChange
}: StepsProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const getStepStatus = (index: number): 'wait' | 'process' | 'finish' | 'error' => {
    if (items[index]?.status) {
      return items[index].status!
    }
    
    if (index < current) return 'finish'
    if (index === current) return status
    return 'wait'
  }

  const handleStepClick = (index: number) => {
    if (onChange && index !== current) {
      onChange(index)
    }
  }

  const renderStepIcon = (index: number) => {
    const stepStatus = getStepStatus(index)
    const icon = items[index]?.icon

    if (icon) {
      return (
        <div className={`bedi-step-icon bedi-step-icon-custom ${stepStatus}`}>
          {icon}
        </div>
      )
    }

    switch (stepStatus) {
      case 'finish':
        return (
          <div className={`bedi-step-icon ${stepStatus}`}>
            ✓
          </div>
        )
      case 'error':
        return (
          <div className={`bedi-step-icon ${stepStatus}`}>
            ✕
          </div>
        )
      case 'process':
        return (
          <div className={`bedi-step-icon ${stepStatus}`}>
            <div className="bedi-step-icon-spinner"></div>
          </div>
        )
      default:
        return (
          <div className={`bedi-step-icon ${stepStatus}`}>
            {index + 1}
          </div>
        )
    }
  }

  return (
    <div className={`bedi-steps bedi-steps-${direction} bedi-steps-${size}`}>
      {items.map((item, index) => {
        const stepStatus = getStepStatus(index)
        const isActive = index === current
        const isClickable = onChange !== undefined

        return (
          <motion.div
            key={index}
            className={`bedi-step-item ${stepStatus} ${isActive ? 'active' : ''} ${isClickable ? 'clickable' : ''}`}
            initial={{ opacity: 0, x: direction === 'horizontal' ? -20 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleStepClick(index)}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div className="bedi-step-tail">
              {index < items.length - 1 && (
                <div className={`bedi-step-tail-line ${getStepStatus(index + 1) === 'finish' ? 'finish' : ''}`}></div>
              )}
            </div>

            <div className="bedi-step-head">
              <div className="bedi-step-head-inner">
                {renderStepIcon(index)}
              </div>
            </div>
            
            <div className="bedi-step-main">
              <div className="bedi-step-title">{item.title}</div>
              {item.description && (
                <div className="bedi-step-description">{item.description}</div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
