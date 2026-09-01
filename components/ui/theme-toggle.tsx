'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';
import { useEffect, useState, type ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="font-mono text-xs text-muted" aria-hidden>
        [---]
      </button>
    );
  }

  const cycle = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const label = theme === 'light' ? 'LT' : theme === 'dark' ? 'DK' : 'SYS';

  return (
    <button
      onClick={cycle}
      className="font-mono text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
      aria-label={`Current theme: ${theme}. Click to toggle.`}
    >
      [{label}]
    </button>
  );
}
