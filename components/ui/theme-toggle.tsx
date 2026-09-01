'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center border border-border bg-surface p-0.5 w-[62px] h-[28px]" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center border border-border bg-surface p-0.5 transition-colors">
      <button
        type="button"
        onClick={() => setTheme('light')}
        title="Light Mode"
        className={`p-1 transition-colors cursor-pointer flex items-center justify-center ${
          !isDark
            ? 'bg-foreground text-background'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to light mode"
      >
        <Sun className="h-3.5 w-3.5 stroke-[1.75]" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        title="Dark Mode"
        className={`p-1 transition-colors cursor-pointer flex items-center justify-center ${
          isDark
            ? 'bg-foreground text-background'
            : 'text-muted hover:text-foreground'
        }`}
        aria-label="Switch to dark mode"
      >
        <Moon className="h-3.5 w-3.5 stroke-[1.75]" />
      </button>
    </div>
  );
}
