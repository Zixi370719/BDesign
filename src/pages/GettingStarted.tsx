import { motion } from 'framer-motion'
import CodeBlock from '../components/CodeBlock'
import { Button, Alert, Tag } from '../components'
import './GettingStarted.css'

const installCode = `npm install @bedi/design-system
# or
pnpm add @bedi/design-system
# or
yarn add @bedi/design-system`

const peerDepsCode = `npm install react react-dom framer-motion`

const providerCode = `// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@bedi/design-system'
import App from './App'

// Import the component styles
import '@bedi/design-system/src/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)`

const firstComponentCode = `import { Button, Alert, Input } from '@bedi/design-system'

export default function MyForm() {
  return (
    <div>
      <Alert type="info" title="提示">
        请填写以下信息完成注册。
      </Alert>
      <Input label="用户名" placeholder="请输入用户名" />
      <Button variant="primary">提 交</Button>
    </div>
  )
}`

const cssImportCode = `/* Option 1 — Import the full stylesheet */
import '@bedi/design-system/src/index.css'

/* Option 2 — Import only design tokens (CSS variables) */
import '@bedi/design-system/tokens'`

const tsConfigCode = `// tsconfig.json — ensure moduleResolution covers ESM packages
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}`

export default function GettingStarted() {
  return (
    <div className="gs-page">
      <motion.div
        className="gs-container"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Page header */}
        <div className="gs-header">
          <Tag color="primary">v1.0.0</Tag>
          <h1 className="gs-title">快速上手 Getting Started</h1>
          <p className="gs-subtitle">
            几分钟内把 BDesign 集成进你的 React 项目，开始使用 50+ 高质量组件。
          </p>
        </div>

        {/* Step 1 */}
        <section className="gs-section">
          <div className="gs-step-badge">01</div>
          <h2 className="gs-section-title">安装 Installation</h2>
          <p className="gs-section-desc">
            通过包管理器安装 <code>@bedi/design-system</code>。
          </p>
          <CodeBlock code={installCode} language="bash" title="Terminal" />

          <p className="gs-section-desc" style={{ marginTop: 16 }}>
            同时确保安装了 Peer Dependencies：
          </p>
          <CodeBlock code={peerDepsCode} language="bash" title="Peer Dependencies" />
        </section>

        {/* Step 2 */}
        <section className="gs-section">
          <div className="gs-step-badge">02</div>
          <h2 className="gs-section-title">配置 Provider</h2>
          <p className="gs-section-desc">
            在应用根节点包裹 <code>ThemeProvider</code> 并引入样式文件。
          </p>
          <CodeBlock code={providerCode} language="tsx" title="main.tsx" />

          <Alert type="info" title="CSS 引入">
            样式文件需要在 Provider 之前引入，以确保 CSS 变量正确加载。
          </Alert>
        </section>

        {/* Step 3 */}
        <section className="gs-section">
          <div className="gs-step-badge">03</div>
          <h2 className="gs-section-title">使用第一个组件</h2>
          <p className="gs-section-desc">
            从 <code>@bedi/design-system</code> 导入组件并直接使用：
          </p>
          <CodeBlock code={firstComponentCode} language="tsx" title="MyForm.tsx" />

          {/* Live preview */}
          <div className="gs-preview">
            <div className="gs-preview-label">实时预览</div>
            <div className="gs-preview-content">
              <Alert type="info" title="提示">
                请填写以下信息完成注册。
              </Alert>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Button variant="primary">提 交</Button>
                <Button variant="secondary">取 消</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="gs-section">
          <div className="gs-step-badge">04</div>
          <h2 className="gs-section-title">CSS 引入方式</h2>
          <p className="gs-section-desc">
            BDesign 使用 CSS 变量实现主题系统，支持两种引入方式：
          </p>
          <CodeBlock code={cssImportCode} language="css" title="样式引入" />
        </section>

        {/* Step 5 */}
        <section className="gs-section">
          <div className="gs-step-badge">05</div>
          <h2 className="gs-section-title">TypeScript 配置</h2>
          <p className="gs-section-desc">
            确保 <code>tsconfig.json</code> 正确配置以支持 ESM 模块解析：
          </p>
          <CodeBlock code={tsConfigCode} language="json" title="tsconfig.json" />
        </section>

        {/* Next steps */}
        <section className="gs-section gs-next">
          <h2 className="gs-section-title">下一步 Next Steps</h2>
          <div className="gs-next-grid">
            <a href="/components" className="gs-next-card">
              <div className="gs-next-icon">🧩</div>
              <div>
                <div className="gs-next-card-title">浏览组件</div>
                <div className="gs-next-card-desc">50+ 组件，带 Props API 和代码示例</div>
              </div>
            </a>
            <a href="/design" className="gs-next-card">
              <div className="gs-next-icon">🎨</div>
              <div>
                <div className="gs-next-card-title">设计语言</div>
                <div className="gs-next-card-desc">颜色、排版、间距、阴影完整规范</div>
              </div>
            </a>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
