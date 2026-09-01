import { cn } from '@/lib/utils';
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            'w-full rounded-none border border-border bg-surface px-3.5 py-2.5 font-mono text-xs text-foreground placeholder:text-muted/50',
            'transition-colors duration-150',
            'focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="font-mono text-[10px] text-muted">{hint}</p>
        )}
        {error && (
          <p className="font-mono text-[10px] text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          rows={rows}
          ref={ref}
          className={cn(
            'w-full resize-y rounded-none border border-border bg-surface px-3.5 py-2.5 font-mono text-xs text-foreground placeholder:text-muted/50',
            'transition-colors duration-150',
            'focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="font-mono text-[10px] text-muted">{hint}</p>
        )}
        {error && (
          <p className="font-mono text-[10px] text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
