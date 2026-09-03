import Link from "next/link";
import Image from "next/image";
import { Section, Container } from "@/components/layout/section-container";
import { Display, Heading, MonoTag } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { CredibilityStrip } from "@/components/marketing/credibility-strip";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { FAQSection } from "@/components/marketing/faq-section";
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
} from "lucide-react";

const PRODUCT_SUMMARY = [
  {
    id: "flow",
    number: "01",
    name: "Perception Pipeline Engine",
    role: "Multi-Stream Ingest Pipeline",
    description:
      "Handles stream decoding, preprocessing, detection, classification, and tracking turning raw visual input into structured, usable perception data.",
    icon: Video,
    image: "/images/home/product ecosystem.webp",
  },
  {
    id: "accel",
    number: "02",
    name: "Model Runtime & Serving Layer",
    role: "Inference Optimization Engine",
    description:
      "Registers compatible models and manages inference endpoints, batching, concurrency, and version tracking across every deployed perception pipeline.",
    icon: Zap,
    image: "/images/home/product ecosystem (2).webp",
  },
  {
    id: "zone",
    number: "03",
    name: "Perceptras Zone",
    role: "Spatial Event Intelligence",
    description:
      "Converts tracked objects into zone, dwell, and movement events, triggering operational alerts teams can actually act on.",
    icon: Compass,
    image: "/images/home/product ecosystem (3).webp",
  },
  {
    id: "grid",
    number: "04",
    name: "Edge-to-Core Infrastructure Manager",
    role: "Cluster Inference Orchestrator",
    description:
      "Manages site inventory, deployment status, and configuration distribution across distributed edge devices and centralized core infrastructure.",
    icon: Network,
    image: "/images/home/product ecosystem (4).webp",
  },
];

const USE_CASES = [
  {
    icon: Bot,
    image: "/images/home/deployment.webp",
    title: "Industrial Automation",
    description:
      "Tracks equipment, workflows, and safety zones across production floors using configurable detection and spatial rule sets.",
  },
  {
    icon: Warehouse,
    image: "/images/home/deployment (2).webp",
    title: "Logistics & Warehousing",
    description:
      "Monitors dock activity, inventory movement, and zone occupancy across distributed warehouse sites from a single pipeline.",
  },
  {
    icon: Factory,
    image: "/images/home/deployment (3).webp",
    title: "Retail Environments",
    description:
      "Observes store zones, dwell patterns, and traffic flow to generate structured, store-level operational event data.",
  },
  {
    icon: ShieldAlert,
    image: "/images/home/deployment (4).webp",
    title: "Edge-to-Core Deployments",
    description:
      "Runs inference at the edge while centralizing configuration, monitoring, and event delivery across every connected site.",
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
                Reusable
                <br />
                Perception for
                <br />
                the Real World
              </Display>

              <p className="font-mono text-sm text-muted max-w-xl leading-relaxed pt-2">
                Perceptras is the infrastructure layer underneath Physical AI
                the pipeline that turns raw visual streams into structured,
                operational events. Built once, deployed everywhere.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/auth/register/">
                  <Button variant="primary" size="lg">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/products/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
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
                One Platform. Four Interlocking Modules.
              </Heading>
            </div>
            <Link
              href="/products/"
              className="font-mono text-xs uppercase tracking-widest text-foreground hover:underline inline-flex items-center gap-1 font-semibold"
            >
              View Full Technical Specifications{" "}
              <ArrowRight className="h-3.5 w-3.5" />
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
                  <span className="font-mono text-[10px] text-muted">
                    Edge-Compiled
                  </span>
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
              Built for Where Physical AI Actually Runs.
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Description: Perceptras adapts to the environment it&apos;s deployed in
              same pipeline architecture, different cameras, sites, and
              operational rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {USE_CASES.map(({ image, title, description }) => (
              <div
                key={title}
                className="bg-surface p-8 flex flex-col justify-between gap-6 group hover:bg-surface/80 transition-colors"
              >
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
              Trusted by Teams Building the Next Wave of Physical AI
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Early adopters across industrial, logistics, and retail
              environments are putting Perceptras to work here&apos;s what standing
              up a shared perception layer has meant for their teams.
            </p>
          </div>

          <TestimonialsSection />
        </Container>
      </Section>

      {/* ── Pricing Teaser ──────────────────────────────────── */}
      <Section
        borders={{ bottom: true }}
        className="bg-surface/30 py-20 md:py-28"
      >
        <Container>
          <div className="border border-border bg-surface p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <MonoTag>FLEXIBLE SUBSCRIPTIONS</MonoTag>
              <Heading as="h2" className="text-2xl md:text-4xl">
                Predictable Pricing for Any Hardware Scale
              </Heading>
              <p className="font-mono text-sm text-muted leading-relaxed">
                From single edge devices to multi-node facility clusters. Simple
                monthly or annual subscriptions with 20% discount on yearly
                billing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/pricing/">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex items-center justify-center gap-2"
                >
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
              Questions Teams Ask Before They Deploy
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Straight answers about how Perceptras works, what it does, and
              what it doesn&apos;t promise.
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
            Turn Pixels Into Decisions Without Reinventing How
          </Display>
          <p className="font-mono text-sm text-muted max-w-lg mx-auto mb-10">
            Every new site doesn&apos;t need to mean new infrastructure. Perceptras
            gives your team a perception layer that&apos;s already built —
            configurable, observable, and ready to extend across your next
            deployment instead of starting from zero.
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
