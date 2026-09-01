import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function FeatureShowcase() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left Column: Catchy Customer-Focused Narrative */}
      <div className="lg:col-span-6 space-y-6">
        <div className="inline-flex items-center gap-2 border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          <span>Real-World Perception</span>
        </div>

        <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
          Looking to improve your physical perception workflows?
        </h2>

        <p className="font-mono text-sm text-muted leading-relaxed">
          Transform fragmented, multi-angle camera feeds into synchronized 3D spatial intelligence. Whether you are guiding autonomous warehouse vehicles or monitoring high-density production lines, Perceptras processes vision streams directly at the edge with zero latency lag.
        </p>

        <div className="space-y-3 pt-2">
          {[
            'Unified multi-camera tracking that tracks entities continuously across blind spots',
            'Zero cloud bandwidth costs — runs 100% on-premise on standard edge hardware',
            'Works seamlessly with your existing RTSP, USB3, and GigE Vision cameras',
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5 stroke-[1.75]" />
              <span className="font-mono text-xs text-foreground leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link href="/contact?subject=Architecture%20Consultation">
            <Button variant="primary" size="md" className="flex items-center gap-2">
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/products/">
            <Button variant="outline" size="md">
              View Product Suite
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Frame / Media Simulation */}
      <div className="lg:col-span-6">
        <div className="border border-border bg-surface relative p-1">
          {/* Corner crosshairs */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-foreground" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-foreground" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-foreground" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-foreground" />

          {/* Top telemetry bar */}
          <div className="border-b border-border px-4 py-2.5 bg-surface flex items-center justify-between font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground font-bold uppercase">LIVE FEED // CLUSTER NODE 01</span>
            </div>
            <span className="text-muted">64 STREAMS SYNCHRONIZED</span>
          </div>

          {/* Perception canvas simulation */}
          <div className="relative aspect-[16/10] bg-zinc-950 p-6 flex flex-col justify-between overflow-hidden text-zinc-100 font-mono">
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
                <p className="text-zinc-400">LATENCY: <span className="text-zinc-100 font-bold">1.2 ms</span></p>
                <p className="text-zinc-400">FPS: <span className="text-zinc-100 font-bold">240.0</span></p>
              </div>
              <div className="bg-zinc-900/90 border border-zinc-700 px-2 py-1 text-right space-y-0.5">
                <p className="text-zinc-400">PRECISION: <span className="text-zinc-100 font-bold">INT8 / FP8</span></p>
                <p className="text-zinc-400">TRACKS: <span className="text-zinc-100 font-bold">14 ACTIVE</span></p>
              </div>
            </div>

            {/* Visual Bounding Box 1 */}
            <div className="absolute top-[28%] left-[22%] w-[32%] h-[42%] border border-dashed border-emerald-400 bg-emerald-500/10 pointer-events-none">
              <div className="absolute -top-5 left-0 bg-emerald-500 text-zinc-950 text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                ID_04 // ROBOT_AMR [99.4%]
              </div>
              <div className="absolute bottom-1 right-1 text-[8px] text-emerald-400">
                X: 12.4m | Y: 4.8m
              </div>
            </div>

            {/* Visual Bounding Box 2 */}
            <div className="absolute top-[38%] right-[16%] w-[24%] h-[36%] border border-zinc-400 bg-zinc-500/10 pointer-events-none">
              <div className="absolute -top-5 left-0 bg-zinc-200 text-zinc-950 text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                ID_11 // OPERATOR [97.8%]
              </div>
              <div className="absolute bottom-1 right-1 text-[8px] text-zinc-300">
                ZONE: ASSEMBLY_B
              </div>
            </div>

            {/* Trajectory Vector Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 120 220 Q 220 160 310 170 T 420 150"
                fill="none"
                stroke="rgba(52, 211, 153, 0.6)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle cx="310" cy="170" r="3" fill="#34d399" />
              <circle cx="420" cy="150" r="4" fill="#ffffff" />
            </svg>

            {/* Bottom status strip */}
            <div className="relative z-10 flex items-center justify-between text-[10px] bg-zinc-900/90 border border-zinc-700 px-3 py-1.5">
              <div className="flex items-center gap-3">
                <span className="text-zinc-400">PIPELINE:</span>
                <span className="text-zinc-100 font-bold">PERCEPTRAS FLOW &amp; ZONE</span>
              </div>
              <span className="text-emerald-400 font-bold">ZERO-COPY STREAMING</span>
            </div>
          </div>

          {/* Bottom Caption */}
          <div className="p-3 bg-surface border-t border-border flex items-center justify-between font-mono text-[10px] text-muted">
            <span>Spatial intelligence tracking across overlapping camera views</span>
            <span className="text-foreground font-semibold">100% On-Premise</span>
          </div>
        </div>
      </div>
    </div>
  );
}
