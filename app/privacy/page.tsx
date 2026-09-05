import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Building2, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Perceptras',
  description: 'Privacy Policy describing how Perceptras collects, uses, retains, and protects personal data and privacy rights.',
};

export default function PrivacyPolicyPage() {
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
            {/* Preamble */}
            <div className="space-y-4">
              <p>
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
              <p>
                We use Your Personal Data to provide and improve the Service. We collect, use, and disclose Your information as described in this Privacy Policy and, where required by applicable law, only where We have a valid legal basis to do so, including Your consent (where consent is required).
              </p>
            </div>

            {/* Operating Legal Entities Card */}
            <div className="border border-border p-6 bg-surface/50 space-y-4">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase">
                <Building2 className="h-4 w-4" />
                <span>Operating Legal Entities</span>
              </div>
              <p className="text-muted text-[11px]">
                For the purposes of this Privacy Policy, &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; refers to the applicable Perceptras operating entity based on your jurisdiction:
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
                <p>For the purposes of this Privacy Policy:</p>
                <ul className="space-y-2.5 list-disc list-inside text-muted pl-1">
                  <li>
                    <strong className="text-foreground">Account</strong> means a unique account created for You to access Our Service or parts of Our Service.
                  </li>
                  <li>
                    <strong className="text-foreground">Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                  </li>
                  <li>
                    <strong className="text-foreground">Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Privacy Policy) refers to Perceptras Digital Labs (Pvt) Ltd (26 Silver Crescent, Rajagiriya, Sri Lanka) and Perceptras Digital Labs LLC (333 Bush Street, Suite 700, San Francisco, CA 94104, USA).
                  </li>
                  <li>
                    <strong className="text-foreground">Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website, among its many uses.
                  </li>
                  <li>
                    <strong className="text-foreground">Country/State</strong> refers to: Sri Lanka or the United States, as applicable based on Your operating jurisdiction.
                  </li>
                  <li>
                    <strong className="text-foreground">Device</strong> means any device that can access the Service, such as a computer, a cell phone or a digital tablet.
                  </li>
                  <li>
                    <strong className="text-foreground">Personal Data</strong> (or &quot;Personal Information&quot;) is any information that relates to an identified or identifiable individual. We use &quot;Personal Data&quot; and &quot;Personal Information&quot; interchangeably unless a law uses a specific term.
                  </li>
                  <li>
                    <strong className="text-foreground">Service</strong> refers to the Website.
                  </li>
                  <li>
                    <strong className="text-foreground">Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                  </li>
                  <li>
                    <strong className="text-foreground">Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                  </li>
                  <li>
                    <strong className="text-foreground">User</strong> means any individual who accesses or uses the Service.
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
                    <strong className="text-foreground">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                  </li>
                </ul>
              </div>
            </div>

            {/* Collecting and Using Your Personal Information */}
            <div className="space-y-6 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Collecting and Using Your Personal Information
              </h2>

              {/* Types of Data Collected */}
              <div className="space-y-4">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Types of Data Collected
                </h3>

                <div className="space-y-2">
                  <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                    Personal Data
                  </h4>
                  <p>
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted pl-1">
                    <li>Email address</li>
                    <li>First name and last name</li>
                  </ul>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                    Usage Data
                  </h4>
                  <p>
                    Usage Data is collected automatically when using the Service.
                  </p>
                  <p>
                    Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of Our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                  </p>
                  <p>
                    When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device&apos;s unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                  </p>
                  <p>
                    We may also collect information that Your browser sends whenever You visit Our Service or when You access the Service by or through a mobile device.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                    Tracking Technologies and Cookies
                  </h4>
                  <p>
                    We use tracking technologies (such as cookies) to track the activity and to improve Our Service. The technologies We use may include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted pl-1">
                    <li>
                      <strong className="text-foreground">Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of Our Service.
                    </li>
                    <li>
                      <strong className="text-foreground">Web Beacons.</strong> Certain sections of Our Service may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                    </li>
                  </ul>
                  <p>
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                  </p>
                  <p>
                    Where required by law, We use non-essential cookies (that is, Cookies other than the Necessary / Essential Cookies described below) only with Your consent. You can withdraw or change Your consent at any time using Our cookie preferences tool (if available) or through Your browser/device settings. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.
                  </p>
                  <p>
                    We use both Session and Persistent Cookies for the purposes set out below:
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="border border-border p-4 bg-surface/60 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-1.5">
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

                    <div className="border border-border p-4 bg-surface/60 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-1.5">
                        <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                          Cookies Policy / Notice Acceptance Cookies
                        </span>
                        <span className="text-[10px] bg-background border border-border px-2 py-0.5 text-muted uppercase">
                          Persistent Cookies
                        </span>
                      </div>
                      <p className="text-[11px] text-muted">
                        <strong className="text-foreground">Administered by:</strong> Us
                      </p>
                      <p className="text-foreground/90">
                        <strong className="text-foreground">Purpose:</strong> These Cookies identify whether users have accepted the use of cookies on the Website and record the consent choices You have made, so that We can honor those choices on future visits.
                      </p>
                    </div>

                    <div className="border border-border p-4 bg-surface/60 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-1.5">
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
                        <strong className="text-foreground">Purpose:</strong> These Cookies allow Us to remember choices You make when You use the Website, such as remembering Your Account login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter Your preferences every time You use the Website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use of Your Personal Data */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Use of Your Personal Data
                </h3>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul className="space-y-2 list-disc list-inside text-muted pl-1">
                  <li>
                    <strong className="text-foreground">To provide and maintain Our Service</strong>, including to monitor the usage of Our Service.
                  </li>
                  <li>
                    <strong className="text-foreground">To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
                  </li>
                  <li>
                    <strong className="text-foreground">For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
                  </li>
                  <li>
                    <strong className="text-foreground">To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&apos;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
                  </li>
                  <li>
                    <strong className="text-foreground">To provide You</strong> with news, special offers, and general information about other goods, services and events which We offer that are similar to those that You have already purchased or inquired about. We send such marketing communications only where permitted by applicable law: where prior consent is required (for example, under the laws applicable in the EEA and the UK), We will send them only with Your consent; otherwise, We may send them until You opt out. You may opt out or withdraw Your consent at any time by using the unsubscribe link in any marketing email We send or by contacting Us.
                  </li>
                  <li>
                    <strong className="text-foreground">To manage Your requests:</strong> To attend and manage Your requests to Us.
                  </li>
                  <li>
                    <strong className="text-foreground">For business transfers:</strong> We may use Your Personal Data to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about Our Service users is among the assets transferred.
                  </li>
                  <li>
                    <strong className="text-foreground">For other purposes:</strong> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of Our promotional campaigns, and evaluating and improving Our Service, products, services, marketing and Your experience.
                  </li>
                </ul>

                <p className="pt-2">We may share Your Personal Data in the following situations:</p>
                <ul className="space-y-2 list-disc list-inside text-muted pl-1">
                  <li>
                    <strong className="text-foreground">With Service Providers:</strong> We may share Your Personal Data with Service Providers to monitor and analyze the use of Our Service, and to contact You.
                  </li>
                  <li>
                    <strong className="text-foreground">For business transfers:</strong> We may share or transfer Your Personal Data in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
                  </li>
                  <li>
                    <strong className="text-foreground">With Affiliates:</strong> We may share Your Personal Data with Our affiliates, in which case We will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
                  </li>
                  <li>
                    <strong className="text-foreground">With other users:</strong> If Our Service offers public areas, when You share Personal Data or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside the Service.
                  </li>
                  <li>
                    <strong className="text-foreground">With Your consent:</strong> We may disclose Your Personal Data for any other purpose with Your consent.
                  </li>
                </ul>
              </div>

              {/* Text Messages Privacy Notice */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Text Messages Privacy Notice
                </h3>
                <p>
                  You have the option to receive text (SMS) messages from Us. If You opt in to text messages, We will send You updates, notifications, and other communications as described below. When You opt in, We will collect and store the information You provide in connection with text messaging, such as Your phone number, the date and method of Your consent, and message delivery and read information.
                </p>
                <p>
                  No mobile information will be shared with or sold to third parties or affiliates for marketing or promotional purposes. The phone numbers and consent records We collect for texting are never shared with anyone for any purpose, except the Service Providers that technically have to handle them to deliver the texts.
                </p>
                <p>
                  Consent to receive text messages is not a condition of any purchase or use of Our Service. If You consent to receive SMS from Us, You agree to receive text messages from Us related to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted pl-1">
                  <li>Customer care and support</li>
                  <li>Account notifications, such as activity, status, or renewal reminders</li>
                  <li>Delivery notifications and updates on the status of a delivery</li>
                  <li>Authentication messages, such as one-time passwords (OTP) and passcodes</li>
                  <li>Security alerts, such as suspicious login attempts or unusual account activity</li>
                  <li>Marketing and promotional offers, discounts, and other promotional content</li>
                </ul>
                <p className="border border-border p-3.5 bg-surface/50 text-[11px] text-muted">
                  Reply STOP to opt-out. Reply HELP for support. Message &amp; data rates may apply. Messaging frequency may vary. Carriers are not liable for delayed or undelivered messages.
                </p>
              </div>

              {/* Retention of Your Personal Data */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Retention of Your Personal Data
                </h3>
                <p>
                  The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with Our legal obligations (for example, if We are required to retain Your data to comply with applicable laws), resolve disputes, and enforce Our legal agreements and policies.
                </p>
                <p>
                  Where possible, We apply shorter retention periods and/or reduce identifiability by deleting, aggregating, or anonymizing data. Unless otherwise stated, the retention periods below are maximum periods (&quot;up to&quot;) and We may delete or anonymize data sooner when it is no longer needed for the relevant purpose. We apply different retention periods to different categories of Personal Data based on the purpose of processing and legal obligations:
                </p>

                <div className="space-y-3 pt-2">
                  <div className="border border-border p-4 bg-surface/60 space-y-1">
                    <h5 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                      Account Information
                    </h5>
                    <p className="text-muted">
                      User Accounts: retained for the duration of Your Account relationship plus up to 24 months after account closure to handle any post-termination issues or resolve disputes.
                    </p>
                  </div>

                  <div className="border border-border p-4 bg-surface/60 space-y-1">
                    <h5 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                      Customer Support Data
                    </h5>
                    <p className="text-muted">
                      Support tickets and correspondence: up to 24 months from the date of ticket closure to resolve follow-up inquiries, track service quality, and defend against potential legal claims.
                    </p>
                    <p className="text-muted">
                      Chat transcripts: up to 24 months for quality assurance and staff training purposes.
                    </p>
                  </div>

                  <div className="border border-border p-4 bg-surface/60 space-y-1">
                    <h5 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
                      Usage Data
                    </h5>
                    <p className="text-muted">
                      Website analytics data (cookies, IP addresses, device identifiers): up to 24 months from the date of collection, which allows us to analyze trends while respecting privacy principles.
                    </p>
                    <p className="text-muted">
                      Server logs (IP addresses, access times): up to 24 months for security monitoring and troubleshooting purposes.
                    </p>
                  </div>
                </div>

                <p>
                  Usage Data is retained in accordance with the retention periods described above, and may be retained longer only where necessary for security, fraud prevention, or legal compliance.
                </p>
                <p>We may retain Personal Data beyond the periods stated above for different reasons:</p>
                <ul className="list-disc list-inside space-y-1 text-muted pl-1">
                  <li><strong className="text-foreground">Legal obligation:</strong> We are required by law to retain specific data (e.g., financial records for tax authorities).</li>
                  <li><strong className="text-foreground">Legal claims:</strong> Data is necessary to establish, exercise, or defend legal claims.</li>
                  <li><strong className="text-foreground">Your explicit request:</strong> You ask Us to retain specific information.</li>
                  <li><strong className="text-foreground">Technical limitations:</strong> Data exists in backup systems that are scheduled for routine deletion.</li>
                </ul>

                <p>
                  You may request information about how long We will retain Your Personal Data by contacting Us.
                </p>
                <p>
                  When retention periods expire, We securely delete or anonymize Personal Data according to the following procedures:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted pl-1">
                  <li><strong className="text-foreground">Deletion:</strong> Personal Data is removed from Our systems and no longer actively processed.</li>
                  <li><strong className="text-foreground">Backup retention:</strong> Residual copies may remain in encrypted backups for a limited period consistent with Our backup retention schedule and are not restored except where necessary for security, disaster recovery, or legal compliance.</li>
                  <li><strong className="text-foreground">Anonymization:</strong> In some cases, We convert Personal Data into anonymous statistical data that cannot be linked back to You. This anonymized data may be retained indefinitely for research and analytics.</li>
                </ul>
              </div>

              {/* Transfer of Your Personal Data */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Transfer of Your Personal Data
                </h3>
                <p>
                  Your information, including Personal Data, is processed at the Company&apos;s operating offices and in any other places where the parties involved in the processing are located. This means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of Your jurisdiction.
                </p>
                <p>
                  Where required by applicable law, We will ensure that international transfers of Your Personal Data are subject to appropriate safeguards and, where relevant, supplementary measures. The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place, including the security of Your data and other personal information.
                </p>
              </div>

              {/* Delete Your Personal Data */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Delete Your Personal Data
                </h3>
                <p>
                  You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
                </p>
                <p>
                  Our Service may give You the ability to delete certain information about You from within the Service.
                </p>
                <p>
                  You may update, amend, or delete Your information at any time by signing in to Your Account, if You have one, and visiting the account settings section that allows You to manage Your personal information. You may also contact Us to request access to, correct, or delete any Personal Data that You have provided to Us.
                </p>
                <p>
                  Please note, however, that We may need to retain certain information when We have a legal obligation or lawful basis to do so.
                </p>
              </div>

              {/* Disclosure of Your Personal Data */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Disclosure of Your Personal Data
                </h3>

                <div className="space-y-2">
                  <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                    Business Transactions
                  </h4>
                  <p>
                    If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                    Law Enforcement
                  </h4>
                  <p>
                    Under certain circumstances, the Company may disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                    Other Legal Requirements
                  </h4>
                  <p>
                    The Company may disclose Your Personal Data in the good-faith belief that such action is necessary to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted pl-1">
                    <li>Comply with a legal obligation</li>
                    <li>Protect and defend the rights or property of the Company</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                    <li>Protect the personal safety of Users of the Service or the public</li>
                    <li>Protect against legal liability</li>
                  </ul>
                </div>
              </div>

              {/* Security of Your Personal Data */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Security of Your Personal Data
                </h3>
                <p>
                  The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
              </div>
            </div>

            {/* Children's and Minors' Privacy */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Children&apos;s and Minors&apos; Privacy
              </h2>
              <p>
                The Service is not directed to, and We do not knowingly collect Personal Information from, anyone under the age of 16.
              </p>
              <p>
                If You are a parent or guardian and You believe Your child has provided Us with Personal Information, please contact Us. If We become aware that We have collected Personal Information from anyone under the age of 16, We will take steps to remove that information from Our servers as soon as reasonably possible.
              </p>
              <p>
                Some countries and states set a higher age at which an individual can consent to the processing of their own Personal Information. Where We rely on consent as a legal basis and the law applicable to a User sets an age higher than 16, We may require the consent of that User&apos;s parent or guardian before We collect and use their Personal Information.
              </p>
            </div>

            {/* Links to Other Websites */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Links to Other Websites
              </h2>
              <p>
                Our Service may contain links to other websites that are not operated by Us. If You click on a third-party link, You will be directed to that third party&apos;s site. We strongly advise You to review the Privacy Policy of every site You visit.
              </p>
              <p>
                We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
              </p>
            </div>

            {/* Changes to this Privacy Policy */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Changes to this Privacy Policy
              </h2>
              <p>
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
              </p>
              <p>
                We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>

            {/* Contact Us */}
            <div className="space-y-4 border-t border-border pt-6">
              <h2 className="font-syne text-lg font-bold uppercase text-foreground">
                Contact Us
              </h2>
              <p>
                If You have any questions about this Privacy Policy, You can contact Us:
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
                  By visiting this page on Our Website:{' '}
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
