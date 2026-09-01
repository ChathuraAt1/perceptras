import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { MetricCard, DataBadge } from '@/components/ui/metric-card';
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
  Cpu,
  Layers,
  Activity,
} from 'lucide-react';

const PRODUCT_SUMMARY = [
  {
    id: 'flow',
    number: '01',
    name: 'Perceptras Flow',
    role: 'Multi-Stream Ingest Pipeline',
    description:
      'High-throughput video decoding and sensor stream normalization for up to 128 concurrent camera feeds with zero-copy memory pipelines.',
    icon: Video,
  },
  {
    id: 'accel',
    number: '02',
    name: 'Perceptras Accel',
    role: 'Inference Optimization Engine',
    description:
      'Compiles PyTorch and ONNX models into hardware-optimized execution graphs with automated INT8/FP8 quantization and dynamic batching.',
    icon: Zap,
  },
  {
    id: 'zone',
    number: '03',
    name: 'Perceptras Zone',
    role: 'Spatial Intelligence & Tracking',
    description:
      'Transforms multi-camera detections into unified 3D coordinates. Delivers continuous trajectory tracking, occlusion handling, and zone analytics.',
    icon: Compass,
  },
  {
    id: 'grid',
    number: '04',
    name: 'Perceptras Grid',
    role: 'Cluster Inference Orchestrator',
    description:
      'Enterprise orchestration layer that manages multi-model deployment, load balancing, fault tolerance, and event streaming across GPU clusters.',
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
      <Section borders={{ bottom: true }} className="pt-24 md:pt-32">
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
            Perceptras provides the foundational software infrastructure that connects physical cameras and sensors to real-time AI models. Engineered for autonomous machines, industrial automation, and spatial intelligence at scale.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link href="/auth/register/">
              <Button variant="primary" size="lg">
                Get Started
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

      {/* ── Telemetry Stats Strip ────────────────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/50">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard label="Inference Latency" value="1.2" unit="ms" />
            <MetricCard label="Throughput" value="240" unit="FPS" />
            <MetricCard label="Streams per Node" value="128" unit="CH" />
            <MetricCard label="Quantization" value="INT8 / FP8" />
          </div>

          <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-border">
            <DataBadge label="Hardware" value="Edge GPU &amp; Cluster" />
            <DataBadge label="Memory Architecture" value="Zero-Copy DMA" />
            <DataBadge label="Streaming Bus" value="gRPC / Kafka / MQTT" />
            <DataBadge label="Deployment" value="Lightweight Containers" />
          </div>
        </Container>
      </Section>

      {/* ── What We Do / Platform Value ──────────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <AsymmetricGrid ratio="40/60" divider>
            <div>
              <MonoTag className="mb-4">THE PERCEPTRAS ADVANTAGE</MonoTag>
              <Heading as="h2" className="text-2xl md:text-3xl mb-4">
                Bridging Physical Sensors to Intelligent Action
              </Heading>
              <p className="font-mono text-sm text-muted leading-relaxed">
                Raw video is heavy, distributed, and compute-intensive. Perceptras eliminates the bottleneck between physical hardware and AI models with a high-performance compiled pipeline.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                  Zero-Copy Data Pipelines
                </p>
                <p className="font-mono text-xs text-muted mt-1 leading-relaxed">
                  Decodes high-bitrate video directly into inference-ready tensor memory without host-to-device memory copy penalties.
                </p>
              </div>

              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                  Compiled Graph Optimization
                </p>
                <p className="font-mono text-xs text-muted mt-1 leading-relaxed">
                  Fuses neural network layers and auto-tunes execution kernels for up to 6x latency reduction on edge accelerators.
                </p>
              </div>

              <div className="border-l-2 border-border pl-4">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                  Unified 3D Spatial Tracking
                </p>
                <p className="font-mono text-xs text-muted mt-1 leading-relaxed">
                  Fuses disjoint camera perspectives into a single global 3D world coordinate map with automatic extrinsic calibration.
                </p>
              </div>
            </div>
          </AsymmetricGrid>
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
              Engineered for Mission-Critical Operations
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              From high-density warehouse robotics to manufacturing line inspection, Perceptras delivers sub-second perception intelligence across demanding environments.
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

      {/* ── Technical Architecture Pillars ───────────────────── */}
      <Section borders={{ bottom: true }}>
        <Container>
          <Heading index="03" className="mb-10">
            Enterprise Architecture
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border p-6 bg-surface space-y-3">
              <Cpu className="h-5 w-5 text-foreground stroke-[1.5]" />
              <p className="font-syne text-sm font-bold uppercase">Hardware Acceleration</p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Native support for embedded edge accelerators, Jetson/IGX devices, and data-center GPU clusters with unified tensor runtimes.
              </p>
            </div>
            <div className="border border-border p-6 bg-surface space-y-3">
              <Layers className="h-5 w-5 text-foreground stroke-[1.5]" />
              <p className="font-syne text-sm font-bold uppercase">Standardized Streaming</p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Seamless real-time output integration via gRPC, Kafka topics, MQTT brokers, and WebSocket feeds with zero format translation lag.
              </p>
            </div>
            <div className="border border-border p-6 bg-surface space-y-3">
              <Activity className="h-5 w-5 text-foreground stroke-[1.5]" />
              <p className="font-syne text-sm font-bold uppercase">Self-Healing Clusters</p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Automatic node failover, stream reconnection, and dynamic load balancing ensuring 99.99% operational uptime.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Call to Action ───────────────────────────────────── */}
      <Section className="py-24 md:py-32">
        <Container className="text-center">
          <Display as="h2" className="text-3xl md:text-5xl lg:text-6xl mb-6">
            Deploy Perception Infrastructure
          </Display>
          <p className="font-mono text-sm text-muted max-w-lg mx-auto mb-10">
            Set up your account today or connect with our solutions engineers to architect your custom deployment.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register/">
              <Button variant="primary" size="lg">
                Create Account
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
