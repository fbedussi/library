import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router';
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

export const TopAppBar: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={styles['top-app-bar']}>{children}</div>
);

export const CircularProgress = ({ color }: { color?: 'secondary' }) => (
  <div
    role="progressbar"
    className={`${styles.loeader} ${color === 'secondary' ? styles.secondary : ''}`}
  ></div>
);
