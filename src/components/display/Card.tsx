import { ReactNode } from 'react'
import './Card.css'

export interface CardProps {
  title?: string
  extra?: ReactNode
  children: ReactNode
  hoverable?: boolean
  bordered?: boolean
  className?: string
  style?: React.CSSProperties
  actions?: ReactNode[]
}

export default function Card({
  title,
  extra,
  children,
  hoverable = false,
  bordered = true,
  className = '',
  style,
  actions
}: CardProps) {
  return (
    <div className={`bedi-card ${hoverable ? 'hoverable' : ''} ${bordered ? 'bordered' : ''} ${className}`} style={style}>
      {(title || extra) && (
        <div className="bedi-card-header">
          {title && <div className="bedi-card-title">{title}</div>}
          {extra && <div className="bedi-card-extra">{extra}</div>}
        </div>
      )}
      <div className="bedi-card-body">{children}</div>
      {actions && actions.length > 0 && (
        <div className="bedi-card-actions">
          {actions.map((action, index) => (
            <div key={index} className="bedi-card-action">
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
