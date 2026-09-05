'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie, X, Check, Settings2, ShieldCheck } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [allowFunctionality, setAllowFunctionality] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('perceptras_cookie_consent');
      if (!consent) {
        // Delay entrance slightly for non-intrusive loading
        const timer = setTimeout(() => setShowBanner(true), 600);
        return () => clearTimeout(timer);
      } else {
        try {
          const parsed = JSON.parse(consent);
          if (parsed && typeof parsed.functionality === 'boolean') {
            setAllowFunctionality(parsed.functionality);
          }
        } catch {
          setAllowFunctionality(consent === 'all');
        }
      }
    } catch {}

    const handleOpen = () => {
      setShowBanner(true);
      setShowCustomize(true);
    };

    window.addEventListener('perceptras-open-cookie-banner', handleOpen);
    return () => {
      window.removeEventListener('perceptras-open-cookie-banner', handleOpen);
    };
  }, []);

  const saveConsent = (all: boolean, functionality: boolean) => {
    try {
      const consentPayload = {
        necessary: true,
        functionality: all ? true : functionality,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('perceptras_cookie_consent', JSON.stringify(consentPayload));
    } catch {}
    setShowBanner(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    setAllowFunctionality(true);
    saveConsent(true, true);
  };

  const handleAcceptEssential = () => {
    setAllowFunctionality(false);
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    saveConsent(false, allowFunctionality);
  };

  if (!showBanner) return null;

  return (
    <aside
      role="dialog"
      aria-label="Cookie &amp; telemetry consent banner"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-md md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="border border-border bg-surface/95 backdrop-blur-md p-5 sm:p-6 shadow-2xl space-y-4 text-foreground">
        {/* Banner Header */}
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
            className="text-muted hover:text-foreground transition-colors p-1 cursor-pointer"
            title="Dismiss with essential cookies only"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Banner Body */}
        <p className="font-mono text-[11px] text-muted leading-relaxed">
          We use strictly necessary cookies to authenticate your session and maintain secure infrastructure telemetry. With your consent, we also use functionality cookies to remember theme settings and preferences. Review our{' '}
          <Link href="/cookies/" className="text-foreground underline underline-offset-2 hover:opacity-80">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link href="/privacy/" className="text-foreground underline underline-offset-2 hover:opacity-80">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Granular Preferences View (Collapsible) */}
        {showCustomize && (
          <div className="border border-border p-3.5 bg-surface/60 space-y-3 font-mono text-xs animate-in fade-in duration-200">
            {/* Necessary Cookies - Always Active */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-border">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Essential / Security Cookies</span>
                </div>
                <p className="text-[10px] text-muted mt-0.5">
                  Required for session tokens, cluster security &amp; basic routing.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase px-2 py-0.5 border border-emerald-500/30 bg-emerald-500/10 shrink-0">
                Always Active
              </span>
            </div>

            {/* Functionality Cookies - Toggleable */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div>
                <div className="font-bold text-foreground">
                  Functionality &amp; Theme Cookies
                </div>
                <p className="text-[10px] text-muted mt-0.5">
                  Remembers UI preferences, active workspace tabs &amp; view modes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAllowFunctionality(!allowFunctionality)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer border border-border transition-colors p-0.5 ${
                  allowFunctionality ? 'bg-foreground' : 'bg-surface'
                }`}
                aria-label="Toggle functionality cookies"
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transition-transform ${
                    allowFunctionality
                      ? 'translate-x-4 bg-background'
                      : 'translate-x-0 bg-muted'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          {showCustomize ? (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSavePreferences}
                className="flex-1 flex items-center justify-center gap-1.5 font-bold text-xs"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Preferences</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 text-xs"
              >
                Accept All
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 flex items-center justify-center gap-1.5 font-bold text-xs"
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomize(true)}
                className="flex items-center justify-center gap-1 text-xs text-muted hover:text-foreground px-2"
                title="Customize cookie settings"
              >
                <Settings2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Preferences</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
