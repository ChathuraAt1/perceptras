'use client';

// No icon imports needed

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
    ping: '0.6 ms',
    status: 'online',
    streamsAssigned: 18,
    egress: 'gRPC :50051 + Kafka Topic: perceptras.telemetry.v1',
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
    ping: '1.2 ms',
    status: 'online',
    streamsAssigned: 8,
    egress: 'WebSocket Live Bus :8080',
  },
  {
    id: 'node-gamma-03',
    name: 'Factory-Floor-Backup-Node',
    role: 'Hot-Standby Failover Unit',
    gpu: 'RTX 4090 (24GB VRAM)',
    gpuLoad: '4%',
    cpuLoad: '6%',
    vram: '1.2 / 24 GB',
    temp: '38°C',
    ping: '0.4 ms',
    status: 'standby',
    streamsAssigned: 0,
    egress: 'Standby Route (120ms Failover)',
  },
];

export default function GridDashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-syne text-lg font-bold uppercase text-foreground">
            Perceptras Grid // Distributed Cluster Topology
          </h3>
          <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
            Multi-node clustering with automatic node failover, load-balanced stream routing, and zero-loss telemetry egress buses.
          </p>
        </div>
        <div className="border border-border p-3 bg-surface/50 font-mono text-xs">
          <span className="text-muted text-[10px] uppercase">Failover Readiness</span>
          <p className="font-bold text-emerald-500">120ms Hot Standby Active</p>
        </div>
      </div>

      {/* Nodes List */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Clustered Hardware Nodes ({NODES.length})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NODES.map((node) => (
            <div key={node.id} className="border border-border p-6 bg-surface space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        node.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    <h4 className="font-syne text-base font-bold uppercase text-foreground">{node.name}</h4>
                  </div>
                </div>
                <p className="font-mono text-xs text-muted">{node.role}</p>
                <span className="inline-block font-mono text-[9px] uppercase border border-border px-2 py-0.5 text-foreground font-bold">
                  {node.gpu}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border font-mono text-xs">
                <div>
                  <span className="text-muted text-[9px] uppercase">GPU Load</span>
                  <p className="font-bold text-foreground">{node.gpuLoad}</p>
                </div>
                <div>
                  <span className="text-muted text-[9px] uppercase">VRAM</span>
                  <p className="font-bold text-foreground">{node.vram}</p>
                </div>
                <div>
                  <span className="text-muted text-[9px] uppercase">Temp</span>
                  <p className="font-bold text-foreground">{node.temp}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border font-mono text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted">Assigned Streams:</span>
                  <span className="font-bold text-foreground">{node.streamsAssigned}</span>
                </div>
                <div className="text-muted truncate">Egress: {node.egress}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
