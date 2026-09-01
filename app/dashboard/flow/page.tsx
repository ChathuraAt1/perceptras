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

export default function FlowDashboardPage() {
  const [streams, setStreams] = useState<StreamItem[]>(INITIAL_STREAMS);
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
      status: 'active',
      latency: '1.2ms',
    };

    setStreams([newStream, ...streams]);
    setNewStreamName('');
    setNewStreamUrl('');
    setIsAddStreamOpen(false);
  };

  return (
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
