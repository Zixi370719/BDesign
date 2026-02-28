import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeEditor from './CodeEditor'
import './ComponentDemo.css'

interface ComponentDemoProps {
  title: string
  description: string
  children: ReactNode
  code: string
  config?: {
    name: string
    type: 'select' | 'switch' | 'text' | 'number'
    options?: { label: string; value: any }[]
    default: any
  }[]
  onConfigChange?: (config: Record<string, any>) => void
}

export default function ComponentDemo({
  title,
  description,
  children,
  code,
  config,
  onConfigChange
}: ComponentDemoProps) {
  const [showCode, setShowCode] = useState(false)
  const [configValues, setConfigValues] = useState<Record<string, any>>(
    config?.reduce((acc, item) => ({ ...acc, [item.name]: item.default }), {}) || {}
  )

  const handleConfigChange = (name: string, value: any) => {
    const newConfig = { ...configValues, [name]: value }
    setConfigValues(newConfig)
    onConfigChange?.(newConfig)
  }

  return (
    <motion.section
      className="bedi-component-demo-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bedi-component-demo-header">
        <div>
          <h2 className="bedi-component-demo-title">{title}</h2>
          <p className="bedi-component-demo-description">{description}</p>
        </div>
      </div>

      {config && config.length > 0 && (
        <div className="bedi-component-demo-config">
          {config.map((item) => (
            <div key={item.name} className="bedi-config-item">
              <label className="bedi-config-label">{item.name}</label>
              {item.type === 'select' && (
                <select
                  className="bedi-config-select"
                  value={configValues[item.name]}
                  onChange={(e) => handleConfigChange(item.name, e.target.value)}
                >
                  {item.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
              {item.type === 'switch' && (
                <label className="switch switch-small">
                  <input
                    type="checkbox"
                    checked={configValues[item.name]}
                    onChange={(e) => handleConfigChange(item.name, e.target.checked)}
                  />
                  <span className="switch-slider"></span>
                </label>
              )}
              {item.type === 'text' && (
                <input
                  type="text"
                  className="bedi-config-input"
                  value={configValues[item.name]}
                  onChange={(e) => handleConfigChange(item.name, e.target.value)}
                />
              )}
              {item.type === 'number' && (
                <input
                  type="number"
                  className="bedi-config-input"
                  value={configValues[item.name]}
                  onChange={(e) => handleConfigChange(item.name, Number(e.target.value))}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bedi-component-demo-preview">
        {children}
      </div>

      <div className="bedi-component-demo-footer">
        <button
          className="bedi-component-demo-toggle"
          onClick={() => setShowCode(!showCode)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M5 11L2 8L5 5M11 5L14 8L11 11M9 3L7 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {showCode ? '隐藏代码' : '查看代码'}
        </button>
      </div>

      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden', borderTop: '1px solid var(--color-border-1)' }}
          >
            <CodeEditor code={code} readOnly language="tsx" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
