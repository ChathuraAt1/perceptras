import Link from 'next/link';
import { Section, Container } from '@/components/layout/section-container';
import { AsymmetricGrid } from '@/components/layout/asymmetric-grid';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Zap, Compass, Network, Check, Shield, Cpu, Layers } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'flow',
    number: '01',
    name: 'Perceptras Flow',
    tagline: 'Multi-Stream Perception Ingest & Pipeline Engine',
    description:
      'High-throughput video decoding, sensor stream normalization, and zero-copy pipeline execution engineered for dense camera networks and real-time physical AI applications.',
    icon: Video,
    highlights: [
      'Zero-copy unified memory architecture between decoder and inference engine',
      'Supports up to 128 concurrent RTSP/H.264/H.265/AV1 video feeds per node',
      'Line-rate industrial protocol ingest for GigE Vision, USB3 Vision, and MIPI CSI-2',
      'Automatic stream re-connection, packet loss compensation, and adaptive buffer pacing',
      'Dynamic batch aggregation for multi-camera synchronous frame delivery',
    ],
    specs: [
      { label: 'Protocols', value: 'RTSP, RTP, GigE Vision, USB3 Vision, MIPI' },
      { label: 'Codecs', value: 'H.264, H.265 (HEVC), AV1, MJPEG, Raw Bayer' },
      { label: 'Ingest Density', value: 'Up to 128 @ 1080p30 / 32 @ 4K30 per node' },
      { label: 'Buffer Mode', value: 'Unified Zero-Copy (DMA / Host-Pinned)' },
      { label: 'Latency', value: '< 1.5ms decode-to-tensor overhead' },
    ],
  },
  {
    id: 'accel',
    number: '02',
    name: 'Perceptras Accel',
    tagline: 'Compiled Inference Optimization & Runtime Engine',
    description:
      'Compiles PyTorch, ONNX, and JAX perception models into hardware-optimized execution graphs with automatic INT8/FP8 quantization, kernel auto-tuning, and dynamic tensor memory management.',
    icon: Zap,
    highlights: [
      'Layer fusion, constant folding, and hardware kernel auto-tuning at compile time',
      'Post-training INT8 and FP8 quantization with automated calibration datasets',
      'Dynamic shape execution with zero runtime re-allocation overhead',
      'Multi-stream asynchronous execution queues for concurrent perception tasks',
      'Up to 6x latency reduction compared to standard ONNX Runtime / PyTorch baselines',
    ],
    specs: [
      { label: 'Model Inputs', value: 'ONNX, PyTorch (TorchScript), JAX, TF SavedModel' },
      { label: 'Precisions', value: 'FP32, FP16, BF16, INT8, FP8 (Auto-Calibrated)' },
      { label: 'Acceleration', value: 'Edge GPUs, Tensor Cores, Embedded Accelerators' },
      { label: 'Batching', value: 'Dynamic micro-batching (1-64 frames)' },
      { label: 'Memory Footprint', value: 'Up to 65% VRAM reduction via tensor reuse' },
    ],
  },
  {
    id: 'zone',
    number: '03',
    name: 'Perceptras Zone',
    tagline: 'Multi-Camera Spatial Intelligence & 3D Tracking',
    description:
      'Transforms raw multi-angle detections into unified 3D spatial coordinate coordinates. Delivers continuous trajectory tracking, occlusion recovery, and zone boundary analytics for complex facilities.',
    icon: Compass,
    highlights: [
      'Multi-camera extrinsic auto-calibration with automated ground plane alignment',
      'Cross-camera ReID and continuous trajectory matching across blind spots',
      'Geofence definition with programmable entry, dwell, and direction event triggers',
      'Occupancy heatmaps, density mapping, and spatial trajectory velocity profiling',
      'Direct CAD/BIM floor plan import with pixel-to-metric millimeter scaling',
    ],
    specs: [
      { label: 'Tracking Engine', value: '3D Kalman Filter + Appearance ReID Embedding' },
      { label: 'Coordinate System', value: 'Metric World Space (X, Y, Z in meters)' },
      { label: 'Calibration', value: '2D-to-3D Homography & Full PnP Matrix Solver' },
      { label: 'Analytics Events', value: 'Zone Entry, Dwell Time, Heatmap, Speed Violation' },
      { label: 'Export Format', value: 'GeoJSON, Structured Bounding Entities, FlatBuffers' },
    ],
  },
  {
    id: 'grid',
    number: '04',
    name: 'Perceptras Grid',
    tagline: 'Distributed Inference Cluster & Telemetry Orchestrator',
    description:
      'Enterprise orchestration layer that manages model deployment, load balancing, fault tolerance, and event streaming across hybrid edge nodes and centralized GPU clusters.',
    icon: Network,
    highlights: [
      'Dynamic model placement based on real-time GPU load, temperature, and latency SLAs',
      'Zero-downtime rolling model updates and A/B canary deployment capabilities',
      'High-throughput gRPC, Kafka, and MQTT telemetry streaming out-of-the-box',
      'Cluster health self-healing with automatic node failover and stream rerouting',
      'Unified observability with Prometheus metrics and OpenTelemetry trace export',
    ],
    specs: [
      { label: 'Topology', value: 'Hybrid Edge-to-Cloud / Distributed Multi-Node' },
      { label: 'Output Transports', value: 'gRPC (HTTP/2), Kafka Bus, MQTT Broker, WebSocket' },
      { label: 'Scaling', value: 'Horizontal pod & node auto-scaling based on stream load' },
      { label: 'Telemetry', value: 'Prometheus metrics, OpenTelemetry, Structured Logs' },
      { label: 'Security', value: 'mTLS node-to-node encryption, RBAC access control' },
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* ── Products Hero ────────────────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="pt-20 md:pt-28">
        <Container>
          <div className="mb-6">
            <MonoTag>INFRASTRUCTURE SUITE // 4 CORE MODULES</MonoTag>
          </div>
          <Display className="max-w-5xl">
            Perception Stack
            <br />
            Product Suite
          </Display>
          <p className="font-mono text-sm text-muted max-w-2xl mt-6 leading-relaxed">
            A modular, high-performance infrastructure designed for real-time physical AI. From high-density video ingest and hardware-compiled inference to multi-camera spatial tracking and cluster orchestration.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/dashboard/">
              <Button variant="primary" size="lg" className="flex items-center gap-2">
                <span>Launch Controller Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact/">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Architecture Overview ────────────────────────────────────── */}
      <Section borders={{ bottom: true }} className="bg-surface/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
            {[
              { title: '1. Ingest', desc: 'Hardware-decoded multi-stream video and sensor ingest at line rate.', icon: Video },
              { title: '2. Accelerate', desc: 'Compiled execution graphs with INT8/FP8 quantization.', icon: Zap },
              { title: '3. Spatial Intel', desc: 'Multi-camera 3D coordinate tracking and zone analytics.', icon: Compass },
              { title: '4. Orchestrate', desc: 'Distributed cluster load balancing and streaming telemetry.', icon: Network },
            ].map(({ title, desc, icon: Icon }) => (
              <div key={title} className="bg-surface p-6 flex flex-col justify-between gap-4">
                <div>
                  <Icon className="h-5 w-5 text-foreground mb-3 stroke-[1.5]" />
                  <p className="font-syne text-sm font-bold uppercase">{title}</p>
                  <p className="font-mono text-xs text-muted mt-2 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Detailed Product Sections ────────────────────────────────── */}
      <div className="divide-y divide-border">
        {PRODUCTS.map((product) => (
          <Section key={product.id} id={product.id} className="scroll-mt-16 py-20 md:py-28">
            <Container>
              <div className="mb-4 flex items-center gap-3">
                <MonoTag>MODULE {product.number}</MonoTag>
                <span className="font-mono text-xs text-muted uppercase tracking-widest">
                  {product.tagline}
                </span>
              </div>

              <AsymmetricGrid ratio="60/40" divider>
                {/* Left Column: Description & Highlights */}
                <div className="space-y-8">
                  <div>
                    <Heading as="h2" className="text-2xl md:text-4xl mb-4">
                      {product.name}
                    </Heading>
                    <p className="font-mono text-sm text-muted leading-relaxed max-w-2xl">
                      {product.description}
                    </p>
                  </div>

                  <div className="border border-border p-6 bg-surface">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4 font-semibold">
                      Key Capabilities & Architecture Highlights
                    </p>
                    <ul className="space-y-3">
                      {product.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 font-mono text-xs text-foreground">
                          <Check className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Technical Specification Table */}
                <div className="space-y-6">
                  <div className="border border-border bg-surface">
                    <div className="border-b border-border px-5 py-3.5 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        Technical Specifications
                      </span>
                      <product.icon className="h-4 w-4 text-muted" />
                    </div>
                    <div className="divide-y divide-border">
                      {product.specs.map(({ label, value }) => (
                        <div key={label} className="px-5 py-3.5 flex flex-col gap-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
                            {label}
                          </span>
                          <span className="font-mono text-xs text-foreground font-semibold">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <Link href={`/dashboard?pipeline=${product.id}`}>
                      <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
                        <span>Launch {product.name} in Dashboard</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/contact?subject=${encodeURIComponent(product.name)}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Request Architecture Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </AsymmetricGrid>
            </Container>
          </Section>
        ))}
      </div>

      {/* ── Enterprise Security & Deployment ─────────────────────────── */}
      <Section borders={{ top: true, bottom: true }} className="bg-surface/30">
        <Container>
          <div className="max-w-3xl mb-12">
            <MonoTag>ENTERPRISE READINESS</MonoTag>
            <Heading as="h2" className="text-2xl md:text-3xl mt-3 mb-4">
              Production-Grade Reliability
            </Heading>
            <p className="font-mono text-sm text-muted">
              Built from the ground up for critical physical operations where downtime and data loss are unacceptable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border p-6 bg-surface space-y-3">
              <Shield className="h-5 w-5 text-foreground stroke-[1.5]" />
              <p className="font-syne text-sm font-bold uppercase">Enterprise Security</p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                End-to-end mTLS stream encryption, SOC2 Type II compliance roadmap, and fine-grained RBAC credential management.
              </p>
            </div>
            <div className="border border-border p-6 bg-surface space-y-3">
              <Cpu className="h-5 w-5 text-foreground stroke-[1.5]" />
              <p className="font-syne text-sm font-bold uppercase">Hardware Agnostic</p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Deploy uniformly across edge embedded systems, ruggedized factory computers, and multi-GPU cloud data centers.
              </p>
            </div>
            <div className="border border-border p-6 bg-surface space-y-3">
              <Layers className="h-5 w-5 text-foreground stroke-[1.5]" />
              <p className="font-syne text-sm font-bold uppercase">Modular Integration</p>
              <p className="font-mono text-xs text-muted leading-relaxed">
                Use each product module independently or deploy the entire Perceptras perception pipeline as an integrated cluster.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Call to Action ───────────────────────────────────────────── */}
      <Section className="py-24 md:py-32">
        <Container className="text-center">
          <Display as="h2" className="text-3xl md:text-5xl lg:text-6xl mb-6">
            Deploy Perceptras
          </Display>
          <p className="font-mono text-sm text-muted max-w-xl mx-auto mb-10">
            Talk to our engineering team to review system sizing, sensor topology, and deployment architecture.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register/">
              <Button variant="primary" size="lg">
                Create Account
              </Button>
            </Link>
            <Link href="/contact/">
              <Button variant="outline" size="lg">
                Schedule Architecture Review →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
