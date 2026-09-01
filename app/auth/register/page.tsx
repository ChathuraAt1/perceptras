'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRecaptcha } from '@/lib/recaptcha';
import { UserPlus, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const PORTAL_API_URL = 'https://portal.perceptras.net/auth/register';

export default function RegisterPage() {
  const { executeRecaptcha } = useRecaptcha();
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const recaptchaToken = await executeRecaptcha('register');

      const response = await fetch(PORTAL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          organization,
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
        setErrorMessage(data?.message || 'Registration failed. Please check parameters.');
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
          <MonoTag>AUTHENTICATION // NEW OPERATOR</MonoTag>
        </div>

        <Display as="h1" className="text-3xl md:text-4xl mb-4">
          Register
        </Display>
        <p className="font-mono text-xs text-muted mb-8">
          Provision operator credentials for Perceptras cluster access.
        </p>

        <div className="border border-border p-6 md:p-8 bg-surface">
          {status === 'success' ? (
            <div className="space-y-4 text-center py-6">
              <CheckCircle2 className="h-10 w-10 text-foreground mx-auto stroke-1" />
              <p className="font-syne text-lg font-bold uppercase">Provisioned</p>
              <p className="font-mono text-xs text-muted">
                Operator account request received. Verification email dispatched.
              </p>
              <div className="pt-4">
                <Link href="/auth/login/">
                  <Button variant="outline" size="sm">
                    Return to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
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
                id="name"
                label="Full Name / Operator ID"
                placeholder="Dr. Alex Rivera"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                id="organization"
                label="Organization / Entity"
                placeholder="Autonomous Labs Corp"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />

              <Input
                id="email"
                type="email"
                label="Corporate Email Address"
                placeholder="operator@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                id="password"
                type="password"
                label="Password (min 8 characters)"
                placeholder="••••••••••••"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  {loading ? 'PROVISIONING...' : 'CREATE OPERATOR ACCOUNT'}
                </Button>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted">
                <span>Existing operator?</span>
                <Link
                  href="/auth/login/"
                  className="text-foreground hover:underline inline-flex items-center gap-1"
                >
                  Sign in <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
