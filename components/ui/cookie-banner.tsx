'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie, X, Check } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('perceptras_cookie_consent');
      if (!consent) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('perceptras_cookie_consent', 'all');
    } catch {}
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('perceptras_cookie_consent', 'essential');
    } catch {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="border border-foreground/30 bg-surface/95 backdrop-blur-md p-5 md:p-6 shadow-2xl space-y-4 text-foreground">
        <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Cookie className="h-4 w-4 text-foreground shrink-0" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Cookie &amp; Privacy Preferences
            </span>
          </div>
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="text-muted hover:text-foreground transition-colors p-1"
            title="Dismiss with essential cookies only"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="font-mono text-[11px] text-muted leading-relaxed">
          We use strictly necessary cookies to authenticate your controller session and ensure system reliability. Optional cookies help us analyze telemetry performance. See our{' '}
          <Link href="/cookies/" className="text-foreground underline hover:opacity-80">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link href="/privacy/" className="text-foreground underline hover:opacity-80">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAcceptAll}
            className="flex-1 flex items-center justify-center gap-1.5 font-bold"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Accept All</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAcceptEssential}
            className="flex-1 text-xs"
          >
            Essential Only
          </Button>
        </div>
      </div>
    </aside>
  );
}
