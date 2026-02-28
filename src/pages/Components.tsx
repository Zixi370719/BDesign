import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import ComponentDemo from '../components/ComponentDemo'
import PropsTable from '../components/PropsTable'
import { Button, Input, Select, Checkbox, Radio, Switch, Tag, Alert, Card, Progress, Tabs, Badge, Avatar, Tooltip, Modal, Dropdown, Breadcrumb, DatePicker, Pagination, Table, Rate, Slider, Steps, Upload, Empty, Skeleton, Link, Icon, Divider, Space, Grid, Layout, Affix, Anchor, AnchorLink, Menu, MenuItem, Header, Content, Footer, BackTop, StickyTool, StickyToolItem } from '../components'
import { useLanguage } from '../context/LanguageContext'
import './Components.css'

type NavItem = 'overview' | 'button' | 'icon' | 'link' | 'divider' | 'grid' | 'layout' | 'space' | 'affix' | 'anchor' | 'backtop' | 'breadcrumb' | 'dropdown' | 'menu' | 'pagination' | 'steps' | 'stickytool' | 'tabs' | 'autocomplete' | 'cascader' | 'checkbox' | 'colorpicker' | 'datepicker' | 'form' | 'input' | 'inputadornment' | 'inputnumber' | 'taginput' | 'radio' | 'rangeinput' | 'select' | 'selectinput' | 'slider' | 'switch' | 'textarea' | 'transfer' | 'timepicker' | 'treeselect' | 'upload' | 'avatar' | 'badge' | 'calendar' | 'card' | 'collapse' | 'comment' | 'descriptions' | 'empty' | 'image' | 'imageviewer' | 'list' | 'loading' | 'progress' | 'qrcode' | 'rate' | 'skeleton' | 'statistic' | 'swiper' | 'table' | 'tag' | 'timeline' | 'tooltip' | 'tree' | 'watermark' | 'alert' | 'dialog' | 'drawer' | 'guide' | 'message' | 'notification' | 'popconfirm' | 'popup'

const getComponentGroups = (t: any) => [
  // 概览
  { key: 'overview', label: t('components.labels.overview'), group: t('components.categories.overview') },
  
  // 基础组件
  { key: 'button', label: t('components.labels.button'), group: t('components.categories.basic') },
  { key: 'icon', label: t('components.labels.icon'), group: t('components.categories.basic') },
  { key: 'link', label: t('components.labels.link'), group: t('components.categories.basic') },
  
  // 布局组件
  { key: 'divider', label: t('components.labels.divider'), group: t('components.categories.layout') },
  { key: 'grid', label: t('components.labels.grid'), group: t('components.categories.layout') },
  { key: 'layout', label: t('components.labels.layout'), group: t('components.categories.layout') },
  { key: 'space', label: t('components.labels.space'), group: t('components.categories.layout') },
  
  // 导航组件
  { key: 'affix', label: t('components.labels.affix'), group: t('components.categories.navigation') },
  { key: 'anchor', label: t('components.labels.anchor'), group: t('components.categories.navigation') },
  { key: 'backtop', label: t('components.labels.backtop'), group: t('components.categories.navigation') },
  { key: 'breadcrumb', label: t('components.labels.breadcrumb'), group: t('components.categories.navigation') },
  { key: 'dropdown', label: t('components.labels.dropdown'), group: t('components.categories.navigation') },
  { key: 'menu', label: t('components.labels.menu'), group: t('components.categories.navigation') },
  { key: 'pagination', label: t('components.labels.pagination'), group: t('components.categories.navigation') },
  { key: 'steps', label: t('components.labels.steps'), group: t('components.categories.navigation') },
  { key: 'stickytool', label: t('components.labels.stickytool'), group: t('components.categories.navigation') },
  { key: 'tabs', label: t('components.labels.tabs'), group: t('components.categories.navigation') },
  
  // 输入组件
  { key: 'autocomplete', label: t('components.labels.autocomplete'), group: t('components.categories.input') },
  { key: 'cascader', label: t('components.labels.cascader'), group: t('components.categories.input') },
  { key: 'checkbox', label: t('components.labels.checkbox'), group: t('components.categories.input') },
  { key: 'colorpicker', label: t('components.labels.colorpicker'), group: t('components.categories.input') },
  { key: 'datepicker', label: t('components.labels.datepicker'), group: t('components.categories.input') },
  { key: 'form', label: t('components.labels.form'), group: t('components.categories.input') },
  { key: 'input', label: t('components.labels.input'), group: t('components.categories.input') },
  { key: 'inputadornment', label: t('components.labels.inputadornment'), group: t('components.categories.input') },
  { key: 'inputnumber', label: t('components.labels.inputnumber'), group: t('components.categories.input') },
  { key: 'taginput', label: t('components.labels.taginput'), group: t('components.categories.input') },
  { key: 'radio', label: t('components.labels.radio'), group: t('components.categories.input') },
  { key: 'rangeinput', label: t('components.labels.rangeinput'), group: t('components.categories.input') },
  { key: 'select', label: t('components.labels.select'), group: t('components.categories.input') },
  { key: 'selectinput', label: t('components.labels.selectinput'), group: t('components.categories.input') },
  { key: 'slider', label: t('components.labels.slider'), group: t('components.categories.input') },
  { key: 'switch', label: t('components.labels.switch'), group: t('components.categories.input') },
  { key: 'textarea', label: t('components.labels.textarea'), group: t('components.categories.input') },
  { key: 'transfer', label: t('components.labels.transfer'), group: t('components.categories.input') },
  { key: 'timepicker', label: t('components.labels.timepicker'), group: t('components.categories.input') },
  { key: 'treeselect', label: t('components.labels.treeselect'), group: t('components.categories.input') },
  { key: 'upload', label: t('components.labels.upload'), group: t('components.categories.input') },
  
  // 数据展示组件
  { key: 'avatar', label: t('components.labels.avatar'), group: t('components.categories.display') },
  { key: 'badge', label: t('components.labels.badge'), group: t('components.categories.display') },
  { key: 'calendar', label: t('components.labels.calendar'), group: t('components.categories.display') },
  { key: 'card', label: t('components.labels.card'), group: t('components.categories.display') },
  { key: 'collapse', label: t('components.labels.collapse'), group: t('components.categories.display') },
  { key: 'comment', label: t('components.labels.comment'), group: t('components.categories.display') },
  { key: 'descriptions', label: t('components.labels.descriptions'), group: t('components.categories.display') },
  { key: 'empty', label: t('components.labels.empty'), group: t('components.categories.display') },
  { key: 'image', label: t('components.labels.image'), group: t('components.categories.display') },
  { key: 'imageviewer', label: t('components.labels.imageviewer'), group: t('components.categories.display') },
  { key: 'list', label: t('components.labels.list'), group: t('components.categories.display') },
  { key: 'loading', label: t('components.labels.loading'), group: t('components.categories.display') },
  { key: 'progress', label: t('components.labels.progress'), group: t('components.categories.display') },
  { key: 'qrcode', label: t('components.labels.qrcode'), group: t('components.categories.display') },
  { key: 'rate', label: t('components.labels.rate'), group: t('components.categories.display') },
  { key: 'skeleton', label: t('components.labels.skeleton'), group: t('components.categories.display') },
  { key: 'statistic', label: t('components.labels.statistic'), group: t('components.categories.display') },
  { key: 'swiper', label: t('components.labels.swiper'), group: t('components.categories.display') },
  { key: 'table', label: t('components.labels.table'), group: t('components.categories.display') },
  { key: 'tag', label: t('components.labels.tag'), group: t('components.categories.display') },
  { key: 'timeline', label: t('components.labels.timeline'), group: t('components.categories.display') },
  { key: 'tooltip', label: t('components.labels.tooltip'), group: t('components.categories.display') },
  { key: 'tree', label: t('components.labels.tree'), group: t('components.categories.display') },
  { key: 'watermark', label: t('components.labels.watermark'), group: t('components.categories.display') },
  
  // 消息提醒组件
  { key: 'alert', label: t('components.labels.alert'), group: t('components.categories.feedback') },
  { key: 'dialog', label: t('components.labels.dialog'), group: t('components.categories.feedback') },
  { key: 'drawer', label: t('components.labels.drawer'), group: t('components.categories.feedback') },
  { key: 'guide', label: t('components.labels.guide'), group: t('components.categories.feedback') },
  { key: 'message', label: t('components.labels.message'), group: t('components.categories.feedback') },
  { key: 'notification', label: t('components.labels.notification'), group: t('components.categories.feedback') },
  { key: 'popconfirm', label: t('components.labels.popconfirm'), group: t('components.categories.feedback') },
  { key: 'popup', label: t('components.labels.popup'), group: t('components.categories.feedback') },
]

export default function Components() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState<NavItem>((name as NavItem) || 'overview')
  const { t } = useLanguage()
  const componentGroups = getComponentGroups(t)

  useEffect(() => {
    if (name && name !== activeNav) {
      setActiveNav(name as NavItem)
    }
  }, [name])

  // 渲染内容区域
  const renderContent = () => {
    switch (activeNav) {
      // 概览
      case 'overview':
        return <OverviewPage />
      
      // 基础组件
      case 'button':
        return <ButtonPage />
      case 'tag':
        return <TagPage />
      case 'avatar':
        return <AvatarPage />
      case 'badge':
        return <BadgePage />
      case 'card':
        return <CardPage />
      case 'link':
        return <LinkPage />
      case 'icon':
        return <IconPage />
      
      // 布局组件
      case 'divider':
        return <DividerPage />
      case 'grid':
        return <GridPage />
      case 'layout':
        return <LayoutPage />
      case 'space':
        return <SpacePage />
      
      // 导航组件
      case 'affix':
        return <AffixPage />
      case 'anchor':
        return <AnchorPage />
      case 'backtop':
        return <BackTopPage />
      case 'dropdown':
        return <DropdownPage />
      case 'menu':
        return <MenuPage />
      case 'breadcrumb':
        return <BreadcrumbPage />
      case 'steps':
        return <StepsPage />
      case 'pagination':
        return <PaginationPage />
      case 'tabs':
        return <TabsPage />
      case 'stickytool':
        return <StickyToolPage />
      
      // 数据展示
      case 'table':
        return <TablePage />
      case 'progress':
        return <ProgressPage />
      
      // 表单组件
      case 'input':
        return <InputPage />
      case 'select':
        return <SelectPage />
      case 'checkbox':
        return <CheckboxPage />
      case 'radio':
        return <RadioPage />
      case 'switch':
        return <SwitchPage />
      case 'slider':
        return <SliderPage />
      case 'rate':
        return <RatePage />
      case 'upload':
        return <UploadPage />
      case 'datepicker':
        return <DatePickerPage />
      
      // 反馈组件
      case 'alert':
        return <AlertPage />
      case 'dialog':
        return <ModalPage />
      case 'tooltip':
        return <TooltipPage />
      
      // 加载组件
      case 'skeleton':
        return <SkeletonPage />
      case 'empty':
        return <EmptyPage />
      
      // 未实现的组件占位符
      case 'autocomplete':
        return <AutoCompletePage />
      case 'cascader':
        return <CascaderPage />
      case 'colorpicker':
        return <ColorPickerPage />
      case 'form':
        return <FormPage />
      case 'inputadornment':
        return <InputAdornmentPage />
      case 'inputnumber':
        return <InputNumberPage />
      case 'taginput':
        return <TagInputPage />
      case 'rangeinput':
        return <RangeInputPage />
      case 'selectinput':
        return <SelectInputPage />
      case 'textarea':
        return <TextareaPage />
      case 'timepicker':
        return <TimePickerPage />
      case 'treeselect':
        return <TreeSelectPage />
      case 'comment':
        return <CommentPage />
      case 'descriptions':
        return <DescriptionsPage />
      case 'imageviewer':
        return <ImageViewerPage />
      case 'qrcode':
        return <QRCodePage />
      case 'statistic':
        return <StatisticPage />
      case 'swiper':
        return <SwiperPage />
      case 'watermark':
        return <WatermarkPage />
      case 'guide':
        return <GuidePage />
      case 'notification':
        return <NotificationPage />
      
      default:
        return <div style={{ padding: '40px', color: 'var(--color-text-3)' }}>{t('components.placeholder')}</div>
    }
  }

  return (
    <div className="design">
      <div className="design-layout">
        {/* 左侧导航栏 */}
        <aside className="design-sidebar">
          <nav className="design-nav">
            {componentGroups.map((item: any, index: number) => {
              const isGroupStart = index === 0 || 
                (index > 0 && item.group !== componentGroups[index - 1].group);
              
              return (
                <React.Fragment key={item.key}>
                  {isGroupStart && index > 0 && (
                    <div className="design-nav-divider"></div>
                  )}
                  {isGroupStart && (
                    <div className="design-nav-group-title">
                      {item.group}
                    </div>
                  )}
                  <button
                    className={`design-nav-item ${activeNav === item.key ? 'active' : ''}`}
                    onClick={() => {
                      setActiveNav(item.key as NavItem)
                      navigate(`/components/${item.key}`)
                    }}
                  >
                    {item.label}
                  </button>
                </React.Fragment>
              )
            })}
          </nav>
        </aside>

        {/* 右侧内容区域 */}
        <main className="design-content">
          <div className="design-content-inner">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

function OverviewPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">综合示例 Overview</h2>
        <p className="color-subtitle">展示如何组合多个 BEDI 组件来构建真实的业务场景界面。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          通过综合示例展示 BEDI 设计系统的组件在实际业务场景中的应用，包括表单、数据展示、交互反馈等多种组件的组合使用。
        </p>
      </div>

      {/* 示例展示 */}
      <div className="color-section">
        <h3 className="color-section-title">示例展示</h3>
        <p className="content-description">
          以下展示了常见的业务场景界面，包含了个人信息设置、任务进度管理等实际应用案例。
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginTop: '32px' }}>
          <Card title="个人信息设置" extra={<Tag color="primary">个人账户</Tag>}>
            <Tabs
              items={[
                {
                  key: 'basic',
                  label: '基本信息',
                  children: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 0' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Input label="用户名" placeholder="请输入用户名" defaultValue="Arco Designer" />
                        <Input label="电子邮箱" placeholder="请输入邮箱" defaultValue="design@arco.com" />
                      </div>
                      <Select
                        label="所属部门"
                        options={[
                          { label: '设计部', value: 'design' },
                          { label: '研发部', value: 'dev' },
                          { label: '市场部', value: 'marketing' }
                        ]}
                        defaultValue="design"
                      />
                      <Input label="个人简介" placeholder="介绍一下你自己..." />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                        <Button variant="secondary">取消</Button>
                        <Button variant="primary">保存更改</Button>
                      </div>
                    </div>
                  )
                },
                {
                  key: 'security',
                  label: '安全设置',
                  children: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 0' }}>
                      <Alert type="info" showIcon title="安全提示">
                        建议定期更换密码以保障账户安全。
                      </Alert>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--color-fill-1)', borderRadius: 'var(--radius-md)' }}>
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>双重身份验证</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-3)' }}>启用后，登录时需要输入手机验证码。</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--color-fill-1)', borderRadius: 'var(--radius-md)' }}>
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>新设备登录提醒</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-3)' }}>当您的账户在未识别的设备上登录时发送邮件。</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </Card>

          <Card title="任务进度" extra={<Button size="small" variant="outline">查看详情</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px' }}>前端组件开发</span>
                  <Tag color="success">进行中</Tag>
                </div>
                <Progress percent={75} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px' }}>设计文档撰写</span>
                  <Tag color="primary">已完成</Tag>
                </div>
                <Progress percent={100} status="success" />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px' }}>单元测试覆盖</span>
                  <Tag color="error">待处理</Tag>
                </div>
                <Progress percent={15} status="error" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

function ButtonPage() {
  const [expandedCode, setExpandedCode] = useState<string | null>(null)
  const [config, setConfig] = useState<{
    block: boolean
    disabled: boolean
    loading: boolean
    shape: 'square' | 'round' | 'circle'
    size: 'small' | 'medium' | 'large' | 'extra-large'
    type: 'primary'
    variant: 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'ghost' | 'success' | 'warning' | 'info'
  }>({
    block: false,
    disabled: false,
    loading: false,
    shape: 'square',
    size: 'medium',
    type: 'primary',
    variant: 'primary'
  })

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId)
  }

  const updateConfig = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetConfig = () => {
    setConfig({
      block: false,
      disabled: false,
      loading: false,
      shape: 'square',
      size: 'medium',
      type: 'primary',
      variant: 'primary'
    })
  }

  const getConfigCode = () => {
    return `<Button 
  variant="${config.variant}"
  size="${config.size}"
  shape="${config.shape}"
  ${config.block ? 'block' : ''}
  ${config.disabled ? 'disabled' : ''}
  ${config.loading ? 'loading' : ''}
>
  示例按钮
</Button>`
  }

  const codeExamples = {
    basic: `<Button variant="primary">填充按钮</Button>
<Button variant="outline">描边按钮</Button>
<Button variant="ghost">虚框按钮</Button>
<Button variant="text">文字按钮</Button>`,
    icons: `<Button variant="primary" icon="📤">发送</Button>
<Button variant="secondary" icon="👤">用户</Button>
<Button variant="outline" icon="📧">邮件</Button>
<Button variant="text" icon="🔍">搜索</Button>

{/* 纯图标按钮 */}
<Button variant="primary" shape="circle" icon="🔍" />
<Button variant="secondary" shape="circle" icon="⚙️" />
<Button variant="outline" shape="circle" icon="📝" />`,
    ghost: `<Button variant="ghost">幽灵按钮</Button>
<Button variant="ghost" icon="🔍">搜索</Button>
<Button variant="ghost" disabled>禁用状态</Button>`,
    block: `<Button variant="primary" block>Block按钮</Button>
<Button variant="outline" block>Block描边按钮</Button>
<Button variant="text" block>Block文字按钮</Button>`,
    themes: `<Button variant="primary">主要按钮</Button>
<Button variant="success">成功按钮</Button>
<Button variant="warning">警告按钮</Button>
<Button variant="danger">危险按钮</Button>
<Button variant="info">信息按钮</Button>`,
    sizes: `<Button variant="primary" size="small">小号按钮</Button>
<Button variant="primary" size="medium">中号按钮</Button>
<Button variant="primary" size="large">大号按钮</Button>
<Button variant="primary" size="extra-large">特大号按钮</Button>`,
    custom: `<Button variant="primary">
  <span style={{ marginRight: '8px' }}>🚀</span>
  快速开始
</Button>

<Button variant="secondary">
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ fontSize: '18px' }}>💎</span>
    <span>高级功能</span>
    <span style={{ fontSize: '12px', opacity: 0.7 }}>PRO</span>
  </div>
</Button>

<Button variant="outline">
  <span>
    <span style={{ display: 'block', fontSize: '12px', opacity: 0.7 }}>上传文件</span>
    <span style={{ display: 'block', fontSize: '10px' }}>支持拖拽</span>
  </span>
</Button>`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* BEDI 风格的页面头部 */}
      <div className="color-header">
        <div className="bedi-breadcrumb" style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--color-text-3)' }}>
          <span>组件</span>
          <span className="separator" style={{ margin: '0 8px' }}>/</span>
          <span className="current" style={{ color: 'var(--color-text-1)' }}>Button 按钮</span>
        </div>
        <h2 className="color-title">Button 按钮</h2>
        <p className="color-subtitle">
          按钮用于开始一个即时操作。当用户点击按钮时，会触发相应的业务逻辑。
        </p>
        <div className="color-divider"></div>
        <div className="bedi-meta" style={{ display: 'flex', gap: '24px', marginTop: '16px', fontSize: '14px' }}>
          <div className="meta-item">
            <span className="meta-label" style={{ color: 'var(--color-text-3)' }}>类型:</span>
            <span className="meta-value" style={{ color: 'var(--color-text-1)', marginLeft: '8px' }}>组件</span>
          </div>
          <div className="meta-item">
            <span className="meta-label" style={{ color: 'var(--color-text-3)' }}>状态:</span>
            <span className="meta-value stable" style={{ 
              color: '#008858', 
              marginLeft: '8px',
              background: '#E3F9E9',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>Stable</span>
          </div>
        </div>
      </div>

      {/* 使用指南 */}
      <div className="color-section">
        <h3 className="color-section-title">何时使用</h3>
        <div className="usage-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
          <Card title="✅ 推荐使用" style={{ background: 'var(--color-bg-2)' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-2)' }}>
              <li>标记了一个（或封装一组）操作命令，响应用户点击行为</li>
              <li>点击后触发相应的业务逻辑</li>
              <li>用于页面中最重要的操作，如"提交"、"确认"、"创建"等</li>
            </ul>
          </Card>
          <Card title="❌ 不推荐使用" style={{ background: 'var(--color-bg-2)' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-2)' }}>
              <li>用于页面跳转，请使用链接组件</li>
              <li>用于多选操作，请使用复选框组件</li>
              <li>用于选择操作，请使用单选框组件</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* 示例 */}
      <div className="color-section">
        <h3 className="color-section-title">示例</h3>
        
        {/* 动态配置部分 */}
        <div className="demo-section" style={{ marginBottom: '40px' }}>
          <h4 className="color-section-subtitle" style={{ fontSize: '18px', fontWeight: '500', marginBottom: '12px' }}>动态配置</h4>
          <p className="content-description" style={{ marginBottom: '24px' }}>
            通过右侧属性面板实时调整按钮样式，左侧预览区域会即时更新显示效果。
          </p>
          <div className="dynamic-config-container" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 300px', 
            gap: '24px',
            background: 'var(--color-bg-2)',
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-2)'
          }}>
            {/* 左侧预览 */}
            <div className="preview-panel">
              <div className="preview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>预览</h4>
                <Button variant="outline" size="small" onClick={resetConfig}>重置</Button>
              </div>
              <div className="preview-content" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '40px',
                background: 'var(--color-bg-1)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--color-border-2)'
              }}>
                <Button 
                  variant={config.variant}
                  size={config.size}
                  shape={config.shape}
                  block={config.block}
                  disabled={config.disabled}
                  loading={config.loading}
                >
                  示例按钮
                </Button>
              </div>
              <div className="preview-actions" style={{ marginTop: '16px' }}>
                <Button 
                  variant="outline" 
                  size="small"
                  icon="📋"
                  onClick={() => toggleCode('dynamic')}
                >
                  {expandedCode === 'dynamic' ? '隐藏代码' : '显示代码'}
                </Button>
              </div>
              {expandedCode === 'dynamic' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ 
                    marginTop: '16px',
                    background: 'var(--code-bg)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-2)'
                  }}
                >
                  <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}><code>{getConfigCode()}</code></pre>
                </motion.div>
              )}
            </div>
            
            {/* 右侧配置 */}
            <div className="config-panel">
              <div className="config-header" style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>属性配置</h4>
              </div>
              <div className="config-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="config-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>variant</label>
                  <select 
                    value={config.variant} 
                    onChange={(e) => updateConfig('variant', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      border: '1px solid var(--color-border-2)', 
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-bg-1)'
                    }}
                  >
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                    <option value="outline">outline</option>
                    <option value="text">text</option>
                    <option value="danger">danger</option>
                    <option value="ghost">ghost</option>
                    <option value="success">success</option>
                    <option value="warning">warning</option>
                    <option value="info">info</option>
                  </select>
                </div>
                
                <div className="config-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>size</label>
                  <select 
                    value={config.size} 
                    onChange={(e) => updateConfig('size', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      border: '1px solid var(--color-border-2)', 
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-bg-1)'
                    }}
                  >
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                    <option value="extra-large">extra-large</option>
                  </select>
                </div>
                
                <div className="config-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>shape</label>
                  <select 
                    value={config.shape} 
                    onChange={(e) => updateConfig('shape', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '8px 12px', 
                      border: '1px solid var(--color-border-2)', 
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--color-bg-1)'
                    }}
                  >
                    <option value="square">square</option>
                    <option value="round">round</option>
                    <option value="circle">circle</option>
                  </select>
                </div>
                
                <div className="config-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
                    <input 
                      type="checkbox" 
                      checked={config.block} 
                      onChange={(e) => updateConfig('block', e.target.checked)}
                    />
                    block
                  </label>
                </div>
                
                <div className="config-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
                    <input 
                      type="checkbox" 
                      checked={config.disabled} 
                      onChange={(e) => updateConfig('disabled', e.target.checked)}
                    />
                    disabled
                  </label>
                </div>
                
                <div className="config-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
                    <input 
                      type="checkbox" 
                      checked={config.loading} 
                      onChange={(e) => updateConfig('loading', e.target.checked)}
                    />
                    loading
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 基础按钮 */}
        <ComponentDemo
          title="基础按钮"
          description="基础按钮包含四种主要样式：填充按钮、描边按钮、虚框按钮和文字按钮。"
          code={codeExamples.basic}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">填充按钮</Button>
            <Button variant="outline">描边按钮</Button>
            <Button variant="ghost">虚框按钮</Button>
            <Button variant="text">文字按钮</Button>
          </div>
        </ComponentDemo>

        {/* 图标按钮 */}
        <ComponentDemo
          title="图标按钮"
          description="图标按钮可以增强用户识别度，提供更直观的操作提示。"
          code={codeExamples.icons}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" icon="📤">发送</Button>
            <Button variant="secondary" icon="👤">用户</Button>
            <Button variant="outline" icon="📧">邮件</Button>
            <Button variant="text" icon="🔍">搜索</Button>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px', background: 'var(--color-fill-1)', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-3)' }}>纯图标:</span>
              <Button variant="primary" shape="circle" icon="🔍" />
              <Button variant="secondary" shape="circle" icon="⚙️" />
              <Button variant="outline" shape="circle" icon="📝" />
            </div>
          </div>
        </ComponentDemo>

        {/* 幽灵按钮 */}
        <ComponentDemo
          title="幽灵按钮"
          description="幽灵按钮在深色背景或复杂背景中表现更佳，具有更好的视觉层次。"
          code={codeExamples.ghost}
        >
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '20px', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            gap: '12px'
          }}>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="ghost" icon="🔍">搜索</Button>
            <Button variant="ghost" disabled>禁用状态</Button>
          </div>
        </ComponentDemo>

        {/* Block按钮 */}
        <ComponentDemo
          title="Block按钮"
          description="Block按钮会占满父容器的宽度，提供更强的视觉冲击力。"
          code={codeExamples.block}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Button variant="primary" block>Block按钮</Button>
            <div style={{ height: '8px' }} />
            <Button variant="outline" block>Block描边按钮</Button>
            <div style={{ height: '8px' }} />
            <Button variant="text" block>Block文字按钮</Button>
          </div>
        </ComponentDemo>

        {/* 不同颜色主题按钮 */}
        <ComponentDemo
          title="不同颜色主题按钮"
          description="不同颜色主题用于传达不同的语义和情感。"
          code={codeExamples.themes}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">主要按钮</Button>
            <Button variant="success">成功按钮</Button>
            <Button variant="warning">警告按钮</Button>
            <Button variant="danger">危险按钮</Button>
            <Button variant="info">信息按钮</Button>
          </div>
        </ComponentDemo>

        {/* 不同尺寸按钮 */}
        <ComponentDemo
          title="不同尺寸按钮"
          description="不同尺寸的按钮适用于不同的场景和设备。"
          code={codeExamples.sizes}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button variant="primary" size="small">小号按钮</Button>
            <Button variant="primary" size="medium">中号按钮</Button>
            <Button variant="primary" size="large">大号按钮</Button>
            <Button variant="primary" size="extra-large">特大号按钮</Button>
          </div>
        </ComponentDemo>

        {/* 自定义渲染元素 */}
        <ComponentDemo
          title="自定义渲染元素"
          description="按钮支持自定义渲染元素，可以实现更复杂的交互效果。"
          code={codeExamples.custom}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">
              <span style={{ marginRight: '8px' }}>🚀</span>
              快速开始
            </Button>
            <Button variant="secondary">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>💎</span>
                <span>高级功能</span>
                <span style={{ fontSize: '12px', opacity: 0.7 }}>PRO</span>
              </div>
            </Button>
            <Button variant="outline">
              <span>
                <span style={{ display: 'block', fontSize: '12px', opacity: 0.7 }}>上传文件</span>
                <span style={{ display: 'block', fontSize: '10px' }}>支持拖拽</span>
              </span>
            </Button>
          </div>
        </ComponentDemo>
      </div>

      {/* API 文档 */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'variant', type: "'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'ghost' | 'success' | 'warning' | 'info'", default: "'secondary'", description: '按钮类型' },
          { prop: 'size', type: "'small' | 'medium' | 'large' | 'extra-large'", default: "'medium'", description: '按钮尺寸' },
          { prop: 'shape', type: "'square' | 'round' | 'circle'", default: "'square'", description: '按钮形状' },
          { prop: 'icon', type: 'ReactNode', description: '按钮图标' },
          { prop: 'loading', type: 'boolean', default: 'false', description: '是否加载中' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'block', type: 'boolean', default: 'false', description: '是否块级按钮（宽度 100%）' },
          { prop: 'onClick', type: '(e: MouseEvent) => void', description: '点击事件回调' },
          { prop: 'children', type: 'ReactNode', description: '按钮内容' },
        ]} />
      </div>
    </motion.div>
  )
}

function InputPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">输入框 Input</h2>
        <p className="color-subtitle">输入框用于接受用户通过键盘输入的文本内容。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          输入框是用户界面中最基本的数据输入组件，用于收集用户的文本信息。BEDI 设计系统提供了丰富的输入框配置选项，包括标签、验证状态、前后缀图标等功能。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本用法"
        description="最基本的输入框用法。"
        code={`<Input placeholder="请输入内容" />
<Input label="用户名" placeholder="请输入用户名" />
<Input label="密码" type="password" placeholder="请输入密码" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Input placeholder="请输入内容" />
          <Input label="用户名" placeholder="请输入用户名" />
          <Input label="密码" type="password" placeholder="请输入密码" />
        </div>
      </ComponentDemo>
      </div>

      {/* 前缀与后缀 */}
      <div className="color-section">
        <h3 className="color-section-title">前缀与后缀</h3>
      <ComponentDemo
        title="前缀与后缀"
        description="支持在输入框前后添加图标或文本。"
        code={`<Input prefix="¥" placeholder="请输入金额" />
<Input suffix="kg" placeholder="请输入重量" />
<Input addonBefore="https://" addonAfter=".com" placeholder="mysite" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Input prefix="¥" placeholder="请输入金额" />
          <Input suffix="kg" placeholder="请输入重量" />
          <Input addonBefore="https://" addonAfter=".com" placeholder="mysite" />
        </div>
      </ComponentDemo>
      </div>

      {/* 校验状态 */}
      <div className="color-section">
        <h3 className="color-section-title">校验状态</h3>
      <ComponentDemo
        title="错误提示"
        description="通过 error 属性展示校验失败的状态。"
        code={`<Input label="邮箱" error="请输入正确的邮箱格式" value="invalid-email" />`}
      >
        <div style={{ maxWidth: '400px' }}>
          <Input label="邮箱" error="请输入正确的邮箱格式" defaultValue="invalid-email" />
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'label', type: 'string', description: '输入框标签文字' },
          { prop: 'placeholder', type: 'string', description: '占位提示文字' },
          { prop: 'type', type: "'text' | 'password' | 'email' | 'number'", default: "'text'", description: '输入框类型' },
          { prop: 'value', type: 'string', description: '受控值' },
          { prop: 'defaultValue', type: 'string', description: '非受控默认值' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'prefix', type: 'ReactNode', description: '前缀内容（在输入框内）' },
          { prop: 'suffix', type: 'ReactNode', description: '后缀内容（在输入框内）' },
          { prop: 'addonBefore', type: 'ReactNode', description: '前置标签（在输入框外）' },
          { prop: 'addonAfter', type: 'ReactNode', description: '后置标签（在输入框外）' },
          { prop: 'error', type: 'string', description: '错误提示文字，非空时显示错误状态' },
          { prop: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', description: '值变化回调' },
        ]} />
      </div>
    </motion.div>
  )
}

function SelectPage() {
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
    { label: '禁用选项', value: '4', disabled: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">选择器 Select</h2>
        <p className="color-subtitle">当选项过多时，使用下拉菜单展示并选择内容。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          选择器是一种常见的输入组件，当选项数量较多时，通过下拉菜单的形式展示选项，帮助用户从多个选项中选择一个。BEDI 设计系统的选择器支持搜索、禁用、分组等功能。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基础用法"
        description="最基本的下拉选择用法。"
        code={`<Select options={options} placeholder="请选择" />
<Select label="选择城市" options={options} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Select options={options} defaultValue="" />
          <Select label="选择城市" options={options} defaultValue="1" />
        </div>
      </ComponentDemo>
      </div>

      {/* 禁用状态 */}
      <div className="color-section">
        <h3 className="color-section-title">禁用状态</h3>
      <ComponentDemo
        title="禁用"
        description="禁用整个选择器。"
        code={`<Select disabled options={options} value="1" />`}
      >
        <div style={{ maxWidth: '400px' }}>
          <Select disabled options={options} defaultValue="1" />
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'options', type: 'Array<{ label: string; value: string; disabled?: boolean }>', required: true, description: '选项数据' },
          { prop: 'label', type: 'string', description: '选择器标签文字' },
          { prop: 'value', type: 'string', description: '受控选中值' },
          { prop: 'defaultValue', type: 'string', description: '非受控默认选中值' },
          { prop: 'placeholder', type: 'string', description: '占位提示文字' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'onChange', type: '(value: string) => void', description: '选中值变化回调' },
        ]} />
      </div>
    </motion.div>
  )
}

function CheckboxPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">复选框 Checkbox</h2>
        <p className="color-subtitle">多选框用于在一组选项中进行多项选择。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          复选框是一种常见的选择组件，允许用户从一组选项中选择多个选项。BEDI 设计系统的复选框支持默认选中、禁用状态、自定义样式等功能，适用于表单、设置页面等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基础用法"
        description="单独使用的复选框。"
        code={`<Checkbox label="选项一" />
<Checkbox label="选项二" defaultChecked />
<Checkbox label="禁用" disabled />
<Checkbox label="禁用已选中" disabled defaultChecked />`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Checkbox label="选项一" />
          <Checkbox label="选项二" defaultChecked />
          <Checkbox label="禁用" disabled />
          <Checkbox label="禁用已选中" disabled defaultChecked />
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'label', type: 'string', description: '复选框显示文字' },
          { prop: 'checked', type: 'boolean', description: '受控选中状态' },
          { prop: 'defaultChecked', type: 'boolean', default: 'false', description: '非受控默认选中状态' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'onChange', type: '(checked: boolean) => void', description: '选中状态变化回调' },
        ]} />
      </div>
    </motion.div>
  )
}

function RadioPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">单选框 Radio</h2>
        <p className="color-subtitle">单选框用于从一组备选项中选择一个。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          单选框是一种常见的选择组件，允许用户从一组选项中选择唯一一个选项。BEDI 设计系统的单选框支持默认选中、禁用状态、自定义样式等功能，适用于表单、设置页面等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基础用法"
        description="单选框的基本用法。"
        code={`<Radio name="radio-group" label="选项一" value="1" />
<Radio name="radio-group" label="选项二" value="2" defaultChecked />
<Radio name="radio-group" label="禁用" disabled />`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Radio name="radio-group" label="选项一" value="1" />
          <Radio name="radio-group" label="选项二" value="2" defaultChecked />
          <Radio name="radio-group" label="禁用" disabled />
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'label', type: 'string', description: '单选框显示文字' },
          { prop: 'name', type: 'string', description: '同组单选框共享的 name 属性' },
          { prop: 'value', type: 'string', description: '当前选项的值' },
          { prop: 'defaultChecked', type: 'boolean', default: 'false', description: '非受控默认选中状态' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'onChange', type: '(value: string) => void', description: '选中状态变化回调' },
        ]} />
      </div>
    </motion.div>
  )
}

function SwitchPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">开关 Switch</h2>
        <p className="color-subtitle">开关用于在两种状态之间切换。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          开关是一种常见的切换组件，用于在两种对立状态之间进行切换，如开启/关闭、是/否等。BEDI 设计系统的开关支持不同尺寸、禁用状态、自定义标签等功能，适用于设置页面、表单等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基础用法"
        description="基本开关展示。"
        code={`<Switch label="开启通知" defaultChecked />
<Switch label="禁用" disabled />`}
      >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <Switch label="开启通知" defaultChecked />
          <Switch label="禁用" disabled />
        </div>
      </ComponentDemo>
      </div>

      {/* 不同尺寸 */}
      <div className="color-section">
        <h3 className="color-section-title">不同尺寸</h3>
      <ComponentDemo
        title="尺寸"
        description="支持小、中、大三种尺寸。"
        code={`<Switch size="small" />
<Switch size="medium" defaultChecked />
<Switch size="large" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Switch size="small" />
          <Switch size="medium" defaultChecked />
          <Switch size="large" />
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'label', type: 'string', description: '开关旁显示文字' },
          { prop: 'checked', type: 'boolean', description: '受控选中状态' },
          { prop: 'defaultChecked', type: 'boolean', default: 'false', description: '非受控默认选中状态' },
          { prop: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
          { prop: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: '开关尺寸' },
          { prop: 'onChange', type: '(checked: boolean) => void', description: '切换状态变化回调' },
        ]} />
      </div>
    </motion.div>
  )
}

function TagPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">标签 Tag</h2>
        <p className="color-subtitle">用于标记和分类的标签组件。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          标签是一种常见的标识组件，用于对内容进行分类、标记或状态显示。BEDI 设计系统的标签支持多种语义颜色、可关闭状态、自定义样式等功能，适用于文章标签、状态标识、分类显示等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="不同颜色"
        description="支持多种语义颜色。"
        code={`<Tag>Default</Tag>
<Tag color="primary">Primary</Tag>
<Tag color="success">Success</Tag>
<Tag color="warning">Warning</Tag>
<Tag color="error">Error</Tag>`}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag>Default</Tag>
          <Tag color="primary">Primary</Tag>
          <Tag color="success">Success</Tag>
          <Tag color="warning">Warning</Tag>
          <Tag color="error">Error</Tag>
        </div>
      </ComponentDemo>
      </div>

      {/* 可关闭标签 */}
      <div className="color-section">
        <h3 className="color-section-title">可关闭标签</h3>
      <ComponentDemo
        title="可关闭"
        description="点击关闭图标可以移除标签。"
        code={`<Tag closable onClose={() => alert('Tag closed')}>可关闭标签</Tag>
<Tag color="primary" closable>主要标签</Tag>`}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Tag closable onClose={() => alert('Tag closed')}>可关闭标签</Tag>
          <Tag color="primary" closable>主要标签</Tag>
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'color', type: "'primary' | 'success' | 'warning' | 'error' | 'default'", default: "'default'", description: '标签颜色语义' },
          { prop: 'closable', type: 'boolean', default: 'false', description: '是否可关闭' },
          { prop: 'onClose', type: '() => void', description: '点击关闭按钮的回调' },
          { prop: 'children', type: 'ReactNode', required: true, description: '标签内容' },
        ]} />
      </div>
    </motion.div>
  )
}

function CardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">卡片 Card</h2>
        <p className="color-subtitle">通用卡片容器，可承载文本、列表、图片等。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          卡片是一种常见的容器组件，用于承载和组织内容。BEDI 设计系统的卡片支持标题、操作栏、悬停效果、自定义样式等功能，适用于信息展示、数据卡片、产品展示等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基础卡片"
        description="包含标题和内容的卡片。"
        code={`<Card title="卡片标题" extra={<a href="#">更多</a>} style={{ maxWidth: '400px' }}>
  <p>这是卡片的内容区域。</p>
</Card>`}
      >
        <Card title="卡片标题" extra={<a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>更多</a>} style={{ maxWidth: '400px' }}>
          <p style={{ margin: 0 }}>这是卡片的内容区域。</p>
          <p style={{ margin: '8px 0 0' }}>可以包含各种 HTML 元素或组件。</p>
        </Card>
      </ComponentDemo>
      </div>

      {/* 交互功能 */}
      <div className="color-section">
        <h3 className="color-section-title">交互功能</h3>
      <ComponentDemo
        title="可悬停与操作"
        description="支持悬停阴影效果和底栏操作按钮。"
        code={`<Card
  hoverable
  title="可悬停卡片"
  actions={[
    <Button variant="text" size="small">编辑</Button>,
    <Button variant="text" size="small">删除</Button>
  ]}
  style={{ maxWidth: '400px' }}
>
  <p>鼠标悬停时会显示更深的阴影。</p>
</Card>`}
      >
        <Card
          hoverable
          title="可悬停卡片"
          actions={[
            <Button variant="text" size="small">编辑</Button>,
            <Button variant="text" size="small" style={{ color: 'var(--color-red-6)' }}>删除</Button>
          ]}
          style={{ maxWidth: '400px' }}
        >
          <p style={{ margin: 0 }}>鼠标悬停时会显示更深的阴影。</p>
        </Card>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'title', type: 'string', description: '卡片标题' },
          { prop: 'extra', type: 'ReactNode', description: '卡片右上角操作区' },
          { prop: 'hoverable', type: 'boolean', default: 'false', description: '是否开启悬停阴影效果' },
          { prop: 'actions', type: 'ReactNode[]', description: '卡片底栏操作按钮组' },
          { prop: 'style', type: 'CSSProperties', description: '自定义样式' },
          { prop: 'className', type: 'string', description: '自定义类名' },
          { prop: 'children', type: 'ReactNode', description: '卡片内容' },
        ]} />
      </div>
    </motion.div>
  )
}

function ProgressPage() {
  const [percent, setPercent] = useState(30)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">进度条 Progress</h2>
        <p className="color-subtitle">展示当前任务的进度状态。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          进度条是一种常见的反馈组件，用于显示任务的完成进度。BEDI 设计系统的进度条支持不同状态、动态变化、自定义样式等功能，适用于文件上传、任务进度、表单完成度等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="不同状态"
        description="进度条有三种状态：默认、成功、错误。"
        code={`<Progress percent={30} />
<Progress percent={100} status="success" />
<Progress percent={50} status="error" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
          <Progress percent={30} />
          <Progress percent={100} status="success" />
          <Progress percent={50} status="error" />
        </div>
      </ComponentDemo>
      </div>

      {/* 动态展示 */}
      <div className="color-section">
        <h3 className="color-section-title">动态展示</h3>
      <ComponentDemo
        title="动态变化"
        description="可以通过外部状态控制进度值。"
        code={`const [percent, setPercent] = useState(30);
<Progress percent={percent} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
          <Progress percent={percent} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="small" onClick={() => setPercent(Math.max(0, percent - 10))}>减少 10%</Button>
            <Button size="small" onClick={() => setPercent(Math.min(100, percent + 10))}>增加 10%</Button>
          </div>
        </div>
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function TabsPage() {
  const items = [
    { key: '1', label: '标签一', children: <div style={{ padding: '16px 0' }}>这是第一个标签页的内容。</div> },
    { key: '2', label: '标签二', children: <div style={{ padding: '16px 0' }}>这是第二个标签页的内容。</div> },
    { key: '3', label: '标签三', children: <div style={{ padding: '16px 0' }}>这是第三个标签页的内容。</div> },
    { key: '4', label: '禁用标签', children: '内容', disabled: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">标签页 Tabs</h2>
        <p className="color-subtitle">选项卡切换组件，用于在同一区域切换展示不同的内容。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          标签页是一种常见的内容切换组件，用于在有限空间内组织大量内容。BEDI 设计系统的标签页支持禁用状态、自定义样式、动态内容等功能，适用于设置页面、数据展示、表单分步等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基础展示"
        description="默认选中的第一个标签页。"
        code={`const items = [
  { key: '1', label: '标签一', children: '内容一' },
  { key: '2', label: '标签二', children: '内容二' },
  { key: '3', label: '标签三', children: '内容三' },
];

<Tabs items={items} />`}
      >
        <div style={{ maxWidth: '600px' }}>
          <Tabs items={items} />
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'items', type: 'Array<{ key: string; label: string; children: ReactNode; disabled?: boolean }>', required: true, description: '标签页配置数组' },
          { prop: 'defaultActiveKey', type: 'string', description: '默认选中标签的 key（非受控）' },
          { prop: 'onChange', type: '(key: string) => void', description: '切换标签页时的回调' },
        ]} />
      </div>
    </motion.div>
  )
}

function AlertPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">警告提示 Alert</h2>
        <p className="color-subtitle">用于显示页面或局部的重要提示信息。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          警告提示是一种常见的反馈组件，用于向用户传递重要信息、操作结果或系统状态。BEDI 设计系统的警告提示支持多种类型、自定义标题、关闭按钮等功能，适用于表单验证、操作反馈、系统通知等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="提示类型"
        description="提供四种不同语义的提示。"
        code={`<Alert type="info">这是一条信息提示。</Alert>
<Alert type="success">这是一条成功提示。</Alert>
<Alert type="warning">这是一条警告提示。</Alert>
<Alert type="error">这是一条错误提示。</Alert>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert type="info">这是一条信息提示。</Alert>
          <Alert type="success">这是一条成功提示。</Alert>
          <Alert type="warning">这是一条警告提示。</Alert>
          <Alert type="error">这是一条错误提示。</Alert>
        </div>
      </ComponentDemo>
      </div>

      {/* 进阶用法 */}
      <div className="color-section">
        <h3 className="color-section-title">进阶用法</h3>
      <ComponentDemo
        title="包含标题与关闭"
        description="可以添加标题使信息更明确，或者添加关闭按钮。"
        code={`<Alert type="success" title="提交成功">您的申请已通过审核，请注意查收邮件。</Alert>
<Alert type="error" title="权限错误" closable>您没有访问此页面的权限，请联系管理员。</Alert>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Alert type="success" title="提交成功">您的申请已通过审核，请注意查收邮件。</Alert>
          <Alert type="error" title="权限错误" closable onClose={() => alert('Alert closed')}>您没有访问此页面的权限，请联系管理员。</Alert>
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'type', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: '提示类型' },
          { prop: 'title', type: 'string', description: '提示标题' },
          { prop: 'closable', type: 'boolean', default: 'false', description: '是否显示关闭按钮' },
          { prop: 'onClose', type: '() => void', description: '点击关闭按钮的回调' },
          { prop: 'showIcon', type: 'boolean', default: 'true', description: '是否显示图标' },
          { prop: 'children', type: 'ReactNode', description: '提示内容' },
        ]} />
      </div>
    </motion.div>
  )
}

function BadgePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">徽标 Badge</h2>
        <p className="color-subtitle">徽标通常用于提示消息数量、状态标识等场景。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          徽标是一种常见的标识组件，用于在元素上显示额外的信息或状态。BEDI 设计系统的徽标支持数字显示、状态指示、自定义样式等功能，适用于消息通知、状态标识、数据标记等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="数字徽标"
        description="显示数字的徽标，支持最大值限制。"
        code={`<Badge count={5}>
  <Button>消息</Button>
</Badge>
<Badge count={99}>
  <Button>通知</Button>
</Badge>
<Badge count={100} max={99}>
  <Button>更多</Button>
</Badge>`}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Badge count={5}>
            <Button>消息</Button>
          </Badge>
          <Badge count={99}>
            <Button>通知</Button>
          </Badge>
          <Badge count={100} max={99}>
            <Button>更多</Button>
          </Badge>
        </div>
      </ComponentDemo>
      </div>

      {/* 状态徽标 */}
      <div className="color-section">
        <h3 className="color-section-title">状态徽标</h3>
      <ComponentDemo
        title="状态指示"
        description="用于表示不同状态的徽标。"
        code={`<Badge status="success" text="成功" />
<Badge status="error" text="错误" />
<Badge status="warning" text="警告" />
<Badge status="info" text="信息" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Badge status="success" text="成功" />
          <Badge status="error" text="错误" />
          <Badge status="warning" text="警告" />
          <Badge status="info" text="信息" />
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'count', type: 'number', description: '数字徽标显示的数值' },
          { prop: 'max', type: 'number', default: '99', description: '最大显示数值，超出时显示 max+' },
          { prop: 'dot', type: 'boolean', default: 'false', description: '仅显示小圆点，不显示数字' },
          { prop: 'status', type: "'success' | 'error' | 'warning' | 'info'", description: '状态徽标语义色' },
          { prop: 'text', type: 'string', description: '状态徽标旁的描述文字' },
          { prop: 'children', type: 'ReactNode', description: '徽标附着的子元素' },
        ]} />
      </div>
    </motion.div>
  )
}

function AvatarPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">头像 Avatar</h2>
        <p className="color-subtitle">用于展示用户或事物的头像图片，支持图片、图标、文字等多种形式。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          头像是一种常见的用户标识组件，用于显示用户或实体的视觉表示。BEDI 设计系统的头像支持图片、图标、文字等多种形式，以及不同尺寸和形状，适用于用户资料、评论系统、团队展示等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="不同类型"
        description="支持图片、图标、文字三种类型的头像。"
        code={`<Avatar src="/avatar.jpg" />
<Avatar icon="👤" />
<Avatar>U</Avatar>`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar>U</Avatar>
          <Avatar icon="👤" />
          <Avatar>用户</Avatar>
        </div>
      </ComponentDemo>
      </div>

      {/* 尺寸与形状 */}
      <div className="color-section">
        <h3 className="color-section-title">尺寸与形状</h3>
      <ComponentDemo
        title="不同尺寸和形状"
        description="支持多种尺寸和圆形、方形两种形状。"
        code={`<Avatar size="small">U</Avatar>
<Avatar size="default">U</Avatar>
<Avatar size="large">U</Avatar>
<Avatar shape="square">U</Avatar>`}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar size="small">U</Avatar>
          <Avatar size="default">U</Avatar>
          <Avatar size="large">U</Avatar>
          <Avatar shape="square">U</Avatar>
        </div>
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function TooltipPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">文字提示 Tooltip</h2>
        <p className="color-subtitle">鼠标悬停在元素上时显示的提示信息。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          文字提示是一种常见的交互反馈组件，用于在用户悬停时提供额外的信息或说明。BEDI 设计系统的文字提示支持多种位置、自定义样式、富文本内容等功能，适用于表单说明、操作提示、数据展示等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="不同位置"
        description="支持上下左右四个方向的提示。"
        code={`<Tooltip title="顶部提示" placement="top">
  <Button>上边</Button>
</Tooltip>
<Tooltip title="底部提示" placement="bottom">
  <Button>下边</Button>
</Tooltip>`}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Tooltip title="顶部提示" placement="top">
            <Button>上边</Button>
          </Tooltip>
          <Tooltip title="底部提示" placement="bottom">
            <Button>下边</Button>
          </Tooltip>
          <Tooltip title="左侧提示" placement="left">
            <Button>左边</Button>
          </Tooltip>
          <Tooltip title="右侧提示" placement="right">
            <Button>右边</Button>
          </Tooltip>
        </div>
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function DropdownPage() {
  const items = [
    { key: '1', label: '菜单项 1', onClick: () => console.log('点击1') },
    { key: '2', label: '菜单项 2', onClick: () => console.log('点击2') },
    { key: '3', label: '菜单项 3', onClick: () => console.log('点击3') },
    { key: '4', label: '危险操作', danger: true, onClick: () => console.log('危险') },
  ]

  const itemsWithIcons = [
    { key: '1', label: '新建文件', icon: '📄', onClick: () => console.log('新建') },
    { key: '2', label: '编辑', icon: '✏️', onClick: () => console.log('编辑') },
    { key: '3', label: '删除', icon: '🗑️', danger: true, onClick: () => console.log('删除') },
    { key: '4', label: '分享', icon: '🔗', onClick: () => console.log('分享') },
  ]

  const longItems = [
    { key: '1', label: '这是一个很长的菜单项名称用于测试文本溢出效果', onClick: () => console.log('长文本') },
    { key: '2', label: '短文本', onClick: () => console.log('短文本') },
    { key: '3', label: '中等长度的文本内容', onClick: () => console.log('中等') },
    { key: '4', label: '超长超长的菜单项名称用于测试文本溢出和省略号显示效果', onClick: () => console.log('超长') },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">下拉菜单 Dropdown</h2>
        <p className="color-subtitle">点击或悬停时显示的菜单列表。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          下拉菜单是一种常见的交互组件，用于在有限空间内提供多个操作选项。BEDI 设计系统的下拉菜单支持多种触发方式、自定义样式、分组显示等功能，适用于操作菜单、设置选项、导航菜单等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="点击触发下拉菜单。"
        code={`const items = [
  { key: '1', label: '菜单项 1' },
  { key: '2', label: '菜单项 2' },
]

<Dropdown items={items}>
  <Button>下拉菜单</Button>
</Dropdown>`}
      >
        <div style={{ display: 'flex', gap: '16px' }}>
          <Dropdown items={items}>
            <Button>下拉菜单</Button>
          </Dropdown>
          <Dropdown items={items} placement="bottom-right">
            <Button>右对齐</Button>
          </Dropdown>
        </div>
      </ComponentDemo>

      <h2 className="demo-group-label">触发方式</h2>
      <ComponentDemo
        title="多种触发方式"
        description="支持点击、悬停和右键菜单。"
        code={`<Dropdown items={items} trigger="click">
  <Button>点击触发</Button>
</Dropdown>
<Dropdown items={items} trigger="hover">
  <Button>悬停触发</Button>
</Dropdown>
<Dropdown items={items} trigger="context">
  <Button>右键菜单</Button>
</Dropdown>`}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Dropdown items={items} trigger="click">
            <Button>点击触发</Button>
          </Dropdown>
          <Dropdown items={items} trigger="hover">
            <Button>悬停触发</Button>
          </Dropdown>
          <Dropdown items={items} trigger="context">
            <Button>右键菜单</Button>
          </Dropdown>
        </div>
      </ComponentDemo>

      <h2 className="demo-group-label">带图标</h2>
      <ComponentDemo
        title="图标支持"
        description="支持为菜单项添加图标。"
        code={`const items = [
  { key: '1', label: '新建文件', icon: '📄' },
  { key: '2', label: '编辑', icon: '✏️' },
  { key: '3', label: '删除', icon: '🗑️', danger: true },
]

<Dropdown items={items}>
  <Button>带图标的菜单</Button>
</Dropdown>`}
      >
        <Dropdown items={itemsWithIcons}>
          <Button>带图标的菜单</Button>
        </Dropdown>
      </ComponentDemo>

      <h2 className="demo-group-label">长文本处理</h2>
      <ComponentDemo
        title="文本溢出"
        description="长文本会自动显示省略号。"
        code={`<Dropdown items={longItems}>
  <Button>长文本菜单</Button>
</Dropdown>`}
      >
        <Dropdown items={longItems}>
          <Button>长文本菜单</Button>
        </Dropdown>
      </ComponentDemo>

      <h2 className="demo-group-label">边缘测试</h2>
      <ComponentDemo
        title="视口边缘处理"
        description="当下拉菜单靠近屏幕边缘时，会自动调整位置防止飞出画面。"
        code={`<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
  <Dropdown items={items} placement="bottom-left">
    <Button>左边缘</Button>
  </Dropdown>
  <Dropdown items={items} placement="bottom-right">
    <Button>右边缘</Button>
  </Dropdown>
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <Dropdown items={items} placement="top-left">
    <Button>顶部中央</Button>
  </Dropdown>
</div>`}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Dropdown items={items} placement="bottom-left">
            <Button>左边缘</Button>
          </Dropdown>
          <Dropdown items={items} placement="bottom-right">
            <Button>右边缘</Button>
          </Dropdown>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Dropdown items={items} placement="top-left">
            <Button>顶部中央</Button>
          </Dropdown>
        </div>
      </ComponentDemo>

      <h2 className="demo-group-label">键盘支持</h2>
      <ComponentDemo
        title="无障碍访问"
        description="支持ESC键关闭菜单，点击外部区域自动关闭。"
        code={`<Dropdown items={items}>
  <Button>按ESC键关闭</Button>
</Dropdown>`}
      >
        <div>
          <Dropdown items={items}>
            <Button>按ESC键关闭</Button>
          </Dropdown>
        </div>
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function BreadcrumbPage() {
  const items = [
    { key: '1', title: '首页', href: '/' },
    { key: '2', title: '组件', href: '/components' },
    { key: '3', title: '导航' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">面包屑 Breadcrumb</h2>
        <p className="color-subtitle">显示当前页面在导航层级中的位置。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          面包屑是一种常见的导航组件，用于显示用户当前位置和导航路径。BEDI 设计系统的面包屑支持点击跳转、自定义样式、分隔符自定义等功能，适用于网站导航、文件路径、多级菜单等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`const items = [
  { key: '1', title: '首页', href: '/' },
  { key: '2', title: '组件', href: '/components' },
  { key: '3', title: '导航' },
]

<Breadcrumb items={items} />`}
      >
        <Breadcrumb items={items} />
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function ModalPage() {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">对话框 Modal</h2>
        <p className="color-subtitle">需要用户处理重要事务时，在页面中央弹出模态对话框。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          对话框是一种常见的交互组件，用于在用户处理重要事务时中断当前流程。BEDI 设计系统的对话框支持自定义尺寸、按钮组合、异步关闭等功能，适用于确认操作、表单输入、信息展示等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`const [open, setOpen] = useState(false)

<Modal open={open} onClose={() => setOpen(false)} title="基本对话框">
  <p>这是对话框的内容。</p>
  <p>可以包含任意内容。</p>
</Modal>

<Button onClick={() => setOpen(true)}>打开对话框</Button>`}
      >
        <div>
          <Button onClick={() => setOpen(true)}>打开对话框</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="基本对话框"
            footer={
              <>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  取消
                </Button>
                <Button onClick={() => setOpen(false)}>
                  确定
                </Button>
              </>
            }
          >
            <p>这是对话框的内容。</p>
            <p>可以包含任意内容。</p>
          </Modal>
        </div>
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'open', type: 'boolean', required: true, description: '是否显示对话框' },
          { prop: 'title', type: 'string', description: '对话框标题' },
          { prop: 'onClose', type: '() => void', required: true, description: '关闭对话框的回调（点击遮罩或关闭按钮）' },
          { prop: 'footer', type: 'ReactNode', description: '自定义底部操作区内容' },
          { prop: 'width', type: 'number | string', default: '520', description: '对话框宽度' },
          { prop: 'maskClosable', type: 'boolean', default: 'true', description: '点击遮罩层是否关闭对话框' },
          { prop: 'children', type: 'ReactNode', description: '对话框内容' },
        ]} />
      </div>
    </motion.div>
  )
}

function DatePickerPage() {
  const [date, setDate] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">日期选择器 DatePicker</h2>
        <p className="color-subtitle">用于选择日期的组件。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          日期选择器是一种常见的输入组件，用于选择日期信息。BEDI 设计系统的日期选择器支持多种格式、日期范围、禁用日期等功能，适用于表单输入、预约系统、数据筛选等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`<DatePicker placeholder="请选择日期" onChange={(date) => console.log(date)} />`}
      >
        <div style={{ maxWidth: '300px' }}>
          <DatePicker 
            placeholder="请选择日期" 
            onChange={(date) => setDate(date)}
            value={date}
          />
        </div>
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function PaginationPage() {
  const [current, setCurrent] = useState(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">分页 Pagination</h2>
        <p className="color-subtitle">用于分页导航的组件。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          分页是一种常见的导航组件，用于在大量数据中进行页面切换。BEDI 设计系统的分页支持多种样式、跳转功能、自定义显示等功能，适用于数据列表、搜索结果、内容浏览等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`<Pagination current={1} total={50} onChange={(page) => console.log(page)} />`}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination current={current} total={50} onChange={setCurrent} />
        </div>
      </ComponentDemo>
      </div>

      {/* 高级用法 */}
      <div className="color-section">
        <h3 className="color-section-title">高级用法</h3>
      <ComponentDemo
        title="高级用法"
        description="支持显示总数、快速跳转、改变每页显示数量等功能。"
        code={`<Pagination 
  current={1}
  total={200}
  showTotal
  showQuickJumper
  showSizeChanger
  onChange={(page, pageSize) => console.log(page, pageSize)}
/>`}
      >
        <Pagination 
          current={current}
          total={200}
          showTotal
          showQuickJumper
          showSizeChanger
          onChange={(page, pageSize) => setCurrent(page)}
        />
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function TablePage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ]

  const data = [
    { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
    { key: '2', name: '李四', age: 28, address: '上海市浦东新区' },
    { key: '3', name: '王五', age: 35, address: '广州市天河区' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">表格 Table</h2>
        <p className="color-subtitle">用于展示多条结构化数据的组件。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          表格是一种常见的数据展示组件，用于以行列形式展示结构化数据。BEDI 设计系统的表格支持排序、筛选、选择、分页等功能，适用于数据列表、报表展示、管理后台等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
]

const data = [
  { key: '1', name: '张三', age: 32 },
  { key: '2', name: '李四', age: 28 },
]

<Table columns={columns} dataSource={data} />`}
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          hoverable
        />
      </ComponentDemo>
      </div>

      {/* Props API */}
      <div className="color-section">
        <h3 className="color-section-title">Props API</h3>
        <PropsTable rows={[
          { prop: 'columns', type: 'Array<{ title: string; dataIndex: string; key: string; render?: (value, record, index) => ReactNode }>', required: true, description: '列定义配置' },
          { prop: 'dataSource', type: 'Array<Record<string, any>>', required: true, description: '表格数据（每条记录需含唯一 key 字段）' },
          { prop: 'bordered', type: 'boolean', default: 'false', description: '是否显示边框' },
          { prop: 'hoverable', type: 'boolean', default: 'false', description: '是否开启行悬停高亮' },
          { prop: 'loading', type: 'boolean', default: 'false', description: '是否显示加载状态' },
          { prop: 'rowSelection', type: '{ selectedRowKeys: string[]; onChange: (keys: string[]) => void }', description: '行选择配置' },
          { prop: 'pagination', type: 'boolean | object', default: 'false', description: '分页配置' },
        ]} />
      </div>
    </motion.div>
  )
}

function RatePage() {
  const [value, setValue] = useState(2.5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">评分 Rate</h2>
        <p className="color-subtitle">用于评价的评分组件。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          评分是一种常见的评价组件，用于用户对内容或服务进行星级评价。BEDI 设计系统的评分支持半星评分、自定义图标、只读模式等功能，适用于商品评价、内容评分、服务反馈等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`<Rate value={2.5} onChange={(value) => console.log(value)} />`}
      >
        <Rate value={value} onChange={setValue} />
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function SliderPage() {
  const [value, setValue] = useState(30)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">滑动输入条 Slider</h2>
        <p className="color-subtitle">用于在数值区间内进行选择。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          滑动输入条是一种常见的数值选择组件，用于在指定范围内选择数值。BEDI 设计系统的滑动条支持垂直模式、自定义刻度、步长设置等功能，适用于音量调节、价格筛选、进度控制等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
        <ComponentDemo
          title="基本使用"
          description="最简单的用法。"
          code={`<Slider value={30} onChange={(value) => console.log(value)} />`}
        >
          <div style={{ maxWidth: '400px' }}>
            <Slider value={value} onChange={setValue} />
          </div>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function StepsPage() {
  const [current, setCurrent] = useState(1)

  const steps = [
    { title: '第一步', description: '这是第一步的描述' },
    { title: '第二步', description: '这是第二步的描述' },
    { title: '第三步', description: '这是第三步的描述' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">步骤条 Steps</h2>
        <p className="color-subtitle">引导用户按照流程完成任务的导航条。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          步骤条是一种常见的流程导航组件，用于引导用户按照特定顺序完成任务。BEDI 设计系统的步骤条支持多种方向、自定义样式、状态指示等功能，适用于向导流程、注册步骤、任务进度等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`const steps = [
  { title: '第一步', description: '这是第一步的描述' },
  { title: '第二步', description: '这是第二步的描述' },
  { title: '第三步', description: '这是第三步的描述' },
]

<Steps current={1} items={steps} />`}
      >
        <Steps current={current} items={steps} onChange={setCurrent} />
      </ComponentDemo>
      </div>
      <h2 className="demo-group-label">可点击</h2>
      <ComponentDemo
        title="点击切换"
        description="可以点击步骤进行切换。"
        code={`<Steps 
  current={current} 
  items={steps}
  onChange={setCurrent}
/>`}
      >
        <Steps 
          current={current} 
          items={steps}
          onChange={setCurrent}
        />
      </ComponentDemo>

      <h2 className="demo-group-label">垂直方向</h2>
      <ComponentDemo
        title="垂直步骤条"
        description="垂直方向的步骤条。"
        code={`<Steps 
  current={current}
  direction="vertical"
  items={steps}
/>`}
      >
        <div style={{ maxWidth: '300px' }}>
          <Steps 
            current={current}
            direction="vertical"
            items={steps}
          />
        </div>
      </ComponentDemo>
    </motion.div>
  )
}

function UploadPage() {
  const [fileList, setFileList] = useState<any[]>([])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">上传 Upload</h2>
        <p className="color-subtitle">文件选择上传和拖拽上传组件。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          上传是一种常见的文件操作组件，用于用户选择和上传文件。BEDI 设计系统的上传组件支持拖拽上传、多文件上传、文件预览等功能，适用于表单提交、文件管理、内容上传等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`<Upload onChange={(fileList) => console.log(fileList)} />`}
      >
        <Upload onChange={setFileList} />
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function EmptyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">空状态 Empty</h2>
        <p className="color-subtitle">空状态时的展示占位图。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          空状态是一种常见的占位组件，用于在数据为空时提供友好的视觉反馈。BEDI 设计系统的空状态支持自定义图片、描述文字、操作按钮等功能，适用于数据列表、搜索结果、表单提交等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`<Empty />`}
      >
        <Empty />
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

function SkeletonPage() {
  const [loading, setLoading] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-header">
        <h2 className="color-title">骨架屏 Skeleton</h2>
        <p className="color-subtitle">在内容加载过程中提供占位图形。</p>
        <div className="color-divider"></div>
      </div>
      
      {/* 概述 */}
      <div className="color-section">
        <h3 className="color-section-title">概述</h3>
        <p className="content-description">
          骨架屏是一种常见的加载占位组件，用于在内容加载过程中提供视觉反馈。BEDI 设计系统的骨架屏支持多种形状、自定义样式、动画效果等功能，适用于数据加载、页面初始化、异步操作等场景。
        </p>
      </div>

      {/* 基础用法 */}
      <div className="color-section">
        <h3 className="color-section-title">基础用法</h3>
      <ComponentDemo
        title="基本使用"
        description="最简单的用法。"
        code={`<Skeleton loading={true} />`}
      >
        <Skeleton loading={loading} />
      </ComponentDemo>
      </div>
    </motion.div>
  )
}

// 新增的基础组件页面
function LinkPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">基础链接</h3>
        <ComponentDemo
          title="基本使用"
          description="最简单的链接用法。"
          code={`<Link href="https://example.com">默认链接</Link>
<Link href="https://example.com" underline={false}>无下划线链接</Link>`}
        >
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <Link href="https://example.com">默认链接</Link>
            <Link href="https://example.com" underline={false}>无下划线链接</Link>
          </div>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function IconPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">基础图标</h3>
        <ComponentDemo
          title="基本使用"
          description="最简单的图标用法。"
          code={`<Icon name="home" size={16} />
<Icon name="user" size={24} color="#1890ff" />`}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Icon name="home" size={16} />
            <Icon name="user" size={24} color="#1890ff" />
          </div>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

// 新增的布局组件页面
function DividerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">分割线</h3>
        <ComponentDemo
          title="水平分割线"
          description="默认为水平分割线。"
          code={`<Divider />
<Divider>带文字的分割线</Divider>`}
        >
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <Divider />
            <Divider>带文字的分割线</Divider>
          </div>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function SpacePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">间距组件</h3>
        <ComponentDemo
          title="基本使用"
          description="为组件提供统一的间距。"
          code={`<Space>
  <Button>按钮1</Button>
  <Button>按钮2</Button>
  <Button>按钮3</Button>
</Space>`}
        >
          <Space>
            <Button>按钮1</Button>
            <Button>按钮2</Button>
            <Button>按钮3</Button>
          </Space>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function GridPage() {
  const { Row, Col } = Grid;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">栅格系统</h3>
        <ComponentDemo
          title="基本使用"
          description="24栅格系统。"
          code={`<Row>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
  <Col span={8}>col-8</Col>
</Row>`}
        >
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
          </Row>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function LayoutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">布局组件</h3>
        <ComponentDemo
          title="基本使用"
          description="典型的页面布局。"
          code={`<Layout>
  <Header>Header</Header>
  <Content>Content</Content>
  <Footer>Footer</Footer>
</Layout>`}
        >
          <Layout style={{ height: '300px' }}>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

// 新增的导航组件页面
function AffixPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">固钉组件</h3>
        <ComponentDemo
          title="基本使用"
          description="固定元素到页面顶部。"
          code={`<Affix offsetTop={20}>
  <Button>固定在顶部20px</Button>
</Affix>`}
        >
          <Affix offsetTop={20}>
            <Button>固定在顶部20px</Button>
          </Affix>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function AnchorPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">锚点组件</h3>
        <ComponentDemo
          title="基本使用"
          description="页面内导航。"
          code={`<Anchor>
  <AnchorLink href="#section1" title="第一部分" />
  <AnchorLink href="#section2" title="第二部分" />
</Anchor>`}
        >
          <Anchor>
            <AnchorLink href="#section1" title="第一部分" />
            <AnchorLink href="#section2" title="第二部分" />
          </Anchor>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function MenuPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">导航菜单</h3>
        <ComponentDemo
          title="基本使用"
          description="垂直导航菜单。"
          code={`<Menu mode="vertical">
  <MenuItem key="1">菜单项1</MenuItem>
  <MenuItem key="2">菜单项2</MenuItem>
</Menu>`}
        >
          <Menu mode="vertical" style={{ width: '200px' }}>
            <MenuItem key="1">菜单项1</MenuItem>
            <MenuItem key="2">菜单项2</MenuItem>
          </Menu>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

function BackTopPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">回到顶部</h3>
        <ComponentDemo
          title="基本使用"
          description="点击按钮回到页面顶部。"
          code={`<BackTop />`}
        >
          <BackTop />
        </ComponentDemo>
      </div>
      
      {/* 添加一些内容以便滚动 */}
      <div style={{ height: '2000px', padding: '20px', background: '#f5f5f5', marginTop: '20px' }}>
        <p>滚动页面查看回到顶部按钮效果</p>
        <p>继续滚动...</p>
        <p>再继续滚动...</p>
        <p>快到底了...</p>
        <p>现在应该能看到回到顶部按钮了</p>
      </div>
    </motion.div>
  )
}

function StickyToolPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">侧边工具栏</h3>
        <ComponentDemo
          title="基本使用"
          description="固定在页面侧边的工具栏。"
          code={`<StickyTool position="right" offset={100}>
  <StickyTool.Item key="1" icon="🏠" title="首页" />
  <StickyTool.Item key="2" icon="📧" title="邮件" />
  <StickyTool.Item key="3" icon="⚙️" title="设置" />
</StickyTool>`}
        >
          <StickyTool position="right" offset={100}>
            <StickyToolItem key="1" icon="🏠" title="首页" />
            <StickyToolItem key="2" icon="📧" title="邮件" />
            <StickyToolItem key="3" icon="⚙️" title="设置" />
          </StickyTool>
        </ComponentDemo>
      </div>
    </motion.div>
  )
}

// 占位符页面函数 - 为未实现的组件提供统一的占位符
function createPlaceholderPage(componentName: string) {
  return () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="color-section">
        <h3 className="color-section-title">{componentName}</h3>
        <div style={{ 
          padding: '60px 40px', 
          textAlign: 'center', 
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
          <h4 style={{ color: '#495057', marginBottom: '8px' }}>敬请期待</h4>
          <p style={{ color: '#6c757d', margin: 0 }}>
            该组件正在开发中，即将推出完整功能
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// 为所有未实现的组件创建占位符页面
const AutoCompletePage = createPlaceholderPage('自动填充 AutoComplete');
const CascaderPage = createPlaceholderPage('级联组件 Cascader');
const ColorPickerPage = createPlaceholderPage('颜色选择器 ColorPicker');
const FormPage = createPlaceholderPage('表单 Form');
const InputAdornmentPage = createPlaceholderPage('输入装饰器 InputAdornment');
const InputNumberPage = createPlaceholderPage('数字输入框 InputNumber');
const TagInputPage = createPlaceholderPage('标签输入框 TagInput');
const RangeInputPage = createPlaceholderPage('范围输入框 RangeInput');
const SelectInputPage = createPlaceholderPage('筛选器输入框 SelectInput');
const TextareaPage = createPlaceholderPage('多行文本框 Textarea');
const TimePickerPage = createPlaceholderPage('时间选择器 TimePicker');
const TreeSelectPage = createPlaceholderPage('树选择 TreeSelect');
const CommentPage = createPlaceholderPage('评论 Comment');
const DescriptionsPage = createPlaceholderPage('描述 Descriptions');
const ImageViewerPage = createPlaceholderPage('图片预览 ImageViewer');
const QRCodePage = createPlaceholderPage('二维码 QRCode');
const StatisticPage = createPlaceholderPage('统计数值 Statistic');
const SwiperPage = createPlaceholderPage('轮播框 Swiper');
const WatermarkPage = createPlaceholderPage('水印 Watermark');
const GuidePage = createPlaceholderPage('引导 Guide');
const NotificationPage = createPlaceholderPage('消息通知 Notification');
