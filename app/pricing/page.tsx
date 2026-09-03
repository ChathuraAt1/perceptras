import Link from "next/link";
import Image from "next/image";
import { Section, Container } from "@/components/layout/section-container";
import { Display, Heading, MonoTag } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section-pricing";

export default function PricingPage() {
  return (
    <>
      {/* ── Pricing Hero ────────────────────────────────────────── */}
      <Section className="pt-24 md:pt-36 pb-12 relative overflow-hidden">
        {/* Ambient 3D Grid Perception Lens Background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-25 dark:opacity-45 select-none flex items-center justify-center">
          <Image
            src="/images/pricing/hero.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <Container className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          <MonoTag>TRANSPARENT SUBSCRIPTION TIERS</MonoTag>
          <Display className="text-4xl sm:text-6xl font-bold">
            Infrastructure Scales With You So Should Pricing.
          </Display>
          <p className="font-mono text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            Whether you're running perception on a single site or across a
            distributed fleet, Perceptras scales with your streams, sites, and
            deployment footprint not a one-size-fits-all license.
          </p>
        </Container>
      </Section>

      {/* ── Interactive Pricing Section (Toggle + API sync) ───── */}
      <Section borders={{ bottom: true }} className="pb-24">
        <Container>
          <PricingSection />
        </Container>
      </Section>

      {/* ── Feature Comparison Matrix ──────────────────────────── */}
      <Section
        borders={{ bottom: true }}
        className="bg-surface/30 py-20 md:py-28"
      >
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag>CAPABILITY BREAKDOWN</MonoTag>
            <Heading as="h2" className="text-2xl md:text-4xl mt-3 mb-4">
              See Exactly What Scales With Each Plan
            </Heading>
            <p className="font-mono text-sm text-muted">
              A side-by-side view of what each plan includes from streams and
              pipeline orchestration to infrastructure management and support.
            </p>
          </div>

          <div className="border border-border bg-surface overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                  <th className="py-4 px-5 font-semibold">Feature / Metric</th>
                  <th className="py-4 px-5 font-semibold">NODE</th>
                  <th className="py-4 px-5 font-semibold text-foreground font-bold">
                    NETWORK
                  </th>
                  <th className="py-4 px-5 font-semibold">GRID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {
                  /*
                   Authorized streams
Up to 5
Up to 50
Unlimited
Perception pipeline orchestration
Core
Full multi-site
Full, dedicated capacity
Model runtime & serving
Standard
Priority (batching/concurrency)
Custom-tuned
Spatial event intelligence
Zone & dwell only
Full suite
Full suite + custom rules
Edge-to-core infrastructure manager
—
✓
✓ (advanced topology)
Perception operations dashboard
—
✓
✓
Structured event & metadata API
✓
✓
✓ + developer platform access
Observability & health monitoring
Basic
Standard
Advanced
Support
Email
Priority + SLA
Dedicated integration engineering
Deployment scope
Single site
Multi-site
Enterprise / multi-region


                   */
                  [
                    {
                      feature: "Authorized streams",
                      s: "Up to 5",
                      p: "Up to 50",
                      e: "Unlimited",
                    },
                    {
                      feature: "Perception pipeline orchestration",
                      s: "Core",
                      p: "Full multi-site",
                      e: "Full, dedicated capacity",
                    },
                    {
                      feature: "Model runtime & serving",
                      s: "Standard",
                      p: "Priority (batching/concurrency)",
                      e: "Custom-tuned",
                    },
                    {
                      feature: "Spatial event intelligence",
                      s: "Zone & dwell only",
                      p: "Full suite",
                      e: "Full suite + custom rules",
                    },
                    {
                      feature: "Edge-to-core infrastructure manager",
                      s: "—",
                      p: "✓",
                      e: "✓ (advanced topology)",
                    },
                    {
                      feature: "Perception operations dashboard",
                      s: "—",
                      p: "✓",
                      e: "✓",
                    },
                    {
                      feature: "Structured event & metadata API",
                      s: "✓",
                      p: "✓",
                      e: "✓ + developer platform access",
                    },
                    {
                      feature: "Observability & health monitoring",
                      s: "Basic",
                      p: "Standard",
                      e: "Advanced",
                    },
                    {
                      feature: "Support",
                      s: "Email",
                      p: "Priority + SLA",
                      e: "Dedicated integration engineering",
                    },
                    {
                      feature: "Deployment scope",
                      s: "Single site",
                      p: "Multi-site",
                      e: "Enterprise / multi-region",
                    },
                  ].map((row) => (
                    <tr
                      key={row.feature}
                      className="hover:bg-foreground/5 transition-colors"
                    >
                      <td className="py-3.5 px-5 font-bold text-foreground">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-5 text-muted">{row.s}</td>
                      <td className="py-3.5 px-5 text-foreground font-semibold bg-foreground/[0.02]">
                        {row.p}
                      </td>
                      <td className="py-3.5 px-5 text-foreground">{row.e}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── FAQ Section ────────────────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <FAQSection />
        </Container>
      </Section>

      {/* ── Enterprise Custom Sizing CTA ───────────────────────── */}
      <Section className="py-24 md:py-32 relative overflow-hidden">
        {/* Volumetric light ray atmospheric background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-20 dark:opacity-35 select-none flex items-center justify-center">
          <Image
            src="/images/pricing/need a custom.webp"
            alt=""
            fill
            className="object-cover object-bottom"
          />
        </div>

        <Container className="text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <Display as="h2" className="text-3xl md:text-5xl font-bold">
              Need a Custom Cluster Setup?
            </Display>
            <p className="font-mono text-sm text-muted leading-relaxed">
              We provide custom sizing consultations for multi-camera warehouse
              topologies, robotics OEMs, and high-security defense or
              manufacturing sites.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/contact?subject=Enterprise%20Sizing%20Inquiry">
                <Button variant="primary" size="lg">
                  Talk to a Systems Specialist
                </Button>
              </Link>
              <Link href="/products/">
                <Button variant="outline" size="lg">
                  View Product Architecture →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
