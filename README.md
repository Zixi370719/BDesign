# BEDI 设计系统网站

一个完整的企业级设计系统网站，基于BEDI (Beautiful, Efficient, Dynamic, Intuitive) 设计规范构建。

## 功能特性

✅ **首页展示区** - BEDI品牌介绍、核心特性和精美视觉效果
✅ **设计规范模块** - 完整的BEDI设计系统规范
  - **色彩系统**: 6个色系（蓝、绿、橙、红、紫、中性）共60+种颜色
  - **字体层级**: 11个层级，从10px到72px
  - **间距标准**: 基于8px的13级间距系统
  - **圆角规范**: 8个层级的圆角定义
  - **阴影层级**: 5个层级的阴影效果
  - **渐变色**: 6种预设渐变色方案
✅ **基础组件库** - 按钮、输入框、卡片、标签页、开关、徽标等交互组件
✅ **中英文双语切换** - 支持中英文界面切换
✅ **深浅色主题** - 支持亮色/暗色主题切换
✅ **响应式设计** - 完美适配各种屏幕尺寸
✅ **流畅动画** - 基于Framer Motion的精美过渡动效

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **React Router** - 路由管理
- **Framer Motion** - 动画库
- **CSS Variables** - 主题系统

## 安装和运行

### 前置要求

确保已安装以下软件：
- Node.js (>= 16.x)
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

项目将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 项目结构

```
├── src/
│   ├── components/         # 通用组件
│   │   ├── Header.tsx     # 顶部导航
│   │   └── Header.css
│   ├── pages/             # 页面组件
│   │   ├── Home.tsx       # 首页
│   │   ├── Design.tsx     # 设计规范
│   │   └── Components.tsx # 组件库
│   ├── context/           # React Context
│   │   ├── ThemeContext.tsx      # 主题管理
│   │   └── LanguageContext.tsx   # 语言管理
│   ├── i18n/              # 国际化
│   │   └── translations.ts
│   ├── App.tsx            # 应用入口
│   ├── main.tsx           # 渲染入口
│   └── index.css          # 全局样式
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 核心功能说明

### 1. 首页 (/)
- Hero区域：展示BEDI品牌、产品描述和行动按钮
- 特性展示：6个核心特性的卡片展示，包含详细说明
- CTA区域：引导用户开始使用
- 精美的渐变背景和网格动画效果

### 2. 设计规范 (/design)

#### 色彩系统
- **蓝色系 (Blue)**: 品牌主色，10个层级从#E3F0FF到#003184
- **绿色系 (Green)**: 成功色，10个层级从#E3F9E9到#0A3717
- **橙色系 (Orange)**: 警告色，10个层级从#FFF3E3到#5B3B00
- **红色系 (Red)**: 错误色，10个层级从#FFE3E3到#5B0000
- **紫色系 (Purple)**: 辅助色，10个层级从#F3E3FF到#3B005B
- **中性色系 (Neutral)**: 11个层级从纯白到纯黑
- **渐变色**: 6种预设渐变（蓝、绿、橙、红、紫、彩虹）

#### 字体层级（11级）
- Display / 72px - 超大标题
- Headline / 56px - 页面主标题
- Title 1-3 / 48-28px - 各级标题
- Subtitle 1-2 / 24-20px - 副标题
- Body 1-2 / 16-14px - 正文
- Caption / 12px - 辅助文字
- Overline / 10px - 标签文字

#### 间距标准（13级）
基于8px基准：0px, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 64px, 80px

#### 圆角规范（8级）
None/0px, XS/2px, SM/4px, MD/6px, LG/8px, XL/12px, XXL/16px, Full/999px

#### 阴影层级（5级）
从最小阴影（悬浮提示）到特大阴影（模态框）

### 3. 组件库 (/components)
- **按钮 Button**：主要、次要、文字按钮及禁用状态
- **输入框 Input**：普通和禁用状态
- **卡片 Card**：包含头部、内容、底部的完整卡片
- **标签页 Tabs**：多标签切换组件
- **开关 Switch**：开关切换组件
- **徽标 Badge**：多种颜色状态的徽标

### 4. 主题切换
- 点击导航栏的主题图标切换
- 支持亮色和暗色两种模式
- 使用CSS Variables实现，切换流畅
- 主题状态持久化到localStorage

### 5. 语言切换
- 点击导航栏的语言按钮切换
- 支持中文和英文
- 所有文本内容完全国际化
- 语言偏好持久化到localStorage

## 设计特点

- **BEDI设计理念**：Beautiful（美观）、Efficient（高效）、Dynamic（动态）、Intuitive（直观）
- **现代化UI**：采用简洁、专业的设计风格，渐变色和动效增强视觉体验
- **完整规范**：60+种颜色、11级字体、13级间距、8级圆角、5级阴影
- **一致性**：统一的设计语言和交互规范
- **可访问性**：良好的对比度和交互反馈，支持WCAG 2.1标准
- **动效设计**：精心设计的过渡和悬停效果
- **响应式**：移动端友好的自适应布局

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## License

MIT
