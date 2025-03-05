'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function Container({ children, className, size = 'xl' }: ContainerProps) {
  return (
    <div
      className={twMerge(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        size === 'sm' && 'max-w-screen-sm',
        size === 'md' && 'max-w-screen-md',
        size === 'lg' && 'max-w-screen-lg',
        size === 'xl' && 'max-w-screen-xl',
        size === '2xl' && 'max-w-screen-2xl',
        size === 'full' && 'max-w-full',
        className
      )}
      style={{ boxSizing: 'border-box' }}
    >
      {children}
    </div>
  );
} 