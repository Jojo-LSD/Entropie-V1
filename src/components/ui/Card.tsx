import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white/70 backdrop-blur-sm rounded-xl border transition-all duration-300',
      elevated: 'bg-white/70 backdrop-blur-sm rounded-xl border hover:shadow-lg hover:bg-white/80 transition-all duration-300 hover:scale-[1.02]'
    };

    return (
      <div
        ref={ref}
        className={`${variants[variant]} ${className}`}
        style={{
          borderColor: 'var(--card-border)',
          boxShadow: variant === 'default' ? 'var(--shadow-sm)' : 'var(--shadow)'
        }}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`p-6 pb-0 ${className}`} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props} />
  )
);

CardContent.displayName = 'CardContent';