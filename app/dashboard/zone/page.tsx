'use client';

const GEOFENCES = [
  {
    id: 'geo_01',
    name: 'Loading Dock Alpha // Safety Zone',
    type: 'Restricted Proximity Hazard',
    cameras: 'Dock-Cam-01, Dock-Cam-02',
    status: 'Armed & Active',
    activeEntities: '0 Violations',
  },
  {
    id: 'geo_02',
    name: 'AMR Fast Transit Corridor',
    type: 'Autonomous Vehicle Lane',
    cameras: 'Aisle-North, Aisle-South',
    status: 'Active Tracking',
    activeEntities: '2 Mobile Robots',
  },
  {
    id: 'geo_03',
    name: 'Robotic Arm Cell Perimeter',
    type: 'Interlock E-Stop Boundary',
    cameras: 'Cell-Macro-01',
    status: 'Armed (Zero-Lag)',
    activeEntities: '1 Operator in Safe Zone',
  },
];

export default function ZoneDashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border border-border p-6 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-syne text-lg font-bold uppercase text-foreground">
            Perceptras Zone 3D Spatial Intelligence
          </h3>
          <p className="font-mono text-xs text-muted mt-1 max-w-xl leading-relaxed">
            Extrinsic multi-camera calibration and continuous 3D entity tracking across overlapping angles and blind spots.
          </p>
        </div>
        <div className="flex gap-4 font-mono text-xs">
          <div className="border border-border p-3 bg-surface/50">
            <span className="text-muted text-[10px] uppercase">Calibration Error</span>
            <p className="font-bold text-emerald-500">0.02 px (Extrinsic Locked)</p>
          </div>
          <div className="border border-border p-3 bg-surface/50">
            <span className="text-muted text-[10px] uppercase">ReID Retention</span>
            <p className="font-bold text-foreground">99.8% Multi-Cam</p>
          </div>
        </div>
      </div>

      {/* Geofence List */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Configured 3D Spatial Boundaries
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GEOFENCES.map((geo) => (
            <div key={geo.id} className="border border-border p-6 bg-surface space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase border border-border px-2 py-0.5 text-foreground font-bold">
                  {geo.type}
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <h4 className="font-syne text-base font-bold uppercase text-foreground">{geo.name}</h4>
              <p className="font-mono text-xs text-muted">Cameras: {geo.cameras}</p>
              <div className="pt-2 border-t border-border font-mono text-xs flex justify-between">
                <span className="text-muted">Live Status:</span>
                <span className="font-bold text-foreground">{geo.activeEntities}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
