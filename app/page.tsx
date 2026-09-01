import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { MetricCard, DataBadge } from '@/components/ui/metric-card';
import { FlowCanvas } from '@/components/interactive/stream-canvas';
import { AccelBench } from '@/components/interactive/inference-bench';
import { ZoneIntel } from '@/components/interactive/metropolis-zone';
import { GridMatrix } from '@/components/interactive/triton-node-matrix';
import { Cpu, Radio, Eye } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="pt-24 md:pt-32">
        <Container>
          <div className="flex flex-wrap gap-3 mb-8">
            <MonoTag>Video Pipelines</MonoTag>
            <MonoTag>Sensor Fusion</MonoTag>
            <MonoTag>Edge Inference</MonoTag>
          </div>

          <Display className="max-w-5xl">
            Real-Time AI
            <br />
            Perception
            <br />
            Infrastructure
          </Display>

          <p className="font-mono text-sm text-muted max-w-xl mt-8 leading-relaxed">
            High-speed video processing and sensor fusion for camera networks, robotics, and smart spaces. Run inference at the edge with ultra-low latency.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/auth/register/">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
            <Link href="/contact/">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Metrics ──────────────────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <Heading index="01" className="mb-10">
            System Performance
          </Heading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard label="Latency" value="1.2" unit="ms" />
            <MetricCard label="Throughput" value="240" unit="FPS" />
            <MetricCard label="Live Streams" value="128" unit="CH" />
            <MetricCard label="Quantization" value="FP8" />
          </div>

          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-border">
            <DataBadge label="GPU Load" value="94%" />
            <DataBadge label="Power" value="275W" />
            <DataBadge label="Memory" value="48GB HBM3" />
            <DataBadge label="Batching" value="Auto" />
          </div>
        </Container>
      </Section>

      {/* ── Interactive Systems Showcase ─────────────────────── */}
      <Section borders={{ bottom: true }} className="scroll-mt-12" id="products">
        <Container>
          <Heading index="02" className="mb-4">
            Interactive Products
          </Heading>
          <p className="font-mono text-xs text-muted mb-12 max-w-2xl">
            Explore our core perception modules below. Adjust settings and test live performance.
          </p>

          <div className="space-y-16">
            {/* Flow */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MonoTag>01 // VIDEO INGEST</MonoTag>
                <span className="font-syne text-sm font-bold uppercase">Perceptras Flow</span>
              </div>
              <FlowCanvas />
            </div>

            {/* Accel */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MonoTag>02 // INFERENCE ENGINE</MonoTag>
                <span className="font-syne text-sm font-bold uppercase">Perceptras Accel</span>
              </div>
              <AccelBench />
            </div>

            {/* Zone */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MonoTag>03 // SPATIAL TRACKING</MonoTag>
                <span className="font-syne text-sm font-bold uppercase">Perceptras Zone</span>
              </div>
              <ZoneIntel />
            </div>

            {/* Grid */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MonoTag>04 // CLUSTER ROUTER</MonoTag>
                <span className="font-syne text-sm font-bold uppercase">Perceptras Grid</span>
              </div>
              <GridMatrix />
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Architecture Overview ────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <Heading index="03" className="mb-10">
            How It Works
          </Heading>

          <AsymmetricGrid ratio="60/40" divider>
            <div className="space-y-6">
              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  1. Video &amp; Sensor Ingest
                </p>
                <p className="font-mono text-sm text-foreground mt-1">
                  Connect RTSP cameras, USB3 Vision, and GigE sensors with hardware-accelerated decoding.
                </p>
              </div>

              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  2. AI Model Execution
                </p>
                <p className="font-mono text-sm text-foreground mt-1">
                  Run optimized vision models with automatic dynamic batching and INT8/FP8 acceleration.
                </p>
              </div>

              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  3. Real-Time Event Streaming
                </p>
                <p className="font-mono text-sm text-foreground mt-1">
                  Stream structured detections, bounding boxes, and events directly to your apps via gRPC or Kafka.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-border p-6 bg-surface">
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
                  Deployment Targets
                </p>
                <p className="font-mono text-xs text-foreground leading-relaxed">
                  Deploy as lightweight containerized workloads on edge devices, robotics computers, or on-premise GPU clusters.
                </p>
              </div>
            </div>
          </AsymmetricGrid>
        </Container>
      </Section>

      {/* ── Capabilities ─────────────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <Heading index="04" className="mb-10">
            Core Features
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                icon: Eye,
                title: 'Computer Vision',
                desc: 'Fast object detection, segmentation, and tracking across multiple camera angles simultaneously.',
              },
              {
                icon: Radio,
                title: 'Sensor Fusion',
                desc: 'Synchronize video feeds with LiDAR, radar, and IMU data with sub-millisecond precision.',
              },
              {
                icon: Cpu,
                title: 'Edge Acceleration',
                desc: 'Optimized to run directly on edge GPUs and servers with minimal memory footprint.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-surface p-8 flex flex-col gap-4"
              >
                <Icon className="h-5 w-5 text-muted stroke-[1.5]" />
                <h3 className="font-syne text-sm font-semibold uppercase tracking-wide">
                  {title}
                </h3>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <Section className="py-24 md:py-32">
        <Container className="text-center">
          <Display as="h2" className="text-3xl md:text-5xl lg:text-6xl mb-6">
            Ready to Get Started?
          </Display>
          <p className="font-mono text-sm text-muted max-w-lg mx-auto mb-10">
            Set up your account or reach out to our team for a personalized demo.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register/">
              <Button variant="primary" size="lg">
                Create Account
              </Button>
            </Link>
            <Link href="/contact/">
              <Button variant="outline" size="lg">
                Contact Us →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
