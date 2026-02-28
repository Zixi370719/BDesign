import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import './Tabs.css'

interface TabItem {
  key: string
  label: string
  children: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultActiveKey?: string
  onChange?: (key: string) => void
  className?: string
}

export default function Tabs({
  items,
  defaultActiveKey,
  onChange,
  className = ''
}: TabsProps) {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || items[0]?.key)

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return
    setActiveKey(key)
    onChange?.(key)
  }

  const activeItem = items.find(item => item.key === activeKey)

  return (
    <div className={`bedi-tabs ${className}`}>
      <div className="bedi-tabs-nav">
        {items.map((item) => (
          <button
            key={item.key}
            className={`bedi-tab-button ${activeKey === item.key ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
            onClick={() => handleTabClick(item.key, item.disabled)}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
        <motion.div
          className="bedi-tab-indicator"
          layoutId="tab-indicator"
          style={{
            left: `${items.findIndex(item => item.key === activeKey) * (100 / items.length)}%`,
            width: `${100 / items.length}%`
          }}
        />
      </div>
      <div className="bedi-tabs-content">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeItem?.children}
        </motion.div>
      </div>
    </div>
  )
}
