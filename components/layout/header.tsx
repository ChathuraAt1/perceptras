'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-foreground"
        >
          Perceptras
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['Platform', 'Solutions', 'Docs', 'About'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}/`}
              className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
