import Link from "next/link";
import Image from "next/image";
import { Section, Container } from "@/components/layout/section-container";
import { Display, MonoTag } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const VALUES = [
  {
    num: "01",
    title: "Connect",
    description:
      "We onboard your authorized video and sensor streams, configuring sites, zones, and compatible models around your existing setup.",
  },
  {
    num: "02",
    title: "Configure",
    description:
      "Detection, classification, and tracking pipelines are set up to match your environment, use case, and operational rules.",
  },
  {
    num: "03",
    title: "Observe",
    description:
      "Pipeline health, latency, and model behavior stay visible through the operations dashboard, so nothing runs as a black box.",
  },
  {
    num: "04",
    title: "Deliver",
    description:
      "Structured events and metadata flow to your operational systems through APIs, ready for the teams that need them.",
  },
];

const TEAM = [
  {
    name: "Nirosan Vaithilingam",
    role: "Chief Technology Officer",
    initials: "NV",
    image: "/images/about/leaders (3).webp",
    gradient: "from-zinc-800 to-zinc-950",
    background:
      "Leads the core pipeline architecture, from stream ingestion to model runtime, with a focus on infrastructure that scales without breaking under real-world conditions.",
  },
  {
    name: "Kalaivani Sivanesan",
    role: "Chief Operating Officer",
    initials: "KS",
    image: "/images/about/leaders.webp",
    gradient: "from-zinc-700 to-zinc-900",
    background:
      "Oversees deployment operations and cross-site rollouts, making sure every new implementation runs on the same reliable, repeatable process.",
  },
  {
    name: "Thiruvarasu Balasubramaniam",
    role: "Lead Perception Engineer",
    initials: "TB",
    image: "/images/about/leaders (4).webp",
    gradient: "from-zinc-800 to-zinc-900",
    background:
      "Builds and refines the detection, tracking, and spatial event systems that turn raw visual streams into structured, usable data.",
  },
  {
    name: "Priyadharshini Mahendran",
    role: "Head of Infrastructure Engineering",
    initials: "PM",
    image: "/images/about/leaders (2).webp",
    gradient: "from-zinc-700 to-zinc-950",
    background:
      "Manages the edge-to-core deployment layer, keeping distributed sites connected, observable, and consistently configured at scale.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* ── 1. Hero & Company Overview ───────────────────────── */}
      <Section className="pt-24 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
        {/* Ambient 3D Grid Perception Lens Background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-25 dark:opacity-45 select-none flex items-center justify-center">
          <Image
            src="/images/about/hero.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 flex flex-col items-center">
            <MonoTag>ABOUT PERCEPTRAS</MonoTag>

            <Display className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              We Got Tired of Watching Teams Reinvent the Same Pipeline.
            </Display>

            <p className="font-mono text-base text-muted leading-relaxed pt-2 max-w-2xl mx-auto">
              Every site had its own cameras, its own quirks, its own
              from-scratch buildand the same infrastructure problem hiding
              underneath all of it. Perceptras exist because that repetition
              wasn&apos;t necessary. We built the perception layer once, so your team
              can spend its time on what the data means, not on plumbing it into
              existence.
            </p>

            {/* Company Profile Directory Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-border font-mono text-xs w-full max-w-xl">
              <span className="text-muted uppercase text-[10px] tracking-widest">
                Verified Company Profiles:
              </span>
              <a
                href="https://www.crunchbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Crunchbase</span>
                <ExternalLink className="h-3 w-3 text-muted" />
              </a>
              <a
                href="https://www.f6s.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>F6S Community</span>
                <ExternalLink className="h-3 w-3 text-muted" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. What We Do & Our Mission ──────────────────────── */}
      <Section
        borders={{ top: true, bottom: true }}
        className="bg-surface/30 py-20 md:py-28"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5 space-y-3">
              <MonoTag>OUR PURPOSE</MonoTag>
              <h2 className="font-syne text-2xl md:text-4xl font-bold uppercase text-foreground leading-snug">
                The Reason We Started
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 font-mono text-sm text-muted leading-relaxed">
              <p className="text-foreground font-semibold text-base">
                Cameras are everywhere, but most of them only record video for
                humans to watch later.
              </p>
              <p>
                It started with a pattern we kept seeing repeat itself.
                Different industries, different cameras, different sites but
                underneath every one of them, the same unsolved problem: a
                perception pipeline being engineered from scratch, again,
                because nothing reusable existed to build on. Teams were
                spending their best engineering hours on plumbing instead of on
                the operational insight that plumbing was supposed to deliver.
              </p>
              <p>
                That&apos;s the gap Perceptras was built to close. Stream ingestion,
                tracking, event generation, and observability don&apos;t change
                fundamentally from one deployment to the nextonly the surface
                does. So we standardized the layer underneath, once, so that the
                surface could shift freelynew site, new camera, new use case
                without dragging the entire pipeline back to zero every time.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3. What Inspired Us (The Story) ──────────────────── */}
      <Section borders={{ bottom: true }} className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl space-y-4 mb-16">
            <MonoTag>WHAT INSPIRED US</MonoTag>
            <h2 className="font-syne text-3xl md:text-4xl font-bold uppercase text-foreground">
              The Gap We Kept Noticing
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Before Perceptras existed, these were the same friction points
              showing up on every deployment we touched.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-t border-border pt-6 space-y-3">
              <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
                Problem 01
              </span>
              <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                Duplicated Infrastructure
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Every new site rebuilt ingestion, tracking, and event logic from
                scratch, wasting engineering time on plumbing instead of
                operational insight.
              </p>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
                Problem 02
              </span>
              <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                Fragmented Environments
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Camera placement, hardware, and site conditions varied so widely
                that no two deployments shared a reusable, standardized
                foundation.
              </p>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <span className="font-mono text-xs text-muted uppercase tracking-widest font-bold">
                Problem 03
              </span>
              <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                Disconnected Metadata
              </h3>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Perception outputs rarely matched what operational systems
                expected, forcing teams to build custom integrations for every
                single site.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 border border-border bg-surface">
            <h3 className="font-syne text-base font-bold uppercase text-foreground mb-2">
              Solution
            </h3>
            {/* bold sub heading line */}
            <h4 className="font-syne text-sm font-bold text-foreground">
              One Reusable Perception Layer
            </h4>
            <p className="font-mono text-xs text-muted leading-relaxed">
              We standardized the infrastructure underneath Physical AI once, so
              teams configure and deploy pipelines instead of rebuilding them
              repeatedly.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── 4. Core Values ───────────────────────────────────── */}
      <Section
        borders={{ bottom: true }}
        className="bg-surface/30 py-20 md:py-28"
      >
        <Container>
          <div className="max-w-3xl space-y-4 mb-16">
            <MonoTag>HOW WE WORK</MonoTag>
            <h2 className="font-syne text-3xl md:text-4xl font-bold uppercase text-foreground">
              From Raw Streams to Operational Reality
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed">
              The same four-stage approach behind every Perceptras deployment,
              regardless of site or industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {VALUES.map((v) => (
              <div
                key={v.num}
                className="border-t border-border pt-6 space-y-3"
              >
                <span className="font-mono text-xs font-bold text-muted">
                  {v.num}
                </span>
                <h3 className="font-syne text-xl font-bold uppercase text-foreground">
                  {v.title}
                </h3>
                <p className="font-mono text-sm text-muted leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 5. Our Team ──────────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl space-y-4 mb-16">
            <MonoTag>THE PEOPLE BEHIND PERCEPTRAS</MonoTag>
            <h2 className="font-syne text-3xl md:text-4xl font-bold uppercase text-foreground">
              The People Behind the Pipeline
            </h2>
            <p className="font-mono text-sm text-muted leading-relaxed">
              A team built around one shared obsessionmaking perception
              infrastructure that teams never have to think twice about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group border-t border-border pt-6 flex items-start gap-5 transition-colors"
              >
                {/* Left Square Avatar Container with Hover Effects */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-border bg-surface overflow-hidden group-hover:border-foreground transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Corner crosshairs on hover */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Right Text Description */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-syne text-lg font-bold uppercase text-foreground group-hover:text-foreground transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-foreground font-semibold">
                    {member.role}
                  </p>
                  <p className="font-mono text-xs text-muted leading-relaxed pt-1">
                    {member.background}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 6. Simple Call to Action ─────────────────────────── */}
      <Section className="py-24 md:py-32 relative overflow-hidden">
        {/* Volumetric light ray atmospheric background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-20 dark:opacity-35 select-none flex items-center justify-center">
          <Image
            src="/images/about/ready to work.webp"
            alt=""
            fill
            className="object-cover object-bottom"
          />
        </div>

        <Container className="text-center relative z-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <Display as="h2" className="text-3xl md:text-5xl font-bold">
              Ready to work together?
            </Display>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Whether you are looking to deploy perception across your
              facilities or want to learn more about our platform, we are here
              to help.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link href="/contact/">
                <Button variant="primary" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/products/">
                <Button variant="outline" size="lg">
                  Explore Products →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
