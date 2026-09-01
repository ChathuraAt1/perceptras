import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  DataBadge — Inline metric readout                                  */
/* ------------------------------------------------------------------ */

interface DataBadgeProps {
  label: string;
  value: string;
  className?: string;
}

export function DataBadge({ label, value, className }: DataBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-xs uppercase',
        className,
      )}
    >
      <span className="text-muted">{label}:</span>
      <span className="text-foreground font-semibold">{value}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  MetricCard — Block-level telemetry card                            */
/* ------------------------------------------------------------------ */

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  className?: string;
}

export function MetricCard({ label, value, unit, className }: MetricCardProps) {
  return (
    <div className={cn('border-l-2 border-border pl-4 py-3', className)}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </p>
      <p className="font-mono text-3xl md:text-4xl font-bold text-foreground mt-1">
        {value}
        {unit && (
          <span className="text-sm font-normal text-muted ml-1.5">{unit}</span>
        )}
      </p>
    </div>
  );
}
