import React from 'react';
import './Layout.css';

export interface LayoutProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface ContentProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export interface SiderProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  collapsedWidth?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  className = '',
  style = {},
  children
}) => {
  return (
    <div className={`bedi-layout ${className}`} style={style}>
      {children}
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({
  className = '',
  style = {},
  children
}) => {
  return (
    <header className={`bedi-layout-header ${className}`} style={style}>
      {children}
    </header>
  );
};

export const Content: React.FC<ContentProps> = ({
  className = '',
  style = {},
  children
}) => {
  return (
    <main className={`bedi-layout-content ${className}`} style={style}>
      {children}
    </main>
  );
};

export const Footer: React.FC<FooterProps> = ({
  className = '',
  style = {},
  children
}) => {
  return (
    <footer className={`bedi-layout-footer ${className}`} style={style}>
      {children}
    </footer>
  );
};

export const Sider: React.FC<SiderProps> = ({
  className = '',
  style = {},
  width = 200,
  collapsedWidth = 80,
  collapsible = false,
  collapsed = false,
  onCollapse,
  children
}) => {
  const siderStyle: React.CSSProperties = {
    width: collapsed ? collapsedWidth : width,
    ...style
  };

  const siderClassName = [
    'bedi-layout-sider',
    collapsed ? 'bedi-layout-sider-collapsed' : '',
    collapsible ? 'bedi-layout-sider-collapsible' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <aside className={siderClassName} style={siderStyle}>
      {children}
    </aside>
  );
};

export default Layout;
