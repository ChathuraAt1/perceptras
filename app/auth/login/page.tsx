'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleButton } from '@/components/ui/google-button';
import { useRecaptcha, EnterpriseRecaptchaWidget } from '@/lib/recaptcha';
import { sha256Hex } from '@/lib/crypto';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const PORTAL_API_URL = 'https://portal.perceptras.net/api/auth/login';

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
      const passwordHash = await sha256Hex(password);

      const response = await fetch(PORTAL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password_hash: passwordHash,
          recaptcha_token: recaptchaToken || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.status === 'success' || data?.code === 200)) {
        setStatus('success');
        // Store session token if provided
        if (data?.data?.token) {
          try {
            sessionStorage.setItem('sanctum_token', data.data.token);
          } catch {}
        }
      } else {
        setStatus('error');
        setErrorMessage(data?.message || 'Invalid email or password.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section className="py-20 md:py-28">
      <Container className="max-w-md">
        <Display as="h1" className="text-3xl md:text-4xl mb-3">
          Sign In
        </Display>
        <p className="font-mono text-xs text-muted mb-8">
          Welcome back. Enter your account details to continue.
        </p>

        <div className="border border-border p-6 md:p-8 bg-surface">
          {status === 'success' ? (
            <div className="space-y-4 text-center py-6">
              <CheckCircle2 className="h-10 w-10 text-foreground mx-auto stroke-1" />
              <p className="font-syne text-lg font-bold uppercase">Signed In</p>
              <p className="font-mono text-xs text-muted">
                Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Google Sign In */}
              <GoogleButton mode="signin" />

              <div className="relative flex items-center justify-center">
                <div className="border-t border-border w-full" />
                <span className="bg-surface px-3 font-mono text-[10px] uppercase text-muted tracking-widest absolute">
                  or
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  label="Email Address"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <EnterpriseRecaptchaWidget action="LOGIN" />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'SIGNING IN...' : 'SIGN IN'}
                  </Button>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>Don&apos;t have an account?</span>
                  <Link
                    href="/auth/register/"
                    className="text-foreground hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Sign up <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
