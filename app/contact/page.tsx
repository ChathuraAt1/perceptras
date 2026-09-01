'use client';

import { useState } from 'react';
import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { useRecaptcha, EnterpriseRecaptchaWidget } from '@/lib/recaptcha';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Radio } from 'lucide-react';

const PORTAL_CONTACT_URL = 'https://portal.perceptras.net/api/mail/contact';

export default function ContactPage() {
  const { executeRecaptcha } = useRecaptcha();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
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
      if (!recaptchaToken) {
        setStatus('error');
        setErrorMessage('Please complete the reCAPTCHA verification below before sending.');
        setLoading(false);
        return;
      }

      const combinedMessage = subject ? `[Topic: ${subject}]\n\n${message}` : message;

      const response = await fetch(PORTAL_CONTACT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: combinedMessage,
          recaptcha_token: recaptchaToken,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.status === 'success' || data?.code === 200 || response.status === 200)) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        if (data?.errors) {
          const firstErr = Object.values(data.errors).flat()[0];
          setErrorMessage(typeof firstErr === 'string' ? firstErr : data.message || 'Validation failed.');
        } else {
          setErrorMessage(data?.message || 'Failed to send message. Please try again.');
        }
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage('Unable to connect to server. Please try again or email us directly at contact@perceptras.net.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section borders={{ bottom: true }} className="pt-20 md:pt-28">
        <Container>
          <Display className="max-w-4xl">
            Contact Us
          </Display>
          <p className="font-mono text-sm text-muted max-w-xl mt-6">
            Get in touch with our team for questions about the Perceptras platform, custom integration, enterprise licensing, or technical support.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <AsymmetricGrid ratio="60/40" divider>
            <div>
              <Heading index="01" className="mb-6">
                Send a Message
              </Heading>

              <div className="border border-border p-6 md:p-8 bg-surface">
                {status === 'success' ? (
                  <div className="space-y-4 text-center py-12">
                    <CheckCircle2 className="h-10 w-10 text-foreground mx-auto stroke-1" />
                    <p className="font-syne text-lg font-bold uppercase">Message Sent</p>
                    <p className="font-mono text-xs text-muted max-w-md mx-auto">
                      Thank you for reaching out. We will get back to you shortly.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStatus('idle')}
                      className="mt-4"
                    >
                      Send Another Message
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
                        label="Full Name"
                        placeholder="Sarah Connor"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Input
                        id="contact-email"
                        type="email"
                        label="Email Address"
                        placeholder="sarah@company.com"
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
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-none border border-border bg-surface px-3.5 py-2.5 font-mono text-xs text-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                      >
                        <option value="General Inquiry">
                          General Inquiry
                        </option>
                        <option value="Perceptras Flow (Multi-Stream Pipeline)">
                          Perceptras Flow (Multi-Stream Pipeline)
                        </option>
                        <option value="Perceptras Accel (Inference Optimization)">
                          Perceptras Accel (Inference Optimization)
                        </option>
                        <option value="Perceptras Zone (Spatial Intelligence)">
                          Perceptras Zone (Spatial Intelligence)
                        </option>
                        <option value="Perceptras Grid (Cluster Orchestration)">
                          Perceptras Grid (Cluster Orchestration)
                        </option>
                        <option value="Enterprise Pricing & Demo">
                          Enterprise Pricing &amp; Demo
                        </option>
                      </select>
                    </div>

                    <Textarea
                      id="contact-message"
                      label="Message"
                      placeholder="Tell us about your project, camera counts, or specific requirements..."
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <EnterpriseRecaptchaWidget action="CONTACT" />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {loading ? 'SENDING...' : 'SEND MESSAGE'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <Heading index="02" className="mb-6">
                Contact Information
              </Heading>

              <div className="space-y-6">
                <div className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-3.5 w-3.5 text-muted" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Email
                    </p>
                  </div>
                  <p className="font-mono text-sm text-foreground">
                    contact@perceptras.net
                  </p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    General support and business inquiries
                  </p>
                </div>

                <div className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio className="h-3.5 w-3.5 text-muted" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Portal &amp; Dashboard
                    </p>
                  </div>
                  <p className="font-mono text-sm text-foreground">
                    portal.perceptras.net
                  </p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Account management &amp; telemetry
                  </p>
                </div>

                <div className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-3.5 w-3.5 text-muted" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Location
                    </p>
                  </div>
                  <p className="font-mono text-sm text-foreground">
                    Perceptras Inc.
                  </p>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Physical AI Systems Division
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
