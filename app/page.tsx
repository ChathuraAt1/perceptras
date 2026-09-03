import Link from 'next/link';
import Image from 'next/image';
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
    image: '/images/home/product ecosystem.webp',
  },
  {
    id: 'accel',
    number: '02',
    name: 'Perceptras Accel',
    role: 'Inference Optimization Engine',
    description:
      'Compiles PyTorch and ONNX models into ultra-fast execution graphs with automated INT8 and FP8 quantization.',
    icon: Zap,
    image: '/images/home/product ecosystem (2).webp',
  },
  {
    id: 'zone',
    number: '03',
    name: 'Perceptras Zone',
    role: 'Spatial Intelligence & Tracking',
    description:
      'Maps multiple camera angles into unified 3D physical coordinates with continuous tracking across blind spots.',
    icon: Compass,
    image: '/images/home/product ecosystem (3).webp',
  },
  {
    id: 'grid',
    number: '04',
    name: 'Perceptras Grid',
    role: 'Cluster Inference Orchestrator',
    description:
      'Orchestrates model deployments across edge devices and centralized GPU servers with automated load balancing.',
    icon: Network,
    image: '/images/home/product ecosystem (4).webp',
  },
];

const USE_CASES = [
  {
    icon: Bot,
    image: '/images/home/deployment.webp',
    title: 'Autonomous Mobile Robots (AMR)',
    description:
      'Low-latency multi-camera obstacle detection, visual SLAM fusion, and 360-degree situational awareness for warehouse robots and autonomous delivery units.',
  },
  {
    icon: Warehouse,
    image: '/images/home/deployment (2).webp',
    title: 'Smart Logistics & Warehouses',
    description:
      'Continuous spatial tracking of packages, forklifts, and personnel across massive multi-camera facility arrays with automated dock telemetry.',
  },
  {
    icon: Factory,
    image: '/images/home/deployment (3).webp',
    title: 'Robotic Manufacturing & QC',
    description:
      'Line-rate defect classification, automated assembly inspection, and robotic guidance operating under sub-5ms latency budgets.',
  },
  {
    icon: ShieldAlert,
    image: '/images/home/deployment (4).webp',
    title: 'Smart Spaces & Perimeter Security',
    description:
      'Multi-camera tracking across blind spots, geofenced intrusion alerts, and occupancy density mapping without streaming raw video off-premise.',
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section className="pt-20 md:pt-28 pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                <MonoTag>Physical AI Infrastructure</MonoTag>
                <MonoTag>Real-Time Edge Perception</MonoTag>
                <MonoTag>Multi-Camera 3D Tracking</MonoTag>
              </div>

              <Display className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
                Physical AI
                <br />
                Perception
                <br />
                Infrastructure
              </Display>

              <p className="font-mono text-sm text-muted max-w-xl leading-relaxed pt-2">
                Perceptras is the software platform that connects cameras and sensors to real-time AI models. Engineered for autonomous robotics, smart manufacturing, and spatial intelligence at scale.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/auth/register/">
                  <Button variant="primary" size="lg">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/products/">
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <span>Explore Products</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset Only */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg flex items-center justify-center">
                <Image
                  src="/images/home/hero (2).webp"
                  alt="Perceptras autonomous robotics camera sensor rig and drone"
                  width={1080}
                  height={1080}
                  priority
                  className="w-full h-auto max-h-[520px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
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
                className="border border-border p-6 md:p-8 bg-surface flex flex-col justify-between hover:border-foreground/50 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="h-12 w-12 border border-border bg-surface/90 p-2 flex items-center justify-center shrink-0 group-hover:border-foreground/40 transition-colors">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain dark:invert-0 invert transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted block">
                          MODULE {product.number}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase text-foreground">
                          {product.role}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase text-emerald-500 border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5">
                      PRODUCTION READY
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
                  <span className="font-mono text-[10px] text-muted">Edge-Compiled</span>
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
            {USE_CASES.map(({ image, title, description }) => (
              <div key={title} className="bg-surface p-8 flex flex-col justify-between gap-6 group hover:bg-surface/80 transition-colors">
                <div className="space-y-4">
                  <div className="h-14 w-14 border border-border bg-surface/90 p-2.5 flex items-center justify-center shrink-0 group-hover:border-foreground/40 transition-colors">
                    <Image
                      src={image}
                      alt={title}
                      width={48}
                      height={48}
                      className="h-full w-full object-contain dark:invert-0 invert transition-transform group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-syne text-base font-bold uppercase text-foreground">
                    {title}
                  </h3>
                  <p className="font-mono text-xs text-muted leading-relaxed">
                    {description}
                  </p>
                </div>
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
      <Section className="py-24 md:py-32 relative overflow-hidden">
        {/* Atmospheric background watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-15 dark:opacity-25 select-none flex items-center justify-center">
          <Image
            src="/images/home/hero.webp"
            alt=""
            width={1351}
            height={710}
            className="object-cover w-full h-full"
          />
        </div>

        <Container className="text-center relative z-10">
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
