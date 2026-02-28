import React, { useState, useEffect } from 'react';
import './BackTop.css';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: () => void;
  target?: () => Window | HTMLElement;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const BackTop: React.FC<BackTopProps> = ({
  visibilityHeight = 400,
  onClick,
  target = () => window,
  className = '',
  style = {},
  children
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = target();
      const scrollTop = targetElement instanceof Window 
        ? targetElement.pageYOffset 
        : targetElement.scrollTop;
      
      setVisible(scrollTop >= visibilityHeight);
    };

    const targetElement = target();
    targetElement.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
    };
  }, [visibilityHeight, target]);

  const scrollToTop = () => {
    const targetElement = target();
    
    if (targetElement instanceof Window) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      targetElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    onClick?.();
  };

  if (!visible) {
    return null;
  }

  const defaultContent = (
    <div className="bedi-back-top-content">
      <div className="bedi-back-top-icon">↑</div>
    </div>
  );

  return (
    <div
      className={`bedi-back-top ${className}`}
      style={style}
      onClick={scrollToTop}
    >
      {children || defaultContent}
    </div>
  );
};

export default BackTop;
