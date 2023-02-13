'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function MyThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
        {children}
      </div>
    </ThemeProvider>
  );
}
