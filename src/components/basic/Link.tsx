import React from 'react';
import './Link.css';

export interface LinkProps {
  href?: string;
  children: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  disabled?: boolean;
  underline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  target = '_self',
  rel,
  disabled = false,
  underline = true,
  className = '',
  style = {},
  onClick
}) => {
  const linkClassName = [
    'bedi-link',
    underline ? 'bedi-link-underline' : 'bedi-link-no-underline',
    disabled ? 'bedi-link-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const props = {
    className: linkClassName,
    style,
    onClick: handleClick
  };

  if (href && !disabled) {
    return (
      <a href={href} target={target} rel={rel} {...props}>
        {children}
      </a>
    );
  }

  return <span {...props}>{children}</span>;
};

export default Link;
