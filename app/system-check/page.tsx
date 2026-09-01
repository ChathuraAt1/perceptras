'use client';

import { useState } from 'react';
import { Section, Container } from '@/components/layout/section-container';
import { Display, Heading } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleButton } from '@/components/ui/google-button';
import { useRecaptcha } from '@/lib/recaptcha';
import { sha256Hex } from '@/lib/crypto';
import { CheckCircle2, AlertCircle, RefreshCw, Radio, Lock, ShieldCheck, Key } from 'lucide-react';

const PORTAL_URL = 'https://portal.perceptras.net/api';

export default function SystemCheckPage() {
  const { executeRecaptcha } = useRecaptcha();

  // reCAPTCHA live tester state
  const [tokenStatus, setTokenStatus] = useState<string>('Not executed');
  const [tokenLength, setTokenLength] = useState<number>(0);
  const [tokenLoading, setTokenLoading] = useState<boolean>(false);

  // Endpoint ping state
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [pingMessage, setPingMessage] = useState<string>('');

  // Hash tester state
  const [hashInput, setHashInput] = useState('Password123!');
  const [hashOutput, setHashOutput] = useState('');

  const testRecaptcha = async () => {
    setTokenLoading(true);
    try {
      const token = await executeRecaptcha('system_check');
      if (token) {
        setTokenStatus(`Token generated (${token.slice(0, 18)}...)`);
        setTokenLength(token.length);
      } else {
        setTokenStatus('Token is empty (Check NEXT_PUBLIC_RECAPTCHA_SITE_KEY)');
        setTokenLength(0);
      }
    } catch (err: unknown) {
      setTokenStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTokenLoading(false);
    }
  };

  const testEndpointPing = async () => {
    setPingStatus('testing');
    setPingMessage('');
    const start = performance.now();

    try {
      const res = await fetch(`${PORTAL_URL}/ping`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      }).catch(() => null);

      const elapsed = Math.round(performance.now() - start);
      setPingLatency(elapsed);

      if (res && res.ok) {
        setPingStatus('success');
        setPingMessage(`Endpoint reachable (HTTP ${res.status}).`);
      } else if (res) {
        setPingStatus('success');
        setPingMessage(`Endpoint responded with HTTP ${res.status}.`);
      } else {
        setPingStatus('error');
        setPingMessage(`Could not reach ${PORTAL_URL}/ping (CORS or server offline).`);
      }
    } catch {
      setPingStatus('error');
      setPingMessage('Connection failed or blocked by network.');
    }
  };

  const runHashTest = async (val: string) => {
    setHashInput(val);
    const hash = await sha256Hex(val);
    setHashOutput(hash);
  };

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <Display as="h1" className="text-3xl md:text-5xl mb-4">
          Frontend Diagnostics &amp; API Check
        </Display>
        <p className="font-mono text-sm text-muted max-w-2xl mb-12 leading-relaxed">
          Interactive verification suite for live API endpoints, reCAPTCHA v3 security tokens, SHA-256 client-side hashing, and UI component behavior.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: reCAPTCHA v3 Test */}
          <div className="border border-border p-6 bg-surface flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-4 w-4 text-foreground" />
                <Heading as="h3" className="text-sm">
                  1. Google reCAPTCHA v3
                </Heading>
              </div>
              <p className="font-mono text-xs text-muted mb-4 leading-relaxed">
                Generates client-side security tokens sent in <code className="text-foreground">recaptcha_token</code>.
              </p>

              <div className="border border-border p-3 bg-surface mb-4 font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted">Status:</span>
                  <span className="text-foreground">{tokenStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Token Byte Length:</span>
                  <span className="text-foreground">{tokenLength} bytes</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              disabled={tokenLoading}
              onClick={testRecaptcha}
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className={tokenLoading ? 'h-3.5 w-3.5 animate-spin' : 'h-3.5 w-3.5'} />
              {tokenLoading ? 'GENERATING TOKEN...' : 'TEST RECAPTCHA TOKEN'}
            </Button>
          </div>

          {/* Card 2: Backend Endpoint Connectivity */}
          <div className="border border-border p-6 bg-surface flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Radio className="h-4 w-4 text-foreground" />
                <Heading as="h3" className="text-sm">
                  2. Backend API Ping (/api/ping)
                </Heading>
              </div>
              <p className="font-mono text-xs text-muted mb-4 leading-relaxed">
                Tests connectivity and response latency to the Laravel API endpoint (<span className="text-foreground">{PORTAL_URL}/ping</span>).
              </p>

              <div className="border border-border p-3 bg-surface mb-4 font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted">Target:</span>
                  <span className="text-foreground">{PORTAL_URL}/ping</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Latency:</span>
                  <span className="text-foreground">{pingLatency !== null ? `${pingLatency} ms` : '—'}</span>
                </div>
                {pingMessage && (
                  <div className="pt-1 text-[11px] text-muted flex items-start gap-1">
                    {pingStatus === 'success' ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-foreground shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <span>{pingMessage}</span>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={pingStatus === 'testing'}
              onClick={testEndpointPing}
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className={pingStatus === 'testing' ? 'h-3.5 w-3.5 animate-spin' : 'h-3.5 w-3.5'} />
              {pingStatus === 'testing' ? 'PINGING API...' : 'PING /api/ping'}
            </Button>
          </div>

          {/* Card 3: Google Auth Integration */}
          <div className="border border-border p-6 bg-surface">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-4 w-4 text-foreground" />
              <Heading as="h3" className="text-sm">
                3. Google OAuth Redirect Flow
              </Heading>
            </div>
            <p className="font-mono text-xs text-muted mb-4 leading-relaxed">
              Google Single Sign-On flow. Routes to backend Socialite redirect endpoint <span className="text-foreground">/api/auth/google/redirect</span>.
            </p>
            <div className="space-y-3">
              <GoogleButton mode="signin" />
              <p className="font-mono text-[10px] text-muted text-center">
                Destination: <code className="text-foreground">{PORTAL_URL}/auth/google/redirect</code>
              </p>
            </div>
          </div>

          {/* Card 4: SHA-256 Password Hash Check */}
          <div className="border border-border p-6 bg-surface">
            <div className="flex items-center gap-2 mb-4">
              <Key className="h-4 w-4 text-foreground" />
              <Heading as="h3" className="text-sm">
                4. Client-side SHA-256 Hasher
              </Heading>
            </div>
            <p className="font-mono text-xs text-muted mb-3 leading-relaxed">
              Verifies browser WebCrypto SHA-256 generation (required 64 characters by backend).
            </p>
            <div className="space-y-3">
              <Input
                label="Raw Password Input"
                value={hashInput}
                onChange={(e) => runHashTest(e.target.value)}
              />
              <div className="border border-border p-2 bg-surface">
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-1">
                  Generated password_hash (64 chars):
                </p>
                <p className="font-mono text-[10px] text-foreground break-all select-all">
                  {hashOutput || 'Click "Generate Hash" below'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => runHashTest(hashInput)}
              >
                Generate Hash
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
