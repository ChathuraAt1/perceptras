import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { MetricCard, DataBadge } from '@/components/ui/metric-card';
import { MediaFrame } from '@/components/ui/media-frame';
import { Cpu, Radio, Eye } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="pt-24 md:pt-32">
        <Container>
          <div className="flex flex-wrap gap-3 mb-8">
            <MonoTag>Edge Inference</MonoTag>
            <MonoTag>Sensor Fusion</MonoTag>
            <MonoTag>Spatial Intelligence</MonoTag>
          </div>

          <Display className="max-w-5xl">
            Physical AI
            <br />
            Perception
            <br />
            Infrastructure
          </Display>

          <p className="font-mono text-sm text-muted max-w-xl mt-8 leading-relaxed">
            High-performance perception pipelines for autonomous systems.
            Real-time sensor fusion, edge inference, and spatial intelligence
            at scale.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Metrics ──────────────────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <Heading index="01" className="mb-10">
            Performance
          </Heading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard label="Latency" value="1.2" unit="ms" />
            <MetricCard label="Throughput" value="240" unit="FPS" />
            <MetricCard label="Streams" value="128" unit="CH" />
            <MetricCard label="Precision" value="FP8" />
          </div>

          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-border">
            <DataBadge label="GPU Util" value="94%" />
            <DataBadge label="Power" value="275W" />
            <DataBadge label="Memory" value="48GB HBM3" />
            <DataBadge label="Batch" value="Dynamic" />
          </div>
        </Container>
      </Section>

      {/* ── Architecture ─────────────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <Heading index="02" className="mb-10">
            Architecture
          </Heading>

          <AsymmetricGrid ratio="60/40" divider>
            <div>
              <MediaFrame caption="SYS.ARCH — Perception Pipeline v3.2">
                <div className="flex flex-col items-center justify-center gap-4 text-muted">
                  <Cpu className="h-12 w-12 stroke-1" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    Pipeline Topology
                  </span>
                </div>
              </MediaFrame>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Ingest Layer
                </p>
                <p className="font-mono text-sm text-foreground mt-1">
                  Multi-modal sensor fusion with hardware-accelerated decode.
                  RTSP, USB3 Vision, GigE Vision protocols.
                </p>
              </div>

              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Inference Engine
                </p>
                <p className="font-mono text-sm text-foreground mt-1">
                  TensorRT-optimised models with dynamic batching.
                  INT8/FP8 quantisation for edge deployment.
                </p>
              </div>

              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Output Bus
                </p>
                <p className="font-mono text-sm text-foreground mt-1">
                  Structured metadata, event streams, and analytics export
                  via gRPC and MQTT.
                </p>
              </div>
            </div>
          </AsymmetricGrid>
        </Container>
      </Section>

      {/* ── Capabilities ─────────────────────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <Heading index="03" className="mb-10">
            Capabilities
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                icon: Eye,
                title: 'Computer Vision',
                desc: 'Object detection, segmentation, tracking, and pose estimation across multi-camera arrays.',
              },
              {
                icon: Radio,
                title: 'Sensor Fusion',
                desc: 'Camera, LiDAR, radar, and IMU data fusion with temporal synchronisation and calibration.',
              },
              {
                icon: Cpu,
                title: 'Edge Compute',
                desc: 'Optimised inference on NVIDIA Jetson, IGX, and data-centre GPUs with unified deployment.',
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
            Build Perception Systems
          </Display>
          <p className="font-mono text-sm text-muted max-w-lg mx-auto mb-10">
            Deploy production-grade perception infrastructure in minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="lg">
              Start Building
            </Button>
            <Button variant="ghost" size="lg">
              View Docs →
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
