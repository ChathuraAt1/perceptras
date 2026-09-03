import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "We stopped rebuilding tracking logic for every production line. Perceptras gave us one pipeline we could configure per site instead of engineering from scratch each time.",
    author: "Marcus Vance",
    role: "Operations Lead",
    company: "Apex Autonomous Systems",
    industry: "Industrial Automation",
  },
  {
    quote:
      "Dock activity and zone occupancy used to live in three different tools. Now it's one structured event feed our warehouse systems can actually consume.",
    author: "Elena Rostova",
    role: "Systems Integrator",
    company: "Synapse Industrial Solutions",
    industry: "Logistics",
  },
  {
    quote:
      "What sold us wasn't a single camera feature it was the infrastructure underneath. We plug in our own models and Perceptras handles the pipeline around them.",
    author: "David Chen",
    role: "Computer Vision Engineer",
    company: "OmniSpatial Labs",
    industry: "Retail Tech",
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
              {t.role} <span className="text-foreground">{t.company}</span>
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
