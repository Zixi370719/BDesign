# BEDI 设计系统 - 快速开始

## 🎉 项目简介

BEDI 设计系统是一个现代化的企业级设计系统，提供完整的设计规范、组件库和最佳实践。

**核心特性：**
- 🎨 完整的设计规范（60+颜色、11种字体、13级间距）
- 🧩 11个可复用的 UI 组件
- 💡 实时预览和属性配置
- 📋 一键复制代码
- 🌓 深色/浅色主题切换
- 🌍 中英文双语支持
- ♿ 无障碍支持

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 构建生产版本

```bash
npm run build
```

构建产物在 `dist` 目录。

## 📁 项目结构

```
├── src/
│   ├── components/         # 组件
│   │   ├── ui/            # UI 组件库
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── CodeEditor.tsx      # 代码编辑器
│   │   ├── ComponentDemo.tsx   # 组件演示容器
│   │   └── Header.tsx          # 导航头
│   ├── pages/             # 页面
│   │   ├── Home.tsx       # 首页
│   │   ├── Design.tsx     # 设计规范
│   │   └── Components.tsx # 组件库
│   ├── context/           # 上下文
│   │   ├── ThemeContext.tsx     # 主题切换
│   │   └── LanguageContext.tsx  # 语言切换
│   ├── i18n/              # 国际化
│   │   └── translations.ts
│   ├── App.tsx            # 主应用
│   ├── main.tsx           # 入口文件
│   └── index.css          # 全局样式
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 组件页面特性

访问 `/components` 页面体验：

### 1. 实时预览
所有组件都有真实可交互的演示，可以直接操作查看效果。

### 2. 属性配置面板
部分组件提供可视化配置面板，可以实时调整属性查看效果：
- Button: variant, size, loading, disabled
- Switch: size
- Progress: percent

### 3. 显示/隐藏代码
每个组件示例都可以点击"显示代码"按钮查看源码。

### 4. 一键复制
代码区域右上角有复制按钮，点击即可复制代码到剪贴板。

### 5. 综合示例
页面底部展示了如何组合多个组件构建完整的用户界面。

## 🔧 使用组件

### 导入单个组件

```tsx
import Button from './components/ui/Button'
import Input from './components/ui/Input'

function MyApp() {
  return (
    <div>
      <Input placeholder="输入内容" />
      <Button variant="primary">提交</Button>
    </div>
  )
}
```

### 批量导入

```tsx
import { Button, Input, Card, Alert } from './components/ui'

function MyApp() {
  return (
    <Card title="用户表单">
      <Alert type="info">请填写以下信息</Alert>
      <Input label="用户名" />
      <Button variant="primary">提交</Button>
    </Card>
  )
}
```

## 🎯 可用组件

| 组件 | 描述 | 主要属性 |
|------|------|---------|
| Button | 按钮 | variant, size, loading, disabled |
| Input | 输入框 | label, error, prefix, suffix |
| Select | 选择器 | label, options, value |
| Checkbox | 复选框 | label, checked |
| Radio | 单选框 | label, name, value |
| Switch | 开关 | label, size, checked |
| Tag | 标签 | color, closable |
| Alert | 警告提示 | type, title, closable |
| Progress | 进度条 | percent, status |
| Tabs | 标签页 | items, defaultActiveKey |
| Card | 卡片 | title, hoverable, actions |

详细文档请访问 `/components` 页面查看交互式演示

## 🎨 主题定制

所有组件都使用 CSS 变量，可以轻松定制主题：

```css
:root {
  /* 品牌色 */
  --color-primary: #2489FF;
  --color-primary-light: #E3F0FF;
  
  /* 功能色 */
  --color-success: #52C41A;
  --color-warning: #FAAD14;
  --color-error: #F5222D;
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  
  /* 阴影 */
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-2: 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

## 🌓 深色模式

系统自动支持深色模式，可以通过右上角的主题切换按钮切换。

深色模式的变量定义在 `src/index.css` 的 `[data-theme="dark"]` 选择器中。

## 🌍 国际化

系统支持中英文切换，翻译文件在 `src/i18n/translations.ts`。

添加新翻译：

```typescript
export const translations = {
  zh: {
    myModule: {
      title: '标题',
      description: '描述'
    }
  },
  en: {
    myModule: {
      title: 'Title',
      description: 'Description'
    }
  }
}
```

## 📚 更多资源

- [README](./README.md) - 项目说明文档
- 访问 `/components` 页面查看完整的组件演示和文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT
