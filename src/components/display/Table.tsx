import { useState } from 'react'
import { motion } from 'framer-motion'
import './Table.css'

interface Column {
  key: string
  title: string
  dataIndex: string
  width?: number
  fixed?: 'left' | 'right'
  sorter?: boolean
  render?: (value: any, record: any, index: number) => React.ReactNode
}

export interface TableProps {
  columns: Column[]
  dataSource: any[]
  rowKey?: string | ((record: any) => string)
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
  bordered?: boolean
  striped?: boolean
  hoverable?: boolean
  pagination?: {
    current: number
    total: number
    pageSize: number
    onChange: (page: number, pageSize: number) => void
  } | false
  onChange?: (pagination: any, filters: any, sorter: any) => void
}

export default function Table({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  size = 'medium',
  bordered = false,
  striped = false,
  hoverable = false,
  pagination,
  onChange
}: TableProps) {
  const [sortField, setSortField] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const getRowKey = (record: any, index: number) => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] || index
  }

  const handleSort = (column: Column) => {
    if (!column.sorter) return

    const newOrder = sortField === column.dataIndex && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(column.dataIndex)
    setSortOrder(newOrder)

    const sortedData = [...dataSource].sort((a, b) => {
      const aVal = a[column.dataIndex]
      const bVal = b[column.dataIndex]
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newOrder === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      return newOrder === 'asc' 
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })

    onChange?.(pagination, {}, { field: column.dataIndex, order: newOrder })
  }

  const renderCell = (column: Column, record: any, index: number) => {
    const value = record[column.dataIndex]
    if (column.render) {
      return column.render(value, record, index)
    }
    return value
  }

  if (loading) {
    return (
      <div className="bedi-table-loading">
        <div className="bedi-table-spinner"></div>
        <div>加载中...</div>
      </div>
    )
  }

  return (
    <div className={`bedi-table-container ${size} ${bordered ? 'bordered' : ''} ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}>
      <div className="bedi-table-wrapper">
        <table className="bedi-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  style={{ width: column.width }}
                  className={column.fixed ? `fixed-${column.fixed}` : ''}
                >
                  <div className="bedi-table-header-cell">
                    <span>{column.title}</span>
                    {column.sorter && (
                      <button
                        className={`bedi-table-sorter ${sortField === column.dataIndex ? `sorted-${sortOrder}` : ''}`}
                        onClick={() => handleSort(column)}
                      >
                        <span className="bedi-sorter-up">▲</span>
                        <span className="bedi-sorter-down">▼</span>
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record, index) => (
              <motion.tr
                key={getRowKey(record, index)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key || colIndex}
                    className={column.fixed ? `fixed-${column.fixed}` : ''}
                  >
                    {renderCell(column, record, index)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="bedi-table-pagination">
          {/* 这里可以集成 Pagination 组件 */}
          <div className="bedi-pagination-info">
            第 {pagination.current} 页，共 {Math.ceil(pagination.total / pagination.pageSize)} 页
          </div>
        </div>
      )}
    </div>
  )
}
