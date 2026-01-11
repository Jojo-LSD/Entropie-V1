import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white/90 backdrop-blur-sm rounded-xl border transition-all duration-200',
      elevated: 'bg-white/90 backdrop-blur-sm rounded-xl border hover:shadow-lg hover:bg-white/95 transition-all duration-200'
    };

    return (
      <div
        ref={ref}
        className={`${variants[variant]} ${className}`}
        style={{
          borderColor: 'var(--card-border)',
          boxShadow: variant === 'default' ? 'var(--shadow)' : 'var(--shadow-md)'
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