import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Display — Large architectural heading (Syne)                       */
/* ------------------------------------------------------------------ */

interface DisplayProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function Display({ children, className, as: Tag = 'h1' }: DisplayProps) {
  return (
    <Tag
      className={cn(
        'font-syne text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Heading — Section title with optional index (e.g. 01 // TITLE)    */
/* ------------------------------------------------------------------ */

interface HeadingProps {
  children: ReactNode;
  index?: string;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function Heading({ children, index, className, as: Tag = 'h2' }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-syne text-lg md:text-xl font-semibold tracking-wide uppercase',
        className,
      )}
    >
      {index && (
        <span className="font-mono text-muted mr-3 font-normal">{index} {'//'}</span>
      )}
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  MonoTag — Micro-copy badge with subtle borders                     */
/* ------------------------------------------------------------------ */

interface MonoTagProps {
  children: ReactNode;
  className?: string;
}

export function MonoTag({ children, className }: MonoTagProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-[10px] uppercase tracking-widest border border-border px-2.5 py-1 text-muted',
        className,
      )}
    >
      [ {children} ]
    </span>
  );
}
