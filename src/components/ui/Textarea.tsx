import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm bg-white/80
            focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white
            disabled:bg-slate-50 disabled:opacity-50 resize-none
            placeholder:text-slate-400 transition-all duration-200
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';