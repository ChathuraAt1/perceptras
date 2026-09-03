import Link from 'next/link';
import Image from 'next/image';
import { Section, Container } from '@/components/layout/section-container';
import { Display, Heading, MonoTag } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import {
  Video,
  Zap,
  Compass,
  Network,
  ArrowRight,
  Check,
} from 'lucide-react';

const CORE_PILLARS = [
  {
    number: '01',
    id: 'flow',
    title: 'Multi-Protocol Video Ingest & Stream Management',
    tagline: 'Perceptras Flow',
    description:
      'Connect industrial and standard cameras across your facility. Hardware-accelerated decoding offloads CPU memory bottlenecks, keeping video pipelines stable during continuous operation.',
    icon: Video,
    image: '/images/features/icons.webp',
    highlights: [
      { title: 'Standard Camera Support', desc: 'Native ingest for RTSP, GigE Vision, USB3 Vision, and MIPI CSI sensor feeds.' },
      { title: 'Hardware Decoding Offload', desc: 'Direct GPU decoding reduces host CPU utilization and memory copying.' },
      { title: 'Resilient Reconnection', desc: 'Automatic stream recovery and dynamic buffering during transient network drops.' },
      { title: 'Normalized Frame Buffers', desc: 'Converts mixed camera feeds into consistent tensor formats for downstream inference.' },
    ],
  },
  {
    number: '02',
    id: 'accel',
    title: 'Edge-Optimized Neural Model Runtime',
    tagline: 'Perceptras Accel',
    description:
      'Run modern vision models on your own edge devices. Quantization and batching tools help maintain stable frame rates on NVIDIA Jetson units and workstation GPUs.',
    icon: Zap,
    image: '/images/features/icons (2).webp',
    highlights: [
      { title: 'INT8 & FP16 Precision', desc: 'Quantize models to reduce memory and compute requirements with minimal accuracy loss.' },
      { title: 'Standard Framework Export', desc: 'Direct support for models exported from PyTorch, ONNX, and TensorRT pipelines.' },
      { title: 'Dynamic Batch Processing', desc: 'Balances throughput and responsiveness under variable camera workloads.' },
      { title: 'Multiple Vision Tasks', desc: 'Configurable pipelines for object detection, segmentation, and pose tracking.' },
    ],
  },
  {
    number: '03',
    id: 'zone',
    title: 'Multi-Camera Spatial Coverage & Alert Zones',
    tagline: 'Perceptras Zone',
    description:
      'Calibrate multiple overlapping cameras to track objects across wider areas. Set up virtual safety zones and tripwires to notify your operations team when events occur.',
    icon: Compass,
    image: '/images/features/icons (3).webp',
    highlights: [
      { title: 'Multi-Camera Calibration', desc: 'Guided extrinsic calibration routines to align overlapping viewpoints.' },
      { title: 'Cross-Camera Tracking', desc: 'Maintains object continuity as items or personnel move between camera fields of view.' },
      { title: 'Configurable Alert Boundaries', desc: 'Define custom polygons for pedestrian lanes, restricted areas, and equipment zones.' },
      { title: 'Flexible Event Dispatch', desc: 'Trigger alerts via webhooks, MQTT topics, visual alarms, or hardware relays.' },
    ],
  },
  {
    number: '04',
    id: 'grid',
    title: 'Local Network Deployment & Data Privacy',
    tagline: 'Perceptras Grid',
    description:
      'Process all video feeds entirely on your local facility network. Your video data never leaves your premises, avoiding cloud bandwidth fees and privacy risks.',
    icon: Network,
    image: '/images/features/icons (4).webp',
    highlights: [
      { title: '100% On-Premise Execution', desc: 'No external cloud dependencies required for continuous day-to-day operations.' },
      { title: 'Zero Cloud Video Egress Costs', desc: 'Eliminates expensive monthly cloud bandwidth charges for multi-camera feeds.' },
      { title: 'Cluster Health & Failover', desc: 'Monitor node status and reassign stream workloads if a host needs maintenance.' },
      { title: 'Standard Integration APIs', desc: 'Export detection events and metadata directly to SCADA, MES, or robotics controllers.' },
    ],
  },
];

const ARCHITECTURAL_DIFFERENCES = [
  {
    topic: 'Video Processing Location',
    cloud: 'Uploaded continuously to third-party cloud servers',
    perceptras: 'Processed locally on your on-premise edge hardware',
  },
  {
    topic: 'Bandwidth & Data Costs',
    cloud: 'High recurring costs for uploading multiple 4K/FHD streams',
    perceptras: 'Zero internet bandwidth needed for video processing',
  },
  {
    topic: 'Data Privacy & Compliance',
    cloud: 'Video leaves facility premises and enters external datacenters',
    perceptras: 'Footage remains 100% on your secure local network',
  },
  {
    topic: 'Internet Outage Impact',
    cloud: 'Vision system stops functioning if connection is interrupted',
    perceptras: 'Continues running normally without external internet',
  },
  {
    topic: 'Multi-Camera Coordination',
    cloud: 'Usually processes isolated frames with separate API calls',
    perceptras: 'Fuses overlapping camera viewpoints in unified coordinate space',
  },
  {
    topic: 'Integration with Local Systems',
    cloud: 'Requires webhooks back from the cloud with internet delays',
    perceptras: 'Direct local buses: gRPC, Kafka, MQTT, and digital I/O signals',
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* ── Features Hero ───────────────────────────────────────── */}
      <Section className="pt-24 md:pt-36 pb-16 relative overflow-hidden">
        {/* Ambient 3D Grid Perception Lens Background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-25 dark:opacity-45 select-none flex items-center justify-center">
          <Image
            src="/images/features/hero.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <Container className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          <MonoTag>PLATFORM ARCHITECTURE &amp; CAPABILITIES</MonoTag>
          <Display className="text-4xl sm:text-6xl font-bold">
            Dependable Physical AI for Real-World Systems
          </Display>
          <p className="font-mono text-sm md:text-base text-muted max-w-3xl mx-auto leading-relaxed">
            Connect multi-camera streams, run optimized neural inference on your edge hardware, and monitor spatial boundaries on your local network without cloud bandwidth overhead.
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
            const isEven = idx % 2 === 1;

            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className={`border border-border bg-surface p-8 md:p-12 flex flex-col ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-10 items-stretch justify-between shadow-sm group hover:border-foreground/40 transition-colors`}
              >
                {/* Left: Text Overview */}
                <div className="space-y-6 lg:w-1/2 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="h-12 w-12 border border-border bg-surface/90 p-2.5 flex items-center justify-center shrink-0 group-hover:border-foreground/50 transition-colors">
                        <Image
                          src={pillar.image}
                          alt={pillar.tagline}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain dark:invert-0 invert transition-transform group-hover:scale-110"
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-muted border border-border px-2.5 py-0.5">
                        {pillar.number} • {pillar.tagline}
                      </span>
                    </div>

                    <h2 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-foreground leading-tight">
                      {pillar.title}
                    </h2>

                    <p className="font-mono text-sm text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div>
                    <Link href={`/dashboard/${pillar.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <span>Explore {pillar.tagline} in Dashboard</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Concrete Capabilities List */}
                <div className="lg:w-1/2 border border-border bg-surface/50 p-6 sm:p-8 flex flex-col justify-center space-y-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold border-b border-border pb-2">
                    Key Functional Capabilities
                  </span>

                  <div className="space-y-4">
                    {pillar.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <h4 className="font-syne text-sm font-bold text-foreground uppercase">
                            {item.title}
                          </h4>
                        </div>
                        <p className="font-mono text-xs text-muted leading-relaxed pl-5.5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* ── Comparison Table: Cloud APIs vs. Perceptras Local Edge ──── */}
      <Section borders={{ bottom: true }} className="bg-surface/30 py-20 md:py-28">
        <Container className="max-w-5xl">
          <div className="max-w-3xl mb-12">
            <MonoTag>DEPLOYMENT ARCHITECTURE</MonoTag>
            <Heading as="h2" className="text-2xl md:text-4xl mt-3 mb-4">
              Local Edge Processing vs. Cloud Streaming
            </Heading>
            <p className="font-mono text-sm text-muted leading-relaxed">
              Why on-premise vision pipelines provide better reliability, privacy, and cost predictability for operational environments.
            </p>
          </div>

          <div className="border border-border bg-surface overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                  <th className="py-4 px-5 font-semibold">Aspect</th>
                  <th className="py-4 px-5 font-semibold text-muted">Typical Cloud Vision</th>
                  <th className="py-4 px-5 font-semibold text-foreground font-bold bg-foreground/[0.03]">
                    Perceptras On-Premise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ARCHITECTURAL_DIFFERENCES.map((row) => (
                  <tr key={row.topic} className="hover:bg-foreground/5 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-foreground">{row.topic}</td>
                    <td className="py-3.5 px-5 text-muted">{row.cloud}</td>
                    <td className="py-3.5 px-5 text-foreground font-semibold bg-foreground/[0.02]">
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
      <Section className="py-24 md:py-32 relative overflow-hidden">
        {/* Volumetric spotlight atmospheric background */}
        <div className="absolute inset-0 pointer-events-none dark:invert-0 invert opacity-20 dark:opacity-35 select-none flex items-center justify-center">
          <Image
            src="/images/features/evaluate.webp"
            alt=""
            fill
            className="object-cover object-bottom"
          />
        </div>

        <Container className="text-center max-w-3xl mx-auto space-y-6 relative z-10">
          <Display as="h2" className="text-3xl md:text-5xl font-bold">
            Evaluate Perceptras on Your Hardware
          </Display>
          <p className="font-mono text-sm text-muted max-w-xl mx-auto leading-relaxed">
            Test our stream ingest and model pipelines in the interactive controller dashboard or size a deployment for your facility.
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
