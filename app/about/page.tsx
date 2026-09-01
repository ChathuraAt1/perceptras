import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Zero-Latency Edge Execution',
    description:
      'We believe physical perception cannot afford remote cloud round-trips. Every algorithm, decoder, and tensor queue in Perceptras is built for sub-millisecond execution directly on edge silicon.',
  },
  {
    num: '02',
    title: 'Privacy & Data Sovereignty by Default',
    description:
      'Raw camera streams never leave your physical perimeter. Our 100% on-premise architecture extracts actionable spatial telemetry without transmitting live video over public networks.',
  },
  {
    num: '03',
    title: 'Hardware-Agnostic Tensor Acceleration',
    description:
      'From compact embedded Jetson and IGX compute modules to high-density multi-GPU data center clusters, our unified runtime executes across diverse hardware tiers with zero code changes.',
  },
  {
    num: '04',
    title: 'Unified 3D Spatial Geometry',
    description:
      'We treat disparate cameras not as isolated 2D pixel grids, but as synchronized sensory perspectives fused continuously into a single real-world coordinate system.',
  },
];

const TEAM = [
  {
    name: 'Dr. Alistair Vance',
    role: 'Founder & Chief Executive Officer',
    focus: 'Spatial Computing & Executive Strategy',
    bio: 'Former Robotics Perception Lead with 12+ years pioneering multi-camera spatial SLAM, visual odometry, and autonomous mobile robot architectures.',
  },
  {
    name: 'Mira Sorensen',
    role: 'Co-Founder & Chief AI Architect',
    focus: 'Inference Engines & Model Optimization',
    bio: 'Deep neural network specialist focused on low-precision quantization (INT8/FP8), layer fusion, and hardware-accelerated tensor graph compilation.',
  },
  {
    name: 'Tarek El-Masri',
    role: 'VP of Systems & Infrastructure',
    focus: 'Cluster Topology & Protocol Ingest',
    bio: 'Distributed systems architect with deep expertise in zero-copy DMA memory pipelines, industrial vision protocols (GigE, USB3), and edge cluster failover.',
  },
  {
    name: 'Dr. Elena Rostova',
    role: 'Head of Spatial Intelligence',
    focus: 'Multi-Camera Calibration & ReID',
    bio: 'Computer vision researcher specializing in continuous multi-view re-identification, camera extrinsic auto-calibration, and geometric 3D tracking.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* ── 1. Hero & Mission Statement ──────────────────────── */}
      <Section className="pt-28 md:pt-40 pb-20 md:pb-28">
        <Container>
          <div className="max-w-4xl space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag>ABOUT PERCEPTRAS</MonoTag>
              <span className="font-mono text-xs text-muted uppercase tracking-widest">
                EST. PHYSICAL AI INFRASTRUCTURE
              </span>
            </div>

            <Display className="text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
              Architecting the
              <br />
              Nervous System for
              <br />
              Physical Autonomy
            </Display>

            <p className="font-mono text-base md:text-lg text-muted max-w-2xl leading-relaxed pt-2">
              Perceptras exists to solve the fundamental bottleneck of modern physical AI: connecting high-bandwidth cameras and sensors to real-time artificial intelligence with zero latency, complete privacy, and effortless scalability.
            </p>

            {/* Clean Verification Links */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border font-mono text-xs">
              <span className="text-muted uppercase text-[10px] tracking-widest">
                Verified Profiles:
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
              <div className="flex items-center gap-1.5 text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
                <span className="text-foreground font-semibold">SOC2 Ready Architecture</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 2. Visual Perception Imagery Frame ────────────────── */}
      <Section borders={{ top: true, bottom: true }} className="bg-surface/30 py-20 md:py-28">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <MonoTag>SPATIAL PERCEPTION MATRIX</MonoTag>
                <h2 className="font-syne text-2xl md:text-4xl font-bold uppercase text-foreground">
                  The Perception Engine in Action
                </h2>
              </div>
              <p className="font-mono text-xs text-muted max-w-md leading-relaxed">
                Transforming multi-perspective optical streams into structured 3D spatial intelligence at line-rate hardware speeds.
              </p>
            </div>

            {/* Visual Technical Imagery Frame */}
            <div className="border border-border bg-surface relative p-1 shadow-2xl">
              {/* Corner crosshairs */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-foreground" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-foreground" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-foreground" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-foreground" />

              {/* Terminal Frame Header */}
              <div className="border-b border-border px-5 py-3 bg-surface flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-foreground font-bold uppercase tracking-wider">
                    PERCEPTRAS CORE ENGINE // RESEARCH LAB FEED
                  </span>
                </div>
                <span className="text-muted">LATENCY: 1.1ms // 128 CHANNELS</span>
              </div>

              {/* Perception Visual Canvas Simulation */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-zinc-950 p-6 md:p-8 flex flex-col justify-between overflow-hidden text-zinc-100 font-mono">
                {/* 3D Coordinate Grid Projection Overlay */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                  }}
                />

                {/* Perspective Calibration Rays */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Camera Origin 1 (Top Left) */}
                  <line x1="8%" y1="12%" x2="42%" y2="54%" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="8%" cy="12%" r="5" fill="#34d399" />
                  <text x="9%" y="16%" fill="#34d399" fontSize="10" fontFamily="monospace">CAM_01 [RTSP 4K]</text>

                  {/* Camera Origin 2 (Top Right) */}
                  <line x1="92%" y1="12%" x2="58%" y2="54%" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="92%" cy="12%" r="5" fill="#60a5fa" />
                  <text x="80%" y="16%" fill="#60a5fa" fontSize="10" fontFamily="monospace">CAM_02 [GigE Vision]</text>

                  {/* Fused 3D Intersection Point */}
                  <circle cx="50%" cy="54%" r="8" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="50%" cy="54%" r="3" fill="#ffffff" />
                  
                  {/* Spatial Trajectory Path */}
                  <path
                    d="M 280 240 Q 420 180 560 210 T 780 190"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.7)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Top Telemetry Data */}
                <div className="relative z-10 flex justify-between items-start text-xs">
                  <div className="bg-zinc-900/90 border border-zinc-700 p-2.5 space-y-1">
                    <p className="text-zinc-400">PIPELINE: <span className="text-zinc-100 font-bold">ZERO-COPY DMA</span></p>
                    <p className="text-zinc-400">SYNC: <span className="text-emerald-400 font-bold">SUB-MILLISECOND PTP</span></p>
                  </div>
                  <div className="bg-zinc-900/90 border border-zinc-700 p-2.5 text-right space-y-1">
                    <p className="text-zinc-400">COORDINATE SPACE: <span className="text-zinc-100 font-bold">METRIC WORLD 3D</span></p>
                    <p className="text-zinc-400">GPU ACCELERATION: <span className="text-emerald-400 font-bold">FP8 QUANTIZED</span></p>
                  </div>
                </div>

                {/* 3D Entity Tracking Box Overlay */}
                <div className="absolute top-[42%] left-[40%] w-[20%] h-[30%] border border-emerald-400 bg-emerald-500/10 pointer-events-none">
                  <div className="absolute -top-6 left-0 bg-emerald-500 text-zinc-950 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    TARGET: ROBOT_AMR_04
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] text-emerald-400">
                    POS: X: 14.2m | Y: 8.6m | Z: 0.0m
                  </div>
                </div>

                {/* Bottom Status Feed */}
                <div className="relative z-10 flex items-center justify-between text-xs bg-zinc-900/90 border border-zinc-700 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-zinc-300">Continuous multi-camera ReID and 3D trajectory tracking</span>
                  </div>
                  <span className="text-zinc-400 uppercase text-[10px]">100% On-Premise Execution</span>
                </div>
              </div>

              {/* Frame Footer Caption */}
              <div className="p-4 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-muted">
                <span>Multi-camera perspective fusion without cloud bandwidth roundtrips.</span>
                <span className="text-foreground font-semibold">Native Hardware Acceleration</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3. The Origin Story (Editorial Timeline) ──────────── */}
      <Section borders={{ bottom: true }} className="py-24 md:py-36">
        <Container>
          <div className="space-y-16">
            <div className="max-w-3xl space-y-4">
              <MonoTag>THE ORIGIN STORY</MonoTag>
              <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
                Why We Built Perceptras
              </h2>
              <p className="font-mono text-sm md:text-base text-muted leading-relaxed pt-2">
                While architecting perception systems for autonomous logistics and high-speed robotic manufacturing, our founding team ran into the same architectural wall time and again.
              </p>
            </div>

            {/* Spacious Editorial Milestone Progression */}
            <div className="space-y-12 divide-y divide-border">
              <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <span className="font-syne text-4xl md:text-5xl font-bold text-foreground block">
                    01
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted mt-1 block">
                    The Cloud Bottleneck
                  </span>
                </div>
                <div className="md:col-span-9 space-y-3">
                  <h3 className="font-syne text-xl font-bold uppercase text-foreground">
                    Traditional Vision Stacks Were Never Built for Real-Time Physics
                  </h3>
                  <p className="font-mono text-sm text-muted leading-relaxed">
                    Existing commercial computer vision platforms treated video as post-processed surveillance footage or sent heavy compressed streams to distant cloud data centers. In dynamic physical environments where mobile robots travel at high speeds and robotic arms assemble precision parts, a 200ms latency penalty is catastrophic.
                  </p>
                </div>
              </div>

              <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <span className="font-syne text-4xl md:text-5xl font-bold text-foreground block">
                    02
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted mt-1 block">
                    The Edge Breakthrough
                  </span>
                </div>
                <div className="md:col-span-9 space-y-3">
                  <h3 className="font-syne text-xl font-bold uppercase text-foreground">
                    Zero-Copy Unified Memory Architecture
                  </h3>
                  <p className="font-mono text-sm text-muted leading-relaxed">
                    We started from fundamental systems principles: decoding video streams directly into accelerator tensor memory without host CPU-to-GPU copy penalties. By pre-compiling neural execution graphs with automatic INT8/FP8 quantization, we unlocked sub-1.5ms end-to-end perception latency.
                  </p>
                </div>
              </div>

              <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <span className="font-syne text-4xl md:text-5xl font-bold text-foreground block">
                    03
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted mt-1 block">
                    Global Spatial Scale
                  </span>
                </div>
                <div className="md:col-span-9 space-y-3">
                  <h3 className="font-syne text-xl font-bold uppercase text-foreground">
                    Unifying Multi-Camera Geometry into a Living Digital World
                  </h3>
                  <p className="font-mono text-sm text-muted leading-relaxed">
                    Today, Perceptras connects hundreds of cameras across complex physical facilities into unified 3D coordinate grids. Our software powers autonomous mobile robots, automated manufacturing lines, and smart spaces across the globe with complete on-premise reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 4. Core Engineering Principles ────────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/30 py-24 md:py-36">
        <Container>
          <div className="space-y-16">
            <div className="max-w-3xl space-y-4">
              <MonoTag>ARCHITECTURAL COMMITMENTS</MonoTag>
              <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
                Engineering Principles
              </h2>
              <p className="font-mono text-sm text-muted leading-relaxed">
                Every line of code and runtime engine in the Perceptras ecosystem is built according to four core pillars.
              </p>
            </div>

            {/* Open Horizontal Rule Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {PRINCIPLES.map((p) => (
                <div key={p.num} className="space-y-4 border-t border-border pt-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-muted">{p.num}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Principle</span>
                  </div>
                  <h3 className="font-syne text-xl font-bold uppercase text-foreground">
                    {p.title}
                  </h3>
                  <p className="font-mono text-sm text-muted leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 5. Leadership & Architecture Team ─────────────────── */}
      <Section borders={{ bottom: true }} className="py-24 md:py-36">
        <Container>
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <MonoTag>LEADERSHIP &amp; ARCHITECTURE</MonoTag>
                <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight uppercase text-foreground">
                  The Engineering Team
                </h2>
                <p className="font-mono text-sm text-muted leading-relaxed">
                  A multidisciplinary group of systems engineers, AI researchers, and robotics veterans dedicated to physical perception infrastructure.
                </p>
              </div>
            </div>

            {/* Open List Presentation */}
            <div className="space-y-8 divide-y divide-border">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-4 space-y-1">
                    <h3 className="font-syne text-xl font-bold uppercase text-foreground">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs text-foreground font-semibold">
                      {member.role}
                    </p>
                    <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-muted pt-1">
                      {member.focus}
                    </span>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="font-mono text-sm text-muted leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 6. Call to Action ─────────────────────────────────── */}
      <Section className="py-28 md:py-40">
        <Container className="text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Display as="h2" className="text-4xl md:text-6xl lg:text-7xl leading-tight">
              Build with Perceptras
            </Display>
            <p className="font-mono text-sm md:text-base text-muted max-w-xl mx-auto leading-relaxed">
              Explore how Perceptras can accelerate your camera streams, eliminate cloud latency, and power your next-generation autonomous systems.
            </p>
            <div className="flex justify-center gap-4 pt-4">
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
          </div>
        </Container>
      </Section>
    </div>
  );
}
