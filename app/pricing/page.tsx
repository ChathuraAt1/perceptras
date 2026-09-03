import Link from 'next/link';
import Image from 'next/image';
import { Section, Container } from '@/components/layout/section-container';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/components/marketing/pricing-section';
import { FAQSection } from '@/components/marketing/faq-section';

export default function PricingPage() {
  return (
    <>
      {/* ── Pricing Hero ────────────────────────────────────────── */}
      <Section className="pt-24 md:pt-36 pb-12 relative overflow-hidden">
        {/* Ambient 3D Grid Perception Lens Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.14] select-none flex items-center justify-center">
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
            Predictable Pricing for Physical Perception
          </Display>
          <p className="font-mono text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            Deploy on-premise perception pipelines on your own edge hardware. Scale camera channels effortlessly as your facility or robotics fleet grows.
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
      <Section borders={{ bottom: true }} className="bg-surface/30 py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag>CAPABILITY BREAKDOWN</MonoTag>
            <Heading as="h2" className="text-2xl md:text-4xl mt-3 mb-4">
              Plan Comparison Matrix
            </Heading>
            <p className="font-mono text-sm text-muted">
              Detailed breakdown of features, stream allowances, and support levels across tiers.
            </p>
          </div>

          <div className="border border-border bg-surface overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                  <th className="py-4 px-5 font-semibold">Feature / Metric</th>
                  <th className="py-4 px-5 font-semibold">Starter</th>
                  <th className="py-4 px-5 font-semibold text-foreground font-bold">Professional</th>
                  <th className="py-4 px-5 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { feature: 'Camera Channels', s: 'Up to 8', p: 'Up to 64', e: 'Unlimited' },
                  { feature: 'Edge Inference Engine', s: 'Perceptras Accel (FP16)', p: 'Perceptras Accel (INT8/FP8)', e: 'Custom Layer Compilers' },
                  { feature: '3D Spatial Tracking', s: 'Basic 2D Bounds', p: 'Perceptras Zone 3D Fused', e: 'Multi-Floor Cluster Tracking' },
                  { feature: 'Camera Protocols', s: 'RTSP & USB3', p: 'RTSP, GigE Vision, USB3, MIPI', e: 'All Industrial Camera Protocols' },
                  { feature: 'Telemetry Buses', s: 'WebSocket feeds', p: 'gRPC, Kafka, WebSockets', e: 'Dedicated Private Kafka / MQTT' },
                  { feature: 'Deployment Mode', s: 'Single Edge Host', p: 'Multi-Node Cluster', e: 'Air-Gapped & Sovereign Clusters' },
                  { feature: 'Support SLA', s: 'Community & Email', p: 'Priority (4-Hour SLA)', e: 'Dedicated Solution Architect & 24/7' },
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-foreground/5 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-foreground">{row.feature}</td>
                    <td className="py-3.5 px-5 text-muted">{row.s}</td>
                    <td className="py-3.5 px-5 text-foreground font-semibold bg-foreground/[0.02]">
                      {row.p}
                    </td>
                    <td className="py-3.5 px-5 text-foreground">{row.e}</td>
                  </tr>
                ))}
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
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.16] select-none flex items-center justify-center">
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
              We provide custom sizing consultations for multi-camera warehouse topologies, robotics OEMs, and high-security defense or manufacturing sites.
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
