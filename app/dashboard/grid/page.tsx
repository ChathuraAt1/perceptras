'use client';

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

export default function GridDashboardPage() {
  return (
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
  );
}
