import classNames from 'classnames';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'purple' | 'pink' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  const variants = {
    default: 'bg-terminal-border text-terminal-accent border-terminal-accent/30',
    primary: 'bg-terminal-accent/10 text-terminal-accent border-terminal-accent/30',
    success: 'bg-terminal-success/10 text-terminal-success border-terminal-success/30',
    warning: 'bg-terminal-warning/10 text-terminal-warning border-terminal-warning/30',
    error: 'bg-terminal-error/10 text-terminal-error border-terminal-error/30',
    purple: 'bg-terminal-purple/10 text-terminal-purple border-terminal-purple/30',
    pink: 'bg-terminal-pink/10 text-terminal-pink border-terminal-pink/30',
    ghost: 'bg-terminal-bg text-terminal-muted border-terminal-border',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full border font-mono font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

