'use client';

import { useState } from 'react';
import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { useRecaptcha, EnterpriseRecaptchaWidget } from '@/lib/recaptcha';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Phone } from 'lucide-react';

const PORTAL_CONTACT_URL = 'https://portal.perceptras.net/api/mail/contact';

export default function ContactPage() {
  const { executeRecaptcha } = useRecaptcha();
  const [selectedBranch, setSelectedBranch] = useState<'usa' | 'sl'>('usa');
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
                Global Operations &amp; Offices
              </Heading>

              {/* Branch Selector Tabs */}
              <div className="flex border border-border bg-surface font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedBranch('usa')}
                  className={`flex-1 py-2 px-3 text-center uppercase font-bold transition-colors cursor-pointer ${
                    selectedBranch === 'usa'
                      ? 'bg-foreground text-background'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  USA Headquarters
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBranch('sl')}
                  className={`flex-1 py-2 px-3 text-center uppercase font-bold transition-colors cursor-pointer border-l border-border ${
                    selectedBranch === 'sl'
                      ? 'bg-foreground text-background'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  Sri Lanka Labs
                </button>
              </div>

              {/* Active Branch Card */}
              <div className="border border-border bg-surface p-6 space-y-5">
                {selectedBranch === 'usa' ? (
                  <>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500 font-bold">
                        Global Headquarters
                      </span>
                      <h3 className="font-syne text-base font-bold text-foreground">
                        Perceptras Digital Labs LLC
                      </h3>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground">333 Bush Street, Suite 700</p>
                          <p className="text-muted text-[11px]">San Francisco, CA 94104, USA</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-muted shrink-0" />
                        <a href="tel:+14155552104" className="text-foreground hover:underline">
                          +1 415 555 2104
                        </a>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 text-muted shrink-0" />
                        <a href="mailto:contact@perceptras.net" className="text-foreground hover:underline">
                          contact@perceptras.net
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500 font-bold">
                        Engineering &amp; Operations Center
                      </span>
                      <h3 className="font-syne text-base font-bold text-foreground">
                        Perceptras Digital Labs (Pvt) Ltd
                      </h3>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground">26 Silver Crescent</p>
                          <p className="text-muted text-[11px]">Rajagiriya, Sri Lanka</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-muted shrink-0" />
                        <a href="tel:+94112876431" className="text-foreground hover:underline">
                          +94 11 287 6431
                        </a>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 text-muted shrink-0" />
                        <a href="mailto:contact@perceptras.net" className="text-foreground hover:underline">
                          contact@perceptras.net
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Google Map Embed */}
              <div className="border border-border bg-surface overflow-hidden space-y-2">
                <div className="p-3 border-b border-border bg-surface/50 flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>FACILITY SATELLITE TELEMETRY</span>
                  <span className="text-emerald-500 font-bold uppercase">
                    {selectedBranch === 'usa' ? 'SF Hub Coordinates' : 'SL Labs Coordinates'}
                  </span>
                </div>
                <div className="h-56 w-full relative bg-surface/80">
                  <iframe
                    title="Perceptras Facility Map"
                    src={
                      selectedBranch === 'usa'
                        ? 'https://maps.google.com/maps?q=333%20Bush%20Street,%20San%20Francisco,%20CA%2094104&t=&z=15&ie=UTF8&iwloc=&output=embed'
                        : 'https://maps.google.com/maps?q=26%20Silver%20Crescent,%20Rajagiriya,%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed'
                    }
                    className="w-full h-full border-0 grayscale invert contrast-125 dark:opacity-90 opacity-80"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </AsymmetricGrid>
        </Container>
      </Section>
    </>
  );
}
