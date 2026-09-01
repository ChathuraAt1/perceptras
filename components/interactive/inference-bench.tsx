'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Zap, Gauge, HardDrive } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Model = 'yolov10' | 'peoplenet' | 'dinov2';
type Precision = 'FP32' | 'FP16' | 'INT8';
type BatchSize = 1 | 8 | 32 | 64;

interface BenchResult {
  fps: number;
  latency: number;
  vram: number;
}

type BenchEntry = { baseline: BenchResult; tensorrt: BenchResult };

/* ------------------------------------------------------------------ */
/*  Benchmark data (realistic approximations)                          */
/* ------------------------------------------------------------------ */

const DATA: Record<Model, Record<Precision, Record<BatchSize, BenchEntry>>> = {
  yolov10: {
    FP32: {
      1:  { baseline: { fps: 45,  latency: 22.2,  vram: 4.2  }, tensorrt: { fps: 120,   latency: 8.3,  vram: 2.1 } },
      8:  { baseline: { fps: 180, latency: 44.4,  vram: 5.8  }, tensorrt: { fps: 580,   latency: 13.8, vram: 3.2 } },
      32: { baseline: { fps: 420, latency: 76.2,  vram: 9.4  }, tensorrt: { fps: 1640,  latency: 19.5, vram: 5.1 } },
      64: { baseline: { fps: 560, latency: 114.3, vram: 14.2 }, tensorrt: { fps: 2880,  latency: 22.2, vram: 7.8 } },
    },
    FP16: {
      1:  { baseline: { fps: 45,  latency: 22.2,  vram: 4.2  }, tensorrt: { fps: 340,   latency: 2.9,  vram: 1.2 } },
      8:  { baseline: { fps: 180, latency: 44.4,  vram: 5.8  }, tensorrt: { fps: 1420,  latency: 5.6,  vram: 2.1 } },
      32: { baseline: { fps: 420, latency: 76.2,  vram: 9.4  }, tensorrt: { fps: 4200,  latency: 7.6,  vram: 3.4 } },
      64: { baseline: { fps: 560, latency: 114.3, vram: 14.2 }, tensorrt: { fps: 6800,  latency: 9.4,  vram: 4.8 } },
    },
    INT8: {
      1:  { baseline: { fps: 45,  latency: 22.2,  vram: 4.2  }, tensorrt: { fps: 680,   latency: 1.5,  vram: 0.8 } },
      8:  { baseline: { fps: 180, latency: 44.4,  vram: 5.8  }, tensorrt: { fps: 2800,  latency: 2.9,  vram: 1.4 } },
      32: { baseline: { fps: 420, latency: 76.2,  vram: 9.4  }, tensorrt: { fps: 8400,  latency: 3.8,  vram: 2.2 } },
      64: { baseline: { fps: 560, latency: 114.3, vram: 14.2 }, tensorrt: { fps: 13200, latency: 4.8,  vram: 3.2 } },
    },
  },
  peoplenet: {
    FP32: {
      1:  { baseline: { fps: 62,  latency: 16.1, vram: 3.1  }, tensorrt: { fps: 180,   latency: 5.6,  vram: 1.6 } },
      8:  { baseline: { fps: 280, latency: 28.6, vram: 4.4  }, tensorrt: { fps: 840,   latency: 9.5,  vram: 2.4 } },
      32: { baseline: { fps: 680, latency: 47.1, vram: 7.2  }, tensorrt: { fps: 2400,  latency: 13.3, vram: 3.8 } },
      64: { baseline: { fps: 880, latency: 72.7, vram: 11.4 }, tensorrt: { fps: 4200,  latency: 15.2, vram: 5.6 } },
    },
    FP16: {
      1:  { baseline: { fps: 62,  latency: 16.1, vram: 3.1  }, tensorrt: { fps: 480,   latency: 2.1,  vram: 0.9 } },
      8:  { baseline: { fps: 280, latency: 28.6, vram: 4.4  }, tensorrt: { fps: 2100,  latency: 3.8,  vram: 1.5 } },
      32: { baseline: { fps: 680, latency: 47.1, vram: 7.2  }, tensorrt: { fps: 6200,  latency: 5.2,  vram: 2.4 } },
      64: { baseline: { fps: 880, latency: 72.7, vram: 11.4 }, tensorrt: { fps: 9800,  latency: 6.5,  vram: 3.4 } },
    },
    INT8: {
      1:  { baseline: { fps: 62,  latency: 16.1, vram: 3.1  }, tensorrt: { fps: 920,   latency: 1.1,  vram: 0.6 } },
      8:  { baseline: { fps: 280, latency: 28.6, vram: 4.4  }, tensorrt: { fps: 4200,  latency: 1.9,  vram: 1.0 } },
      32: { baseline: { fps: 680, latency: 47.1, vram: 7.2  }, tensorrt: { fps: 12400, latency: 2.6,  vram: 1.6 } },
      64: { baseline: { fps: 880, latency: 72.7, vram: 11.4 }, tensorrt: { fps: 19200, latency: 3.3,  vram: 2.2 } },
    },
  },
  dinov2: {
    FP32: {
      1:  { baseline: { fps: 18,  latency: 55.6,  vram: 8.4  }, tensorrt: { fps: 52,   latency: 19.2, vram: 4.8  } },
      8:  { baseline: { fps: 72,  latency: 111.1, vram: 12.6 }, tensorrt: { fps: 240,  latency: 33.3, vram: 7.2  } },
      32: { baseline: { fps: 160, latency: 200.0, vram: 22.4 }, tensorrt: { fps: 680,  latency: 47.1, vram: 11.8 } },
      64: { baseline: { fps: 210, latency: 304.8, vram: 34.2 }, tensorrt: { fps: 1120, latency: 57.1, vram: 16.4 } },
    },
    FP16: {
      1:  { baseline: { fps: 18,  latency: 55.6,  vram: 8.4  }, tensorrt: { fps: 140,  latency: 7.1,  vram: 2.6 } },
      8:  { baseline: { fps: 72,  latency: 111.1, vram: 12.6 }, tensorrt: { fps: 620,  latency: 12.9, vram: 4.1 } },
      32: { baseline: { fps: 160, latency: 200.0, vram: 22.4 }, tensorrt: { fps: 1800, latency: 17.8, vram: 6.8 } },
      64: { baseline: { fps: 210, latency: 304.8, vram: 34.2 }, tensorrt: { fps: 2900, latency: 22.1, vram: 9.2 } },
    },
    INT8: {
      1:  { baseline: { fps: 18,  latency: 55.6,  vram: 8.4  }, tensorrt: { fps: 280,  latency: 3.6,  vram: 1.8 } },
      8:  { baseline: { fps: 72,  latency: 111.1, vram: 12.6 }, tensorrt: { fps: 1240, latency: 6.5,  vram: 2.8 } },
      32: { baseline: { fps: 160, latency: 200.0, vram: 22.4 }, tensorrt: { fps: 3600, latency: 8.9,  vram: 4.4 } },
      64: { baseline: { fps: 210, latency: 304.8, vram: 34.2 }, tensorrt: { fps: 5800, latency: 11.0, vram: 6.0 } },
    },
  },
};

const MODEL_LABELS: Record<Model, string> = {
  yolov10: 'YOLOv10 / RT-DETR',
  peoplenet: 'PersonNet v2.6',
  dinov2: 'DINOv2-ViT-L',
};

const BATCH_SIZES: BatchSize[] = [1, 8, 32, 64];
const PRECISIONS: Precision[] = ['FP32', 'FP16', 'INT8'];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AccelBench() {
  const [model, setModel] = useState<Model>('yolov10');
  const [precision, setPrecision] = useState<Precision>('INT8');
  const [batchSize, setBatchSize] = useState<BatchSize>(8);

  const result = useMemo(() => DATA[model][precision][batchSize], [model, precision, batchSize]);
  const speedup = useMemo(
    () => (result.tensorrt.fps / result.baseline.fps).toFixed(1),
    [result],
  );
  const maxFps = useMemo(
    () => Math.max(result.baseline.fps, result.tensorrt.fps),
    [result],
  );

  /* ---------------------------------------------------------------- */
  return (
    <div className="border border-border">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-syne text-sm font-semibold uppercase tracking-wide">
            Perceptras Accel Benchmark
          </p>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Spatial Inference Optimization & Performance Profiler
          </p>
        </div>
        <span className="font-mono text-sm text-foreground font-bold">
          {speedup}× Faster
        </span>
      </div>

      {/* ── Selectors ──────────────────────────────────────────────── */}
      <div className="border-b border-border px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* model */}
        <div>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
            Architecture
          </p>
          <div className="flex flex-col gap-1">
            {(Object.keys(MODEL_LABELS) as Model[]).map((m) => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={cn(
                  'text-left font-mono text-xs px-3 py-1.5 border transition-colors cursor-pointer',
                  model === m
                    ? 'border-foreground bg-foreground text-surface'
                    : 'border-border text-muted hover:text-foreground',
                )}
              >
                {MODEL_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        {/* batch size */}
        <div>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
            Batch Size
          </p>
          <div className="flex gap-1">
            {BATCH_SIZES.map((b) => (
              <button
                key={b}
                onClick={() => setBatchSize(b)}
                className={cn(
                  'font-mono text-xs px-3 py-1.5 border transition-colors cursor-pointer',
                  batchSize === b
                    ? 'border-foreground bg-foreground text-surface'
                    : 'border-border text-muted hover:text-foreground',
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* precision */}
        <div>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">
            Precision
          </p>
          <div className="flex gap-1">
            {PRECISIONS.map((p) => (
              <button
                key={p}
                onClick={() => setPrecision(p)}
                className={cn(
                  'font-mono text-xs px-3 py-1.5 border transition-colors cursor-pointer',
                  precision === p
                    ? 'border-foreground bg-foreground text-surface'
                    : 'border-border text-muted hover:text-foreground',
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bar chart ──────────────────────────────────────────────── */}
      <div className="px-4 py-6 space-y-5">
        {/* baseline */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
              PyTorch / ONNX Baseline
            </span>
            <span className="font-mono text-xs text-muted">
              {result.baseline.fps.toLocaleString()} FPS
            </span>
          </div>
          <div className="h-7 bg-border/30 relative overflow-hidden">
            <div
              className="h-full bg-muted/40 transition-all duration-500 ease-out"
              style={{ width: `${(result.baseline.fps / maxFps) * 100}%` }}
            />
          </div>
        </div>

        {/* tensorrt */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-foreground font-bold uppercase tracking-widest">
              Accel Engine ({precision})
            </span>
            <span className="font-mono text-xs text-foreground font-bold">
              {result.tensorrt.fps.toLocaleString()} FPS
            </span>
          </div>
          <div className="h-7 bg-border/30 relative overflow-hidden">
            <div
              className="h-full bg-foreground transition-all duration-500 ease-out"
              style={{ width: `${(result.tensorrt.fps / maxFps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Telemetry strip ────────────────────────────────────────── */}
      <div className="border-t border-border grid grid-cols-3">
        {[
          {
            icon: Zap,
            label: 'Throughput',
            baseline: `${result.baseline.fps.toLocaleString()} FPS`,
            optimized: `${result.tensorrt.fps.toLocaleString()} FPS`,
          },
          {
            icon: Gauge,
            label: 'Latency',
            baseline: `${result.baseline.latency} ms`,
            optimized: `${result.tensorrt.latency} ms`,
          },
          {
            icon: HardDrive,
            label: 'VRAM',
            baseline: `${result.baseline.vram} GB`,
            optimized: `${result.tensorrt.vram} GB`,
          },
        ].map((m, i) => (
          <div
            key={m.label}
            className={cn('px-4 py-4', i > 0 && 'border-l border-border')}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <m.icon className="h-3 w-3 text-muted stroke-[1.5]" />
              <p className="font-mono text-[9px] text-muted uppercase tracking-widest">
                {m.label}
              </p>
            </div>
            <p className="font-mono text-[10px] text-muted line-through decoration-muted/50">
              {m.baseline}
            </p>
            <p className="font-mono text-sm font-bold text-foreground mt-0.5">
              {m.optimized}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const InferenceBench = AccelBench;
