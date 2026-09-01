'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/layout/section-container';

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Hide site footer when inside the dedicated dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-surface/30">
      <Container className="py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
              Perceptras
            </p>
            <p className="font-mono text-[10px] text-muted mt-1">
              Physical AI Perception Infrastructure for Autonomous Systems
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-wider text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/products/" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <Link href="/features/" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/pricing/" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/about/" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact/" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/privacy/" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms/" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/cookies/" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
            <Link href="/auth/login/" className="hover:text-foreground transition-colors">
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6">
          <p className="font-mono text-[9px] text-muted">
            Protected by reCAPTCHA. Google{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground"
            >
              Terms of Service
            </a>{' '}
            apply.
          </p>
          <p className="font-mono text-[10px] text-muted">
            &copy; {year} Perceptras. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
