import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import './Design.css'

type NavItem = 'values' | 'color' | 'fonts' | 'motion' | 'icon' | 'layout' | 'dark-mode'

export default function Design() {
  const { t } = useLanguage()
  const [activeNav, setActiveNav] = useState<NavItem>('values')
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const navItems: { key: NavItem; label: string }[] = [
    { key: 'values', label: t('design.nav.values') },
    { key: 'color', label: t('design.nav.color') },
    { key: 'fonts', label: t('design.nav.fonts') },
    { key: 'motion', label: t('design.nav.motion') },
    { key: 'icon', label: t('design.nav.icon') },
    { key: 'layout', label: t('design.nav.layout') },
    { key: 'dark-mode', label: t('design.nav.darkMode') },
  ]

  // 基于BEDI设计系统的完整色彩规范
  const colors = {
    primary: [
      { name: 'Brand1', value: '#F2F3FF', description: '最浅蓝' },
      { name: 'Brand2', value: '#D9E1FF', description: '浅蓝' },
      { name: 'Brand3', value: '#B5C7FF', description: '较浅蓝' },
      { name: 'Brand4', value: '#8EABFF', description: '中浅蓝' },
      { name: 'Brand5', value: '#618DFF', description: '中蓝' },
      { name: 'Brand6', value: '#366EF4', description: '标准蓝（主色）' },
      { name: 'Brand7', value: '#0052D9', description: '较深蓝' },
      { name: 'Brand8', value: '#003CAB', description: '深蓝' },
      { name: 'Brand9', value: '#002A7C', description: '很深蓝' },
      { name: 'Brand10', value: '#001A57', description: '最深蓝' },
    ],
    success: [
      { name: 'Success1', value: '#E3F9E9', description: '最浅绿' },
      { name: 'Success2', value: '#C6F3D7', description: '浅绿' },
      { name: 'Success3', value: '#92DAB2', description: '较浅绿' },
      { name: 'Success4', value: '#56C08D', description: '中浅绿' },
      { name: 'Success5', value: '#2BA471', description: '中绿' },
      { name: 'Success6', value: '#008858', description: '标准绿（成功色）' },
      { name: 'Success7', value: '#006C45', description: '较深绿' },
      { name: 'Success8', value: '#005334', description: '深绿' },
      { name: 'Success9', value: '#003B23', description: '很深绿' },
      { name: 'Success10', value: '#002515', description: '最深绿' },
    ],
    warning: [
      { name: 'Warning1', value: '#FFF1E9', description: '最浅橙' },
      { name: 'Warning2', value: '#FFD9C2', description: '浅橙' },
      { name: 'Warning3', value: '#FFB98C', description: '较浅橙' },
      { name: 'Warning4', value: '#FA9550', description: '中浅橙' },
      { name: 'Warning5', value: '#E37318', description: '中橙' },
      { name: 'Warning6', value: '#BE5A00', description: '标准橙（警告色）' },
      { name: 'Warning7', value: '#954500', description: '较深橙' },
      { name: 'Warning8', value: '#713300', description: '深橙' },
      { name: 'Warning9', value: '#532300', description: '很深橙' },
      { name: 'Warning10', value: '#3B1700', description: '最深橙' },
    ],
    error: [
      { name: 'Error1', value: '#FFF0ED', description: '最浅红' },
      { name: 'Error2', value: '#FFD8D2', description: '浅红' },
      { name: 'Error3', value: '#FFB9B0', description: '较浅红' },
      { name: 'Error4', value: '#FF9285', description: '中浅红' },
      { name: 'Error5', value: '#F6685D', description: '中红' },
      { name: 'Error6', value: '#D54941', description: '标准红（错误色）' },
      { name: 'Error7', value: '#AD352F', description: '较深红' },
      { name: 'Error8', value: '#881F1C', description: '深红' },
      { name: 'Error9', value: '#68070A', description: '很深红' },
      { name: 'Error10', value: '#490002', description: '最深红' },
    ],
    neutral: [
      { name: 'White', value: '#FFFFFF', description: '' },
      { name: 'Gray1', value: '#F3F3F3', description: '' },
      { name: 'Gray2', value: '#EEEEEE', description: '' },
      { name: 'Gray3', value: '#E8E8E8', description: '' },
      { name: 'Gray4', value: '#DDDDDD', description: '' },
      { name: 'Gray5', value: '#C6C6C6', description: '' },
      { name: 'Gray6', value: '#A6A6A6', description: '' },
      { name: 'Gray7', value: '#8B8B8B', description: '' },
      { name: 'Gray8', value: '#777777', description: '' },
      { name: 'Gray9', value: '#5E5E5E', description: '' },
      { name: 'Gray10', value: '#4B4B4B', description: '' },
      { name: 'Gray11', value: '#393939', description: '' },
      { name: 'Gray12', value: '#2C2C2C', description: '' },
      { name: 'Gray13', value: '#242424', description: '' },
      { name: 'Gray14', value: '#181818', description: '' },
    ],
    purple: [
      { name: 'Purple1', value: '#F7EDFF', description: '最浅紫' },
      { name: 'Purple2', value: '#ECDCFF', description: '浅紫' },
      { name: 'Purple3', value: '#D6BAFF', description: '较浅紫' },
      { name: 'Purple4', value: '#C098FF', description: '中浅紫' },
      { name: 'Purple5', value: '#AA74FF', description: '中紫' },
      { name: 'Purple6', value: '#934DFA', description: '标准紫' },
      { name: 'Purple7', value: '#7526DB', description: '较深紫' },
      { name: 'Purple8', value: '#5F00C0', description: '深紫' },
      { name: 'Purple9', value: '#420089', description: '很深紫' },
      { name: 'Purple10', value: '#280057', description: '最深紫' },
    ],
    cyan: [
      { name: 'Cyan1', value: '#C5FAFF', description: '最浅青' },
      { name: 'Cyan2', value: '#78F5FF', description: '浅青' },
      { name: 'Cyan3', value: '#56D8E2', description: '较浅青' },
      { name: 'Cyan4', value: '#30BCC6', description: '中浅青' },
      { name: 'Cyan5', value: '#00A0AA', description: '中青' },
      { name: 'Cyan6', value: '#00848C', description: '标准青' },
      { name: 'Cyan7', value: '#00696F', description: '较深青' },
      { name: 'Cyan8', value: '#004F54', description: '深青' },
      { name: 'Cyan9', value: '#00363A', description: '很深青' },
      { name: 'Cyan10', value: '#002022', description: '最深青' },
    ],
    yellow: [
      { name: 'Yellow1', value: '#FFEFD1', description: '最浅黄' },
      { name: 'Yellow2', value: '#FFDF97', description: '浅黄' },
      { name: 'Yellow3', value: '#FFC720', description: '较浅黄' },
      { name: 'Yellow4', value: '#D5A400', description: '中浅黄' },
      { name: 'Yellow5', value: '#B48B00', description: '中黄' },
      { name: 'Yellow6', value: '#957200', description: '标准黄' },
      { name: 'Yellow7', value: '#775400', description: '较深黄' },
      { name: 'Yellow8', value: '#544400', description: '深黄' },
      { name: 'Yellow9', value: '#3E2E00', description: '很深黄' },
      { name: 'Yellow10', value: '#251A00', description: '最深黄' },
    ],
    pink: [
      { name: 'Pink1', value: '#FFECF1', description: '最浅粉' },
      { name: 'Pink2', value: '#FFD8E7', description: '浅粉' },
      { name: 'Pink3', value: '#FFAFD3', description: '较浅粉' },
      { name: 'Pink4', value: '#F28ABC', description: '中浅粉' },
      { name: 'Pink5', value: '#D371A1', description: '中粉' },
      { name: 'Pink6', value: '#B45887', description: '标准粉' },
      { name: 'Pink7', value: '#973F6D', description: '较深粉' },
      { name: 'Pink8', value: '#7A2755', description: '深粉' },
      { name: 'Pink9', value: '#5D0E3D', description: '很深粉' },
      { name: 'Pink10', value: '#3D0026', description: '最深粉' },
    ],
  }

  const getContrastText = (hex: string) => {
    const value = hex.replace('#', '')
    if (value.length !== 6) return '#1A1A1A'
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 160 ? '#1A1A1A' : '#FFFFFF'
  }

  const mixHex = (brandHex: string, neutralHex: string, brandRatio = 0.12) => {
    const toRgb = (hex: string) => {
      const value = hex.replace('#', '')
      if (value.length !== 6) return { r: 0, g: 0, b: 0 }
      return {
        r: parseInt(value.slice(0, 2), 16),
        g: parseInt(value.slice(2, 4), 16),
        b: parseInt(value.slice(4, 6), 16),
      }
    }

    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')

    const b = toRgb(brandHex)
    const g = toRgb(neutralHex)
    const ratioNeutral = 1 - brandRatio

    const r = b.r * brandRatio + g.r * ratioNeutral
    const gg = b.g * brandRatio + g.g * ratioNeutral
    const bb = b.b * brandRatio + g.b * ratioNeutral

    return `#${toHex(r)}${toHex(gg)}${toHex(bb)}`.toUpperCase()
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleColorSwatchClick = (color: string) => {
    copyToClipboard(color)
  }

  const neutralPreviewAaa: Record<string, { primary: string; secondary: string }> = {
    White: { primary: 'AAA 17.4', secondary: 'AAA 5.74' },
    Gray1: { primary: 'AAA 15.68', secondary: 'AAA 5.17' },
    Gray2: { primary: 'AAA 14.87', secondary: 'AAA 4.9' },
  }

  const brandLeaningNeutral = [
    { level: 'L96', brand: '#F2F3FF', neutral: '#F3F3F3' },
    { level: 'L94', brand: '#EBEDFF', neutral: '#EEEEEE' },
    { level: 'L92', brand: '#E3E7FF', neutral: '#EBEBEB' },
    { level: 'L88', brand: '#D3DCFF', neutral: '#DDDDDD' },
    { level: 'L80', brand: '#B4C5FF', neutral: '#C6C6C6' },
    { level: 'L68', brand: '#84A2FF', neutral: '#A6A6A6' },
    { level: 'L58', brand: '#5885FF', neutral: '#8B8B8B' },
    { level: 'L50', brand: '#366EF4', neutral: '#777777' },
    { level: 'L40', brand: '#0052D9', neutral: '#5E5E5E' },
    { level: 'L32', brand: '#0042B2', neutral: '#4B4B4B' },
    { level: 'L24', brand: '#00328D', neutral: '#393939' },
    { level: 'L18', brand: '#00206E', neutral: '#2C2C2C' },
    { level: 'L14', brand: '#001E5C', neutral: '#242424' },
    { level: 'L8', brand: '#001442', neutral: '#181818' },
  ]

  // 渲染内容区域
  const renderContent = () => {
    switch (activeNav) {
      case 'values':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="values-header">
              <h2 className="values-title">{t('design.values.title')}</h2>
              <p className="values-subtitle" dangerouslySetInnerHTML={{ __html: t('design.values.description') }} />
              <div className="values-divider"></div>
            </div>
            

            {/* 核心价值观 */}
            <div className="values-section">
              <h3 className="values-section-title">{t('design.values.sectionTitle')}</h3>
              <p className="content-description" dangerouslySetInnerHTML={{ __html: t('design.values.sectionDescription') }} />
              
              <div className="values-grid">
                {[
                  { icon: '🏛️', title: t('design.values.principle1.title'), desc: t('design.values.principle1.desc') },
                  { icon: '🌐', title: t('design.values.principle2.title'), desc: t('design.values.principle2.desc') },
                  { icon: '⚙️', title: t('design.values.principle3.title'), desc: t('design.values.principle3.desc') },
                  { icon: '❤️', title: t('design.values.principle4.title'), desc: t('design.values.principle4.desc') },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="value-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="value-icon">{item.icon}</div>
                    <h3 className="value-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p className="value-desc">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 'color':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="color-header">
              <h2 className="color-title">{t('design.colors.title')}</h2>
              <p className="color-subtitle">{t('design.colors.subtitle')}</p>
              <div className="color-divider"></div>
            </div>
            
            {/* 概述 */}
            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.overview.title')}</h3>
              <p className="content-description">{t('design.colors.overview.description')}</p>
            </div>

            {/* BDesign 官方色板 */}
            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.officialPalette.title')}</h3>
              <p className="content-description">{t('design.colors.officialPalette.description')}</p>
            </div>

            {/* 主题色 */}
            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.themeColor.title')}</h3>
              <p className="content-description">{t('design.colors.themeColor.description')}</p>
              
              <div className="theme-color-display">
                <div className="theme-color-swatch" style={{ backgroundColor: t('design.colors.themeColor.beidianBlue.hex') }}></div>
                <div className="theme-color-info">
                  <h4 className="theme-color-name">{t('design.colors.themeColor.beidianBlue.name')}</h4>
                  <div className="theme-color-specs">
                    <div className="color-spec">
                      <span className="spec-label">CMYK:</span>
                      <span className="spec-value">{t('design.colors.themeColor.beidianBlue.cmyk')}</span>
                    </div>
                    <div className="color-spec">
                      <span className="spec-label">RGB:</span>
                      <span className="spec-value">{t('design.colors.themeColor.beidianBlue.rgb')}</span>
                    </div>
                    <div className="color-spec">
                      <span className="spec-label">HEX:</span>
                      <span className="spec-value">{t('design.colors.themeColor.beidianBlue.hex')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 功能色 */}
            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.functionalColor.title')}</h3>
              {(() => {
                const desc = t('design.colors.functionalColor.description') as string | string[];
                return Array.isArray(desc) ? 
                  desc.map((d: string, index: number) => (
                    <p key={index} className="content-description">{d}</p>
                  )) : 
                  <p className="content-description">{desc}</p>;
              })()}
              
              <div className="color-groups">
                <div className="functional-colors-row">
                  {[
                  { title: t('design.colors.primary'), colors: colors.primary, type: 'brand' },
                  { title: t('design.colors.success'), colors: colors.success, type: 'success' },
                  { title: t('design.colors.warning'), colors: colors.warning, type: 'warning' },
                  { title: t('design.colors.error'), colors: colors.error, type: 'error' },
                ].map((group, groupIndex) => {
                  const defaultIndex =
                    group.type === 'brand'
                      ? 6
                      : group.type === 'success'
                        ? 4
                        : group.type === 'warning'
                          ? 4
                          : 5

                  const defaultShade = group.colors[defaultIndex]

                  return (
                    <div key={groupIndex} className="functional-color-group">
                      <div className="functional-color-palette">
                        {defaultShade && (
                          <motion.div
                            key={`${group.type}-default`}
                            className="functional-color-item functional-color-item-default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                          >
                            <div
                              className="functional-color-swatch functional-color-swatch-default"
                              style={{ backgroundColor: defaultShade.value }}
                              onClick={() => copyToClipboard(defaultShade.value)}
                            >
                              <div className="functional-color-default-title">{group.title}</div>
                              <div className="functional-color-info functional-color-info-light">
                                <div className="functional-color-name">{defaultShade.name}</div>
                                <div className="functional-color-value">{defaultShade.value}</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        {group.colors.map((color, index) => (
                          <motion.div
                            key={color.name}
                            className="functional-color-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                          >
                            <div 
                              className="functional-color-swatch" 
                              style={{ 
                                backgroundColor: color.value,
                                border: color.value === '#FFFFFF' ? '1px solid #E0E0E0' : 'none'
                              }}
                              onClick={() => copyToClipboard(color.value)}
                            >
                              <div className={`functional-color-info ${index < 5 ? 'functional-color-info-dark' : 'functional-color-info-light'}`}>
                                <div className="functional-color-name">{color.name}</div>
                                <div className="functional-color-value">{color.value}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                })}
                </div>
              </div>
            </div>

            {/* 中性色 */}
            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.neutralSection.title')}</h3>
              <p className="content-description">{t('design.colors.neutralSection.description')}</p>

              <div className="neutral-layout">
                <div className="neutral-list">
                  {colors.neutral.map((color) => (
                    <div
                      key={color.name}
                      className="neutral-row"
                      style={{ backgroundColor: color.value, color: getContrastText(color.value) }}
                      onClick={() => copyToClipboard(color.value)}
                    >
                      <span className="neutral-name">{color.name}</span>
                      <span className="neutral-hex">{color.value}</span>
                    </div>
                  ))}
                </div>

                <div className="neutral-preview-panel">
                  {[colors.neutral[0], colors.neutral[1], colors.neutral[2]].filter(Boolean).map((color) => (
                    <div
                      key={`preview-${color.name}`}
                      className="neutral-preview-card"
                      style={{ backgroundColor: color.value }}
                    >
                      {(() => {
                        const aaa = neutralPreviewAaa[color.name] || { primary: 'AAA', secondary: 'AAA' }
                        return (
                          <>
                            <div className="neutral-preview-left">
                              <div className="neutral-preview-name">
                                <span>{color.name}</span>
                                <span className="neutral-preview-check">✓</span>
                              </div>
                            </div>
                            <div className="neutral-preview-right">
                              <div className="neutral-preview-cols">
                                <div className="neutral-preview-col">
                                  <div className="neutral-preview-col-top">
                                    <div className="neutral-preview-dot-row">
                                      <span className="neutral-preview-dot neutral-preview-dot-primary"></span>
                                    </div>
                                    <div className="neutral-preview-token-name-line">Font_Gy1_Primary</div>
                                    <div className="neutral-preview-token-hex-line">#1A1A1A</div>
                                  </div>
                                  <div className="neutral-preview-col-bottom">
                                    <div className="neutral-preview-text">Text</div>
                                    <div className="neutral-preview-aaa">{aaa.primary}</div>
                                  </div>
                                </div>
                                <div className="neutral-preview-divider"></div>
                                <div className="neutral-preview-col">
                                  <div className="neutral-preview-col-top">
                                    <div className="neutral-preview-dot-row">
                                      <span className="neutral-preview-dot neutral-preview-dot-secondary"></span>
                                    </div>
                                    <div className="neutral-preview-token-name-line">Font_Gy2_Secondary</div>
                                    <div className="neutral-preview-token-hex-line">#666666</div>
                                  </div>
                                  <div className="neutral-preview-col-bottom">
                                    <div className="neutral-preview-text">Text</div>
                                    <div className="neutral-preview-aaa">{aaa.secondary}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.brandNeutralSection.title')}</h3>
              <p className="content-description">{t('design.colors.brandNeutralSection.description')}</p>

              <div className="tinted-neutral-layout">
                <div className="tinted-neutral-columns">
                  <div className="neutral-list">
                    {brandLeaningNeutral.map((item) => (
                      <div
                        key={`brand-${item.level}`}
                        className="neutral-row"
                        style={{ backgroundColor: item.brand, color: getContrastText(item.brand) }}
                        onClick={() => copyToClipboard(item.brand)}
                      >
                        <span className="neutral-name">{item.level}</span>
                        <span className="neutral-hex">{item.brand}</span>
                      </div>
                    ))}
                  </div>

                  <div className="neutral-list">
                    {brandLeaningNeutral.map((item, index) => (
                      <div
                        key={`neutral-${item.level}`}
                        className="neutral-row"
                        style={{ backgroundColor: item.neutral, color: getContrastText(item.neutral) }}
                        onClick={() => copyToClipboard(item.neutral)}
                      >
                        <span className="neutral-name">{`Gray${index + 1} ${item.level}`}</span>
                        <span className="neutral-hex">{item.neutral}</span>
                      </div>
                    ))}
                  </div>

                  <div className="neutral-list">
                    {brandLeaningNeutral.map((item, index) => {
                      const mixed = mixHex(item.brand, item.neutral, 0.12)
                      return (
                        <div
                          key={`bluegray-${item.level}`}
                          className="neutral-row"
                          style={{ backgroundColor: mixed, color: getContrastText(mixed) }}
                          onClick={() => copyToClipboard(mixed)}
                        >
                          <span className="neutral-name">{`BlueGray${index + 1} ${item.level}`}</span>
                          <span className="neutral-hex">{mixed}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="tinted-neutral-footer">
                  <div className="tinted-neutral-footer-item">{t('design.colors.brandNeutralSection.brandRatio')}</div>
                  <div className="tinted-neutral-footer-item">{t('design.colors.brandNeutralSection.neutralRatio')}</div>
                  <div className="tinted-neutral-footer-item tinted-neutral-footer-formula">
                    {t('design.colors.brandNeutralSection.formula')}
                  </div>
                </div>
              </div>
            </div>

            {/* 扩展色 */}
            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.extendedColors.title')}</h3>
              <p className="content-description">{t('design.colors.extendedColors.description')}</p>
              
              <div className="color-groups">
                <div className="functional-colors-row">
                  {[
                    { title: t('design.colors.extendedColorNames.cyan'), colors: colors.cyan, type: 'cyan', defaultIndex: 4 },
                    { title: t('design.colors.extendedColorNames.purple'), colors: colors.purple, type: 'purple', defaultIndex: 6 },
                    { title: t('design.colors.extendedColorNames.yellow'), colors: colors.yellow, type: 'yellow', defaultIndex: 2 },
                    { title: t('design.colors.extendedColorNames.pink'), colors: colors.pink, type: 'pink', defaultIndex: 6 },
                  ].map((group, groupIndex) => {
                    const defaultShade = group.colors[group.defaultIndex]

                    return (
                      <div key={groupIndex} className="functional-color-group">
                        <div className="functional-color-palette">
                          {defaultShade && (
                            <motion.div
                              key={`${group.type}-default`}
                              className="functional-color-item functional-color-item-default"
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3 }}
                            >
                              <div
                                className="functional-color-swatch functional-color-swatch-default"
                                style={{ backgroundColor: defaultShade.value }}
                                onClick={() => copyToClipboard(defaultShade.value)}
                              >
                                <div className="functional-color-default-title">{group.title}</div>
                                <div className="functional-color-info functional-color-info-light">
                                  <div className="functional-color-name">{defaultShade.name}</div>
                                  <div className="functional-color-value">{defaultShade.value}</div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          {group.colors.map((color, index) => (
                            <motion.div
                              key={color.name}
                              className="functional-color-item"
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.03 }}
                            >
                              <div 
                                className="functional-color-swatch" 
                                style={{ 
                                  backgroundColor: color.value,
                                  border: color.value === '#FFFFFF' ? '1px solid #E0E0E0' : 'none'
                                }}
                                onClick={() => copyToClipboard(color.value)}
                              >
                                <div className={`functional-color-info ${index < 5 ? 'functional-color-info-dark' : 'functional-color-info-light'}`}>
                                  <div className="functional-color-name">{color.name}</div>
                                  <div className="functional-color-value">{color.value}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 应用指南 */}
            <div className="color-section">
              <h3 className="color-section-title">{t('design.colors.applicationGuide.title')}</h3>
              
              {/* UI应用指南 */}
              <div className="application-guide">
                <h4 className="third-level-title">{t('design.colors.applicationGuide.uiGuide.title')}</h4>
                <p className="application-guide-description">
                  {t('design.colors.applicationGuide.uiGuide.description')}
                </p>
                
                <div className="design-token-guide">
                  <div className="token-column">
                    <h5 className="column-title">色板</h5>
                    <p className="column-subtitle">颜色 - 色阶</p>
                    <div className="color-list">
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#366EF4' }}></div><span>blue-6</span></div>
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#2A5EE5' }}></div><span>blue-7</span></div>
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#1F4BD6' }}></div><span>blue-8</span></div>
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E6EB' }}></div><span>white</span></div>
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#F7F8FA' }}></div><span>gray-1</span></div>
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#E5E6EB' }}></div><span>gray-3</span></div>
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#1D2129' }}></div><span>fontgray-1</span></div>
                      <div className="color-item"><div className="color-dot" style={{ backgroundColor: '#4E5969' }}></div><span>fontgray-2</span></div>
                    </div>
                  </div>

                  <div className="token-column">
                    <h5 className="column-title">全局语义 Token</h5>
                    <p className="column-subtitle">主题容器文字 - 色彩 - 交互层级: @色板</p>
                    <div className="token-list">
                      <div className="token-item">
                        <span className="token-name">brand-color-hover:</span>
                        <span className="token-value">@blue-color-6</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">brand-color:</span>
                        <span className="token-value">@blue-color-7</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">brand-color-active:</span>
                        <span className="token-value">@blue-color-8</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">bg-color-container:</span>
                        <span className="token-value">@white-color</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">bg-color-container-hover:</span>
                        <span className="token-value">@gray-color-1</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">bg-color-container-active:</span>
                        <span className="token-value">@gray-color-3</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">text-color-primary:</span>
                        <span className="token-value">@font-gray-1</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">text-color-secondary:</span>
                        <span className="token-value">@font-gray-2</span>
                      </div>
                    </div>
                  </div>

                  <div className="token-column">
                    <h5 className="column-title">组件 Token</h5>
                    <p className="column-subtitle">组件 - 背景文字描边 - 交互层级: @全局语义Token</p>
                    <div className="token-list">
                      <div className="token-item">
                        <span className="token-name">button-bg-hover:</span>
                        <span className="token-value">@brand-color-hover</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">button-bg:</span>
                        <span className="token-value">@brand-color</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">button-bg-active:</span>
                        <span className="token-value">@brand-color-active</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">table-bg:</span>
                        <span className="token-value">@bg-color-container</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">table-bg-hover:</span>
                        <span className="token-value">@bg-color-container-hover</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">table-bg-active:</span>
                        <span className="token-value">@bg-color-container-active</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">menu-tabstext-select:</span>
                        <span className="token-value">@text-color-primary</span>
                      </div>
                      <div className="token-item">
                        <span className="token-name">menu-tabstext:</span>
                        <span className="token-value">@text-color-secondary</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 数据可视化应用指南 */}
              <div className="application-guide">
                <h4 className="third-level-title">{t('design.colors.applicationGuide.dataVizGuide.title')}</h4>
                <p className="application-guide-description">
                  {t('design.colors.applicationGuide.dataVizGuide.description')}
                </p>
                
                <div className="data-viz-guide">
                  {/* 色阶 */}
                  <div className="color-scale-palettes">
                    {/* 蓝色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#0052D9' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#F2F3FF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#D9E1FF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#B5C7FF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#8EABFF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#618DFF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#366EF4' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#0052D9' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#003CAB' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#002A7C' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#001A57' }}></div>
                    </div>
                    {/* 绿色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#008858' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#E3F9E9' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#C6F3D7' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#92DAB2' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#56C08D' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#2BA471' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#008858' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#006C45' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#005334' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#003B23' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#002515' }}></div>
                    </div>
                    {/* 黄色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#FFC720' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFEFD1' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFDF97' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFC720' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#D5A400' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#B48B00' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#957200' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#775A00' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#5A4400' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#3E2E00' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#251A00' }}></div>
                    </div>
                    {/* 橙色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#E37318' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFF1E9' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFD9C2' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFB98C' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FA9550' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#E37318' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#BE5A00' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#954500' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#713300' }} onClick={() => handleColorSwatchClick('#713300')}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#532300' }} onClick={() => handleColorSwatchClick('#532300')}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#3B1700' }} onClick={() => handleColorSwatchClick('#3B1700')}></div>
                    </div>
                    {/* 红色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#D54941' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFF0ED' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFD8D2' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFB9B0' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FF9285' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#F6685D' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#D54941' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#AD352F' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#881F1C' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#68070A' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#490002' }}></div>
                    </div>
                    {/* 粉色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#973F6D' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFECF1' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFD8E7' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#FFAFD3' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#F28ABC' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#D371A1' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#B45887' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#973F6D' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#7A2755' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#5D0E3D' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#3D0026' }}></div>
                    </div>
                    {/* 紫色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#7526DB' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#F7EDFF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#ECDCFF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#D6BAFF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#C098FF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#AA74FF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#934DFA' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#7526DB' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#5F00C0' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#420089' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#280057' }}></div>
                    </div>
                    {/* 青色系 */}
                    <div className="color-scale-column">
                      <div className="color-swatch" style={{ backgroundColor: '#0AADB7' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#C5FAFF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#78F5FF' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#56D8E2' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#30BCC6' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#0AADB7' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#00848C' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#00696F' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#004F54' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#00363A' }}></div>
                      <div className="color-swatch" style={{ backgroundColor: '#002022' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'fonts':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="typography-header">
              <h2 className="typography-title">{t('design.typography.title')}</h2>
              <p className="typography-subtitle">{t('design.typography.subtitle')}</p>
              <div className="typography-divider"></div>
            </div>
            
            {/* 概述 */}
            <div className="typography-section">
              <h3 className="typography-section-title">{t('design.typography.overview.title')}</h3>
              <div className="content-description">
                {(() => {
                  const desc = t('design.typography.overview.description');
                  return Array.isArray(desc) 
                    ? desc.map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: index === desc.length - 1 ? '0' : '1em' }}>
                          {paragraph}
                        </p>
                      ))
                    : <p>{desc}</p>;
                })()}
              </div>
            </div>

            {/* BEDI 字体系统 */}
            <div className="typography-section">
              <h3 className="typography-section-title">{t('design.typography.officialSystem.title')}</h3>
              <div className="content-description">
                {(() => {
                  const desc = t('design.typography.officialSystem.description');
                  return Array.isArray(desc) 
                    ? desc.map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: index === desc.length - 1 ? '0' : '1em' }}>
                          {paragraph}
                        </p>
                      ))
                    : <p>{desc}</p>;
                })()}
              </div>
              
              {/* 字体族卡片 */}
              <div className="font-family-cards">
                <div className="font-family-card">
                  <h4 className="font-family-title">Sans</h4>
                  <p className="font-family-subtitle">-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif</p>
                  <div className="font-family-example" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                    <p>Design System Build User Interface Experience</p>
                    <p>设计系统构建用户界面体验</p>
                    <p>1234567890 !@#$%^&*()</p>
                  </div>
                </div>
                
                <div className="font-family-card">
                  <h4 className="font-family-title">Mono</h4>
                  <p className="font-family-subtitle">'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace</p>
                  <div className="font-family-example" style={{ fontFamily: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace' }}>
                    <p>Design System Build User Interface Experience</p>
                    <p>设计系统构建用户界面体验</p>
                    <p>1234567890 !@#$%^&*()</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 字体层级 */}
            <div className="typography-section">
              <h3 className="typography-section-title">{t('design.typography.hierarchy.title')}</h3>
              <div className="content-description">
                {(() => {
                  const desc = t('design.typography.hierarchy.description');
                  return Array.isArray(desc) 
                    ? desc.map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: index === desc.length - 1 ? '0' : '1em' }}>
                          {paragraph}
                        </p>
                      ))
                    : <p>{desc}</p>;
                })()}
              </div>
              
              <div className="typography-hierarchy-display">
                <div className="typography-scale-preview">
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '64px', fontWeight: 500, lineHeight: '72px' }}>64px  BDesign</div>
                    <div className="typography-scale-level">第二字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+16</span>
                      <span className="typography-scale-spec">64px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '48px', fontWeight: 500, lineHeight: '56px' }}>48px  BDesign</div>
                    <div className="typography-scale-level">第二字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+12</span>
                      <span className="typography-scale-spec">48px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '36px', fontWeight: 500, lineHeight: '44px' }}>36px  BDesign</div>
                    <div className="typography-scale-level">第二字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+8</span>
                      <span className="typography-scale-spec">36px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}>28px  BDesign</div>
                    <div className="typography-scale-level">第二字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+4</span>
                      <span className="typography-scale-spec">28px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '32px' }}>24px  BDesign</div>
                    <div className="typography-scale-level">第二字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+4</span>
                      <span className="typography-scale-spec">24px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '20px', fontWeight: 500, lineHeight: '28px' }}>20px  BDesign</div>
                    <div className="typography-scale-level">第二字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+4</span>
                      <span className="typography-scale-spec">20px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}>16px  BDesign</div>
                    <div className="typography-scale-level">第一字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+2</span>
                      <span className="typography-scale-spec">16px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>14px  正文</div>
                    <div className="typography-scale-level">第一字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">+2</span>
                      <span className="typography-scale-spec">14px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px' }}>12px  桌面端最小</div>
                    <div className="typography-scale-level">第一字阶</div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">base</span>
                      <span className="typography-scale-spec">12px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 行高 */}
            <div className="typography-section">
              <h3 className="typography-section-title">{t('design.typography.application.title')}</h3>
              <div className="content-description">
                {(() => {
                  const desc = t('design.typography.application.description');
                  return Array.isArray(desc) 
                    ? desc.map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: index === desc.length - 1 ? '0' : '1em' }}>
                          {paragraph}
                        </p>
                      ))
                    : <p>{desc}</p>;
                })()}
              </div>
            </div>

            {/* 字重 */}
            <div className="typography-section">
              <h3 className="typography-section-title">{t('design.typography.completeHierarchy.title')}</h3>
              <div className="content-description">
                {(() => {
                  const desc = t('design.typography.completeHierarchy.description');
                  return Array.isArray(desc) 
                    ? desc.map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: index === desc.length - 1 ? '0' : '1em' }}>
                          {paragraph}
                        </p>
                      ))
                    : <p>{desc}</p>;
                })()}
              </div>
            </div>

            {/* 字体颜色 */}
            <div className="typography-section">
              <h3 className="typography-section-title">字体颜色</h3>
              <p className="content-description">字体颜色是界面设计中的重要元素，通过合理的颜色搭配可以增强信息的可读性和视觉层次。BEDI字体颜色系统提供了完整的颜色规范，确保在不同场景下都能保持良好的视觉效果。</p>
              
              <div className="font-color-columns">
                <div className="font-color-list">
                  <div className="font-color-row" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>
                    <span className="font-color-name">Font_Gy1_Primary</span>
                    <span className="font-color-hex">#1A1A1A</span>
                  </div>
                  <div className="font-color-row" style={{ backgroundColor: '#666666', color: '#FFFFFF' }}>
                    <span className="font-color-name">Font_Gy2_Secondary</span>
                    <span className="font-color-hex">#666666</span>
                  </div>
                  <div className="font-color-row" style={{ backgroundColor: '#999999', color: '#FFFFFF' }}>
                    <span className="font-color-name">Font_Gy3_Placeholder</span>
                    <span className="font-color-hex">#999999</span>
                  </div>
                  <div className="font-color-row" style={{ backgroundColor: '#BDBDBD', color: '#FFFFFF' }}>
                    <span className="font-color-name">Font_Gy4_Disabled</span>
                    <span className="font-color-hex">#BDBDBD</span>
                  </div>
                </div>
                
                <div className="font-color-list">
                  <div className="font-color-row" style={{ backgroundColor: '#383838', color: '#ffffff' }}>
                    <span className="font-color-name">Font_Wh1_Primary</span>
                    <span className="font-color-hex">#383838</span>
                  </div>
                  <div className="font-color-row" style={{ backgroundColor: '#595959', color: '#ffffff' }}>
                    <span className="font-color-name">Font_Wh2_Secondary</span>
                    <span className="font-color-hex">#595959</span>
                  </div>
                  <div className="font-color-row" style={{ backgroundColor: '#8C8C8C', color: '#ffffff' }}>
                    <span className="font-color-name">Font_Wh3_Placeholder</span>
                    <span className="font-color-hex">#8C8C8C</span>
                  </div>
                  <div className="font-color-row" style={{ backgroundColor: '#E5E5E5', color: '#ffffff' }}>
                    <span className="font-color-name">Font_Wh4_Disabled</span>
                    <span className="font-color-hex">#E5E5E5</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'motion':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="motion-header">
              <h2 className="motion-title">{t('design.motion.title')}</h2>
              <p className="motion-subtitle">{t('design.motion.subtitle')}</p>
              <div className="motion-divider"></div>
            </div>
            
            {/* 概述 */}
            <div className="motion-section">
              <h3 className="motion-section-title">{t('design.motion.overview.title')}</h3>
              <p className="content-description">{t('design.motion.overview.description')}</p>
            </div>

            {/* BEDI 动效原则 */}
            <div className="motion-section">
              <h3 className="motion-section-title">{t('design.motion.principles.title')}</h3>
              <p className="content-description">{t('design.motion.principles.description')}</p>
              
              <div className="motion-principles-grid">
                <div className="motion-card">
                  <h4 className="motion-card-title">{t('design.motion.principles.natural.title')}</h4>
                  <p className="motion-card-description">{t('design.motion.principles.natural.description')}</p>
                  <div className="motion-example">
                    <motion.div 
                      className="motion-demo-box"
                      animate={{ x: [0, 100, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
                
                <div className="motion-card">
                  <h4 className="motion-card-title">{t('design.motion.principles.duration.title')}</h4>
                  <p className="motion-card-description">{t('design.motion.principles.duration.description')}</p>
                  <div className="motion-example">
                    <motion.div 
                      className="motion-demo-box"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    />
                  </div>
                </div>
                
                <div className="motion-card">
                  <h4 className="motion-card-title">{t('design.motion.principles.easing.title')}</h4>
                  <p className="motion-card-description">{t('design.motion.principles.easing.description')}</p>
                  <div className="motion-example">
                    <motion.div 
                      className="motion-demo-box"
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 动效类型 */}
            <div className="motion-section">
              <h3 className="motion-section-title">{t('design.motion.types.title')}</h3>
              <p className="content-description">{t('design.motion.types.description')}</p>
              
              <div className="motion-types-grid">
                <div className="motion-card">
                  <h4 className="motion-card-title">{t('design.motion.types.enter.title')}</h4>
                  <p className="motion-card-description">{t('design.motion.types.enter.description')}</p>
                  <motion.div 
                    className="motion-demo-box"
                    animate={{ opacity: [0, 1, 0], y: [20, 0, 20] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  />
                </div>
                
                <div className="motion-card">
                  <h4 className="motion-card-title">{t('design.motion.types.exit.title')}</h4>
                  <p className="motion-card-description">{t('design.motion.types.exit.description')}</p>
                  <motion.div 
                    className="motion-demo-box"
                    animate={{ opacity: [1, 0], y: [0, -20] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                  />
                </div>
                
                <div className="motion-card">
                  <h4 className="motion-card-title">{t('design.motion.types.loading.title')}</h4>
                  <p className="motion-card-description">{t('design.motion.types.loading.description')}</p>
                  <motion.div 
                    className="motion-demo-box"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>

            {/* 动效测试 */}
            <div className="motion-section">
              <h3 className="motion-section-title">动效测试</h3>
              <p className="content-description">简单的动效测试，验证framer-motion是否正常工作</p>
              
              <div className="motion-example">
                <motion.div 
                  className="motion-demo-box"
                  animate={{ 
                    x: [0, 50, 0],
                    backgroundColor: ["#165DFF", "#00B42A", "#165DFF"]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </div>
            </div>

            {/* 动效规范 */}
            <div className="motion-section">
              <h3 className="motion-section-title">{t('design.motion.specifications.title')}</h3>
              <p className="content-description">{t('design.motion.specifications.description')}</p>
              
              <div className="motion-specs-table">
                <div className="motion-spec-row">
                  <div className="motion-spec-type">Token</div>
                  <div className="motion-spec-duration">duration-desktop-base</div>
                  <div className="motion-spec-easing">duration-desktop-moderate</div>
                  <div className="motion-spec-usage">duration-desktop-slow</div>
                  <div className="motion-spec-type">Usage</div>
                  <div className="motion-spec-duration">微观变换和淡入淡出变化</div>
                  <div className="motion-spec-easing">锚点、选项卡、下拉菜单、列表click、树</div>
                  <div className="motion-spec-usage">抽屉、消息通知、全局提示</div>
                  <div className="motion-spec-type">Value</div>
                  <div className="motion-spec-duration">200ms</div>
                  <div className="motion-spec-easing">240ms</div>
                  <div className="motion-spec-usage">280ms</div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'icon':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="icon-header">
              <h2 className="icon-title">{t('design.icon.title')}</h2>
              <p className="icon-subtitle">{t('design.icon.subtitle')}</p>
              <div className="icon-divider"></div>
            </div>
            
            {/* 概述 */}
            <div className="icon-section">
              <h3 className="icon-section-title">{t('design.icon.overview.title')}</h3>
              <p className="content-description">{t('design.icon.overview.description')}</p>
            </div>

            {/* 使用原则 */}
            <div className="icon-section">
              <h3 className="icon-section-title">{t('design.icon.principles.title')}</h3>
              <p className="content-description">{t('design.icon.principles.description')}</p>
              
              <div className="values-grid">
                {[
                  { icon: '🎯', title: t('design.icon.principles.clarity.title'), desc: t('design.icon.principles.clarity.description') },
                  { icon: '⚖️', title: t('design.icon.principles.consistency.title'), desc: t('design.icon.principles.consistency.description') },
                  { icon: '🌍', title: t('design.icon.principles.accessibility.title'), desc: t('design.icon.principles.accessibility.description') },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="value-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="value-icon">{item.icon}</div>
                    <h3 className="value-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p className="value-desc">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 'layout':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="typography-header">
              <h2 className="typography-title">{t('design.layout.title')}</h2>
              <p className="typography-subtitle">{t('design.layout.subtitle')}</p>
              <div className="typography-divider"></div>
            </div>
            
            {/* 概述 */}
            <div className="typography-section">
              <h3 className="typography-section-title">{t('design.layout.overview.title')}</h3>
              <p className="content-description">{t('design.layout.overview.description')}</p>
            </div>

            {/* BEDI 布局系统 */}
            <div className="typography-section">
              <h3 className="typography-section-title">BEDI 布局系统</h3>
              <p className="content-description">BEDI 布局系统基于 8px 网格系统，提供统一的间距规范，确保界面元素的一致性和视觉协调性。通过标准化的间距值，构建清晰、有序的界面布局。</p>
              
              {/* 布局原则卡片 */}
              <div className="font-family-cards">
                <div className="font-family-card">
                  <h4 className="font-family-title">8px 网格系统</h4>
                  <p className="font-family-subtitle">所有间距值均为 8 的倍数，确保视觉节奏感</p>
                  <div className="font-family-example">
                    <p>4px 8px 12px 16px 24px 32px 40px 48px 68px 96px 128px</p>
                    <p>基于 8px 基础网格的递增间距系统</p>
                  </div>
                </div>
                
                <div className="font-family-card">
                  <h4 className="font-family-title">视觉层次</h4>
                  <p className="font-family-subtitle">通过间距差异建立信息层级和视觉重点</p>
                  <div className="font-family-example">
                    <p>超大间距 → 极大间距 → 大间距 → 中间距 → 标准间距</p>
                    <p>利用空间关系引导用户注意力</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 间距规范 */}
            <div className="typography-section">
              <h3 className="typography-section-title">{t('design.layout.spacing.title')}</h3>
              <p className="content-description">{t('design.layout.spacing.description')}</p>
              
              <div className="typography-hierarchy-display">
                <div className="typography-scale-preview">
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '32px', fontWeight: 500, lineHeight: '40px' }}>128</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-128"></div>
                      <span className="spacing-label">128px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">超大间距</span>
                      <span className="typography-scale-spec">128px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '28px', fontWeight: 500, lineHeight: '36px' }}>96</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-96"></div>
                      <span className="spacing-label">96px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">极大间距</span>
                      <span className="typography-scale-spec">96px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '24px', fontWeight: 500, lineHeight: '32px' }}>68</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-68"></div>
                      <span className="spacing-label">68px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">大间距</span>
                      <span className="typography-scale-spec">68px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '22px', fontWeight: 500, lineHeight: '30px' }}>48</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-48"></div>
                      <span className="spacing-label">48px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">中大间距</span>
                      <span className="typography-scale-spec">48px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '20px', fontWeight: 500, lineHeight: '28px' }}>40</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-40"></div>
                      <span className="spacing-label">40px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">中间距</span>
                      <span className="typography-scale-spec">40px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '18px', fontWeight: 500, lineHeight: '26px' }}>32</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-32"></div>
                      <span className="spacing-label">32px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">标准间距</span>
                      <span className="typography-scale-spec">32px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px' }}>24</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-24"></div>
                      <span className="spacing-label">24px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">常用间距</span>
                      <span className="typography-scale-spec">24px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '14px', fontWeight: 500, lineHeight: '22px' }}>16</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-16"></div>
                      <span className="spacing-label">16px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">小间距</span>
                      <span className="typography-scale-spec">16px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px' }}>12</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-12"></div>
                      <span className="spacing-label">12px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">较小间距</span>
                      <span className="typography-scale-spec">12px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '10px', fontWeight: 400, lineHeight: '18px' }}>8</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-8"></div>
                      <span className="spacing-label">8px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">微小间距</span>
                      <span className="typography-scale-spec">8px</span>
                    </div>
                  </div>
                  <div className="typography-scale-item">
                    <div className="typography-scale-text" style={{ fontSize: '8px', fontWeight: 400, lineHeight: '16px' }}>4</div>
                    <div className="spacing-example-horizontal">
                      <div className="spacing-box spacing-box-4"></div>
                      <span className="spacing-label">4px</span>
                    </div>
                    <div className="typography-scale-info">
                      <span className="typography-scale-name">最小间距</span>
                      <span className="typography-scale-spec">4px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 布局应用 */}
            <div className="typography-section">
              <h3 className="typography-section-title">布局应用</h3>
              <p className="content-description">BEDI 布局系统在实际界面设计中的应用，包括组件间距、页面布局和内容组织等方面的规范。</p>
            </div>

            {/* 网格系统 */}
            <div className="typography-section">
              <h3 className="typography-section-title">网格系统</h3>
              <p className="content-description">基于 8px 网格系统构建的响应式布局框架，确保在不同设备和屏幕尺寸下都能保持一致的视觉效果。</p>
            </div>
          </motion.div>
        )

      case 'dark-mode':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="dark-mode-header">
              <h2 className="dark-mode-title">{t('design.darkMode.title')}</h2>
              <p className="dark-mode-subtitle">{t('design.darkMode.subtitle')}</p>
              <div className="dark-mode-divider"></div>
            </div>
            
            {/* 概述 */}
            <div className="dark-mode-section">
              <h3 className="dark-mode-section-title">{t('design.darkMode.overview.title')}</h3>
              <p className="content-description">{t('design.darkMode.overview.description')}</p>
            </div>

            {/* BEDI 深色模式系统 */}
            <div className="dark-mode-section">
              <h3 className="dark-mode-section-title">{t('design.darkMode.system.title')}</h3>
              <p className="content-description">{t('design.darkMode.system.description')}</p>
            </div>

            {/* 色彩适配 */}
            <div className="dark-mode-section">
              <h3 className="dark-mode-section-title">{t('design.darkMode.colors.title')}</h3>
              <p className="content-description">{t('design.darkMode.colors.description')}</p>
              
              <div className="dark-mode-colors-demo">
                <div className="color-comparison">
                  <div className="color-mode light-mode">
                    <h4 className="mode-title">浅色模式</h4>
                    <div className="color-palette">
                      <div className="color-item light-bg">背景色</div>
                      <div className="color-item light-text">文字色</div>
                      <div className="color-item light-border">边框色</div>
                      <div className="color-item light-primary">主题色</div>
                    </div>
                  </div>
                  <div className="color-mode dark-mode">
                    <h4 className="mode-title">深色模式</h4>
                    <div className="color-palette">
                      <div className="color-item dark-bg">背景色</div>
                      <div className="color-item dark-text">文字色</div>
                      <div className="color-item dark-border">边框色</div>
                      <div className="color-item dark-primary">主题色</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 切换原则 */}
            <div className="dark-mode-section">
              <h3 className="dark-mode-section-title">{t('design.darkMode.principles.title')}</h3>
              <p className="content-description">{t('design.darkMode.principles.description')}</p>
              
              <div className="dark-mode-principles-grid">
                <div className="dark-mode-card">
                  <h4 className="dark-mode-card-title">{t('design.darkMode.principles.contrast.title')}</h4>
                  <p className="dark-mode-card-description">{t('design.darkMode.principles.contrast.description')}</p>
                  <div className="principle-demo">
                    <div className="contrast-example good-contrast">
                      <span>良好对比度</span>
                    </div>
                    <div className="contrast-example poor-contrast">
                      <span>对比度不足</span>
                    </div>
                  </div>
                </div>
                
                <div className="dark-mode-card">
                  <h4 className="dark-mode-card-title">{t('design.darkMode.principles.hierarchy.title')}</h4>
                  <p className="dark-mode-card-description">{t('design.darkMode.principles.hierarchy.description')}</p>
                  <div className="principle-demo">
                    <div className="hierarchy-example">
                      <div className="hierarchy-item primary">主要信息</div>
                      <div className="hierarchy-item secondary">次要信息</div>
                      <div className="hierarchy-item tertiary">辅助信息</div>
                    </div>
                  </div>
                </div>
                
                <div className="dark-mode-card">
                  <h4 className="dark-mode-card-title">{t('design.darkMode.principles.consistency.title')}</h4>
                  <p className="dark-mode-card-description">{t('design.darkMode.principles.consistency.description')}</p>
                  <div className="principle-demo">
                    <div className="consistency-example">
                      <div className="component-light">浅色组件</div>
                      <div className="component-dark">深色组件</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 实现方式 */}
            <div className="dark-mode-section">
              <h3 className="dark-mode-section-title">{t('design.darkMode.implementation.title')}</h3>
              <p className="content-description">{t('design.darkMode.implementation.description')}</p>
              
              <div className="dark-mode-implementation">
                <div className="implementation-methods">
                  <div className="method-card">
                    <h4 className="method-title">CSS Variables</h4>
                    <p className="method-description">使用CSS自定义属性实现主题切换</p>
                    <div className="code-example">
                      <code>:root {`{ --bg-color: #ffffff; --text-color: #1a1a1a; }`}</code>
                      <code>[data-theme="dark"] {`{ --bg-color: #1a1a1a; --text-color: #ffffff; }`}</code>
                    </div>
                  </div>
                  
                  <div className="method-card">
                    <h4 className="method-title">Context API</h4>
                    <p className="method-description">使用React Context管理主题状态</p>
                    <div className="code-example">
                      <code>{`const ThemeContext = createContext()`}</code>
                      <code>{`<ThemeContext.Provider value={{ theme, toggleTheme }}>`}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 使用场景 */}
            <div className="dark-mode-section">
              <h3 className="dark-mode-section-title">{t('design.darkMode.usage.title')}</h3>
              <p className="content-description">{t('design.darkMode.usage.description')}</p>
              
              <div className="values-grid">
                {[
                  { icon: '💼', title: t('design.darkMode.usage.productivity.title'), desc: t('design.darkMode.usage.productivity.description') },
                  { icon: '👁️', title: t('design.darkMode.usage.accessibility.title'), desc: t('design.darkMode.usage.accessibility.description') },
                  { icon: '🌙', title: t('design.darkMode.usage.environment.title'), desc: t('design.darkMode.usage.environment.description') },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="value-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="value-icon">{item.icon}</div>
                    <h3 className="value-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p className="value-desc">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )

      
      default:
        return null
    }
  }

  return (
    <div className="design">
      <div className="design-layout">
        {/* 左侧导航栏 */}
        <aside className="design-sidebar">
          <nav className="design-nav">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`design-nav-item ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => setActiveNav(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* 右侧内容区域 */}
        <main className="design-content">
          <div className="design-content-inner">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* 复制成功提示窗 */}
      {showCopySuccess && (
        <div className="copy-success-toast">
          复制成功
        </div>
      )}
    </div>
  )
}
