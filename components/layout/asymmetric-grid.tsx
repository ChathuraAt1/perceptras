import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type GridRatio = '60/40' | '70/30' | '40/60' | '30/70';

interface AsymmetricGridProps {
  ratio?: GridRatio;
  gap?: string;
  divider?: boolean;
  className?: string;
  children: [ReactNode, ReactNode];
}

const ratioClasses: Record<GridRatio, string> = {
  '60/40': 'grid-cols-1 md:grid-cols-[3fr_2fr]',
  '70/30': 'grid-cols-1 md:grid-cols-[7fr_3fr]',
  '40/60': 'grid-cols-1 md:grid-cols-[2fr_3fr]',
  '30/70': 'grid-cols-1 md:grid-cols-[3fr_7fr]',
};

export function AsymmetricGrid({
  ratio = '60/40',
  gap = 'gap-8',
  divider = false,
  className,
  children,
}: AsymmetricGridProps) {
  return (
    <div className={cn('grid', ratioClasses[ratio], gap, className)}>
      <div>{children[0]}</div>
      <div className={cn(divider && 'md:border-l md:border-border md:pl-8')}>
        {children[1]}
      </div>
    </div>
  );
}
