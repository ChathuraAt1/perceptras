'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

function AuthCompleteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectPath, setRedirectPath] = useState('/dashboard');

  useEffect(() => {
    const rawToken = searchParams.get('token');
    const planSlug = searchParams.get('plan') || searchParams.get('plan_slug');
    const interval = searchParams.get('interval') || searchParams.get('plan_interval');

    if (!rawToken) {
      setStatus('error');
      setErrorMessage('No authentication token was returned from the OAuth provider.');
      return;
    }

    try {
      // Decode token if URL encoded
      const token = decodeURIComponent(rawToken);

      // Save token to session and local storage
      sessionStorage.setItem('sanctum_token', token);
      localStorage.setItem('sanctum_token', token);
      sessionStorage.removeItem('perceptras_demo_mode');

      let targetUrl = '/dashboard/';
      if (planSlug) {
        targetUrl = `/checkout?plan=${encodeURIComponent(planSlug)}&interval=${encodeURIComponent(interval || 'yearly')}`;
      }
      setRedirectPath(targetUrl);
      setStatus('success');

      // Auto-redirect after short confirmation
      const timer = setTimeout(() => {
        router.push(targetUrl);
      }, 1400);

      return () => clearTimeout(timer);
    } catch {
      setStatus('error');
      setErrorMessage('Failed to decode or store authentication token.');
    }
  }, [searchParams, router]);

  return (
    <Section className="pt-28 md:pt-40 pb-24">
      <Container className="max-w-md mx-auto">
        <div className="border border-border bg-surface p-8 md:p-10 space-y-6 text-center shadow-2xl relative">
          {status === 'processing' && (
            <>
              <div className="w-14 h-14 border border-border bg-surface flex items-center justify-center mx-auto">
                <Loader2 className="h-6 w-6 text-foreground animate-spin" />
              </div>
              <div className="space-y-2">
                <MonoTag>AUTHENTICATION IN PROGRESS</MonoTag>
                <h1 className="font-syne text-xl font-bold uppercase text-foreground">
                  Completing Sign In...
                </h1>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  Securing your session with Perceptras Controller ID. Please wait.
                </p>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto">
                <Check className="h-7 w-7 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <MonoTag>OAUTH AUTHENTICATED</MonoTag>
                <h1 className="font-syne text-2xl font-bold uppercase text-foreground">
                  Sign In Complete!
                </h1>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  Authentication token verified. Redirecting to your controller workspace...
                </p>
              </div>

              <div className="pt-2">
                <Link href={redirectPath}>
                  <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
                    <span>Continue Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-14 h-14 bg-red-500/10 border border-red-500 text-red-500 flex items-center justify-center mx-auto">
                <AlertCircle className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <MonoTag>AUTHENTICATION ERROR</MonoTag>
                <h1 className="font-syne text-xl font-bold uppercase text-foreground">
                  OAuth Sign In Failed
                </h1>
                <p className="font-mono text-xs text-red-500 leading-relaxed">
                  {errorMessage}
                </p>
              </div>

              <div className="pt-2">
                <Link href="/auth/login/">
                  <Button variant="primary" size="md" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-xs text-muted">Verifying Token...</div>}>
      <AuthCompleteContent />
    </Suspense>
  );
}
