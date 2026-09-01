import { ExternalLink, ShieldCheck, Globe } from 'lucide-react';

export function CredibilityStrip() {
  return (
    <div className="border-y border-border bg-surface/50 py-4">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Company Profiles &amp; Verification:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {/* Crunchbase Link */}
            <a
              href="https://www.crunchbase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-semibold text-foreground hover:text-muted inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Crunchbase</span>
              <ExternalLink className="h-3 w-3 text-muted" />
            </a>

            {/* F6S Link */}
            <a
              href="https://www.f6s.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-semibold text-foreground hover:text-muted inline-flex items-center gap-1.5 transition-colors"
            >
              <span>F6S</span>
              <ExternalLink className="h-3 w-3 text-muted" />
            </a>

            {/* SOC2 Ready */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
              <ShieldCheck className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
              <span className="text-foreground font-semibold">SOC2 Ready</span>
            </div>

            {/* Edge & Cloud Ready */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
              <Globe className="h-3.5 w-3.5 text-foreground stroke-[1.5]" />
              <span className="text-foreground font-semibold">Edge &amp; Cloud Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
