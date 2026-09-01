'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Camera, Eye, Flame, EyeOff } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Sector = 'logistics' | 'retail' | 'assembly';

interface CameraNode {
  id: string;
  x: number;
  y: number;
  label: string;
  tracking: number;
  occlusion: number;
  fps: number;
}

interface Zone {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

interface SectorData {
  label: string;
  sublabel: string;
  cameras: CameraNode[];
  zones: Zone[];
}

/* ------------------------------------------------------------------ */
/*  Sector definitions                                                 */
/* ------------------------------------------------------------------ */

const SECTORS: Record<Sector, SectorData> = {
  logistics: {
    label: 'Logistics Loading Bay',
    sublabel: 'Warehouse Zone B — 6 Camera Array',
    cameras: [
      { id: 'L01', x: 10, y: 15, label: 'Gate Entry',    tracking: 8,  occlusion: 1, fps: 30 },
      { id: 'L02', x: 40, y: 10, label: 'Dock A',        tracking: 14, occlusion: 3, fps: 30 },
      { id: 'L03', x: 70, y: 12, label: 'Dock B',        tracking: 11, occlusion: 2, fps: 30 },
      { id: 'L04', x: 25, y: 55, label: 'Forklift Lane', tracking: 6,  occlusion: 0, fps: 30 },
      { id: 'L05', x: 60, y: 52, label: 'Staging Area',  tracking: 22, occlusion: 5, fps: 25 },
      { id: 'L06', x: 88, y: 60, label: 'Exit Gate',     tracking: 4,  occlusion: 0, fps: 30 },
    ],
    zones: [
      { x: 5,  y: 5,  w: 35, h: 30, label: 'RECEIVING' },
      { x: 45, y: 5,  w: 50, h: 25, label: 'DOCKING' },
      { x: 5,  y: 40, w: 40, h: 35, label: 'FORKLIFT CORRIDOR' },
      { x: 50, y: 35, w: 45, h: 40, label: 'STAGING' },
    ],
  },
  retail: {
    label: 'Retail Floor Analytics',
    sublabel: 'Store #1204 — 5 Camera Array',
    cameras: [
      { id: 'R01', x: 15, y: 12, label: 'Entrance',    tracking: 32, occlusion: 4, fps: 30 },
      { id: 'R02', x: 50, y: 10, label: 'Aisle North',  tracking: 18, occlusion: 6, fps: 30 },
      { id: 'R03', x: 85, y: 15, label: 'Checkout',     tracking: 24, occlusion: 3, fps: 30 },
      { id: 'R04', x: 30, y: 58, label: 'Aisle South',  tracking: 12, occlusion: 2, fps: 30 },
      { id: 'R05', x: 72, y: 60, label: 'Stockroom',    tracking: 5,  occlusion: 1, fps: 25 },
    ],
    zones: [
      { x: 5,  y: 5,  w: 30, h: 35, label: 'ENTRY ZONE' },
      { x: 38, y: 5,  w: 25, h: 70, label: 'AISLE BLOCK' },
      { x: 68, y: 5,  w: 27, h: 35, label: 'CHECKOUT' },
      { x: 5,  y: 45, w: 30, h: 30, label: 'DISPLAY' },
      { x: 68, y: 45, w: 27, h: 30, label: 'STOCKROOM' },
    ],
  },
  assembly: {
    label: 'Automated Assembly',
    sublabel: 'Line A — 4 Camera Array',
    cameras: [
      { id: 'A01', x: 12, y: 35, label: 'Station 1',  tracking: 3, occlusion: 0, fps: 60 },
      { id: 'A02', x: 38, y: 30, label: 'Station 2',  tracking: 4, occlusion: 1, fps: 60 },
      { id: 'A03', x: 62, y: 33, label: 'QC Inspect',  tracking: 2, occlusion: 0, fps: 60 },
      { id: 'A04', x: 88, y: 36, label: 'Packaging',   tracking: 6, occlusion: 2, fps: 60 },
    ],
    zones: [
      { x: 5,  y: 18, w: 20, h: 50, label: 'STATION 1' },
      { x: 28, y: 15, w: 20, h: 55, label: 'STATION 2' },
      { x: 52, y: 18, w: 20, h: 50, label: 'QC' },
      { x: 75, y: 20, w: 20, h: 46, label: 'PACK' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ZoneIntel() {
  const [sector, setSector] = useState<Sector>('logistics');
  const [overlays, setOverlays] = useState({
    coverage: true,
    heatmap: false,
    occlusion: false,
  });
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  const data = SECTORS[sector];
  const camera = data.cameras.find((c) => c.id === selectedCamera);

  const toggleOverlay = (key: keyof typeof overlays) =>
    setOverlays((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ---------------------------------------------------------------- */
  return (
    <div className="border border-border">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-syne text-sm font-semibold uppercase tracking-wide">
            Perceptras Zone
          </p>
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Spatial Intelligence & Edge Perception Mapping
          </p>
        </div>
        <span className="font-mono text-[10px] text-muted border border-border px-2 py-0.5">
          [ LIVE SIM ]
        </span>
      </div>

      {/* ── Sector selector ────────────────────────────────────────── */}
      <div className="border-b border-border px-4 py-3 flex flex-wrap gap-2">
        {(Object.keys(SECTORS) as Sector[]).map((s) => (
          <button
            key={s}
            onClick={() => {
              setSector(s);
              setSelectedCamera(null);
            }}
            className={cn(
              'font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors cursor-pointer',
              sector === s
                ? 'border-foreground bg-foreground text-surface'
                : 'border-border text-muted hover:text-foreground',
            )}
          >
            {SECTORS[s].label}
          </button>
        ))}
      </div>

      {/* ── Floor plan ─────────────────────────────────────────────── */}
      <div className="relative px-4 py-6">
        <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
          {data.sublabel}
        </p>

        <div className="relative border border-border aspect-[2/1] bg-surface overflow-hidden">
          {/* crosshair corners */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map(
            (pos) => (
              <span
                key={pos}
                className={`absolute ${pos} font-mono text-[10px] text-muted p-1.5 leading-none select-none z-20`}
              >
                +
              </span>
            ),
          )}

          {/* coordinate grid */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[20, 40, 60, 80].map((x) => (
              <line
                key={`v${x}`}
                x1={`${x}%`}
                y1="0"
                x2={`${x}%`}
                y2="100%"
                className="stroke-border"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            ))}
            {[25, 50, 75].map((y) => (
              <line
                key={`h${y}`}
                x1="0"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                className="stroke-border"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          {/* zones */}
          {data.zones.map((zone) => (
            <div
              key={zone.label}
              className="absolute border border-border/40 pointer-events-none"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.w}%`,
                height: `${zone.h}%`,
              }}
            >
              <span className="absolute top-1 left-1.5 font-mono text-[7px] text-muted/50 uppercase tracking-wider">
                {zone.label}
              </span>
            </div>
          ))}

          {/* camera coverage bounds */}
          {overlays.coverage &&
            data.cameras.map((cam) => (
              <div
                key={`cov-${cam.id}`}
                className="absolute rounded-full border border-foreground/10 bg-foreground/[0.04] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${cam.x}%`,
                  top: `${cam.y}%`,
                  width: '18%',
                  height: '36%',
                }}
              />
            ))}

          {/* heatmap trajectories */}
          {overlays.heatmap &&
            data.cameras
              .filter((c) => c.tracking > 8)
              .map((cam) => (
                <div
                  key={`heat-${cam.id}`}
                  className="absolute rounded-full bg-foreground/[0.08] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${cam.x + 3}%`,
                    top: `${cam.y + 8}%`,
                    width: `${Math.min(cam.tracking * 0.9, 22)}%`,
                    height: `${Math.min(cam.tracking * 1.6, 44)}%`,
                  }}
                />
              ))}

          {/* occlusion masks */}
          {overlays.occlusion &&
            data.cameras
              .filter((c) => c.occlusion > 0)
              .map((cam) => (
                <div
                  key={`occ-${cam.id}`}
                  className="absolute border border-dashed border-foreground/20 bg-foreground/[0.03] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    left: `${cam.x + 5}%`,
                    top: `${cam.y + 5}%`,
                    width: `${cam.occlusion * 3.5}%`,
                    height: `${cam.occlusion * 7}%`,
                  }}
                />
              ))}

          {/* camera nodes */}
          {data.cameras.map((cam) => (
            <button
              key={cam.id}
              onClick={() =>
                setSelectedCamera(selectedCamera === cam.id ? null : cam.id)
              }
              className={cn(
                'absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center',
                'w-6 h-6 border transition-colors cursor-pointer',
                selectedCamera === cam.id
                  ? 'border-foreground bg-foreground text-surface'
                  : 'border-foreground/50 bg-surface hover:bg-foreground hover:text-surface text-foreground',
              )}
              style={{ left: `${cam.x}%`, top: `${cam.y}%` }}
              title={`${cam.id}: ${cam.label}`}
            >
              <Camera className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Overlay toggles ────────────────────────────────────────── */}
      <div className="border-t border-border px-4 py-3 flex flex-wrap gap-2">
        {([
          { key: 'coverage' as const, label: 'Camera Coverage',     icon: Eye },
          { key: 'heatmap' as const,  label: 'Heatmap Trajectories', icon: Flame },
          { key: 'occlusion' as const, label: 'Occlusion Masks',    icon: EyeOff },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => toggleOverlay(key)}
            className={cn(
              'flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors cursor-pointer',
              overlays[key]
                ? 'border-foreground text-foreground'
                : 'border-border text-muted hover:text-foreground',
            )}
          >
            <Icon className="h-3 w-3" />
            {overlays[key] ? '[−]' : '[+]'} {label}
          </button>
        ))}
      </div>

      {/* ── Camera telemetry panel ─────────────────────────────────── */}
      {camera && (
        <div className="border-t border-border px-4 py-4">
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-3">
            Node #{camera.id} — {camera.label}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Tracked Objects', value: String(camera.tracking) },
              { label: 'Occlusion Rate',  value: `${camera.occlusion}%` },
              { label: 'Frame Rate',       value: `${camera.fps} FPS` },
              { label: 'Status',           value: 'ACTIVE' },
            ].map((m) => (
              <div key={m.label} className="border-l border-border pl-3">
                <p className="font-mono text-[9px] text-muted uppercase">{m.label}</p>
                <p className="font-mono text-sm font-bold text-foreground">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const MetropolisZone = ZoneIntel;
