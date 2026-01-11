import { ReactNode } from 'react';

interface PageSidebarProps {
  children: ReactNode;
  title?: string;
}

export const PageSidebar = ({ children, title }: PageSidebarProps) => {
  return (
    <div className="w-64 bg-white/95 backdrop-blur-sm rounded-2xl border p-6 shadow-sm sticky top-28 self-start" style={{ borderColor: 'var(--card-border)' }}>
      {title && (
        <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
      )}
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};
