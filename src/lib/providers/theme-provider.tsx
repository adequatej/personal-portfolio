'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="theme"
      value={{
        dark: "dark",
        light: "light",
        system: "system"
      }}
    >
      {children}
    </NextThemeProvider>
  );
}

export { useTheme } from 'next-themes'; 