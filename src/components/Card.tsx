import { ReactNode } from 'react';
import classNames from 'classnames';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, hover = false, glow = false, onClick }: CardProps) {
  return (
    <div
      className={classNames(
        'relative rounded-lg border border-terminal-border bg-gradient-to-br from-terminal-border/30 to-terminal-bg/50 backdrop-blur-sm transition-all duration-300',
        {
          'hover:border-terminal-accent/50 hover:shadow-lg hover:shadow-terminal-accent/10 hover:-translate-y-1 cursor-pointer': hover,
          'animate-glow': glow,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

