import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Building2, Mail, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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

          <MonoTag>LEGAL &amp; COMPLIANCE</MonoTag>
          <Display as="h1" className="text-3xl sm:text-5xl font-bold mt-2">
            Privacy Policy
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
                This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
              <p>
                We use Your Personal Data to provide and improve the Service. We collect, use, and disclose Your information as described in this Privacy Policy and, where required by applicable law, only where We have a valid legal basis to do so, including Your consent (where consent is required).
              </p>
            </div>

            {/* Legal Entities */}
            <div className="border border-border p-6 bg-surface/50 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase">
                <Building2 className="h-4 w-4" />
                <span>Operating Legal Entities</span>
              </div>
              <p className="text-muted text-[11px]">
                For the purposes of this Privacy Policy, &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot; refers to:
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

            {/* Interpretation & Definitions */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Interpretation and Definitions
              </h2>
              <ul className="space-y-2 list-disc list-inside text-muted">
                <li><strong className="text-foreground">Account</strong> means a unique account created for You to access Our Service or parts of Our Service.</li>
                <li><strong className="text-foreground">Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party (50%+ voting control).</li>
                <li><strong className="text-foreground">Cookies</strong> are small files placed on Your device containing details of browsing and session telemetry.</li>
                <li><strong className="text-foreground">Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                <li><strong className="text-foreground">Service</strong> refers to the Perceptras Website and Edge Perception Platform.</li>
                <li><strong className="text-foreground">Service Provider</strong> means any natural or legal person who processes data on behalf of the Company.</li>
                <li><strong className="text-foreground">Usage Data</strong> refers to diagnostic and telemetry data collected automatically from Service infrastructure.</li>
                <li><strong className="text-foreground">Website</strong> refers to Perceptras, accessible from https://perceptras.net.</li>
              </ul>
            </div>

            {/* Types of Data Collected */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Collecting and Using Your Personal Information
              </h2>
              <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                Personal Data
              </h3>
              <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information, including but not limited to:</p>
              <ul className="list-disc list-inside space-y-1 text-muted">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Company name &amp; billing addresses</li>
              </ul>

              <h3 className="font-syne text-sm font-bold uppercase text-foreground pt-4">
                Usage &amp; Cluster Telemetry Data
              </h3>
              <p>
                Usage Data is collected automatically when using the Service. This may include information such as IP address, browser type, pages visited, time spent, hardware device identifiers, and system diagnostics. On-premise raw video feeds processed by Perceptras edge hardware remain strictly within your local environment and are not collected by our cloud servers.
              </p>
            </div>

            {/* Retention & Transfer */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Retention &amp; Transfer of Personal Data
              </h2>
              <p>
                The Company retains Your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. User account data is retained for the duration of the account relationship plus up to 24 months for audit, dispute resolution, and security compliance.
              </p>
              <p>
                Your information may be processed across our operating entities in Sri Lanka and the United States. We implement strict technical and organizational safeguards to ensure all international data transfers comply with applicable data protection laws.
              </p>
            </div>

            {/* Security */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Security of Your Personal Data
              </h2>
              <p>
                The security of Your Personal Data is paramount to Us. We employ industry-standard encryption protocols (including 256-bit TLS/SSL and zero-knowledge client cryptographic hashing) for all credential and session data.
              </p>
            </div>

            {/* Contact */}
            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Contact Us
              </h2>
              <p className="text-muted">
                If You have any questions about this Privacy Policy or wish to exercise your data rights, please reach out:
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
