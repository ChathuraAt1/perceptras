'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface StreamItem {
  id: string;
  name: string;
  url: string;
  protocol: 'RTSP' | 'GigE' | 'USB3' | 'MIPI';
  resolution: string;
  fps: number;
  pipeline: string;
  codec: string;
  status: 'active' | 'standby' | 'reconnecting';
  latency: string;
  bitrate: string;
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
    codec: 'H.265 (HEVC)',
    status: 'active',
    latency: '1.2ms',
    bitrate: '14.2 Mbps',
  },
  {
    id: 'stream_02',
    name: 'Assembly-Robot-AMR-01',
    url: 'gige://00:0f:31:02:e4:11',
    protocol: 'GigE',
    resolution: '1920x1080 (FHD)',
    fps: 60,
    pipeline: 'Perceptras Zone 3D',
    codec: 'Raw YUV422',
    status: 'active',
    latency: '0.8ms',
    bitrate: '124.0 Mbps',
  },
  {
    id: 'stream_03',
    name: 'Perimeter-East-Gate',
    url: 'rtsp://192.168.1.118:554/live/ch1',
    protocol: 'RTSP',
    resolution: '1920x1080 (FHD)',
    fps: 30,
    pipeline: 'Perceptras Flow',
    codec: 'H.264 (AVC)',
    status: 'active',
    latency: '1.4ms',
    bitrate: '6.8 Mbps',
  },
  {
    id: 'stream_04',
    name: 'Inspection-Macro-Sensor',
    url: 'usb3://dev/video4',
    protocol: 'USB3',
    resolution: '2560x1440 (2K)',
    fps: 90,
    pipeline: 'Perceptras Accel INT8',
    codec: 'MJPEG / Raw',
    status: 'active',
    latency: '0.6ms',
    bitrate: '88.4 Mbps',
  },
];

export default function FlowDashboardPage() {
  const [streams, setStreams] = useState<StreamItem[]>(INITIAL_STREAMS);
  const [selectedStream, setSelectedStream] = useState<StreamItem>(INITIAL_STREAMS[0]);
  const [isAddStreamOpen, setIsAddStreamOpen] = useState(false);
  const [newStreamName, setNewStreamName] = useState('');
  const [newStreamUrl, setNewStreamUrl] = useState('');
  const [newStreamProtocol, setNewStreamProtocol] = useState<'RTSP' | 'GigE' | 'USB3' | 'MIPI'>('RTSP');
  const [newStreamPipeline, setNewStreamPipeline] = useState('Perceptras Flow + Accel');

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
      codec: 'H.265',
      status: 'active',
      latency: '1.2ms',
      bitrate: '8.4 Mbps',
    };

    setStreams([newStream, ...streams]);
    setNewStreamName('');
    setNewStreamUrl('');
    setIsAddStreamOpen(false);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner & Metric Strip */}
      <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-syne text-lg font-bold uppercase text-foreground">
            Perceptras Flow // Video Ingest &amp; Normalization Engine
          </h3>
          <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
            Zero-copy hardware decoding for high-density RTSP, GigE Vision, USB3, and MIPI cameras directly into unified GPU memory without CPU memory copies.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 font-mono text-xs">
          <div className="border border-border p-3 bg-surface/50">
            <span className="text-muted text-[10px] uppercase">DMA Buffer Pool</span>
            <p className="font-bold text-foreground">1.2 / 8.0 GB (15%)</p>
          </div>
          <div className="border border-border p-3 bg-surface/50">
            <span className="text-muted text-[10px] uppercase">Packet Loss</span>
            <p className="font-bold text-emerald-500">0.00% (Lossless)</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddStreamOpen(true)}
            className="flex items-center gap-2 self-center"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Connect Camera</span>
          </Button>
        </div>
      </div>

      {/* Live Stream Visualizer Frame + Selected Stream HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 border border-border bg-surface p-1 relative">
          <div className="border-b border-border px-4 py-2.5 bg-surface flex items-center justify-between font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold uppercase text-foreground">
                LIVE INGEST // {selectedStream.name}
              </span>
            </div>
            <span className="text-muted">{selectedStream.resolution} @ {selectedStream.fps} FPS</span>
          </div>

          <div className="relative aspect-video bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden text-zinc-100 font-mono">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Top metadata tags */}
            <div className="relative z-10 flex justify-between items-start text-[10px]">
              <div className="bg-zinc-900/90 border border-zinc-700 px-2 py-1 space-y-0.5">
                <p className="text-zinc-400">DECODER: <span className="text-zinc-100 font-bold">NVDEC ZERO-COPY</span></p>
                <p className="text-zinc-400">LATENCY: <span className="text-emerald-400 font-bold">{selectedStream.latency}</span></p>
              </div>
              <div className="bg-zinc-900/90 border border-zinc-700 px-2 py-1 text-right space-y-0.5">
                <p className="text-zinc-400">BITRATE: <span className="text-zinc-100 font-bold">{selectedStream.bitrate}</span></p>
                <p className="text-zinc-400">CODEC: <span className="text-zinc-100 font-bold">{selectedStream.codec}</span></p>
              </div>
            </div>

            {/* Visual Bounding Box Simulation */}
            <div className="absolute top-[30%] left-[25%] w-[35%] h-[45%] border border-emerald-400 bg-emerald-500/10 pointer-events-none">
              <div className="absolute -top-5 left-0 bg-emerald-500 text-zinc-950 text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                RAW_TENSOR // DECODED
              </div>
            </div>

            {/* Bottom Status */}
            <div className="relative z-10 flex items-center justify-between text-[10px] bg-zinc-900/90 border border-zinc-700 px-3 py-1.5">
              <span>ENDPOINT: {selectedStream.url}</span>
              <span className="text-emerald-400 font-bold">PIPELINE: {selectedStream.pipeline}</span>
            </div>
          </div>
        </div>

        {/* Selected Stream Settings & Diagnostics */}
        <div className="lg:col-span-4 border border-border bg-surface p-6 space-y-4 font-mono text-xs">
          <h4 className="font-syne text-sm font-bold uppercase text-foreground">
            Feed Configuration
          </h4>

          <div className="space-y-3 pt-2 border-t border-border">
            <div className="flex justify-between">
              <span className="text-muted">Protocol:</span>
              <span className="font-bold text-foreground">{selectedStream.protocol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Resolution:</span>
              <span className="font-bold text-foreground">{selectedStream.resolution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Frame Rate:</span>
              <span className="font-bold text-foreground">{selectedStream.fps} FPS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Stream Codec:</span>
              <span className="font-bold text-foreground">{selectedStream.codec}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Ingest Latency:</span>
              <span className="font-bold text-emerald-500">{selectedStream.latency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Pipeline Assignment:</span>
              <span className="font-bold text-foreground truncate max-w-[140px]">{selectedStream.pipeline}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <Button variant="outline" size="sm" className="w-full" onClick={() => alert('Stream decoder restarted.')}>
              Restart Ingest Worker
            </Button>
          </div>
        </div>
      </div>

      {/* Stream Inventory Table */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Active Ingest Channels ({streams.length})
        </h4>

        <div className="border border-border bg-surface overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                <th className="py-3.5 px-4 font-semibold">Camera Feed</th>
                <th className="py-3.5 px-4 font-semibold">Protocol &amp; Codec</th>
                <th className="py-3.5 px-4 font-semibold">Resolution</th>
                <th className="py-3.5 px-4 font-semibold">Pipeline</th>
                <th className="py-3.5 px-4 font-semibold">Latency</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {streams.map((stream) => (
                <tr
                  key={stream.id}
                  onClick={() => setSelectedStream(stream)}
                  className={`hover:bg-foreground/5 transition-colors cursor-pointer ${
                    selectedStream.id === stream.id ? 'bg-foreground/[0.03] font-semibold' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-foreground">{stream.name}</div>
                    <div className="text-[10px] text-muted">{stream.url}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="border border-border px-1.5 py-0.5 text-[9px] font-bold">
                        {stream.protocol}
                      </span>
                      <span className="text-muted text-[10px]">{stream.codec}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-foreground">
                    {stream.resolution} @ {stream.fps}fps
                  </td>
                  <td className="py-3.5 px-4 text-foreground">
                    <span className="border border-border bg-surface px-2 py-0.5 text-[10px]">
                      {stream.pipeline}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-500 font-bold">{stream.latency}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStream(stream);
                      }}
                      className="text-foreground underline text-[10px] uppercase font-bold"
                    >
                      Inspect HUD
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Camera Stream */}
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
