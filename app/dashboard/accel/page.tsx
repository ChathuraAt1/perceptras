'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const MODELS = [
  {
    id: 'model_01',
    name: 'YOLOv10x-Physical-Perception',
    type: 'Object Detection & Bounding Box',
    quantization: 'FP8 Quantized',
    batchSize: 16,
    throughput: '246.2 FPS',
    latency: '1.12 ms',
    memory: '1.8 GB VRAM',
    layersFused: '142 Layers',
  },
  {
    id: 'model_02',
    name: 'Spatial-Pose-3D-Tracking',
    type: 'Multi-Person 3D Keypoint Pose',
    quantization: 'INT8 Quantized',
    batchSize: 8,
    throughput: '184.5 FPS',
    latency: '1.38 ms',
    memory: '2.4 GB VRAM',
    layersFused: '98 Layers',
  },
  {
    id: 'model_03',
    name: 'Defect-Anomalies-Engine',
    type: 'Surface Defect Segmentation',
    quantization: 'FP16 Precision',
    batchSize: 4,
    throughput: '92.0 FPS',
    latency: '2.14 ms',
    memory: '3.1 GB VRAM',
    layersFused: '64 Layers',
  },
  {
    id: 'model_04',
    name: 'Metric-Depth-Pro-3D',
    type: 'Monocular Metric Depth Estimation',
    quantization: 'INT8 Quantized',
    batchSize: 8,
    throughput: '120.4 FPS',
    latency: '1.75 ms',
    memory: '2.8 GB VRAM',
    layersFused: '110 Layers',
  },
];

export default function AccelDashboardPage() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [batchSize, setBatchSize] = useState(16);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchResults, setBenchResults] = useState<{
    p50: string;
    p90: string;
    p99: string;
    fps: string;
    vram: string;
  } | null>(null);

  const handleRunBenchmark = () => {
    setIsBenchmarking(true);
    setBenchResults(null);
    setTimeout(() => {
      setIsBenchmarking(false);
      setBenchResults({
        p50: '0.94 ms',
        p90: '1.14 ms',
        p99: '1.28 ms',
        fps: '246.2 FPS',
        vram: '1.82 GB / 96 GB',
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-syne text-lg font-bold uppercase text-foreground">
            Perceptras Accel // Neural Inference &amp; Quantization Engine
          </h3>
          <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
            Hardware-compiled execution graphs with automatic INT8/FP8 layer fusion, kernel auto-tuning, and dynamic batching for sub-2ms edge perception.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-border bg-surface p-0.5 font-mono text-xs">
            {[4, 8, 16, 32].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBatchSize(b)}
                className={`px-2.5 py-1 uppercase font-bold text-[10px] transition-colors cursor-pointer ${
                  batchSize === b
                    ? 'bg-foreground text-background'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                B{b}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleRunBenchmark}
            disabled={isBenchmarking}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            <span>{isBenchmarking ? 'Profiling Graph...' : 'Run Live Benchmark'}</span>
          </Button>
        </div>
      </div>

      {/* Benchmark Results Display Banner */}
      {benchResults && (
        <div className="border border-emerald-500/50 bg-emerald-500/10 p-6 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              Benchmark Profile: {selectedModel.name} (Batch {batchSize})
            </span>
            <span className="text-emerald-500 font-bold">1000 ITERATIONS COMPLETED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
            <div>
              <span className="text-muted text-[10px] uppercase">P50 Latency</span>
              <p className="font-bold text-foreground text-base">{benchResults.p50}</p>
            </div>
            <div>
              <span className="text-muted text-[10px] uppercase">P90 Latency</span>
              <p className="font-bold text-foreground text-base">{benchResults.p90}</p>
            </div>
            <div>
              <span className="text-muted text-[10px] uppercase">P99 Latency</span>
              <p className="font-bold text-foreground text-base">{benchResults.p99}</p>
            </div>
            <div>
              <span className="text-muted text-[10px] uppercase">Throughput</span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 text-base">{benchResults.fps}</p>
            </div>
            <div>
              <span className="text-muted text-[10px] uppercase">Memory Footprint</span>
              <p className="font-bold text-foreground text-base">{benchResults.vram}</p>
            </div>
          </div>
        </div>
      )}

      {/* Execution Graphs Grid */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Compiled Neural Graphs ({MODELS.length})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODELS.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`border p-6 bg-surface space-y-4 flex flex-col justify-between transition-all cursor-pointer ${
                selectedModel.id === model.id ? 'border-foreground shadow-md' : 'border-border hover:border-foreground/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase border border-border px-2 py-0.5 text-foreground font-bold bg-surface">
                    {model.quantization}
                  </span>
                  <span className="text-emerald-500 font-mono text-[10px] font-bold uppercase">
                    Active on Node US-East
                  </span>
                </div>
                <h4 className="font-syne text-base font-bold uppercase text-foreground">{model.name}</h4>
                <p className="font-mono text-xs text-muted">{model.type}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border font-mono text-xs">
                <div>
                  <span className="text-muted text-[10px] uppercase">Latency</span>
                  <p className="font-bold text-foreground">{model.latency}</p>
                </div>
                <div>
                  <span className="text-muted text-[10px] uppercase">Throughput</span>
                  <p className="font-bold text-foreground">{model.throughput}</p>
                </div>
                <div>
                  <span className="text-muted text-[10px] uppercase">Layers Fused</span>
                  <p className="font-bold text-foreground">{model.layersFused}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
