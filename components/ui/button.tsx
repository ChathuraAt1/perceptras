import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-foreground text-surface hover:opacity-90',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-foreground hover:text-surface',
  ghost:
    'bg-transparent text-foreground hover:underline underline-offset-4 decoration-muted',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-[10px]',
  md: 'px-5 py-2 text-xs',
  lg: 'px-7 py-3 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-none font-mono uppercase tracking-wider transition-all cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
