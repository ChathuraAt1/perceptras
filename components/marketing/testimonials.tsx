import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Perceptras reduced our multi-camera video ingestion latency from seconds to under 2 milliseconds. It allowed us to deploy real-time spatial collision avoidance on our autonomous warehouse vehicles without replacing our existing camera hardware.',
    author: 'Marcus Vance',
    role: 'VP of Robotics Engineering',
    company: 'Apex Autonomous Systems',
    industry: 'Warehouse & Robotics',
  },
  {
    quote:
      'The speed of setup was unprecedented. We connected 64 RTSP production line cameras across two manufacturing plants and had unified 3D coordinate tracking running within 48 hours.',
    author: 'Elena Rostova',
    role: 'Head of Vision Systems',
    company: 'Synapse Industrial Solutions',
    industry: 'Smart Manufacturing',
  },
  {
    quote:
      'Other vision tools required proprietary cloud servers. Perceptras gave us a self-contained, high-throughput edge perception stack that runs 100% on-premise with zero data leaks.',
    author: 'David Chen',
    role: 'Chief Infrastructure Architect',
    company: 'OmniSpatial Labs',
    industry: 'Spatial Intelligence',
  },
];

export function TestimonialsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
      {TESTIMONIALS.map((t, idx) => (
        <div
          key={idx}
          className="bg-surface p-8 flex flex-col justify-between gap-6"
        >
          <div className="space-y-4">
            <Quote className="h-6 w-6 text-muted stroke-1 rotate-180" />
            <p className="font-mono text-xs text-foreground leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>

          <div className="pt-4 border-t border-border flex flex-col gap-1">
            <p className="font-syne text-sm font-bold uppercase text-foreground">
              {t.author}
            </p>
            <p className="font-mono text-[11px] text-muted">
              {t.role} — <span className="text-foreground">{t.company}</span>
            </p>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted mt-1">
              {t.industry}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
