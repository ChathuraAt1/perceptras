import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { CredibilityStrip } from '@/components/marketing/credibility-strip';
import { FeatureShowcase } from '@/components/marketing/feature-showcase';
import { TestimonialsSection } from '@/components/marketing/testimonials';
import { FAQSection } from '@/components/marketing/faq-section';
import {
  Video,
  Zap,
  Compass,
  Network,
  ArrowRight,
  Bot,
  Warehouse,
  Factory,
  ShieldAlert,
} from 'lucide-react';

const PRODUCT_SUMMARY = [
  {
    id: 'flow',
    number: '01',
    name: 'Perceptras Flow',
    role: 'Multi-Stream Ingest Pipeline',
    description:
      'Connects up to 128 RTSP and industrial camera streams with zero-copy hardware decoding directly into AI tensor memory.',
    icon: Video,
  },
  {
    id: 'accel',
    number: '02',
    name: 'Perceptras Accel',
    role: 'Inference Optimization Engine',
    description:
      'Compiles PyTorch and ONNX models into ultra-fast execution graphs with automated INT8 and FP8 quantization.',
    icon: Zap,
  },
  {
    id: 'zone',
    number: '03',
    name: 'Perceptras Zone',
    role: 'Spatial Intelligence & Tracking',
    description:
      'Maps multiple camera angles into unified 3D physical coordinates with continuous tracking across blind spots.',
    icon: Compass,
  },
  {
    id: 'grid',
    number: '04',
    name: 'Perceptras Grid',
    role: 'Cluster Inference Orchestrator',
    description:
      'Orchestrates model deployments across edge devices and centralized GPU servers with automated load balancing.',
    icon: Network,
  },
];

const USE_CASES = [
  {
    icon: Bot,
    title: 'Autonomous Mobile Robots (AMR)',
    description:
      'Low-latency multi-camera obstacle detection, visual SLAM fusion, and 360-degree situational awareness for warehouse robots and autonomous delivery units.',
  },
  {
    icon: Warehouse,
    title: 'Smart Logistics & Warehouses',
    description:
      'Continuous spatial tracking of packages, forklifts, and personnel across massive multi-camera facility arrays with automated dock telemetry.',
  },
  {
    icon: Factory,
    title: 'Robotic Manufacturing & QC',
    description:
      'Line-rate defect classification, automated assembly inspection, and robotic guidance operating under sub-5ms latency budgets.',
  },
  {
    icon: ShieldAlert,
    title: 'Smart Spaces & Perimeter Security',
    description:
      'Multi-camera tracking across blind spots, geofenced intrusion alerts, and occupancy density mapping without streaming raw video off-premise.',
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section className="pt-24 md:pt-32 pb-16 md:pb-20">
        <Container>
          <div className="flex flex-wrap gap-3 mb-8">
            <MonoTag>Physical AI Infrastructure</MonoTag>
            <MonoTag>Real-Time Edge Perception</MonoTag>
            <MonoTag>Multi-Camera 3D Tracking</MonoTag>
          </div>

          <Display className="max-w-5xl">
            Physical AI
            <br />
            Perception
            <br />
            Infrastructure
          </Display>

          <p className="font-mono text-sm text-muted max-w-2xl mt-8 leading-relaxed">
            Perceptras is the software platform that connects cameras and sensors to real-time AI models. Engineered for autonomous robotics, smart manufacturing, and spatial intelligence at scale.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/auth/register/">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/products/">
              <Button variant="outline" size="lg">
                Explore Products →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Credibility & Recognition Strip ──────────────────── */}
      <CredibilityStrip />

      {/* ── Feature Showcase & Narrative ───────────────────── */}
      <Section borders={{ bottom: true }} className="py-20 md:py-28">
        <Container>
          <FeatureShowcase />
        </Container>
      </Section>

      {/* ── Product Ecosystem Overview ───────────────────────── */}
      <Section borders={{ bottom: true }} id="products">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <MonoTag className="mb-3">PRODUCT ECOSYSTEM</MonoTag>
              <Heading as="h2" className="text-3xl md:text-4xl">
                Modular Perception Suite
              </Heading>
            </div>
            <Link
              href="/products/"
              className="font-mono text-xs uppercase tracking-widest text-foreground hover:underline inline-flex items-center gap-1 font-semibold"
            >
              View Full Technical Specifications <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCT_SUMMARY.map((product) => (
              <div
                key={product.id}
                className="border border-border p-6 md:p-8 bg-surface flex flex-col justify-between hover:border-foreground/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <product.icon className="h-5 w-5 text-foreground stroke-[1.5]" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        MODULE {product.number}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase text-muted border border-border px-2 py-0.5">
                      {product.role}
                    </span>
                  </div>

                  <h3 className="font-syne text-xl font-bold uppercase mb-3">
                    {product.name}
                  </h3>
                  <p className="font-mono text-xs text-muted leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/products#${product.id}`}
                    className="font-mono text-[11px] uppercase tracking-wider text-foreground hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Link>
                  <span className="font-mono text-[10px] text-muted">Production Ready</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Enterprise & Industrial Use Cases ────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/30">
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag className="mb-3">DEPLOYMENT SCENARIOS</MonoTag>
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              Engineered for Demanding Environments
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              From mobile warehouse robotics to continuous factory line inspection, Perceptras delivers dependable perception across critical operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {USE_CASES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-surface p-8 flex flex-col gap-4">
                <Icon className="h-6 w-6 text-foreground stroke-[1.5]" />
                <h3 className="font-syne text-base font-bold uppercase">
                  {title}
                </h3>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Customer Testimonials ────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag className="mb-3">CUSTOMER VALIDATION</MonoTag>
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              Trusted by Vision &amp; Robotics Teams
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Discover how engineering leaders build real-time spatial intelligence into their physical systems with Perceptras.
            </p>
          </div>

          <TestimonialsSection />
        </Container>
      </Section>

      {/* ── Pricing Teaser ──────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/30 py-20 md:py-28">
        <Container>
          <div className="border border-border bg-surface p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <MonoTag>FLEXIBLE SUBSCRIPTIONS</MonoTag>
              <Heading as="h2" className="text-2xl md:text-4xl">
                Predictable Pricing for Any Hardware Scale
              </Heading>
              <p className="font-mono text-sm text-muted leading-relaxed">
                From single edge devices to multi-node facility clusters. Simple monthly or annual subscriptions with 20% discount on yearly billing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/pricing/">
                <Button variant="primary" size="lg" className="flex items-center justify-center gap-2">
                  <span>View All Pricing Plans</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Frequently Asked Questions ───────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag className="mb-3">COMMON QUESTIONS</MonoTag>
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              Frequently Asked Questions
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Answers to common questions about deployment, hardware support, and architecture.
            </p>
          </div>

          <FAQSection />
        </Container>
      </Section>

      {/* ── Call to Action ───────────────────────────────────── */}
      <Section className="py-24 md:py-32">
        <Container className="text-center">
          <Display as="h2" className="text-3xl md:text-5xl lg:text-6xl mb-6">
            Ready to Deploy Perceptras?
          </Display>
          <p className="font-mono text-sm text-muted max-w-lg mx-auto mb-10">
            Start your free trial today or connect with our solutions engineers to size your custom camera deployment.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register/">
              <Button variant="primary" size="lg">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact/">
              <Button variant="outline" size="lg">
                Contact Solutions →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
