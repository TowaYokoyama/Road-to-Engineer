import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-terminal-text">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={classNames(
            'w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-2.5 text-terminal-text placeholder-terminal-muted focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono',
            { 'border-terminal-error focus:border-terminal-error focus:ring-terminal-error/20': error },
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-terminal-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-terminal-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={classNames(
            'w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-2.5 text-terminal-text placeholder-terminal-muted focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono resize-none',
            { 'border-terminal-error focus:border-terminal-error focus:ring-terminal-error/20': error },
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-terminal-error">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-terminal-text">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={classNames(
            'w-full rounded-lg bg-terminal-bg border border-terminal-border px-4 py-2.5 text-terminal-text focus:border-terminal-accent focus:outline-none focus:ring-2 focus:ring-terminal-accent/20 transition-all duration-200 font-mono cursor-pointer',
            { 'border-terminal-error focus:border-terminal-error focus:ring-terminal-error/20': error },
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-terminal-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

