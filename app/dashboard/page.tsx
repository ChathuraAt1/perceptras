'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { sha256Hex } from '@/lib/crypto';
import {
  LayoutDashboard,
  Video,
  Zap,
  Compass,
  Network,
  CreditCard,
  Settings,
  Plus,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Lock,
  LogOut,
  Terminal,
  ArrowLeft,
  Play,
  ArrowRight,
} from 'lucide-react';

interface StreamItem {
  id: string;
  name: string;
  url: string;
  protocol: 'RTSP' | 'GigE' | 'USB3' | 'MIPI';
  resolution: string;
  fps: number;
  pipeline: string;
  status: 'active' | 'standby' | 'reconnecting';
  latency: string;
}

const INITIAL_STREAMS: StreamItem[] = [
  {
    id: 'stream_01',
    name: 'Warehouse-Dock-North',
    url: 'rtsp://192.168.1.104:554/live/ch0',
    protocol: 'RTSP',
    resolution: '3840x2160 (4K)',
    fps: 30,
    pipeline: 'Perceptras Flow + Accel',
    status: 'active',
    latency: '1.2ms',
  },
  {
    id: 'stream_02',
    name: 'Assembly-Robot-AMR-01',
    url: 'gige://00:0f:31:02:e4:11',
    protocol: 'GigE',
    resolution: '1920x1080 (FHD)',
    fps: 60,
    pipeline: 'Perceptras Zone 3D',
    status: 'active',
    latency: '0.8ms',
  },
  {
    id: 'stream_03',
    name: 'Perimeter-East-Gate',
    url: 'rtsp://192.168.1.118:554/live/ch1',
    protocol: 'RTSP',
    resolution: '1920x1080 (FHD)',
    fps: 30,
    pipeline: 'Perceptras Flow',
    status: 'active',
    latency: '1.4ms',
  },
  {
    id: 'stream_04',
    name: 'Inspection-Macro-Sensor',
    url: 'usb3://dev/video4',
    protocol: 'USB3',
    resolution: '2560x1440 (2K)',
    fps: 90,
    pipeline: 'Perceptras Accel INT8',
    status: 'active',
    latency: '0.6ms',
  },
];

const NODES = [
  {
    id: 'node-alpha-01',
    name: 'Edge-Cluster-US-East',
    role: 'Primary Ingest & Inference Node',
    gpu: '2x RTX 6000 Ada (96GB VRAM)',
    gpuLoad: '64%',
    cpuLoad: '28%',
    vram: '38.4 / 96 GB',
    temp: '58°C',
    status: 'online',
    streamsAssigned: 18,
    egress: 'gRPC :50051 + Kafka Topic',
  },
  {
    id: 'node-beta-02',
    name: 'Robot-Fleet-Zone-A',
    role: 'Embedded AMR SLAM & Spatial Unit',
    gpu: 'Jetson AGX Orin 64GB',
    gpuLoad: '72%',
    cpuLoad: '44%',
    vram: '22.1 / 64 GB',
    temp: '49°C',
    status: 'online',
    streamsAssigned: 8,
    egress: 'WebSocket Live Bus',
  },
];

const MODELS = [
  {
    id: 'model_01',
    name: 'YOLOv10x-Physical-Perception',
    type: 'Object Detection & Bounding',
    quantization: 'FP8 Quantized',
    batchSize: 'Batch 16',
    throughput: '240 FPS',
    latency: '1.1 ms',
    memory: '1.8 GB VRAM',
  },
  {
    id: 'model_02',
    name: 'Spatial-Pose-3D-Tracking',
    type: 'Multi-Person 3D Keypoint Pose',
    quantization: 'INT8 Quantized',
    batchSize: 'Batch 8',
    throughput: '180 FPS',
    latency: '1.4 ms',
    memory: '2.4 GB VRAM',
  },
  {
    id: 'model_03',
    name: 'Defect-Anomalies-Engine',
    type: 'Surface Defect Segmentation',
    quantization: 'FP16 Precision',
    batchSize: 'Batch 4',
    throughput: '90 FPS',
    latency: '2.1 ms',
    memory: '3.1 GB VRAM',
  },
];

const GEOFENCES = [
  {
    id: 'geo_01',
    name: 'Loading Dock Alpha // Safety Zone',
    type: 'Restricted Proximity Hazard',
    cameras: 'Dock-Cam-01, Dock-Cam-02',
    status: 'Armed & Active',
    activeEntities: '0 Violations',
  },
  {
    id: 'geo_02',
    name: 'AMR Fast Transit Corridor',
    type: 'Autonomous Vehicle Lane',
    cameras: 'Aisle-North, Aisle-South',
    status: 'Active Tracking',
    activeEntities: '2 Mobile Robots',
  },
  {
    id: 'geo_03',
    name: 'Robotic Arm Cell Perimeter',
    type: 'Interlock E-Stop Boundary',
    cameras: 'Cell-Macro-01',
    status: 'Armed (Zero-Lag)',
    activeEntities: '1 Operator in Safe Zone',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'flow' | 'accel' | 'zone' | 'grid' | 'billing' | 'settings'
  >('overview');
  const [copiedKey, setCopiedKey] = useState(false);
  const [streams, setStreams] = useState<StreamItem[]>(INITIAL_STREAMS);

  // Accel Benchmark State
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchResults, setBenchResults] = useState<{
    p50: string;
    p99: string;
    fps: string;
  } | null>(null);

  // Add Stream Modal State
  const [isAddStreamOpen, setIsAddStreamOpen] = useState(false);
  const [newStreamName, setNewStreamName] = useState('');
  const [newStreamUrl, setNewStreamUrl] = useState('');
  const [newStreamProtocol, setNewStreamProtocol] = useState<'RTSP' | 'GigE' | 'USB3' | 'MIPI'>('RTSP');
  const [newStreamPipeline, setNewStreamPipeline] = useState('Perceptras Flow + Accel');

  // User & Billing state
  const [userEmail, setUserEmail] = useState('developer@perceptras.local');
  const [userName, setUserName] = useState('Lead Vision Engineer');
  const [currentPlan, setCurrentPlan] = useState('Professional');
  const [apiKey, setApiKey] = useState('pct_live_9f8a3c42e17b80a9d45e12f6c03');

  // Password change state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passStatus, setPassStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [passMsg, setPassMsg] = useState('');

  useEffect(() => {
    // Check URL parameters for tab routing (e.g. ?pipeline=flow)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pipelineParam = params.get('pipeline');
      if (
        pipelineParam === 'flow' ||
        pipelineParam === 'accel' ||
        pipelineParam === 'zone' ||
        pipelineParam === 'grid'
      ) {
        setActiveTab(pipelineParam);
      }
    }

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('sanctum_token') : null;
    if (token) {
      setApiKey(`pct_live_${token.slice(0, 24)}...`);
      // Fetch user profile from /api/user
      fetch('https://portal.perceptras.net/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.data) {
            setUserEmail((prev) => data.data.email || prev);
            setUserName((prev) =>
              data.data.first_name
                ? `${data.data.first_name} ${data.data.last_name || ''}`
                : data.data.username || prev
            );
          }
        })
        .catch(() => {});

      // Fetch last plan from /api/payments/last-plan
      fetch('https://portal.perceptras.net/api/payments/last-plan', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.data?.plan?.name) {
            setCurrentPlan(data.data.plan.name);
          }
        })
        .catch(() => {});
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRunBenchmark = () => {
    setIsBenchmarking(true);
    setBenchResults(null);
    setTimeout(() => {
      setIsBenchmarking(false);
      setBenchResults({
        p50: '0.94 ms',
        p99: '1.28 ms',
        fps: '246.2 FPS',
      });
    }, 1500);
  };

  const handleAddStream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreamName || !newStreamUrl) return;

    const newStream: StreamItem = {
      id: `stream_${Date.now().toString().slice(-4)}`,
      name: newStreamName,
      url: newStreamUrl,
      protocol: newStreamProtocol,
      resolution: '1920x1080 (FHD)',
      fps: 30,
      pipeline: newStreamPipeline,
      status: 'active',
      latency: '1.2ms',
    };

    setStreams([newStream, ...streams]);
    setNewStreamName('');
    setNewStreamUrl('');
    setIsAddStreamOpen(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassStatus('idle');
    setPassMsg('');

    try {
      const currentHash = await sha256Hex(currentPass);
      const newHash = await sha256Hex(newPass);

      const token = sessionStorage.getItem('sanctum_token');
      if (!token) {
        setPassStatus('success');
        setPassMsg('Password updated in local session mode.');
        setCurrentPass('');
        setNewPass('');
        return;
      }

      const res = await fetch('https://portal.perceptras.net/api/auth/password/change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password_hash: currentHash,
          password_hash: newHash,
          password_hash_confirmation: newHash,
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setPassStatus('success');
        setPassMsg('Password successfully changed.');
        setCurrentPass('');
        setNewPass('');
      } else {
        setPassStatus('error');
        setPassMsg(data?.message || 'Failed to update password.');
      }
    } catch {
      setPassStatus('error');
      setPassMsg('Server connection failed.');
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* ── Fixed Left Sidebar ────────────────────────────────── */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between shrink-0 z-30">
        <div className="overflow-y-auto">
          {/* Brand Header */}
          <div className="h-16 border-b border-border px-6 flex items-center justify-between">
            <Link href="/" className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Perceptras
            </Link>
            <span className="flex h-2 w-2 relative" title="Edge Controller Online">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>

          {/* Navigation Section 1: Core Perception Modules */}
          <div className="p-3 space-y-1 font-mono text-xs">
            <p className="px-3 py-1.5 text-[9px] uppercase tracking-widest text-muted font-bold">
              Perception Platform
            </p>

            {[
              { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
              { id: 'flow' as const, label: 'Flow // Ingest', icon: Video, count: streams.length },
              { id: 'accel' as const, label: 'Accel // Inference', icon: Zap, count: MODELS.length },
              { id: 'zone' as const, label: 'Zone // 3D Spatial', icon: Compass, count: GEOFENCES.length },
              { id: 'grid' as const, label: 'Grid // Clusters', icon: Network, count: NODES.length },
            ].map(({ id, label, icon: Icon, count }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-3 py-2 uppercase font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-foreground text-background font-bold'
                      : 'text-muted hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  {count !== undefined && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 border ${
                        active ? 'border-background text-background' : 'border-border text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Navigation Section 2: Management & Billing */}
            <p className="px-3 pt-4 pb-1.5 text-[9px] uppercase tracking-widest text-muted font-bold">
              Account &amp; Topology
            </p>

            {[
              { id: 'billing' as const, label: 'Plans & Quota', icon: CreditCard },
              { id: 'settings' as const, label: 'Security & Keys', icon: Settings },
            ].map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-3 py-2 uppercase font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-foreground text-background font-bold'
                      : 'text-muted hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-border space-y-3 font-mono text-xs shrink-0">
          <div className="p-2.5 bg-surface/50 border border-border">
            <p className="font-bold text-foreground truncate">{userName}</p>
            <p className="text-[10px] text-muted truncate">{userEmail}</p>
            <div className="mt-1.5 flex items-center justify-between text-[9px] uppercase tracking-wider">
              <span className="text-muted">Plan: {currentPlan}</span>
              <span className="text-emerald-500 font-bold">Live</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <Link
              href="/"
              className="text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Site</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('sanctum_token');
                window.location.href = '/auth/login/';
              }}
              title="Sign Out"
              className="text-muted hover:text-foreground cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Workspace Area ──────────────────────────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Workspace Top Header */}
        <header className="h-16 border-b border-border bg-surface/80 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Controller /</span>
            <h2 className="font-syne text-base font-bold uppercase text-foreground">
              {activeTab === 'overview' && 'Cluster Overview'}
              {activeTab === 'flow' && 'Perceptras Flow // Video Ingest Engine'}
              {activeTab === 'accel' && 'Perceptras Accel // Inference Engine'}
              {activeTab === 'zone' && 'Perceptras Zone // 3D Spatial Intelligence'}
              {activeTab === 'grid' && 'Perceptras Grid // Cluster Topology'}
              {activeTab === 'billing' && 'Subscription & Quota'}
              {activeTab === 'settings' && 'Security & API Credentials'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'flow' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAddStreamOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Connect Camera</span>
              </Button>
            )}

            {activeTab === 'accel' && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleRunBenchmark}
                disabled={isBenchmarking}
                className="flex items-center gap-2"
              >
                <Play className="h-3.5 w-3.5" />
                <span>{isBenchmarking ? 'Profiling...' : 'Run Benchmark'}</span>
              </Button>
            )}

            <ThemeToggle />
          </div>
        </header>

        {/* Workspace Content Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB 1: OVERVIEW                                        */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              {/* Telemetry Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-border p-5 bg-surface">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                    Active Streams
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="font-syne text-3xl font-bold text-foreground">
                      {streams.length} <span className="font-mono text-sm text-muted">/ 64</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-500 font-bold">NORMAL LOAD</span>
                  </div>
                </div>

                <div className="border border-border p-5 bg-surface">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                    Avg Pipeline Latency
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="font-syne text-3xl font-bold text-foreground">1.1 ms</span>
                    <span className="font-mono text-[10px] text-emerald-500 font-bold">ZERO-COPY DMA</span>
                  </div>
                </div>

                <div className="border border-border p-5 bg-surface">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                    Aggregated Ingest
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="font-syne text-3xl font-bold text-foreground">180 FPS</span>
                    <span className="font-mono text-[10px] text-muted">4K / FHD</span>
                  </div>
                </div>

                <div className="border border-border p-5 bg-surface">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                    Connected Edge Nodes
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="font-syne text-3xl font-bold text-foreground">2 Online</span>
                    <span className="font-mono text-[10px] text-emerald-500 font-bold">100% HEALTHY</span>
                  </div>
                </div>
              </div>

              {/* Core 4 Products Quick Launcher Hub */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-syne text-base font-bold uppercase text-foreground">
                    Active Perception Modules
                  </h3>
                  <span className="font-mono text-xs text-muted">Click module to manage</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { id: 'flow' as const, name: 'Flow // Ingest', desc: `${streams.length} Active Feeds`, icon: Video },
                    { id: 'accel' as const, name: 'Accel // Inference', desc: 'INT8/FP8 Quantized', icon: Zap },
                    { id: 'zone' as const, name: 'Zone // 3D Spatial', desc: '3 Active Geofences', icon: Compass },
                    { id: 'grid' as const, name: 'Grid // Topology', desc: '2 Clustered Nodes', icon: Network },
                  ].map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setActiveTab(mod.id)}
                      className="border border-border p-5 bg-surface hover:border-foreground transition-colors text-left space-y-2 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <mod.icon className="h-5 w-5 text-foreground" />
                        <ArrowRight className="h-3.5 w-3.5 text-muted group-hover:text-foreground transition-colors" />
                      </div>
                      <h4 className="font-syne text-sm font-bold uppercase text-foreground">{mod.name}</h4>
                      <p className="font-mono text-xs text-muted">{mod.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Edge Agent Install Script */}
              <div className="border border-border p-6 bg-surface space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-foreground" />
                    <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                      Edge Node Registration Command
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `curl -sSL https://portal.perceptras.net/agent.sh | bash -s -- --token ${apiKey}`
                      )
                    }
                    className="font-mono text-xs text-muted hover:text-foreground inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Install Command</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto border border-zinc-800">
                  <code>
                    perceptras-node connect --server https://portal.perceptras.net/api --token {apiKey}
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB 2: PERCEPTRAS FLOW (INGEST ENGINE)                 */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'flow' && (
            <div className="space-y-6 max-w-6xl">
              <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                    Perceptras Flow Video Ingest Bus
                  </h3>
                  <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
                    Zero-copy hardware decoding for high-density RTSP, GigE Vision, USB3, and MIPI cameras directly into unified GPU memory.
                  </p>
                </div>
                <div className="flex gap-4 font-mono text-xs">
                  <div className="border border-border p-3 bg-surface/50">
                    <span className="text-muted text-[10px] uppercase">DMA Buffer Pool</span>
                    <p className="font-bold text-foreground">1.2 / 8.0 GB Used</p>
                  </div>
                  <div className="border border-border p-3 bg-surface/50">
                    <span className="text-muted text-[10px] uppercase">Packet Loss</span>
                    <p className="font-bold text-emerald-500">0.00% (Lossless)</p>
                  </div>
                </div>
              </div>

              {/* Stream Table */}
              <div className="border border-border bg-surface overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                      <th className="py-3.5 px-4 font-semibold">Camera Feed</th>
                      <th className="py-3.5 px-4 font-semibold">Endpoint &amp; Protocol</th>
                      <th className="py-3.5 px-4 font-semibold">Resolution</th>
                      <th className="py-3.5 px-4 font-semibold">Assigned Pipeline</th>
                      <th className="py-3.5 px-4 font-semibold">Latency</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {streams.map((stream) => (
                      <tr key={stream.id} className="hover:bg-foreground/5 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-foreground">{stream.name}</div>
                          <div className="text-[10px] text-muted">{stream.id}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="border border-border px-1.5 py-0.5 text-[9px] font-bold">
                              {stream.protocol}
                            </span>
                            <span className="text-muted truncate max-w-[200px]">{stream.url}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-foreground">
                          {stream.resolution} @ {stream.fps}fps
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="border border-border bg-surface/50 px-2 py-0.5 text-[10px] font-semibold text-foreground">
                            {stream.pipeline}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-foreground">{stream.latency}</td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="inline-flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {stream.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB 3: PERCEPTRAS ACCEL (INFERENCE ENGINE)             */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'accel' && (
            <div className="space-y-6 max-w-6xl">
              <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                    Perceptras Accel Model Optimizer &amp; Compiler
                  </h3>
                  <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
                    Quantized INT8/FP8 layer fusion and dynamic execution graph compilation for sub-2ms edge vision inference.
                  </p>
                </div>

                {benchResults && (
                  <div className="flex gap-4 font-mono text-xs border border-emerald-500/40 bg-emerald-500/10 p-3">
                    <div>
                      <span className="text-muted text-[10px] uppercase">P50 Latency</span>
                      <p className="font-bold text-foreground">{benchResults.p50}</p>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] uppercase">P99 Latency</span>
                      <p className="font-bold text-foreground">{benchResults.p99}</p>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] uppercase">Throughput</span>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">{benchResults.fps}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Models List */}
              <div className="space-y-4">
                <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                  Compiled Execution Graphs
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MODELS.map((model) => (
                    <div key={model.id} className="border border-border p-6 bg-surface space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase border border-border px-2 py-0.5 text-foreground font-bold">
                            {model.quantization}
                          </span>
                          <span className="text-emerald-500 font-mono text-[10px] font-bold">Active</span>
                        </div>
                        <h4 className="font-syne text-base font-bold uppercase text-foreground">{model.name}</h4>
                        <p className="font-mono text-xs text-muted">{model.type}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border font-mono text-xs">
                        <div>
                          <span className="text-muted text-[10px] uppercase">Latency</span>
                          <p className="font-bold text-foreground">{model.latency}</p>
                        </div>
                        <div>
                          <span className="text-muted text-[10px] uppercase">Throughput</span>
                          <p className="font-bold text-foreground">{model.throughput}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB 4: PERCEPTRAS ZONE (3D SPATIAL & GEOFENCES)        */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'zone' && (
            <div className="space-y-6 max-w-6xl">
              <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                    Perceptras Zone 3D Spatial Intelligence
                  </h3>
                  <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
                    Extrinsic multi-camera calibration and continuous 3D entity tracking across overlapping angles and blind spots.
                  </p>
                </div>
                <div className="flex gap-4 font-mono text-xs">
                  <div className="border border-border p-3 bg-surface/50">
                    <span className="text-muted text-[10px] uppercase">Calibration Error</span>
                    <p className="font-bold text-emerald-500">0.02 px (Extrinsic Locked)</p>
                  </div>
                  <div className="border border-border p-3 bg-surface/50">
                    <span className="text-muted text-[10px] uppercase">ReID Retention</span>
                    <p className="font-bold text-foreground">99.8% Multi-Cam</p>
                  </div>
                </div>
              </div>

              {/* Geofence List */}
              <div className="space-y-4">
                <h4 className="font-syne text-sm font-bold uppercase text-foreground">
                  Configured 3D Spatial Boundaries
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {GEOFENCES.map((geo) => (
                    <div key={geo.id} className="border border-border p-6 bg-surface space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase border border-border px-2 py-0.5 text-foreground font-bold">
                          {geo.type}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <h4 className="font-syne text-base font-bold uppercase text-foreground">{geo.name}</h4>
                      <p className="font-mono text-xs text-muted">Cameras: {geo.cameras}</p>
                      <div className="pt-2 border-t border-border font-mono text-xs flex justify-between">
                        <span className="text-muted">Live Status:</span>
                        <span className="font-bold text-foreground">{geo.activeEntities}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB 5: PERCEPTRAS GRID (CLUSTER TOPOLOGY)              */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'grid' && (
            <div className="space-y-6 max-w-6xl">
              <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                    Perceptras Grid Cluster Orchestration
                  </h3>
                  <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
                    Distributed edge node clustering with zero-downtime automatic failover, load balancing, and unified gRPC/Kafka buses.
                  </p>
                </div>
                <div className="border border-border p-3 bg-surface/50 font-mono text-xs">
                  <span className="text-muted text-[10px] uppercase">Failover Readiness</span>
                  <p className="font-bold text-emerald-500">120ms Hot Standby</p>
                </div>
              </div>

              {/* Nodes List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {NODES.map((node) => (
                  <div key={node.id} className="border border-border p-6 bg-surface space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <h4 className="font-syne text-base font-bold uppercase text-foreground">
                            {node.name}
                          </h4>
                        </div>
                        <p className="font-mono text-xs text-muted mt-0.5">{node.role}</p>
                      </div>
                      <span className="font-mono text-[10px] uppercase border border-border px-2 py-0.5 text-foreground font-semibold">
                        {node.gpu}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border font-mono text-xs">
                      <div>
                        <span className="text-muted text-[10px] uppercase">GPU Load</span>
                        <p className="font-bold text-foreground">{node.gpuLoad}</p>
                      </div>
                      <div>
                        <span className="text-muted text-[10px] uppercase">VRAM Usage</span>
                        <p className="font-bold text-foreground">{node.vram}</p>
                      </div>
                      <div>
                        <span className="text-muted text-[10px] uppercase">Temperature</span>
                        <p className="font-bold text-foreground">{node.temp}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border font-mono text-[11px] flex justify-between text-muted">
                      <span>Egress: {node.egress}</span>
                      <span className="text-foreground font-bold">{node.streamsAssigned} Streams</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB 6: BILLING & QUOTA                                 */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'billing' && (
            <div className="space-y-8 max-w-4xl">
              <div className="border border-border p-6 bg-surface space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Subscription Plan
                    </span>
                    <h3 className="font-syne text-2xl font-bold uppercase text-foreground">
                      {currentPlan} Plan
                    </h3>
                  </div>
                  <span className="border border-foreground bg-foreground text-background font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border font-mono text-xs">
                  <div>
                    <span className="text-muted text-[10px] uppercase">Channel Quota</span>
                    <p className="font-bold text-foreground">Up to 64 Streams</p>
                  </div>
                  <div>
                    <span className="text-muted text-[10px] uppercase">Billing Term</span>
                    <p className="font-bold text-foreground">Annual (Save 20%)</p>
                  </div>
                  <div>
                    <span className="text-muted text-[10px] uppercase">Next Renewal</span>
                    <p className="font-bold text-foreground">August 2027</p>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <Link href="/pricing/">
                    <Button variant="primary" size="sm">
                      Change Subscription Tier →
                    </Button>
                  </Link>
                  <Link href="/contact?subject=Plan%20Upgrade%20Inquiry">
                    <Button variant="outline" size="sm">
                      Talk to Sizing Specialist
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB 7: SETTINGS & SECURITY                             */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-8">
              <div className="border border-border p-6 bg-surface space-y-6">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-foreground" />
                  <h3 className="font-syne text-base font-bold uppercase text-foreground">
                    Change Password
                  </h3>
                </div>

                {passStatus === 'success' && (
                  <div className="border border-emerald-500/50 bg-emerald-500/5 p-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="font-mono text-xs text-emerald-500">{passMsg}</span>
                  </div>
                )}

                {passStatus === 'error' && (
                  <div className="border border-red-500/50 bg-red-500/5 p-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                    <span className="font-mono text-xs text-red-500">{passMsg}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 font-mono text-xs">
                  <Input
                    type="password"
                    label="Current Password"
                    placeholder="••••••••••••"
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                  />

                  <Input
                    type="password"
                    label="New Password (min 8 characters)"
                    placeholder="••••••••••••"
                    required
                    minLength={8}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />

                  <Button type="submit" variant="primary" size="sm">
                    Update Password
                  </Button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Modal: Add Camera Stream ──────────────────────────── */}
      {isAddStreamOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-border bg-surface max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                Connect New Camera Stream
              </h3>
              <button
                type="button"
                onClick={() => setIsAddStreamOpen(false)}
                className="text-muted hover:text-foreground font-mono text-sm cursor-pointer"
              >
                [ESC / ✕]
              </button>
            </div>

            <form onSubmit={handleAddStream} className="space-y-4 font-mono text-xs">
              <Input
                label="Camera Display Name"
                placeholder="e.g. Robot-Arm-Camera-02"
                required
                value={newStreamName}
                onChange={(e) => setNewStreamName(e.target.value)}
              />

              <div>
                <label className="block text-muted text-[10px] uppercase tracking-wider mb-1.5 font-semibold">
                  Stream Protocol
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['RTSP', 'GigE', 'USB3', 'MIPI'] as const).map((proto) => (
                    <button
                      key={proto}
                      type="button"
                      onClick={() => setNewStreamProtocol(proto)}
                      className={`py-2 text-center border font-bold uppercase transition-colors cursor-pointer ${
                        newStreamProtocol === proto
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border bg-surface text-muted hover:text-foreground'
                      }`}
                    >
                      {proto}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Stream Address / Endpoint"
                placeholder="rtsp://192.168.1.150:554/live/ch0"
                required
                value={newStreamUrl}
                onChange={(e) => setNewStreamUrl(e.target.value)}
              />

              <div>
                <label className="block text-muted text-[10px] uppercase tracking-wider mb-1.5 font-semibold">
                  Assign Perception Pipeline
                </label>
                <select
                  value={newStreamPipeline}
                  onChange={(e) => setNewStreamPipeline(e.target.value)}
                  className="w-full bg-surface border border-border p-2.5 font-mono text-xs text-foreground focus:outline-none focus:border-foreground"
                >
                  <option value="Perceptras Flow + Accel">
                    Perceptras Flow + Accel (Video Decode &amp; Compiled Inference)
                  </option>
                  <option value="Perceptras Zone 3D">
                    Perceptras Zone 3D (Spatial Geometry Tracking)
                  </option>
                  <option value="Perceptras Flow">
                    Perceptras Flow (Raw Stream Normalization)
                  </option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Register &amp; Ingest Stream
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddStreamOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
