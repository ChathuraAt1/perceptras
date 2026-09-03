'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleButton } from '@/components/ui/google-button';
import { Logo } from '@/components/ui/logo';
import { useRecaptcha, EnterpriseRecaptchaWidget } from '@/lib/recaptcha';
import { sha256Hex } from '@/lib/crypto';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const PORTAL_API_URL = 'https://portal.perceptras.net/api/auth/register';

export default function RegisterPage() {
  const { executeRecaptcha } = useRecaptcha();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Password Strength & Validation Criteria
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const criteria = [
    { label: '8+ Characters', met: hasMinLength },
    { label: 'Uppercase Letter (A-Z)', met: hasUpperCase },
    { label: 'Lowercase Letter (a-z)', met: hasLowerCase },
    { label: 'Number (0-9)', met: hasNumber },
    { label: 'Special Character (!@#$)', met: hasSpecial },
  ];

  const metCount = criteria.filter((c) => c.met).length;

  let strengthLabel = 'Empty';
  let strengthColor = 'bg-border';
  let strengthTextColor = 'text-muted';

  if (password.length > 0) {
    if (metCount <= 2) {
      strengthLabel = 'Weak';
      strengthColor = 'bg-red-500';
      strengthTextColor = 'text-red-500';
    } else if (metCount === 3) {
      strengthLabel = 'Fair';
      strengthColor = 'bg-amber-500';
      strengthTextColor = 'text-amber-500';
    } else if (metCount === 4) {
      strengthLabel = 'Good';
      strengthColor = 'bg-sky-500';
      strengthTextColor = 'text-sky-500';
    } else if (metCount === 5) {
      strengthLabel = 'Strong';
      strengthColor = 'bg-emerald-500';
      strengthTextColor = 'text-emerald-500';
    }
  }

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (!hasMinLength) {
      setStatus('error');
      setErrorMessage('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    if (metCount < 3) {
      setStatus('error');
      setErrorMessage('Please create a stronger password meeting at least 3 security criteria.');
      setLoading(false);
      return;
    }

    try {
      const passwordHash = await sha256Hex(password);
      const passwordConfirmationHash = await sha256Hex(confirmPassword);
      const recaptchaToken = await executeRecaptcha('register');

      // Derive username if not explicitly set
      const derivedUsername = username.trim() || email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');

      const response = await fetch(PORTAL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: derivedUsername,
          first_name: firstName.trim() || undefined,
          last_name: lastName.trim() || undefined,
          email: email.trim(),
          password_hash: passwordHash,
          password_hash_confirmation: passwordConfirmationHash,
          recaptcha_token: recaptchaToken || undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.status === 'success' || data?.code === 201 || data?.code === 200)) {
        setStatus('success');
      } else {
        setStatus('error');
        // Extract validation errors if present
        if (data?.errors && typeof data.errors === 'object') {
          const firstError = Object.values(data.errors).flat()[0];
          setErrorMessage(String(firstError || data?.message || 'Registration failed.'));
        } else {
          setErrorMessage(data?.message || 'Registration failed. Please check your information.');
        }
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
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
            <Logo className="h-9 sm:h-10 w-auto" priority />
          </Link>
        </div>

        <Display as="h1" className="text-3xl md:text-4xl mb-3">
          Create Account
        </Display>
        <p className="font-mono text-xs text-muted mb-8">
          Get started with Perceptras by creating your account.
        </p>

        <div className="border border-border p-6 md:p-8 bg-surface">
          {status === 'success' ? (
            <div className="space-y-4 text-center py-6">
              <CheckCircle2 className="h-10 w-10 text-foreground mx-auto stroke-1" />
              <p className="font-syne text-lg font-bold uppercase">Account Created</p>
              <p className="font-mono text-xs text-muted">
                Registration successful. Please check your email to verify your account.
              </p>
              <div className="pt-4">
                <Link href="/auth/login/">
                  <Button variant="outline" size="sm">
                    Go to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Google Sign Up */}
              <GoogleButton mode="signup" />

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

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="firstName"
                    label="First Name"
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    id="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <Input
                  id="username"
                  label="Username"
                  placeholder="janedoe"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                  id="email"
                  type="email"
                  label="Work Email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input with Strength Meter & Validation Breakdown */}
                <div className="space-y-1.5">
                  <Input
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {password.length > 0 && (
                    <div className="p-3 border border-border bg-surface/60 space-y-2.5 mt-2 transition-all">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-muted uppercase tracking-wider">Password Strength:</span>
                        <span className={`font-bold uppercase tracking-wider ${strengthTextColor}`}>
                          {strengthLabel}
                        </span>
                      </div>

                      {/* 5-Segment Visual Progress Bar */}
                      <div className="flex gap-1.5 h-1.5 w-full">
                        {[1, 2, 3, 4, 5].map((seg) => (
                          <div
                            key={seg}
                            className={`h-full flex-1 transition-all duration-300 ${
                              metCount >= seg ? strengthColor : 'bg-border/60'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Interactive Security Validation Criteria Checklist */}
                      <div className="space-y-1 pt-1 font-mono text-[10px]">
                        {criteria.map((c, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-1.5 transition-colors ${
                              c.met ? 'text-emerald-500 font-semibold' : 'text-muted'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full transition-colors shrink-0 ${
                                c.met ? 'bg-emerald-500 ring-2 ring-emerald-500/20' : 'bg-border'
                              }`}
                            />
                            <span>{c.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input with Live Match Indicator */}
                <div className="space-y-1">
                  <Input
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="••••••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  {passwordsMatch && (
                    <p className="font-mono text-[10px] text-emerald-500 flex items-center gap-1 pt-0.5">
                      <CheckCircle2 className="h-3 w-3 shrink-0" />
                      <span>Passwords match</span>
                    </p>
                  )}
                  {passwordsMismatch && (
                    <p className="font-mono text-[10px] text-red-500 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>Passwords do not match</span>
                    </p>
                  )}
                </div>

                <EnterpriseRecaptchaWidget action="REGISTER" />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                  </Button>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>Already have an account?</span>
                  <Link
                    href="/auth/login/"
                    className="text-foreground hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Sign in <ArrowRight className="h-3 w-3" />
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
