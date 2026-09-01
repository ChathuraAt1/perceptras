import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Building2, Mail, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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

          <MonoTag>LEGAL &amp; TERMS OF SERVICE</MonoTag>
          <Display as="h1" className="text-3xl sm:text-5xl font-bold mt-2">
            Terms and Conditions
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
                Please read these terms and conditions carefully before using Our Service. These Terms and Conditions govern Your access to and use of the Perceptras platform and form the entire agreement between You and the Company regarding the Service.
              </p>
            </div>

            {/* Operating Legal Entities */}
            <div className="border border-border p-6 bg-surface/50 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase">
                <Building2 className="h-4 w-4" />
                <span>Operating Legal Entities</span>
              </div>
              <p className="text-muted text-[11px]">
                For the purposes of these Terms and Conditions, &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot; refers to:
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

            {/* Acknowledgment */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Acknowledgment
              </h2>
              <p>
                These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms set out the rights and obligations of all users regarding the use of the Service.
              </p>
              <p>
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              <p>
                You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
              </p>
            </div>

            {/* Edge Software & Licensing */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Software Subscriptions &amp; Edge Licensing
              </h2>
              <p>
                Subscription tiers (Starter, Professional, Enterprise) grant a limited, non-exclusive license to execute Perceptras perception runtimes on designated edge hardware clusters according to active stream quotas.
              </p>
              <p>
                Unauthorized reverse engineering, redistribution of compiled neural execution kernels, or sublicensing of edge binaries is strictly prohibited.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Limitation of Liability
              </h2>
              <p>
                Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You have not purchased anything through the Service.
              </p>
              <p>
                To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including loss of profits, loss of data, business interruption, or personal injury).
              </p>
            </div>

            {/* Disclaimer */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
              </h2>
              <p>
                The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; with all faults and defects without warranty of any kind. The Company disclaims all warranties, whether express, implied, statutory or otherwise, including merchantability and fitness for a particular purpose.
              </p>
            </div>

            {/* Governing Law */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Governing Law &amp; Dispute Resolution
              </h2>
              <p>
                These Terms and Your use of the Service shall be governed by the laws of Sri Lanka and the State of California, United States, without regard to conflict of law principles. If You have any concern or dispute about the Service, You agree to first attempt informal resolution by contacting the Company.
              </p>
            </div>

            {/* Contact */}
            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Contact Us
              </h2>
              <p className="text-muted">
                For questions regarding these Terms and Conditions, please contact us:
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
