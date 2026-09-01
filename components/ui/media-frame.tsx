import { cn } from '@/lib/utils';
import type { CSSProperties, ReactNode } from 'react';

interface MediaFrameProps {
  caption?: string;
  aspectRatio?: string;
  className?: string;
  children: ReactNode;
}

export function MediaFrame({
  caption,
  aspectRatio = '16/9',
  className,
  children,
}: MediaFrameProps) {
  return (
    <figure className={cn('relative', className)}>
      <div
        className="relative border border-border overflow-hidden bg-surface"
        style={{ aspectRatio } as CSSProperties}
      >
        {/* Crosshair corner markers */}
        <span className="absolute top-0 left-0 font-mono text-[10px] leading-none text-muted p-1.5 select-none z-10">
          +
        </span>
        <span className="absolute top-0 right-0 font-mono text-[10px] leading-none text-muted p-1.5 select-none z-10">
          +
        </span>
        <span className="absolute bottom-0 left-0 font-mono text-[10px] leading-none text-muted p-1.5 select-none z-10">
          +
        </span>
        <span className="absolute bottom-0 right-0 font-mono text-[10px] leading-none text-muted p-1.5 select-none z-10">
          +
        </span>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>

      {caption && (
        <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
