import './Progress.css'

export interface ProgressProps {
  percent: number
  showInfo?: boolean
  status?: 'normal' | 'success' | 'error'
  strokeWidth?: number
  className?: string
}

export default function Progress({
  percent,
  showInfo = true,
  status = 'normal',
  strokeWidth = 8,
  className = ''
}: ProgressProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent))
  
  const getColor = () => {
    if (status === 'success') return 'var(--color-green-6)'
    if (status === 'error') return 'var(--color-red-6)'
    return 'var(--color-primary)'
  }

  return (
    <div className={`bedi-progress ${className}`}>
      <div className="bedi-progress-outer">
        <div className="bedi-progress-inner" style={{ height: `${strokeWidth}px` }}>
          <div
            className="bedi-progress-bg"
            style={{
              width: `${clampedPercent}%`,
              background: getColor()
            }}
          />
        </div>
      </div>
      {showInfo && (
        <span className="bedi-progress-text" style={{ color: getColor() }}>
          {clampedPercent}%
        </span>
      )}
    </div>
  )
}
