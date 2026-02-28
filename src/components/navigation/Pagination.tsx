import { useState } from 'react'
import { motion } from 'framer-motion'
import './Pagination.css'

export interface PaginationProps {
  current: number
  total: number
  pageSize?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  size?: 'small' | 'medium' | 'large'
}

export default function Pagination({
  current,
  total,
  pageSize = 10,
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal = false,
  onChange,
  onShowSizeChange,
  size = 'medium'
}: PaginationProps) {
  const [inputPage, setInputPage] = useState('')
  
  const totalPages = Math.ceil(total / pageSize)
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    onChange?.(page, pageSize)
  }

  const handleSizeChange = (newSize: number) => {
    onShowSizeChange?.(current, newSize)
  }

  const handleJump = () => {
    const page = parseInt(inputPage)
    if (!isNaN(page)) {
      handlePageChange(page)
      setInputPage('')
    }
  }

  const getVisiblePages = () => {
    const pages = []
    const showEllipsis = totalPages > 7
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (current >= totalPages - 3) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const sizeOptions = [10, 20, 50, 100]

  return (
    <div className={`bedi-pagination ${size}`}>
      {showTotal && (
        <div className="bedi-pagination-total">
          共 {total} 条记录
        </div>
      )}
      
      <div className="bedi-pagination-pages">
        <button
          className="bedi-pagination-btn"
          disabled={current === 1}
          onClick={() => handlePageChange(current - 1)}
        >
          ‹
        </button>
        
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="bedi-pagination-ellipsis">...</span>
            ) : (
              <button
                className={`bedi-pagination-page ${current === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </button>
            )}
          </div>
        ))}
        
        <button
          className="bedi-pagination-btn"
          disabled={current === totalPages}
          onClick={() => handlePageChange(current + 1)}
        >
          ›
        </button>
      </div>

      {showQuickJumper && (
        <div className="bedi-pagination-jumper">
          跳至
          <input
            type="text"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJump()}
            className="bedi-pagination-input"
          />
          页
        </div>
      )}

      {showSizeChanger && (
        <div className="bedi-pagination-sizer">
          <select
            value={pageSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="bedi-pagination-select"
          >
            {sizeOptions.map(size => (
              <option key={size} value={size}>
                {size} 条/页
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
