# Changelog

All notable changes to BDesign will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-02-28

### Added
- 50+ production-ready React components covering Basic, Layout, Navigation, Input, Display, and Feedback categories
- Full TypeScript support with exported type definitions
- Light / Dark theme system via `ThemeProvider` and CSS custom properties
- Chinese / English bilingual documentation website
- Design language documentation: Colors, Typography, Spacing, Shadows, Motion
- ES Module + CommonJS dual build output via Vite + vite-plugin-dts
- `Getting Started` guide page with installation, Provider setup, and first component example
- `PropsTable` component for consistent API documentation rendering
- `CodeBlock` component with one-click copy functionality
- Vercel deployment configuration for SPA routing
- GitHub Actions CI workflow for type checking and build validation

### Components
**Basic**: Button, Icon, Link
**Layout**: Divider, Grid, Layout, Space
**Navigation**: Affix, Anchor, BackTop, Breadcrumb, Dropdown, Menu, Pagination, Steps, StickyTool, Tabs
**Input**: Checkbox, DatePicker, Input, Radio, Rate, Select, Slider, Switch, Upload
**Display**: Alert, Avatar, Badge, Card, Empty, Progress, Skeleton, Table, Tag, Tooltip
**Feedback**: Modal (Dialog), Drawer

---

## [Unreleased]

### Planned
- `Playground` — in-browser interactive component sandbox
- `Token Browser` — visual CSS variable explorer at `/tokens`
- Accessibility (WCAG 2.1 AA) documentation for each component
- Figma Token sync via `style-dictionary`
- Search with `Fuse.js` (Cmd/Ctrl + K)
- Right-side Table of Contents for long pages
