import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './commonComponents.module.css';

export const PageWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    {...props}
    className={`${styles['page-wrapper']}${className ? ` ${className}` : ''}`}
  />
);

export const TopBarPageWrapper: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    {...props}
    className={`${styles['top-bar-page-wrapper']}${className ? ` ${className}` : ''}`}
  />
);

export const BottomBarPageWrapper: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    {...props}
    className={`${styles['bottom-bar-page-wrapper']}${className ? ` ${className}` : ''}`}
  />
);

export const LinkNoStyle = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    {...props}
    className={`${styles['link-no-style']}${className ? ` ${className}` : ''}`}
  />
));
LinkNoStyle.displayName = 'LinkNoStyle';

export const BottomAppBar: React.FC<React.ComponentProps<typeof AppBar>> = ({
  className,
  ...props
}) => (
  <AppBar
    {...props}
    className={`${styles['bottom-app-bar']}${className ? ` ${className}` : ''}`}
  />
);

export const TopAppBar: React.FC<React.ComponentProps<typeof AppBar>> = ({
  className,
  ...props
}) => (
  <AppBar
    {...props}
    className={`${styles['top-app-bar']}${className ? ` ${className}` : ''}`}
  />
);

export const ToolbarStyled: React.FC<React.ComponentProps<typeof Toolbar>> = ({
  className,
  ...props
}) => (
  <Toolbar
    {...props}
    className={`${styles['toolbar-styled']}${className ? ` ${className}` : ''}`}
  />
);
