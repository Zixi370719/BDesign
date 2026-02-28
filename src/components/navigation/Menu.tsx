import React, { useState } from 'react';
import './Menu.css';

export interface MenuItemProps {
  /** Use React `key` for list rendering; use `eventKey` for Menu selection logic */
  eventKey?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (key: string) => void;
}

export interface SubMenuProps {
  eventKey?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClick?: (key: string) => void;
}

export interface MenuProps {
  mode?: 'vertical' | 'horizontal' | 'inline';
  theme?: 'light' | 'dark';
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  defaultOpenKeys?: string[];
  openKeys?: string[];
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onSelect?: (selectedKeys: string[]) => void;
  onOpenChange?: (openKeys: string[]) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  eventKey,
  children,
  disabled = false,
  icon,
  className = '',
  style = {},
  onClick
}) => {
  const handleClick = () => {
    if (!disabled && eventKey) {
      onClick?.(eventKey);
    }
  };

  return (
    <div
      className={`bedi-menu-item ${disabled ? 'bedi-menu-item-disabled' : ''} ${className}`}
      style={style}
      onClick={handleClick}
    >
      {icon && <span className="bedi-menu-item-icon">{icon}</span>}
      <span className="bedi-menu-item-content">{children}</span>
    </div>
  );
};

export const SubMenu: React.FC<SubMenuProps> = ({
  eventKey,
  title,
  children,
  disabled = false,
  icon,
  className = '',
  style = {},
  isOpen: controlledOpen,
  onClick
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggleOpen = () => {
    if (!disabled) {
      if (eventKey && onClick) {
        onClick(eventKey);
      } else {
        setInternalOpen(!internalOpen);
      }
    }
  };

  return (
    <div className={`bedi-submenu ${isOpen ? 'bedi-submenu-open' : ''} ${disabled ? 'bedi-submenu-disabled' : ''} ${className}`} style={style}>
      <div className="bedi-submenu-title" onClick={toggleOpen}>
        {icon && <span className="bedi-submenu-icon">{icon}</span>}
        <span className="bedi-submenu-title-content">{title}</span>
        <span className="bedi-submenu-arrow">{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && (
        <div className="bedi-submenu-children">
          {children}
        </div>
      )}
    </div>
  );
};

export const Menu: React.FC<MenuProps> = ({
  mode = 'vertical',
  theme = 'light',
  defaultSelectedKeys = [],
  selectedKeys,
  defaultOpenKeys = [],
  openKeys,
  className = '',
  style = {},
  children,
  onSelect,
  onOpenChange
}) => {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(selectedKeys || defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(openKeys || defaultOpenKeys);

  const currentSelectedKeys = selectedKeys || internalSelectedKeys;
  const currentOpenKeys = openKeys || internalOpenKeys;

  const handleItemClick = (key: string) => {
    const newSelectedKeys = [key];
    setInternalSelectedKeys(newSelectedKeys);
    onSelect?.(newSelectedKeys);
  };

  const handleSubmenuToggle = (key: string) => {
    const newOpenKeys = currentOpenKeys.includes(key)
      ? currentOpenKeys.filter(k => k !== key)
      : [...currentOpenKeys, key];

    setInternalOpenKeys(newOpenKeys);
    onOpenChange?.(newOpenKeys);
  };

  const menuClassName = [
    'bedi-menu',
    `bedi-menu-${mode}`,
    `bedi-menu-${theme}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={menuClassName} style={style}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Read eventKey from props; fall back to React key (available via child.key)
          const childKey = (child.props as MenuItemProps).eventKey || (child.key as string);
          if (child.type === MenuItem) {
            return React.cloneElement(child as React.ReactElement<MenuItemProps>, {
              eventKey: childKey,
              onClick: handleItemClick,
              className: `${(child.props as MenuItemProps).className || ''} ${childKey && currentSelectedKeys.includes(childKey) ? 'bedi-menu-item-selected' : ''}`
            });
          } else if (child.type === SubMenu) {
            return React.cloneElement(child as React.ReactElement<SubMenuProps>, {
              eventKey: childKey,
              isOpen: childKey ? currentOpenKeys.includes(childKey) : false,
              onClick: handleSubmenuToggle
            });
          }
        }
        return child;
      })}
    </div>
  );
};

export default Menu;
