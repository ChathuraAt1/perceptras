'use client';

import { useState } from 'react';
import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { useRecaptcha } from '@/lib/recaptcha';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Radio } from 'lucide-react';

const PORTAL_CONTACT_URL = 'https://portal.perceptras.net/contact';

export default function ContactPage() {
  const { executeRecaptcha } = useRecaptcha();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Deployment Architecture Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const recaptchaToken = await executeRecaptcha('contact');

      const response = await fetch(PORTAL_CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json().catch(() => null);
        setStatus('error');
        setErrorMessage(data?.message || 'Failed to dispatch inquiry. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection failure. Portal endpoint unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section borders={{ bottom: true }} className="pt-20 md:pt-28">
        <Container>
          <div className="mb-6">
            <MonoTag>COMMUNICATIONS // DIRECT INGEST</MonoTag>
          </div>
          <Display className="max-w-4xl">
            Perception Engineering
            <br />
            Consultation
          </Display>
          <p className="font-mono text-sm text-muted max-w-xl mt-6">
            Connect with our physical AI solutions architects for enterprise cluster sizing, custom hardware-accelerated pipeline integration, and deployment support.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <AsymmetricGrid ratio="60/40" divider>
            <div>
              <Heading index="01" className="mb-6">
                Transmission Ingest Form
              </Heading>

              <div className="border border-border p-6 md:p-8 bg-surface">
                {status === 'success' ? (
                  <div className="space-y-4 text-center py-12">
                    <CheckCircle2 className="h-10 w-10 text-foreground mx-auto stroke-1" />
                    <p className="font-syne text-lg font-bold uppercase">Transmission Received</p>
                    <p className="font-mono text-xs text-muted max-w-md mx-auto">
                      Your inquiry has been routed to our systems architecture group. We typically respond within 4 operational hours.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStatus('idle')}
                      className="mt-4"
                    >
                      Send Another Transmission
                    </Button>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        id="contact-name"
                        label="Full Name / Handle"
                        placeholder="Sarah Connor"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        id="contact-email"
                        type="email"
                        label="Email Address"
                        placeholder="s.connor@cyberdyne.io"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="w-full space-y-1.5">
                      <label
                        htmlFor="subject"
                        className="block font-mono text-[10px] uppercase tracking-widest text-muted"
                      >
                        Inquiry Vector / Subject
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-none border border-border bg-surface px-3.5 py-2.5 font-mono text-xs text-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                      >
                        <option value="Deployment Architecture Inquiry">
                          Deployment Architecture Inquiry
                        </option>
                        <option value="Perceptras Flow Integration (Multi-Stream)">
                          Perceptras Flow Integration (Multi-Stream)
                        </option>
                        <option value="Perceptras Accel Optimization (Engine Build)">
                          Perceptras Accel Optimization (Engine Build)
                        </option>
                        <option value="Perceptras Zone Deployment (Spatial Perception)">
                          Perceptras Zone Deployment (Spatial Perception)
                        </option>
                        <option value="Perceptras Grid Cluster Sizing (Multi-Model)">
                          Perceptras Grid Cluster Sizing (Multi-Model)
                        </option>
                        <option value="Enterprise License & SLA">
                          Enterprise License & SLA
                        </option>
                      </select>
                    </div>

                    <Textarea
                      id="contact-message"
                      label="Message / Technical Specifications"
                      placeholder="Specify camera counts, sensor protocols, compute topology, and expected throughput requirements..."
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {loading ? 'TRANSMITTING...' : 'DISPATCH INQUIRY'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <Heading index="02" className="mb-6">
                Operations Telemetry
              </Heading>

              <div className="space-y-6">
                <div className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-3.5 w-3.5 text-muted" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Direct Dispatch
                    </p>
                  </div>
                  <p className="font-mono text-sm text-foreground">
                    contact@perceptras.net
                  </p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    PGP Key: 0x4F92B88C
                  </p>
                </div>

                <div className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio className="h-3.5 w-3.5 text-muted" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      API Gateway
                    </p>
                  </div>
                  <p className="font-mono text-sm text-foreground">
                    portal.perceptras.net
                  </p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Latency: &lt; 15ms (Global Anycast)
                  </p>
                </div>

                <div className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-3.5 w-3.5 text-muted" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Infrastructure HQ
                    </p>
                  </div>
                  <p className="font-mono text-sm text-foreground">
                    Perceptras Research Systems
                  </p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Physical AI Perception Division
                  </p>
                </div>
              </div>
            </div>
          </AsymmetricGrid>
        </Container>
      </Section>
    </>
  );
}
