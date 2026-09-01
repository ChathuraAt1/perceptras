'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

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

export default function AccelDashboardPage() {
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchResults, setBenchResults] = useState<{
    p50: string;
    p99: string;
    fps: string;
  } | null>(null);

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

  return (
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

        <div className="flex items-center gap-4">
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

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunBenchmark}
            disabled={isBenchmarking}
            className="flex items-center gap-2"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{isBenchmarking ? 'Profiling Graph...' : 'Run Benchmark'}</span>
          </Button>
        </div>
      </div>

      {/* Models List */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Compiled Execution Graphs
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MODELS.map((model) => (
            <div
              key={model.id}
              className="border border-border p-6 bg-surface space-y-4 flex flex-col justify-between"
            >
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
  );
}
