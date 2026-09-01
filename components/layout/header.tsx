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
          <Link
            href="/contact/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/auth/login/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            [ Portal Login ]
          </Link>
        </nav>

        {/* Theme toggle & Mobile portal */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login/"
            className="md:hidden font-mono text-[10px] uppercase text-muted hover:text-foreground"
          >
            [ Login ]
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
