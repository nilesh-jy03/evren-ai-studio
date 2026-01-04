import { cn } from '@/lib/utils';

interface EvrenLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EvrenLogo = ({ size = 'md', className }: EvrenLogoProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-24 h-24 text-3xl',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl flex items-center justify-center font-bold text-primary-foreground',
        'bg-gradient-to-br from-primary via-primary to-primary/80',
        'shadow-lg',
        sizeClasses[size],
        className
      )}
      style={{ boxShadow: '0 0 30px hsl(25 95% 55% / 0.4)' }}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50" />
      
      {/* Logo letter - Changed from E to P */}
      <span className="relative z-10 font-bold tracking-tight">P</span>
      
      {/* Outer glow */}
      <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-md -z-10" />
    </div>
  );
};
