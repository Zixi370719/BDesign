import React, { useState, useEffect, useRef } from 'react';
import './Anchor.css';

export interface AnchorLinkProps {
  href: string;
  title: React.ReactNode;
  target?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface AnchorProps {
  affix?: boolean;
  offsetTop?: number;
  bounds?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  getCurrentAnchor?: (activeLink: string) => void;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; title: React.ReactNode }) => void;
}

export const AnchorLink: React.FC<AnchorLinkProps> = ({
  href,
  title,
  target,
  className = '',
  style = {}
}) => {
  return (
    <div className={`bedi-anchor-link ${className}`} style={style}>
      <a href={href} target={target} className="bedi-anchor-link-title">
        {title}
      </a>
    </div>
  );
};

export const Anchor: React.FC<AnchorProps> = ({
  affix = true,
  offsetTop = 0,
  bounds = 5,
  className = '',
  style = {},
  children,
  getCurrentAnchor,
  onClick
}) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const [links, setLinks] = useState<Array<{ href: string; title: React.ReactNode }>>([]);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const extractLinks = () => {
      const linkElements: Array<{ href: string; title: React.ReactNode }> = [];
      
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === AnchorLink) {
          linkElements.push({
            href: child.props.href,
            title: child.props.title
          });
        }
      });
      
      setLinks(linkElements);
    };

    extractLinks();
  }, [children]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.documentElement || document.body;
      const scrollTop = scrollContainer.scrollTop;

      for (let i = links.length - 1; i >= 0; i--) {
        const link = links[i];
        const targetElement = document.querySelector(link.href) as HTMLElement;
        
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const elementTop = rect.top + scrollTop;
          
          if (elementTop <= scrollTop + offsetTop + bounds) {
            if (activeLink !== link.href) {
              setActiveLink(link.href);
              getCurrentAnchor?.(link.href);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [links, activeLink, offsetTop, bounds, getCurrentAnchor]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { href: string; title: React.ReactNode }) => {
    e.preventDefault();
    const targetElement = document.querySelector(link.href) as HTMLElement;
    
    if (targetElement) {
      const scrollContainer = document.documentElement || document.body;
      const targetTop = targetElement.getBoundingClientRect().top + scrollContainer.scrollTop - offsetTop;
      
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      
      setActiveLink(link.href);
      getCurrentAnchor?.(link.href);
    }
    
    onClick?.(e, link);
  };

  const anchorContent = (
    <div
      ref={anchorRef}
      className={`bedi-anchor ${className}`}
      style={style}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AnchorLink) {
          const isActive = activeLink === child.props.href;
          return React.cloneElement(child, {
            className: `${child.props.className || ''} ${isActive ? 'bedi-anchor-link-active' : ''}`,
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, {
              href: child.props.href,
              title: child.props.title
            })
          });
        }
        return child;
      })}
    </div>
  );

  if (affix) {
    return (
      <div style={{ position: 'fixed', top: offsetTop, right: 0 }}>
        {anchorContent}
      </div>
    );
  }

  return anchorContent;
};

Anchor.Link = AnchorLink;

export default Anchor;
