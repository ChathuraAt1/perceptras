'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Server } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GpuModel {
  name: string;
  vram: string;
  utilization: number;
}

interface ClusterNode {
  id: string;
  name: string;
  gpu: string;
  status: 'online' | 'busy' | 'scaling';
  models: GpuModel[];
}

/* ------------------------------------------------------------------ */
/*  Node generation (deterministic from rps)                           */
/* ------------------------------------------------------------------ */

function generateNodes(rps: number): ClusterNode[] {
  const lf = rps / 50000; // load factor 0‑1

  return [
    {
      id: 'alpha',
      name: 'Node Alpha',
      gpu: 'A100 80 GB',
      status: lf > 0.8 ? 'scaling' : lf > 0.4 ? 'busy' : 'online',
      models: [
        { name: 'Vision Transformer',  vram: `${(12.4 + lf * 8).toFixed(1)} GB`,   utilization: Math.min(99, Math.round(20 + lf * 75)) },
        { name: 'Spatial Detector',     vram: `${(8.2 + lf * 4).toFixed(1)} GB`,    utilization: Math.min(95, Math.round(15 + lf * 65)) },
      ],
    },
    {
      id: 'beta',
      name: 'Node Beta',
      gpu: 'A100 80 GB',
      status: lf > 0.7 ? 'scaling' : lf > 0.3 ? 'busy' : 'online',
      models: [
        { name: 'Feature Embedding',   vram: `${(6.8 + lf * 5).toFixed(1)} GB`,    utilization: Math.min(97, Math.round(18 + lf * 70)) },
        { name: 'NLP Encoder',          vram: `${(4.2 + lf * 3).toFixed(1)} GB`,    utilization: Math.min(92, Math.round(10 + lf * 60)) },
      ],
    },
    {
      id: 'gamma',
      name: 'Node Gamma',
      gpu: 'H100 80 GB',
      status: lf > 0.9 ? 'scaling' : lf > 0.5 ? 'busy' : 'online',
      models: [
        { name: 'Vision Transformer',  vram: `${(14.1 + lf * 10).toFixed(1)} GB`,  utilization: Math.min(98, Math.round(22 + lf * 72)) },
        { name: 'Spatial Detector',     vram: `${(9.6 + lf * 6).toFixed(1)} GB`,    utilization: Math.min(94, Math.round(16 + lf * 68)) },
        { name: 'Ensemble Pipeline',    vram: `${(3.4 + lf * 2).toFixed(1)} GB`,    utilization: Math.min(90, Math.round(8 + lf * 55)) },
      ],
    },
    {
      id: 'delta',
      name: 'Node Delta',
      gpu: 'H100 80 GB',
      status: lf > 0.85 ? 'scaling' : lf > 0.35 ? 'busy' : 'online',
      models: [
        { name: 'Feature Embedding',   vram: `${(7.2 + lf * 5.5).toFixed(1)} GB`,  utilization: Math.min(96, Math.round(14 + lf * 72)) },
        { name: 'OCR Engine',           vram: `${(2.8 + lf * 1.5).toFixed(1)} GB`,  utilization: Math.min(88, Math.round(12 + lf * 58)) },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Log generation                                                     */
/* ------------------------------------------------------------------ */

const LOG_TEMPLATES = [
  'gRPC  INFER    model={model}  batch={batch}  latency={lat}ms  status=OK',
  'HTTP  HEALTH   node={node}  gpu_util={util}%  vram_free={vram}GB',
  'gRPC  INFER    model={model}  batch={batch}  latency={lat}ms  status=OK',
  'gRPC  BATCH    queue_depth={queue}  dynamic_batch={batch}  timeout=50ms',
  'HTTP  METRICS  node={node}  req_count={count}  p99_lat={lat}ms',
  'gRPC  INFER    model={model}  batch={batch}  latency={lat}ms  status=OK',
];

const MODEL_IDS = [
  'vision-xformer',
  'spatial-det-v3',
  'feat-embed',
  'nlp-enc',
  'ensemble-pipe',
  'ocr-engine',
];
const NODE_IDS = ['alpha', 'beta', 'gamma', 'delta'];

function generateLog(rps: number): string {
  const now = new Date();
  const ts = [
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join(':') + '.' + String(now.getMilliseconds()).padStart(3, '0');

  const lf = rps / 50000;
  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const line = pick(LOG_TEMPLATES)
    .replace('{model}', pick(MODEL_IDS))
    .replace('{node}', pick(NODE_IDS))
    .replace('{batch}', String(pick([1, 4, 8, 16, 32])))
    .replace('{lat}', (0.5 + lf * 8 + Math.random() * 3).toFixed(1))
    .replace('{util}', String(Math.round(20 + lf * 70 + Math.random() * 10)))
    .replace('{vram}', (40 - lf * 30 + Math.random() * 10).toFixed(1))
    .replace('{queue}', String(Math.round(lf * 200 + Math.random() * 50)))
    .replace('{count}', String(Math.round(rps * (0.8 + Math.random() * 0.4))))
    .replace('{lat}', (1 + lf * 12 + Math.random() * 4).toFixed(1));

  return `[${ts}] ${line}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const STATUS_BADGE: Record<string, string> = {
  online: 'ONLINE',
  busy: 'BUSY',
  scaling: 'SCALING',
};

export function GridMatrix() {
  const [rps, setRps] = useState(5000);
  const [logs, setLogs] = useState<string[]>(() =>
    Array.from({ length: 8 }, () => generateLog(5000)),
  );
  const logRef = useRef<HTMLDivElement>(null);

  const nodes = useMemo(() => generateNodes(rps), [rps]);

  /* streaming log feed ----------------------------------------------- */
  const appendLog = useCallback(() => {
    setLogs((prev) => [...prev.slice(-50), generateLog(rps)]);
  }, [rps]);

  useEffect(() => {
    const interval = Math.max(180, 2000 - (rps / 50000) * 1800);
    const id = setInterval(appendLog, interval);
    return () => clearInterval(id);
  }, [appendLog, rps]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [logs]);

  /* ---------------------------------------------------------------- */
  return (
    <div className="border border-border">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-syne text-sm font-semibold uppercase tracking-wide">
            Perceptras Grid
          </p>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Multi-Model Inference Cluster Orchestrator
          </p>
        </div>
        <span className="font-mono text-sm text-foreground font-bold">
          {(rps / 1000).toFixed(1)}K req/s
        </span>
      </div>

      {/* ── RPS slider ─────────────────────────────────────────────── */}
      <div className="border-b border-border px-4 py-4">
        <label className="font-mono text-[10px] text-muted uppercase tracking-widest block mb-2">
          Concurrent Requests / Sec:{' '}
          <span className="text-foreground font-bold">
            {rps.toLocaleString()}
          </span>
        </label>
        <input
          type="range"
          min={1000}
          max={50000}
          step={1000}
          value={rps}
          onChange={(e) => setRps(Number(e.target.value))}
          className="w-full accent-foreground"
        />
        <div className="flex justify-between font-mono text-[9px] text-muted mt-1">
          <span>1,000</span>
          <span>50,000</span>
        </div>
      </div>

      {/* ── Node grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className={cn(
              'px-4 py-4',
              i % 2 === 0 && 'md:border-r border-border',
              i < 2 && 'border-b border-border md:border-b',
            )}
          >
            {/* node header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
                <span className="font-mono text-xs font-bold uppercase">
                  {node.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-muted">
                  {node.gpu}
                </span>
                <span className="font-mono text-[9px] uppercase text-foreground">
                  [{STATUS_BADGE[node.status]}]
                </span>
              </div>
            </div>

            {/* model allocation */}
            <div className="space-y-2.5">
              {node.models.map((model) => (
                <div key={model.name} className="border-l border-border pl-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-foreground">
                      {model.name}
                    </span>
                    <span className="font-mono text-[9px] text-muted">
                      {model.vram}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-border/40 overflow-hidden">
                      <div
                        className="h-full bg-foreground transition-all duration-700 ease-out"
                        style={{ width: `${model.utilization}%` }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-muted w-8 text-right">
                      {model.utilization}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Terminal log feed ──────────────────────────────────────── */}
      <div className="px-4 py-2 border-b border-border">
        <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
          Request Log — gRPC / HTTP
        </p>
      </div>
      <div
        ref={logRef}
        className="h-44 overflow-y-auto overflow-x-hidden bg-surface px-4 py-2"
      >
        {logs.map((log, i) => (
          <p
            key={i}
            className="font-mono text-[10px] text-muted leading-relaxed whitespace-pre truncate"
          >
            {log}
          </p>
        ))}
      </div>
    </div>
  );
}

export const TritonNodeMatrix = GridMatrix;
