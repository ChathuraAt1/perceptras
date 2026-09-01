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
            href="/products/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <Link
            href="/about/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/dashboard/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Dashboard
          </Link>
          <Link
            href="/contact/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/auth/login/"
            className="font-mono text-[10px] uppercase tracking-widest text-foreground font-semibold hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>
        </nav>

        {/* Theme toggle & Mobile sign in */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login/"
            className="md:hidden font-mono text-[10px] uppercase text-foreground font-semibold"
          >
            Sign In
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
