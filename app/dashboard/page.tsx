'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Video,
  Zap,
  Compass,
  Network,
  Terminal,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const apiKey = 'pct_live_9f8a3c42e17b80a9d45e12f6c03';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-border p-5 bg-surface">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
            Active Streams
          </p>
          <div className="flex items-baseline justify-between">
            <span className="font-syne text-3xl font-bold text-foreground">
              4 <span className="font-mono text-sm text-muted">/ 64</span>
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
            Perception Engine Workspaces
          </h3>
          <span className="font-mono text-xs text-muted">Direct module controls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { href: '/dashboard/flow', name: 'Flow // Ingest', desc: '4 Active Ingest Feeds', icon: Video },
            { href: '/dashboard/accel', name: 'Accel // Inference', desc: 'INT8/FP8 Quantized', icon: Zap },
            { href: '/dashboard/zone', name: 'Zone // 3D Spatial', desc: '3 Active Geofences', icon: Compass },
            { href: '/dashboard/grid', name: 'Grid // Topology', desc: '2 Clustered Nodes', icon: Network },
          ].map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="border border-border p-5 bg-surface hover:border-foreground transition-colors text-left space-y-2 group block"
            >
              <div className="flex items-center justify-between">
                <mod.icon className="h-5 w-5 text-foreground" />
                <ArrowRight className="h-3.5 w-3.5 text-muted group-hover:text-foreground transition-colors" />
              </div>
              <h4 className="font-syne text-sm font-bold uppercase text-foreground">{mod.name}</h4>
              <p className="font-mono text-xs text-muted">{mod.desc}</p>
            </Link>
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
        <p className="font-mono text-xs text-muted">
          Execute this on any Jetson, IGX, or Linux x86 edge computer to auto-register it to your cluster.
        </p>
      </div>
    </div>
  );
}
