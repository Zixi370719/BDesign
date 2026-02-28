import { useState } from 'react'
import { motion } from 'framer-motion'
import './DatePicker.css'

export interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  format?: string
  label?: string
  error?: string
}

export default function DatePicker({
  value = '',
  onChange,
  placeholder = '请选择日期',
  disabled = false,
  size = 'medium',
  format = 'YYYY-MM-DD',
  label,
  error
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(value)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    onChange?.(date)
    setIsOpen(false)
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    return `${year}-${month}-${dayStr}`
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  return (
    <div className={`bedi-datepicker-container ${size}`}>
      {label && <label className="bedi-datepicker-label">{label}</label>}
      <div className="bedi-datepicker-input-wrapper">
        <input
          type="text"
          value={selectedDate}
          placeholder={placeholder}
          disabled={disabled}
          className={`bedi-datepicker-input ${error ? 'error' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          readOnly
        />
        <span className="bedi-datepicker-icon">📅</span>
      </div>
      {error && <span className="bedi-datepicker-error">{error}</span>}

      {isOpen && !disabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bedi-datepicker-calendar"
        >
          <div className="bedi-datepicker-header">
            <button
              className="bedi-datepicker-nav-btn"
              onClick={() => navigateMonth('prev')}
            >
              ‹
            </button>
            <div className="bedi-datepicker-month-year">
              {currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
            </div>
            <button
              className="bedi-datepicker-nav-btn"
              onClick={() => navigateMonth('next')}
            >
              ›
            </button>
          </div>

          <div className="bedi-datepicker-weekdays">
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <div key={day} className="bedi-datepicker-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="bedi-datepicker-days">
            {generateCalendarDays().map((day, index) => (
              <div key={index} className="bedi-datepicker-day-cell">
                {day && (
                  <button
                    className={`bedi-datepicker-day ${
                      selectedDate === formatDate(day) ? 'selected' : ''
                    }`}
                    onClick={() => handleDateSelect(formatDate(day))}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
