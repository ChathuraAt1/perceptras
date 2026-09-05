import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Building2, ExternalLink, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookies Policy — Perceptras',
  description: 'Learn how Perceptras uses cookies and tracking technologies, your choices regarding cookies, and how we handle browser session data.',
};

export default function CookiesPolicyPage() {
  return (
    <>
      <Section className="pt-24 md:pt-36 pb-12">
        <Container className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="font-mono text-xs text-muted hover:text-foreground inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <MonoTag>LEGAL &amp; COMPLIANCE</MonoTag>
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
            {/* Preamble */}
            <div className="space-y-4">
              <p>
                This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.
              </p>
              <p>
                Cookies do not typically contain any information that personally identifies a user, but personal information that We store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our{' '}
                <Link href="/privacy/" className="text-foreground underline underline-offset-4 hover:text-muted">
                  Privacy Policy
                </Link>
                , if and when We make it available within the Website or on our website.
              </p>
              <p>
                We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.
              </p>
            </div>

            {/* Operating Legal Entities Card */}
            <div className="border border-border p-6 bg-surface/50 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase">
                <Building2 className="h-4 w-4" />
                <span>Operating Legal Entities</span>
              </div>
              <p className="text-muted text-[11px]">
                For the purposes of this Cookies Policy, &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; refers to the applicable Perceptras operating entity based on your jurisdiction:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="border border-border p-4 bg-surface space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500 font-bold block">
                    Global Headquarters (USA)
                  </span>
                  <span className="font-bold text-foreground block">Perceptras Digital Labs LLC</span>
                  <p className="text-muted text-[11px]">333 Bush Street, Suite 700, San Francisco, CA 94104, USA</p>
                  <p className="text-muted text-[11px]">Phone: +1 415 555 2104</p>
                </div>
                <div className="border border-border p-4 bg-surface space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500 font-bold block">
                    Engineering &amp; Operations Center (SL)
                  </span>
                  <span className="font-bold text-foreground block">Perceptras Digital Labs (Pvt) Ltd</span>
                  <p className="text-muted text-[11px]">26 Silver Crescent, Rajagiriya, Sri Lanka</p>
                  <p className="text-muted text-[11px]">Phone: +94 11 287 6431</p>
                </div>
              </div>
            </div>

            {/* Interpretation and Definitions */}
            <div className="space-y-6 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Interpretation and Definitions
              </h2>
              <div className="space-y-3">
                <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                  Interpretation
                </h3>
                <p>
                  The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                  Definitions
                </h3>
                <p>For the purposes of this Cookies Policy:</p>
                <ul className="space-y-2 list-disc list-inside text-muted pl-1">
                  <li>
                    <strong className="text-foreground">Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to Perceptras Digital Labs (Pvt) Ltd (26 Silver Crescent, Rajagiriya, Sri Lanka) and Perceptras Digital Labs LLC (333 Bush Street, Suite 700, San Francisco, CA 94104, USA).
                  </li>
                  <li>
                    <strong className="text-foreground">Cookies</strong> means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.
                  </li>
                  <li>
                    <strong className="text-foreground">Website</strong> refers to Perceptras, accessible from{' '}
                    <a
                      href="https://perceptras.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-4"
                    >
                      https://perceptras.net
                    </a>
                    .
                  </li>
                  <li>
                    <strong className="text-foreground">You</strong> means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.
                  </li>
                </ul>
              </div>
            </div>

            {/* The use of the Cookies */}
            <div className="space-y-6 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                The Use of the Cookies
              </h2>

              <div className="space-y-3">
                <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                  Type of Cookies We Use
                </h3>
                <p>
                  Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.
                </p>
                <p>
                  Where required by law, We will request your consent before using Cookies that are not strictly necessary. Strictly necessary Cookies are used to provide the Website and cannot be switched off in our systems.
                </p>
                <p>
                  We use both session and persistent Cookies for the purposes set out below:
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="border border-border p-5 bg-surface/60 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                    <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                      Necessary / Essential Cookies
                    </span>
                    <span className="text-[10px] bg-background border border-border px-2 py-0.5 text-muted uppercase">
                      Session Cookies
                    </span>
                  </div>
                  <p className="text-[11px] text-muted">
                    <strong className="text-foreground">Administered by:</strong> Us
                  </p>
                  <p className="text-foreground/90">
                    <strong className="text-foreground">Purpose:</strong> These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                  </p>
                </div>

                <div className="border border-border p-5 bg-surface/60 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                    <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                      Functionality Cookies
                    </span>
                    <span className="text-[10px] bg-background border border-border px-2 py-0.5 text-muted uppercase">
                      Persistent Cookies
                    </span>
                  </div>
                  <p className="text-[11px] text-muted">
                    <strong className="text-foreground">Administered by:</strong> Us
                  </p>
                  <p className="text-foreground/90">
                    <strong className="text-foreground">Purpose:</strong> These Cookies allow Us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Choices Regarding Cookies */}
            <div className="space-y-6 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Your Choices Regarding Cookies
              </h2>
              <p>
                If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with the Website. You may use this option for preventing the use of Cookies at any time.
              </p>
              <p>
                If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.
              </p>
              <p>
                If You&apos;d like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://support.google.com/accounts/answer/32050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border p-3.5 bg-surface/50 hover:bg-surface hover:border-foreground/40 transition-colors flex items-center justify-between group"
                >
                  <span className="font-bold text-foreground">Google Chrome</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-foreground transition-colors" />
                </a>

                <a
                  href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border p-3.5 bg-surface/50 hover:bg-surface hover:border-foreground/40 transition-colors flex items-center justify-between group"
                >
                  <span className="font-bold text-foreground">Microsoft Edge</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-foreground transition-colors" />
                </a>

                <a
                  href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border p-3.5 bg-surface/50 hover:bg-surface hover:border-foreground/40 transition-colors flex items-center justify-between group"
                >
                  <span className="font-bold text-foreground">Mozilla Firefox</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-foreground transition-colors" />
                </a>

                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border p-3.5 bg-surface/50 hover:bg-surface hover:border-foreground/40 transition-colors flex items-center justify-between group"
                >
                  <span className="font-bold text-foreground">Apple Safari</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-foreground transition-colors" />
                </a>
              </div>

              <p className="text-muted text-[11px]">
                For any other web browser, please visit your web browser&apos;s official web pages.
              </p>
            </div>

            {/* Changes to this Cookies Policy */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Changes to this Cookies Policy
              </h2>
              <p>
                We may update this Cookies Policy from time to time. The &quot;Last updated&quot; date at the top indicates when it was last revised.
              </p>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Cookies Policy, You can contact us:
              </p>
              <ul className="space-y-2 list-disc list-inside text-muted pl-1">
                <li>
                  By email:{' '}
                  <a href="mailto:contact@perceptras.net" className="text-foreground underline underline-offset-4">
                    contact@perceptras.net
                  </a>
                </li>
                <li>
                  By phone:{' '}
                  <span className="text-foreground">+1 415 555 2104</span> (USA) /{' '}
                  <span className="text-foreground">+94 11 287 6431</span> (Sri Lanka)
                </li>
                <li>
                  By visiting this page on our website:{' '}
                  <Link href="/contact/" className="text-foreground underline underline-offset-4">
                    https://perceptras.net/contact/
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
