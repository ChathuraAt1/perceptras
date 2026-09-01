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
    role: 'Primary Ingest & Inference',
    gpu: '2x RTX 6000 Ada (96GB VRAM)',
    gpuLoad: '64%',
    cpuLoad: '28%',
    vram: '38.4 / 96 GB',
    temp: '58°C',
    status: 'online',
    streamsAssigned: 18,
  },
  {
    id: 'node-beta-02',
    name: 'Robot-Fleet-Zone-A',
    role: 'Embedded AMR SLAM Node',
    gpu: 'Jetson AGX Orin 64GB',
    gpuLoad: '72%',
    cpuLoad: '44%',
    vram: '22.1 / 64 GB',
    temp: '49°C',
    status: 'online',
    streamsAssigned: 8,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'streams' | 'pipelines' | 'billing' | 'settings'>('overview');
  const [copiedKey, setCopiedKey] = useState(false);
  const [streams, setStreams] = useState<StreamItem[]>(INITIAL_STREAMS);

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
    // Check if token exists in session storage for authenticated users
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
        <div>
          {/* Brand Header */}
          <div className="h-16 border-b border-border px-6 flex items-center justify-between">
            <Link href="/" className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
              Perceptras
            </Link>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 font-mono text-xs">
            {([
              { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
              { id: 'streams' as const, label: 'Camera Streams', icon: Video, count: streams.length },
              { id: 'pipelines' as const, label: 'Inference Pipelines', icon: Zap },
              { id: 'billing' as const, label: 'Billing & Quota', icon: CreditCard },
              { id: 'settings' as const, label: 'Settings & Security', icon: Settings },
            ]).map(({ id, label, icon: Icon, count }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 uppercase font-medium transition-colors cursor-pointer ${
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
                      className={`text-[10px] px-1.5 py-0.2 border ${
                        active ? 'border-background text-background' : 'border-border text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-border space-y-3 font-mono text-xs">
          <div className="p-2.5 bg-surface/50 border border-border">
            <p className="font-bold text-foreground truncate">{userName}</p>
            <p className="text-[10px] text-muted truncate">{userEmail}</p>
            <div className="mt-1.5 flex items-center justify-between text-[9px] uppercase tracking-wider">
              <span className="text-muted">Plan: {currentPlan}</span>
              <span className="text-emerald-500 font-bold">Node Live</span>
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
              {activeTab === 'streams' && 'Camera Feeds & Ingest'}
              {activeTab === 'pipelines' && 'Neural Perception Pipelines'}
              {activeTab === 'billing' && 'Subscription & Quota'}
              {activeTab === 'settings' && 'Controller Settings'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddStreamOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Connect Camera</span>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Workspace Content Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB: OVERVIEW                                          */}
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

              {/* Edge Node Hardware Monitor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-syne text-base font-bold uppercase text-foreground">
                    Connected Hardware Nodes
                  </h3>
                  <span className="font-mono text-xs text-muted">Perceptras Grid Topology</span>
                </div>

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
                    </div>
                  ))}
                </div>
              </div>

              {/* CLI & Token Box */}
              <div className="border border-border p-6 bg-surface space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-foreground" />
                    <h3 className="font-syne text-sm font-bold uppercase text-foreground">
                      Edge Agent Quick Connect
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
                        <span>Copy Agent Script</span>
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
          {/* TAB: CAMERA STREAMS                                    */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'streams' && (
            <div className="space-y-6 max-w-6xl">
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
          {/* TAB: PIPELINES                                         */}
          {/* ══════════════════════════════════════════════════════ */}
          {activeTab === 'pipelines' && (
            <div className="space-y-6 max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Perceptras Flow',
                    desc: 'Real-time multi-stream video ingest, zero-copy DMA memory buffers, and standard protocol normalization.',
                    status: 'Active (4 Streams)',
                    channels: 4,
                  },
                  {
                    name: 'Perceptras Accel',
                    desc: 'Hardware-compiled neural inference runtime with INT8/FP8 layer fusion and dynamic batching.',
                    status: 'Active (180 FPS)',
                    channels: 3,
                  },
                  {
                    name: 'Perceptras Zone',
                    desc: 'Multi-camera extrinsic auto-calibration, 3D metric coordinate tracking, and geofenced spatial alerts.',
                    status: 'Active (1 Node)',
                    channels: 1,
                  },
                  {
                    name: 'Perceptras Grid',
                    desc: 'Distributed cluster topology, automatic edge node failover, and gRPC/Kafka telemetry streams.',
                    status: 'Active (2 Nodes)',
                    channels: 2,
                  },
                ].map((pipe) => (
                  <div key={pipe.name} className="border border-border p-6 bg-surface space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-syne text-base font-bold uppercase text-foreground">
                        {pipe.name}
                      </h4>
                      <span className="text-emerald-500 font-mono text-[10px] font-bold uppercase">
                        {pipe.status}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-muted leading-relaxed">
                      {pipe.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB: BILLING & QUOTA                                   */}
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
                  <Link href="/contact?subject=Plan%20Upgrade%20Inquiry">
                    <Button variant="primary" size="sm">
                      Upgrade Stream Quota
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════ */}
          {/* TAB: SETTINGS & SECURITY                               */}
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
