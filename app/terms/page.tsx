import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Building2, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions — Perceptras',
  description: 'Terms and Conditions governing the access to and use of the Perceptras website and physical AI perception infrastructure platform.',
};

export default function TermsPage() {
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
            {/* Preamble */}
            <div className="space-y-4">
              <p>
                Please read these terms and conditions carefully before using Our Service.
              </p>
            </div>

            {/* Operating Legal Entities Card */}
            <div className="border border-border p-6 bg-surface/50 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase">
                <Building2 className="h-4 w-4" />
                <span>Operating Legal Entities</span>
              </div>
              <p className="text-muted text-[11px]">
                For the purposes of these Terms and Conditions, &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; refers to the applicable Perceptras operating entity based on your jurisdiction:
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
                <p>For the purposes of these Terms and Conditions:</p>
                <ul className="space-y-2.5 list-disc list-inside text-muted pl-1">
                  <li>
                    <strong className="text-foreground">Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                  </li>
                  <li>
                    <strong className="text-foreground">Country/State</strong> refers to: Sri Lanka or the State of California, United States, as applicable to Your service contract or governing commercial order.
                  </li>
                  <li>
                    <strong className="text-foreground">Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these Terms and Conditions) refers to Perceptras Digital Labs (Pvt) Ltd (26 Silver Crescent, Rajagiriya, Sri Lanka) and Perceptras Digital Labs LLC (333 Bush Street, Suite 700, San Francisco, CA 94104, USA).
                  </li>
                  <li>
                    <strong className="text-foreground">Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.
                  </li>
                  <li>
                    <strong className="text-foreground">Service</strong> refers to the Website.
                  </li>
                  <li>
                    <strong className="text-foreground">Terms and Conditions</strong> (also referred to as &quot;Terms&quot;) means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service.
                  </li>
                  <li>
                    <strong className="text-foreground">Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.
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
                  </li>
                  <li>
                    <strong className="text-foreground">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                  </li>
                </ul>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Acknowledgment
              </h2>
              <p>
                These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
              </p>
              <p>
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
              </p>
              <p>
                By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
              </p>
              <p>
                You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
              </p>
              <p>
                Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our{' '}
                <Link href="/privacy/" className="text-foreground underline underline-offset-4 hover:text-muted">
                  Privacy Policy
                </Link>{' '}
                carefully before using Our Service.
              </p>
            </div>

            {/* Links to Other Websites */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Links to Other Websites
              </h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.
              </p>
              <p>
                The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.
              </p>
              <p>
                We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                  Links from a Third-Party Social Media Service
                </h3>
                <p>
                  The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.
                </p>
                <p>
                  You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service&apos;s terms and privacy policies.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Termination
              </h2>
              <p>
                We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
              </p>
              <p>
                Upon termination, Your right to use the Service will cease immediately.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Limitation of Liability
              </h2>
              <p>
                Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven&apos;t purchased anything through the Service.
              </p>
              <p>
                To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
              </p>
              <p>
                Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party&apos;s liability will be limited to the greatest extent permitted by law.
              </p>
            </div>

            {/* "AS IS" and "AS AVAILABLE" Disclaimer */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
              </h2>
              <p>
                The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
              </p>
              <p>
                Without limiting the foregoing, neither the Company nor any of the company&apos;s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
              </p>
            </div>

            {/* Governing Law */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Governing Law
              </h2>
              <p>
                The laws of the Country/State, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
              </p>
            </div>

            {/* Disputes Resolution */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Disputes Resolution
              </h2>
              <p>
                If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
              </p>
            </div>

            {/* For European Union (EU) Users */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                For European Union (EU) Users
              </h2>
              <p>
                If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
              </p>
            </div>

            {/* United States Legal Compliance */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                United States Legal Compliance
              </h2>
              <p>
                You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
              </p>
            </div>

            {/* Severability and Waiver */}
            <div className="space-y-6 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Severability and Waiver
              </h2>
              <div className="space-y-3">
                <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                  Severability
                </h3>
                <p>
                  If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                  Waiver
                </h3>
                <p>
                  Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party&apos;s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
                </p>
              </div>
            </div>

            {/* Translation Interpretation */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Translation Interpretation
              </h2>
              <p>
                These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
              </p>
            </div>

            {/* Changes to These Terms and Conditions */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Changes to These Terms and Conditions
              </h2>
              <p>
                We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
              </p>
              <p>
                By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.
              </p>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Contact Us
              </h2>
              <p>
                If you have any questions about these Terms and Conditions, You can contact us:
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
