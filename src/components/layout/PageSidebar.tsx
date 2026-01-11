import { ReactNode } from 'react';

interface PageSidebarProps {
  children: ReactNode;
  title?: string;
}

export const PageSidebar = ({ children, title }: PageSidebarProps) => {
  return (
    <div className="w-64 bg-white/70 backdrop-blur-sm rounded-2xl border shadow-sm" style={{ borderColor: 'var(--card-border)' }}>
      {title && (
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
        </div>
      )}
      <div className="space-y-2 px-6 pb-6">
        {children}
      </div>
    </div>
  );
};
