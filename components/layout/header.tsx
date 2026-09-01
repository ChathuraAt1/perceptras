'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ArrowRight } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  // Hide site header when inside the dedicated dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

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
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/about/"
            className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            About
          </Link>
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
            Sign In
          </Link>

          {/* Primary CTA: Explore Products */}
          <Link
            href="/products/"
            className="border border-foreground bg-foreground text-background font-mono text-[10px] font-bold px-3.5 py-1.5 uppercase tracking-wider hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <span>Explore Products</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </nav>

        {/* Theme toggle & Mobile CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/products/"
            className="md:hidden border border-foreground bg-foreground text-background font-mono text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider"
          >
            Products
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
