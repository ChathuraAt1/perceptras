'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRecaptcha } from '@/lib/recaptcha';
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const PORTAL_API_URL = 'https://portal.perceptras.net/auth/login';

export default function LoginPage() {
  const { executeRecaptcha } = useRecaptcha();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const recaptchaToken = await executeRecaptcha('login');

      const response = await fetch(PORTAL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json().catch(() => null);
        setStatus('error');
        setErrorMessage(data?.message || 'Invalid credentials or authentication error.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection failure. Portal endpoint unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="py-20 md:py-28">
      <Container className="max-w-md">
        <div className="mb-6">
          <MonoTag>AUTHENTICATION // ACCESS PORTAL</MonoTag>
        </div>

        <Display as="h1" className="text-3xl md:text-4xl mb-4">
          Sign In
        </Display>
        <p className="font-mono text-xs text-muted mb-8">
          Enter credentials to access the Perceptras telemetry & cluster portal.
        </p>

        <div className="border border-border p-6 md:p-8 bg-surface">
          {status === 'success' ? (
            <div className="space-y-4 text-center py-6">
              <CheckCircle2 className="h-10 w-10 text-foreground mx-auto stroke-1" />
              <p className="font-syne text-lg font-bold uppercase">Authenticated</p>
              <p className="font-mono text-xs text-muted">
                Redirecting to <span className="text-foreground">portal.perceptras.net</span>...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === 'error' && (
                <div className="border border-red-500/50 bg-red-500/5 p-3 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="font-mono text-[11px] text-red-500 leading-tight">
                    {errorMessage}
                  </p>
                </div>
              )}

              <Input
                id="email"
                type="email"
                label="Identity / Email Address"
                placeholder="operator@perceptras.net"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                id="password"
                type="password"
                label="Security Key / Password"
                placeholder="••••••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Lock className="h-3.5 w-3.5" />
                  {loading ? 'AUTHENTICATING...' : 'AUTHORIZE SESSION'}
                </Button>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted">
                <span>New deployment?</span>
                <Link
                  href="/auth/register/"
                  className="text-foreground hover:underline inline-flex items-center gap-1"
                >
                  Register node <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
