import { ReactNode } from 'react';

interface PageSidebarProps {
  children: ReactNode;
  title?: string;
}

export const PageSidebar = ({ children, title }: PageSidebarProps) => {
  return (
    <div className="w-64 bg-white/40 backdrop-blur-sm rounded-2xl border shadow-sm sticky top-28 self-start" style={{ borderColor: 'var(--card-border)', maxHeight: 'calc(100vh - 8rem)', display: 'flex', flexDirection: 'column' }}>
      {title && (
        <h2 className="text-lg font-bold px-6 pt-6 pb-4" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>
      )}
      <div className="space-y-2 px-6 pb-6 overflow-y-auto flex-1">
        {children}
      </div>
    </div>
  );
};
