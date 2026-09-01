'use client';

import { CheckCircle2 } from 'lucide-react';

const CALIBRATIONS = [
  { pair: 'CAM_01 ↔ CAM_02', baseline: '4.20m', reprojError: '0.018 px', status: 'Locked' },
  { pair: 'CAM_02 ↔ CAM_03', baseline: '6.85m', reprojError: '0.024 px', status: 'Locked' },
  { pair: 'CAM_03 ↔ CAM_04', baseline: '3.90m', reprojError: '0.015 px', status: 'Locked' },
];

const GEOFENCES = [
  {
    id: 'geo_01',
    name: 'Loading Dock Alpha // Safety Perimeter',
    type: 'Restricted Proximity Hazard',
    cameras: 'Dock-Cam-01, Dock-Cam-02',
    rule: 'Trigger Visual Alarm on Human Intrusion',
    status: 'Armed & Active',
    activeEntities: '0 Violations',
  },
  {
    id: 'geo_02',
    name: 'AMR Fast Transit Corridor',
    type: 'Autonomous Vehicle Lane',
    cameras: 'Aisle-North, Aisle-South',
    rule: 'Dynamic Speed Limit 2.0 m/s',
    status: 'Active Tracking',
    activeEntities: '2 Mobile Robots',
  },
  {
    id: 'geo_03',
    name: 'Robotic Arm Cell Interlock',
    type: 'Interlock E-Stop Boundary',
    cameras: 'Cell-Macro-01',
    rule: 'Hardware E-Stop Relay if Hand < 0.5m',
    status: 'Armed (Zero-Lag)',
    activeEntities: '1 Operator in Safe Zone',
  },
];

export default function ZoneDashboardPage() {
  const geofences = GEOFENCES;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-syne text-lg font-bold uppercase text-foreground">
            Perceptras Zone // 3D Spatial Intelligence & Geofencing
          </h3>
          <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
            Multi-camera extrinsic auto-calibration and continuous 3D entity tracking across overlapping camera views and blind spots.
          </p>
        </div>
        <div className="flex gap-4 font-mono text-xs">
          <div className="border border-border p-3 bg-surface/50">
            <span className="text-muted text-[10px] uppercase">Calibration Reproj Error</span>
            <p className="font-bold text-emerald-500">0.019 px (Locked)</p>
          </div>
          <div className="border border-border p-3 bg-surface/50">
            <span className="text-muted text-[10px] uppercase">ReID Retention</span>
            <p className="font-bold text-foreground">99.8% Continuous</p>
          </div>
        </div>
      </div>

      {/* 3D Spatial Matrix Visualizer Simulation */}
      <div className="border border-border bg-surface p-1 relative shadow-sm">
        <div className="border-b border-border px-4 py-2.5 bg-surface flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold uppercase text-foreground">
              3D WORLD COORDINATE PROJECTION // FACILITY FLOOR ALPHA
            </span>
          </div>
          <span className="text-muted">4 CAMERAS FUSED // 3 ACTIVE GEOFENCES</span>
        </div>

        <div className="relative aspect-[21/9] bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden text-zinc-100 font-mono">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Camera Calibration Vectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="12%" y1="18%" x2="48%" y2="52%" stroke="rgba(52, 211, 153, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="88%" y1="18%" x2="52%" y2="52%" stroke="rgba(96, 165, 250, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="50%" cy="52%" r="6" fill="#34d399" />
          </svg>

          <div className="relative z-10 flex justify-between text-[10px]">
            <div className="bg-zinc-900/90 border border-zinc-700 px-2.5 py-1">
              <span>ACTIVE ENTITY: </span>
              <span className="text-emerald-400 font-bold">ROBOT_AMR_04 [X: 14.2m, Y: 8.6m]</span>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-700 px-2.5 py-1">
              <span>OPERATOR: </span>
              <span className="text-zinc-100 font-bold">OPERATOR_11 [X: 28.4m, Y: 4.1m]</span>
            </div>
          </div>

          {/* Geofence Overlay Box */}
          <div className="absolute top-[35%] left-[38%] w-[25%] h-[35%] border border-emerald-400 bg-emerald-500/10 pointer-events-none flex items-end p-2">
            <span className="text-[9px] bg-emerald-500 text-zinc-950 font-bold px-1 py-0.5 uppercase">
              ZONE ALPHA // CLEAR
            </span>
          </div>

          <div className="relative z-10 text-[10px] text-zinc-400 flex justify-between bg-zinc-900/90 border border-zinc-700 px-3 py-1.5">
            <span>Coordinate Space: Metric Real-World 3D (Meters)</span>
            <span className="text-emerald-400 font-bold">Sync: Sub-Millisecond PTP</span>
          </div>
        </div>
      </div>

      {/* Extrinsic Calibration Table */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Multi-Camera Extrinsic Calibration Matrix
        </h4>

        <div className="border border-border bg-surface overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                <th className="py-3 px-4 font-semibold">Camera Baseline Pair</th>
                <th className="py-3 px-4 font-semibold">Metric Baseline Distance</th>
                <th className="py-3 px-4 font-semibold">Reprojection Error</th>
                <th className="py-3 px-4 font-semibold text-right">Lock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CALIBRATIONS.map((cal) => (
                <tr key={cal.pair} className="hover:bg-foreground/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-foreground">{cal.pair}</td>
                  <td className="py-3 px-4 text-foreground">{cal.baseline}</td>
                  <td className="py-3 px-4 text-emerald-500 font-bold">{cal.reprojError}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {cal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geofence List */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Configured 3D Spatial Boundaries ({geofences.length})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {geofences.map((geo) => (
            <div key={geo.id} className="border border-border p-6 bg-surface space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase border border-border px-2 py-0.5 text-foreground font-bold">
                  {geo.type}
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <h4 className="font-syne text-base font-bold uppercase text-foreground">{geo.name}</h4>
              <p className="font-mono text-xs text-muted">Action: {geo.rule}</p>
              <div className="pt-2 border-t border-border font-mono text-xs flex justify-between">
                <span className="text-muted">Status:</span>
                <span className="font-bold text-foreground">{geo.activeEntities}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
