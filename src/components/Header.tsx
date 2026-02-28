import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import SearchModal from './SearchModal'
import { COMPONENT_LIST } from '../data/componentList'
import './Header.css'

const VERSION = '1.0.0'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 11.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 1.5v1.75M8 12.75V14.5M14.5 8h-1.75M3.25 8H1.5M12.6 3.4l-1.24 1.24M4.64 11.36 3.4 12.6M12.6 12.6l-1.24-1.24M4.64 4.64 3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9.9 1.7a5.6 5.6 0 1 0 4.4 8.9 5.1 5.1 0 0 1-4.4-8.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Header() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className="bedi-header">
        <div className="bedi-header-container">
          <div className="bedi-logo-group">
            <Link to="/" className="bedi-logo" aria-label="BEDI Design">
              <img src="/src/assets/logo.svg" alt="BDesign" className="bedi-logo-image" />
            </Link>
            <span className="bedi-version">v{VERSION}</span>
          </div>

          <nav className="bedi-nav" aria-label="Primary">
            <button
              className="bedi-search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="搜索组件 (⌘K)"
            >
              <SearchIcon />
              <span className="bedi-search-placeholder">搜索组件…</span>
              <kbd className="bedi-search-kbd">⌘K</kbd>
            </button>

            <Link to="/getting-started" className={`bedi-nav-link ${location.pathname === '/getting-started' ? 'active' : ''}`}>
              {t('nav.gettingStarted') || '快速上手'}
            </Link>
            <Link to="/design" className={`bedi-nav-link ${location.pathname === '/design' ? 'active' : ''}`}>
              {t('nav.design')}
            </Link>
            <Link to="/components" className={`bedi-nav-link ${location.pathname.startsWith('/components') ? 'active' : ''}`}>
              {t('nav.components')}
            </Link>
            <button
              className="bedi-nav-link bedi-nav-button"
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              {language === 'zh' ? 'EN' : '中'}
            </button>
            <button
              className="bedi-nav-link bedi-nav-button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </nav>
        </div>
      </header>

      <SearchModal
        open={searchOpen}
        items={COMPONENT_LIST}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
