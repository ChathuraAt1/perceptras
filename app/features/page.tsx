import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import {
  Video,
  Zap,
  Compass,
  Network,
  ArrowRight,
} from 'lucide-react';

const CORE_PILLARS = [
  {
    number: '01',
    id: 'flow',
    title: 'Zero-Copy Video Ingest & Protocol Normalization',
    tagline: 'Perceptras Flow',
    description:
      'Direct-to-GPU memory transfer eliminates CPU bottlenecks, enabling ultra-low latency multi-stream 4K decoding and standard protocol aggregation.',
    icon: Video,
    specs: [
      { label: 'Protocols Supported', val: 'RTSP, GigE Vision, USB3, MIPI CSI-2' },
      { label: 'Memory Architecture', val: 'Zero-Copy Unified DMA Buffers' },
      { label: 'Decode Latency', val: '< 0.4 ms Hardware NVDEC' },
      { label: 'Packet Recovery', val: 'Lossless Dynamic Jitter Buffer' },
    ],
  },
  {
    number: '02',
    id: 'accel',
    title: 'Hardware-Compiled Neural Inference Engine',
    tagline: 'Perceptras Accel',
    description:
      'Automatic INT8 and FP8 layer quantization with execution graph compilation delivers sub-2ms line-rate perception on edge GPUs and robotics units.',
    icon: Zap,
    specs: [
      { label: 'Quantization Tiers', val: 'FP8, INT8, FP16 Layer Fusion' },
      { label: 'Model Formats', val: 'ONNX, TensorRT, PyTorch, OpenVINO' },
      { label: 'Inference Throughput', val: '240+ FPS Aggregate per Node' },
      { label: 'Batch Optimization', val: 'Dynamic 1 to 32 Frame Batching' },
    ],
  },
  {
    number: '03',
    id: 'zone',
    title: 'Multi-Camera 3D Spatial Intelligence & Geofences',
    tagline: 'Perceptras Zone',
    description:
      'Continuous extrinsic auto-calibration fuses overlapping camera angles into unified 3D metric world coordinates with real-time entity re-identification.',
    icon: Compass,
    specs: [
      { label: 'Calibration Lock', val: '0.019 px Reprojection Error' },
      { label: 'ReID Persistence', val: '99.8% Cross-Camera Retention' },
      { label: 'Coordinate System', val: 'Metric 3D Real-World Space' },
      { label: 'Safety Triggers', val: 'Zero-Lag Hardware E-Stop Relays' },
    ],
  },
  {
    number: '04',
    id: 'grid',
    title: 'Sovereign Edge Cluster & Streaming Egress',
    tagline: 'Perceptras Grid',
    description:
      'Distributed multi-node clustering with 120ms automatic failover, load-balanced stream distribution, and enterprise streaming telemetry buses.',
    icon: Network,
    specs: [
      { label: 'Failover Speed', val: '120 ms Hot-Standby Switchover' },
      { label: 'Streaming Buses', val: 'gRPC, Apache Kafka, MQTT, WebSockets' },
      { label: 'Air-Gap Security', val: '100% On-Premise Sovereign Compute' },
      { label: 'Edge OS Support', val: 'Linux x86, JetPack, Ubuntu Server' },
    ],
  },
];

const COMPARISON_ROWS = [
  {
    metric: 'Pipeline End-to-End Latency',
    cloud: '150 ms – 400 ms (Network RTT)',
    perceptras: '1.1 ms (Edge Direct-to-GPU)',
  },
  {
    metric: 'Raw Video Bandwidth Required',
    cloud: 'High (Continuous 4K Uplink)',
    perceptras: 'Zero (Local GPU Decode & Ingest)',
  },
  {
    metric: 'Data Sovereignty & Privacy',
    cloud: 'Third-party cloud storage risk',
    perceptras: '100% Air-Gapped On-Premises',
  },
  {
    metric: 'Internet Outage Resilience',
    cloud: 'Complete perception failure',
    perceptras: '100% Operational via Local Mesh',
  },
  {
    metric: 'Multi-Camera 3D Spatial Fusion',
    cloud: 'Basic individual 2D frame tags',
    perceptras: 'Unified Metric 3D Coordinate Plane',
  },
  {
    metric: 'Hardware E-Stop Interlock',
    cloud: 'Not supported (Excessive delay)',
    perceptras: 'Sub-millisecond hardware trigger',
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* ── Features Hero ───────────────────────────────────────── */}
      <Section className="pt-24 md:pt-36 pb-16">
        <Container className="text-center max-w-4xl mx-auto space-y-6">
          <MonoTag>PHYSICAL AI PLATFORM CAPABILITIES</MonoTag>
          <Display className="text-4xl sm:text-6xl font-bold">
            Built for Sub-Millisecond Perception at Physical Scale
          </Display>
          <p className="font-mono text-sm md:text-base text-muted max-w-3xl mx-auto leading-relaxed">
            A comprehensive architectural breakdown of the video ingest pipelines, neural runtime compilers, 3D metric spatial intelligence, and sovereign edge clustering that power Perceptras.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/dashboard/">
              <Button variant="primary" size="lg" className="flex items-center gap-2">
                <span>Launch in Controller Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing/">
              <Button variant="outline" size="lg">
                View Pricing &amp; Plans →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── 4 Core Architectural Pillars ───────────────────────── */}
      <Section borders={{ bottom: true }} className="pb-24">
        <Container className="space-y-16 max-w-6xl">
          {CORE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className={`border border-border bg-surface p-8 md:p-12 flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-10 items-stretch justify-between shadow-sm`}
              >
                {/* Left: Text Description */}
                <div className="space-y-4 lg:w-1/2 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-muted border border-border px-2 py-0.5">
                        {pillar.number} • {pillar.tagline}
                      </span>
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>

                    <h2 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-foreground leading-tight">
                      {pillar.title}
                    </h2>

                    <p className="font-mono text-sm text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link href={`/dashboard/${pillar.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <span>Open {pillar.tagline} Workspace</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Technical Specs HUD Matrix */}
                <div className="lg:w-1/2 border border-border bg-surface/50 p-6 flex flex-col justify-center space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold border-b border-border pb-2">
                    Verified Benchmark Specifications
                  </span>

                  <div className="space-y-3 font-mono text-xs">
                    {pillar.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-2 border-b border-border/50"
                      >
                        <span className="text-muted text-[11px]">{spec.label}:</span>
                        <span className="font-bold text-foreground sm:text-right">{spec.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* ── Comparison Table: Cloud APIs vs. Perceptras Edge ──── */}
      <Section borders={{ bottom: true }} className="bg-surface/30 py-20 md:py-28">
        <Container className="max-w-5xl">
          <div className="max-w-3xl mb-12">
            <MonoTag>ARCHITECTURAL ADVANTAGE</MonoTag>
            <Heading as="h2" className="text-2xl md:text-4xl mt-3 mb-4">
              Traditional Cloud APIs vs. Perceptras Physical AI
            </Heading>
            <p className="font-mono text-sm text-muted">
              Why autonomous robotics, manufacturing lines, and automated facilities require on-premise zero-copy inference.
            </p>
          </div>

          <div className="border border-border bg-surface overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                  <th className="py-4 px-5 font-semibold">Architectural Vector</th>
                  <th className="py-4 px-5 font-semibold text-muted">Traditional Cloud Vision</th>
                  <th className="py-4 px-5 font-semibold text-foreground font-bold bg-foreground/[0.03]">
                    Perceptras Platform
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.metric} className="hover:bg-foreground/5 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-foreground">{row.metric}</td>
                    <td className="py-3.5 px-5 text-muted">{row.cloud}</td>
                    <td className="py-3.5 px-5 text-emerald-500 font-bold bg-foreground/[0.02]">
                      {row.perceptras}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── Call to Action ────────────────────────────────────── */}
      <Section className="py-24 md:py-32">
        <Container className="text-center max-w-3xl mx-auto space-y-6">
          <Display as="h2" className="text-3xl md:text-5xl font-bold">
            Experience Sub-Millisecond Perception Today
          </Display>
          <p className="font-mono text-sm text-muted max-w-xl mx-auto leading-relaxed">
            Deploy on your existing edge hardware or test our live demo feeds in the controller dashboard.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/checkout?plan=professional">
              <Button variant="primary" size="lg">
                Start Subscription Trial
              </Button>
            </Link>
            <Link href="/dashboard/">
              <Button variant="outline" size="lg">
                Open Controller Dashboard →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
