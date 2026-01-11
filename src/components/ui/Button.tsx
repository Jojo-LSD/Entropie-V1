import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md focus:ring-orange-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-md focus:ring-gray-500',
      outline: 'border-2 bg-white hover:bg-gray-50 focus:ring-gray-300',
      ghost: 'hover:bg-gray-50 focus:ring-gray-300'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    const getStyle = () => {
      if (variant === 'outline') {
        return { borderColor: 'var(--card-border)', color: 'var(--text-secondary)' };
      }
      if (variant === 'ghost') {
        return { color: 'var(--text-secondary)' };
      }
      return {};
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        style={getStyle()}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';