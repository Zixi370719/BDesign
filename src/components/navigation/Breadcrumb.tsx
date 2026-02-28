import React from 'react'
import './Breadcrumb.css'

export interface BreadcrumbItem {
  key: string
  title: React.ReactNode
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = ''
}) => {
  const renderSeparator = (index: number) => {
    if (index === items.length - 1) return null
    return <span className="bedi-breadcrumb-separator">{separator}</span>
  }

  return (
    <nav className={`bedi-breadcrumb ${className}`}>
      {items.map((item, index) => (
        <span key={item.key} className="bedi-breadcrumb-item">
          {item.href ? (
            <a href={item.href} className="bedi-breadcrumb-link">
              {item.title}
            </a>
          ) : (
            <span className="bedi-breadcrumb-text">{item.title}</span>
          )}
          {renderSeparator(index)}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
