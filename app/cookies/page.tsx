import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Building2, Mail, ArrowLeft } from 'lucide-react';

export default function CookiesPolicyPage() {
  return (
    <>
      <Section className="pt-24 md:pt-36 pb-12">
        <Container className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="font-mono text-xs text-muted hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <MonoTag>LEGAL &amp; TELEMETRY POLICY</MonoTag>
          <Display as="h1" className="text-3xl sm:text-5xl font-bold mt-2">
            Cookies Policy
          </Display>
          <p className="font-mono text-xs text-muted mt-3">
            Last updated: September 01, 2026
          </p>
        </Container>
      </Section>

      <Section borders={{ bottom: true }} className="pb-24">
        <Container className="max-w-4xl">
          <div className="border border-border bg-surface p-8 md:p-12 space-y-10 font-mono text-xs text-foreground/90 leading-relaxed">
            {/* Introduction */}
            <div className="space-y-4">
              <p>
                This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, the information We collect using Cookies, and how that information is used.
              </p>
              <p>
                We do not store sensitive personal information, such as plain passwords or raw facility camera streams, in the Cookies We use.
              </p>
            </div>

            {/* Operating Legal Entities */}
            <div className="border border-border p-6 bg-surface/50 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase">
                <Building2 className="h-4 w-4" />
                <span>Operating Legal Entities</span>
              </div>
              <p className="text-muted text-[11px]">
                For the purposes of this Cookies Policy, &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot; refers to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="border border-border p-4 bg-surface space-y-1">
                  <span className="font-bold text-foreground block">Sri Lanka Entity</span>
                  <p className="text-foreground">Perceptras Digital Labs (Pvt) Ltd</p>
                  <p className="text-muted text-[11px]">26 Silver Crescent, Rajagiriya, Sri Lanka</p>
                </div>
                <div className="border border-border p-4 bg-surface space-y-1">
                  <span className="font-bold text-foreground block">United States Entity</span>
                  <p className="text-foreground">Perceptras Digital Labs LLC</p>
                  <p className="text-muted text-[11px]">333 Bush Street, Suite 700, San Francisco, CA 94104, USA</p>
                </div>
              </div>
            </div>

            {/* Types of Cookies Used */}
            <div className="space-y-6 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Types of Cookies We Use
              </h2>
              <p>
                Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when you go offline, while Session Cookies are deleted as soon as you close your web browser.
              </p>

              <div className="space-y-4">
                <div className="border border-border p-4 bg-surface space-y-2">
                  <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                    1. Necessary / Essential Cookies (Session)
                  </h3>
                  <p className="text-muted text-[11px]">
                    <strong>Administered by:</strong> Us<br />
                    <strong>Purpose:</strong> These Cookies are essential to provide You with services available through the Website and to authenticate users, prevent fraudulent access to controller sessions, and maintain secure token headers.
                  </p>
                </div>

                <div className="border border-border p-4 bg-surface space-y-2">
                  <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                    2. Notice &amp; Consent Acceptance Cookies (Persistent)
                  </h3>
                  <p className="text-muted text-[11px]">
                    <strong>Administered by:</strong> Us<br />
                    <strong>Purpose:</strong> These Cookies identify whether users have accepted the cookie consent banner and record preference choices to honor on future visits.
                  </p>
                </div>

                <div className="border border-border p-4 bg-surface space-y-2">
                  <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                    3. Functionality &amp; Theme Cookies (Persistent)
                  </h3>
                  <p className="text-muted text-[11px]">
                    <strong>Administered by:</strong> Us<br />
                    <strong>Purpose:</strong> Remembers user theme preferences (Light / Dark mode) and workspace state for a customized experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Choices */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Your Choices Regarding Cookies
              </h2>
              <p>
                If You prefer to avoid the use of Cookies on the Website, You may disable or clear Cookies in your browser settings at any time, or use our on-site cookie consent preferences banner.
              </p>
            </div>

            {/* Contact */}
            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Contact Us
              </h2>
              <p className="text-muted">
                If you have any questions about this Cookies Policy, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/contact/" className="border border-border p-3 bg-surface hover:bg-foreground/5 transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4 text-foreground" />
                  <span>Contact Form // perceptras.net/contact</span>
                </Link>
                <a href="mailto:contact@perceptras.net" className="border border-border p-3 bg-surface hover:bg-foreground/5 transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4 text-foreground" />
                  <span>contact@perceptras.net</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
