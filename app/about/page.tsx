import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Compass,
  ExternalLink,
  Cpu,
  Lock,
} from 'lucide-react';

const PRINCIPLES = [
  {
    icon: Zap,
    title: 'Zero-Latency Edge Execution',
    description:
      'We believe critical physical perception cannot rely on remote cloud round-trips. Every algorithm is built for line-rate edge execution.',
  },
  {
    icon: Lock,
    title: 'Privacy & Data Sovereignty',
    description:
      'Raw camera streams never leave your perimeter. Our 100% on-premise architecture extracts telemetry without streaming video over the public internet.',
  },
  {
    icon: Cpu,
    title: 'Hardware Agnosticism',
    description:
      'From compact embedded Jetson/IGX devices to clustered multi-GPU server racks, our unified runtime executes across diverse hardware tiers.',
  },
  {
    icon: Compass,
    title: 'Unified 3D Spatial Geometry',
    description:
      'We treat disparate cameras not as isolated video feeds, but as synchronized sensory inputs mapped into a single physical coordinate system.',
  },
];

const TEAM = [
  {
    name: 'Dr. Alistair Vance',
    role: 'Founder & Chief Executive Officer',
    bio: 'Former Robotics Perception Lead with 12+ years pioneering multi-camera spatial SLAM and autonomous navigation systems.',
    focus: 'Spatial Computing & Executive Strategy',
  },
  {
    name: 'Mira Sorensen',
    role: 'Co-Founder & Chief AI Architect',
    bio: 'Specialist in deep neural network graph compilation, low-precision quantization (INT8/FP8), and hardware-accelerated tensor runtimes.',
    focus: 'Inference Engines & Model Optimization',
  },
  {
    name: 'Tarek El-Masri',
    role: 'VP of Systems & Infrastructure',
    bio: 'Distributed systems architect focused on zero-copy DMA memory pipelines, high-throughput gRPC/Kafka buses, and edge cluster orchestration.',
    focus: 'Cluster Topology & Industrial Protocol Ingest',
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Head of Spatial Intelligence',
    bio: 'Computer vision researcher specializing in continuous multi-view re-identification, camera extrinsic calibration, and geometric 3D tracking.',
    focus: 'Multi-Camera Calibration & ReID Models',
  },
];

const MILESTONES = [
  {
    year: 'Genesis',
    title: 'The Bottleneck Realization',
    description:
      'Frustrated by cloud-centric vision pipelines that suffered 200ms+ latency penalties, our founding team set out to engineer a compiled, zero-copy edge perception engine.',
  },
  {
    year: 'Architecture',
    title: 'Building Perceptras Flow & Accel',
    description:
      'Developed our proprietary unified memory pipeline, achieving sub-1.5ms video decode-to-tensor latency and automated INT8/FP8 graph compilation.',
  },
  {
    year: 'Scale',
    title: 'Spatial Intelligence & Cluster Grid',
    description:
      'Expanded into multi-camera 3D tracking (Zone) and distributed cluster orchestration (Grid), now powering robotics and manufacturing facilities globally.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── About Hero ───────────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="pt-24 md:pt-32 pb-16 md:pb-24">
        <Container>
          <div className="mb-6">
            <MonoTag>ABOUT PERCEPTRAS // PHYSICAL AI INFRASTRUCTURE</MonoTag>
          </div>

          <Display className="max-w-5xl">
            Building the Sensory
            <br />
            Nervous System for
            <br />
            Physical AI
          </Display>

          <p className="font-mono text-sm text-muted max-w-2xl mt-8 leading-relaxed">
            Perceptras was founded to solve a fundamental barrier in modern autonomy: connecting physical cameras and sensors to real-time artificial intelligence without latency, complexity, or bandwidth bottlenecks.
          </p>

          {/* Directory Links Strip */}
          <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Company Profiles:
            </span>
            <a
              href="https://www.crunchbase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-semibold text-foreground hover:text-muted inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Crunchbase</span>
              <ExternalLink className="h-3 w-3 text-muted" />
            </a>
            <a
              href="https://www.f6s.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-semibold text-foreground hover:text-muted inline-flex items-center gap-1.5 transition-colors"
            >
              <span>F6S Community</span>
              <ExternalLink className="h-3 w-3 text-muted" />
            </a>
          </div>
        </Container>
      </Section>

      {/* ── Our Mission & What We Do ─────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <AsymmetricGrid ratio="40/60" divider>
            <div>
              <MonoTag className="mb-4">OUR MISSION</MonoTag>
              <Heading as="h2" className="text-2xl md:text-3xl mb-4">
                Empowering Autonomous Systems with Instant Spatial Vision
              </Heading>
              <p className="font-mono text-sm text-muted leading-relaxed">
                We bridge the gap between heavy optical sensors and lightweight intelligence, delivering the foundational infrastructure that makes robots, industrial machines, and smart spaces truly perceptive.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-border pl-5">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  What We Do
                </h3>
                <p className="font-mono text-xs text-muted mt-2 leading-relaxed">
                  Perceptras builds high-performance, modular software for real-time video ingest, hardware-compiled neural execution, and multi-camera 3D coordinate tracking. We eliminate the friction of building custom vision pipelines from scratch.
                </p>
              </div>

              <div className="border-l-2 border-border pl-5">
                <h3 className="font-syne text-base font-bold uppercase text-foreground">
                  Why It Matters
                </h3>
                <p className="font-mono text-xs text-muted mt-2 leading-relaxed">
                  As autonomous robots and smart factories multiply, relying on cloud processing introduces unacceptable lag and bandwidth costs. Perceptras runs 100% at the edge, unlocking sub-millisecond reaction times and complete data sovereignty.
                </p>
              </div>
            </div>
          </AsymmetricGrid>
        </Container>
      </Section>

      {/* ── What Inspired Us / Origin Story ──────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/30">
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag className="mb-3">THE ORIGIN STORY</MonoTag>
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              What Inspired Perceptras
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              While deploying vision systems in automated warehouses and high-speed production plants, our founding team encountered the same frustrating cycle: off-the-shelf software was either too slow, tied to proprietary cloud platforms, or required months of custom C++ pipeline development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MILESTONES.map((m) => (
              <div key={m.year} className="border border-border p-6 bg-surface flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-border px-2 py-0.5 inline-block mb-4">
                    {m.year}
                  </span>
                  <h3 className="font-syne text-base font-bold uppercase mb-2">
                    {m.title}
                  </h3>
                  <p className="font-mono text-xs text-muted leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Core Engineering Principles ──────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag className="mb-3">OUR CORE VALUES</MonoTag>
            <Heading as="h2" className="text-3xl md:text-4xl mb-4">
              Engineering Principles
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Every component we write adheres to four strict architectural commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRINCIPLES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border border-border p-6 md:p-8 bg-surface space-y-3">
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

      {/* ── Leadership & Engineering Team ────────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/30">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <MonoTag className="mb-3">THE TEAM</MonoTag>
              <Heading as="h2" className="text-3xl md:text-4xl">
                Leadership &amp; Architecture
              </Heading>
            </div>
            <p className="font-mono text-xs text-muted max-w-md">
              A multidisciplinary group of systems programmers, AI researchers, and robotics veterans building next-generation spatial computing infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="border border-border p-6 md:p-8 bg-surface flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-border px-2 py-0.5">
                      {member.focus}
                    </span>
                  </div>

                  <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-foreground font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="font-mono text-xs text-muted leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Call to Action ───────────────────────────────────── */}
      <Section className="py-24 md:py-32">
        <Container className="text-center">
          <Display as="h2" className="text-3xl md:text-5xl lg:text-6xl mb-6">
            Join Our Mission
          </Display>
          <p className="font-mono text-sm text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            Interested in deploying Perceptras for your autonomous systems, or collaborating with our engineering team? We would love to talk.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact/">
              <Button variant="primary" size="lg">
                Contact Our Team
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
    </>
  );
}
