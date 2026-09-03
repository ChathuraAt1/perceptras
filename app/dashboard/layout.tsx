'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import {
  LayoutDashboard,
  Video,
  Zap,
  Compass,
  Network,
  CreditCard,
  Settings,
  ArrowLeft,
  LogOut,
  Lock,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const NAV_MODULES = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/flow', label: 'Flow // Ingest', icon: Video, count: 4 },
  { href: '/dashboard/accel', label: 'Accel // Inference', icon: Zap, count: 4 },
  { href: '/dashboard/zone', label: 'Zone // 3D Spatial', icon: Compass, count: 3 },
  { href: '/dashboard/grid', label: 'Grid // Clusters', icon: Network, count: 3 },
];

const NAV_ADMIN = [
  { href: '/dashboard/billing', label: 'Plans & Quota', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Security & Keys', icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [userName, setUserName] = useState('Lead Vision Engineer');
  const [userEmail, setUserEmail] = useState('developer@perceptras.local');
  const [currentPlan, setCurrentPlan] = useState('Professional');

  useEffect(() => {
    // Check if token exists in session/local storage
    const token =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('sanctum_token') || localStorage.getItem('sanctum_token')
        : null;

    const demoFlag =
      typeof window !== 'undefined' ? sessionStorage.getItem('perceptras_demo_mode') === 'true' : false;

    if (token) {
      setIsAuthenticated(true);
      setIsDemoMode(false);

      // Fetch user profile from /api/user
      fetch('https://portal.perceptras.net/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.data) {
            setUserEmail((prev) => data.data.email || prev);
            setUserName((prev) =>
              data.data.first_name
                ? `${data.data.first_name} ${data.data.last_name || ''}`
                : data.data.username || prev
            );
          }
        })
        .catch(() => {});

      // Fetch subscription plan
      fetch('https://portal.perceptras.net/api/payments/last-plan', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.data?.plan?.name) {
            setCurrentPlan(data.data.plan.name);
          }
        })
        .catch(() => {});
    } else if (demoFlag) {
      setIsAuthenticated(true);
      setIsDemoMode(true);
    } else {
      setIsAuthenticated(false);
      setIsDemoMode(false);
    }
  }, []);

  const enableDemoMode = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('perceptras_demo_mode', 'true');
    }
    setIsAuthenticated(true);
    setIsDemoMode(true);
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('sanctum_token');
      localStorage.removeItem('sanctum_token');
      sessionStorage.removeItem('perceptras_demo_mode');
    }
    router.push('/auth/login/');
  };

  const getSectionTitle = () => {
    if (pathname === '/dashboard/flow') return 'Perceptras Flow // Video Ingest Engine';
    if (pathname === '/dashboard/accel') return 'Perceptras Accel // Inference Engine';
    if (pathname === '/dashboard/zone') return 'Perceptras Zone // 3D Spatial Intelligence';
    if (pathname === '/dashboard/grid') return 'Perceptras Grid // Cluster Topology';
    if (pathname === '/dashboard/billing') return 'Subscription & Quota';
    if (pathname === '/dashboard/settings') return 'Security & API Credentials';
    return 'Cluster Overview';
  };

  // Auth Guard Screen if Unauthenticated
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 text-foreground">
        <div className="max-w-md w-full border border-border bg-surface p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
              <Logo className="h-6 w-auto" />
            </Link>
            <div className="flex items-center gap-1.5 text-amber-500 font-mono text-[10px] font-bold uppercase">
              <Lock className="h-3.5 w-3.5" />
              <span>401 Unauthorized</span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-syne text-2xl font-bold uppercase text-foreground">
              Authentication Required
            </h1>
            <p className="font-mono text-xs text-muted leading-relaxed">
              This dashboard controls live on-premise perception clusters and stream ingest. Please sign in with your Perceptras account to authenticate your session.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link href={`/auth/login/?redirect=${encodeURIComponent(pathname)}`} className="block">
              <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                <span>Sign In to Controller</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <button
              type="button"
              onClick={enableDemoMode}
              className="w-full py-2.5 px-4 border border-border bg-surface/50 hover:bg-foreground/5 font-mono text-xs font-semibold text-muted hover:text-foreground transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>Inspect in Sandbox Demo Mode</span>
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="font-mono text-xs text-muted hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state while checking token
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center font-mono text-xs text-muted">
        <span>Authenticating controller session...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* ── Fixed Left Sidebar ────────────────────────────────── */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between shrink-0 z-30">
        <div className="overflow-y-auto">
          {/* Brand Header */}
          <div className="h-16 border-b border-border px-6 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
              <Logo className="h-7 sm:h-8 w-auto" />
            </Link>
            <span className="flex h-2 w-2 relative" title="Edge Controller Online">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>

          {/* Navigation Section 1: Core Perception Modules */}
          <div className="p-3 space-y-1 font-mono text-xs">
            <p className="px-3 py-1.5 text-[9px] uppercase tracking-widest text-muted font-bold">
              Perception Platform
            </p>

            {NAV_MODULES.map(({ href, label, icon: Icon, count }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`w-full flex items-center justify-between px-3 py-2 uppercase font-medium transition-colors ${
                    active
                      ? 'bg-foreground text-background font-bold'
                      : 'text-muted hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  {count !== undefined && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 border ${
                        active ? 'border-background text-background' : 'border-border text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Navigation Section 2: Management & Billing (Hidden in Sandbox Demo Mode) */}
            {!isDemoMode && (
              <>
                <p className="px-3 pt-4 pb-1.5 text-[9px] uppercase tracking-widest text-muted font-bold">
                  Account &amp; Topology
                </p>

                {NAV_ADMIN.map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`w-full flex items-center justify-between px-3 py-2 uppercase font-medium transition-colors ${
                        active
                          ? 'bg-foreground text-background font-bold'
                          : 'text-muted hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-border space-y-3 font-mono text-xs shrink-0">
          <div className="p-2.5 bg-surface/50 border border-border">
            <p className="font-bold text-foreground truncate">{userName}</p>
            <p className="text-[10px] text-muted truncate">{userEmail}</p>
            <div className="mt-1.5 flex items-center justify-between text-[9px] uppercase tracking-wider">
              <span className="text-muted">Plan: {currentPlan}</span>
              <span className="text-emerald-500 font-bold">{isDemoMode ? 'Sandbox Demo' : 'Live Node'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <Link
              href="/"
              className="text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Site</span>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="text-muted hover:text-foreground cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Workspace Area ──────────────────────────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Workspace Top Header */}
        <header className="h-16 border-b border-border bg-surface/80 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Controller /</span>
            <h2 className="font-syne text-base font-bold uppercase text-foreground">
              {getSectionTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {isDemoMode && (
              <div className="hidden sm:flex items-center gap-2 border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold uppercase">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Sandbox Mode (Read-Only)</span>
                <Link href="/auth/login/" className="underline hover:text-foreground ml-1">
                  [Sign In]
                </Link>
              </div>
            )}
            <ThemeToggle />
          </div>
        </header>

        {/* Workspace Content Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {isDemoMode && (pathname === '/dashboard/billing' || pathname === '/dashboard/settings') ? (
            <div className="max-w-xl mx-auto border border-border bg-surface p-8 space-y-6 text-center shadow-lg my-12">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500 text-amber-500 flex items-center justify-center mx-auto">
                <Lock className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  SANDBOX DEMO MODE // ACCESS RESTRICTED
                </span>
                <h2 className="font-syne text-xl font-bold uppercase text-foreground">
                  Section Disabled in Sandbox Mode
                </h2>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  Billing, quota upgrades, and master security credentials require an authenticated Perceptras ID. Please sign in to manage live cluster billing and security settings.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth/login/?redirect=/dashboard/billing">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    Sign In to Unlock
                  </Button>
                </Link>
                <Link href="/dashboard/">
                  <Button variant="outline" size="md" className="w-full sm:w-auto">
                    Back to Cluster Overview
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
