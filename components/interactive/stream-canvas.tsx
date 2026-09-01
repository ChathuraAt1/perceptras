'use client';

import { useState, useMemo } from 'react';
import { Camera, Monitor, Cpu, Scan, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Pipeline node definitions                                          */
/* ------------------------------------------------------------------ */

interface PipelineNode {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof Camera;
  config: Record<string, string>;
}

const NODES: PipelineNode[] = [
  {
    id: 'input',
    label: 'INPUT',
    sublabel: 'RTSP Sources',
    icon: Camera,
    config: {
      protocol: 'RTSP/RTP',
      codec: 'H.265/HEVC',
      transport: 'UDP Multicast',
      auth: 'DIGEST',
    },
  },
  {
    id: 'nvdec',
    label: 'NVDEC',
    sublabel: 'HW Decoder',
    icon: Monitor,
    config: {
      'nvbuf-memory-type': 'NVBUF_MEM_CUDA_UNIFIED',
      'gpu-id': '0',
      'cudadec-memtype': 'unified',
      'num-surfaces': '4',
    },
  },
  {
    id: 'infer',
    label: 'INFER',
    sublabel: 'TensorRT Engine',
    icon: Cpu,
    config: {
      'model-engine': 'PeopleNet v2.6',
      precision: 'INT8',
      'batch-size': 'dynamic',
      'workspace-size': '2048 MB',
      'dla-core': '-1 (GPU)',
    },
  },
  {
    id: 'tracker',
    label: 'TRACKER',
    sublabel: 'NvDCF',
    icon: Scan,
    config: {
      'tracker-type': 'NvDCF',
      'lib-file': 'libnvds_nvdcf.so',
      'max-shadow-trail': '50',
      'batch-process': '1',
    },
  },
  {
    id: 'output',
    label: 'META OUT',
    sublabel: 'Structured Data',
    icon: Database,
    config: {
      'output-format': 'NvDsAnalytics',
      'msg-broker': 'Kafka',
      topic: 'perception.events',
      'proto-lib': 'libnvds_kafka_proto.so',
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StreamCanvas() {
  const [channels, setChannels] = useState(16);
  const [resolution, setResolution] = useState<'1080p' | '4K'>('1080p');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  /* derived telemetry ------------------------------------------------ */
  const metrics = useMemo(() => {
    const resFactor = resolution === '4K' ? 0.42 : 1;
    const totalFps = Math.round(channels * 30 * resFactor);
    const vram = (
      2.1 +
      channels * 0.18 * (resolution === '4K' ? 2.2 : 1)
    ).toFixed(1);
    const latency = (
      0.8 +
      (channels / 128) * 2.4 +
      (resolution === '4K' ? 0.6 : 0)
    ).toFixed(1);
    const gpuUtil = Math.min(
      98,
      Math.round(12 + (channels / 128) * 80 * (resolution === '4K' ? 1.3 : 1)),
    );
    return { totalFps: totalFps.toLocaleString(), vram, latency, gpuUtil };
  }, [channels, resolution]);

  const selected = NODES.find((n) => n.id === selectedNode);

  /* ---------------------------------------------------------------- */
  return (
    <div className="border border-border">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-syne text-sm font-semibold uppercase tracking-wide">
            DeepStream Pipeline
          </p>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Multi-Stream Decode → Infer → Track → Output
          </p>
        </div>
        <span className="font-mono text-[10px] text-muted border border-border px-2 py-0.5">
          [ INTERACTIVE ]
        </span>
      </div>

      {/* ── Pipeline visualisation ─────────────────────────────────── */}
      <div className="relative px-4 py-8 overflow-x-auto">
        <style>{`
          @keyframes ds-pulse {
            0%   { left: 0%;  opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { left: calc(100% - 6px); opacity: 0; }
          }
        `}</style>

        <div className="flex items-center gap-0 min-w-[640px]">
          {NODES.map((node, i) => (
            <div key={node.id} className="flex items-center flex-1">
              {/* node box */}
              <button
                onClick={() =>
                  setSelectedNode(selectedNode === node.id ? null : node.id)
                }
                className={cn(
                  'relative flex flex-col items-center gap-2 px-3 py-4 border transition-colors w-full cursor-pointer',
                  selectedNode === node.id
                    ? 'border-foreground bg-foreground/5'
                    : 'border-border hover:border-foreground/40',
                )}
              >
                <node.icon className="h-5 w-5 text-foreground stroke-[1.5]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                  {node.label}
                </span>
                <span className="font-mono text-[8px] text-muted uppercase tracking-widest">
                  {node.sublabel}
                </span>
              </button>

              {/* connector with animated pulse */}
              {i < NODES.length - 1 && (
                <div className="relative w-8 md:w-14 h-px bg-border mx-0 shrink-0">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground"
                    style={{
                      animation: `ds-pulse ${1.5 + i * 0.3}s linear infinite ${i * 0.4}s`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Node configuration detail ──────────────────────────────── */}
      {selected && (
        <div className="border-t border-border px-4 py-4">
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
            {selected.label} Configuration
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(selected.config).map(([key, value]) => (
              <div key={key} className="border-l border-border pl-3">
                <p className="font-mono text-[9px] text-muted uppercase">{key}</p>
                <p className="font-mono text-xs text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Controls ───────────────────────────────────────────────── */}
      <div className="border-t border-border px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* channel slider */}
        <div>
          <label className="font-mono text-[10px] text-muted uppercase tracking-widest block mb-2">
            Active Camera Channels:{' '}
            <span className="text-foreground font-bold">{channels}</span>
          </label>
          <input
            type="range"
            min={1}
            max={128}
            value={channels}
            onChange={(e) => setChannels(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="flex justify-between font-mono text-[9px] text-muted mt-1">
            <span>1</span>
            <span>128</span>
          </div>
        </div>

        {/* resolution toggle */}
        <div>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
            Frame Resolution
          </p>
          <div className="flex gap-2">
            {(['1080p', '4K'] as const).map((res) => (
              <button
                key={res}
                onClick={() => setResolution(res)}
                className={cn(
                  'font-mono text-xs px-4 py-1.5 border transition-colors cursor-pointer',
                  resolution === res
                    ? 'border-foreground bg-foreground text-surface'
                    : 'border-border text-muted hover:text-foreground',
                )}
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Live metrics strip ─────────────────────────────────────── */}
      <div className="border-t border-border grid grid-cols-2 md:grid-cols-4">
        {[
          { label: 'Total FPS', value: metrics.totalFps },
          { label: 'GPU VRAM', value: `${metrics.vram} GB` },
          { label: 'Latency', value: `${metrics.latency} ms/f` },
          { label: 'GPU Util', value: `${metrics.gpuUtil}%` },
        ].map((m, i) => (
          <div
            key={m.label}
            className={cn(
              'px-4 py-3',
              i > 0 && 'border-l border-border',
            )}
          >
            <p className="font-mono text-[9px] text-muted uppercase tracking-widest">
              {m.label}
            </p>
            <p className="font-mono text-lg md:text-xl font-bold text-foreground">
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
