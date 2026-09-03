import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Container Max-width wrapper with optional structural borders     */
/* ------------------------------------------------------------------ */

interface ContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  borders?: {
    left?: boolean;
    right?: boolean;
  };
}

export function Container({
  children,
  id,
  className,
  borders,
}: ContainerProps) {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full max-w-7xl px-6 md:px-8",
        borders?.left && "border-l border-border",
        borders?.right && "border-r border-border",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Full-width section with optional border lines            */
/* ------------------------------------------------------------------ */

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  borders?: {
    top?: boolean;
    bottom?: boolean;
  };
}

export function Section({ children, id, className, borders }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        borders?.top && "border-t border-border",
        borders?.bottom && "border-b border-border",
        className,
      )}
    >
      {children}
    </section>
  );
}
