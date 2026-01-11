export const Skeleton = ({ className = '', ...props }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200/60 rounded-xl ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard = () => (
  <div className="glass-strong rounded-2xl shadow-xl border border-slate-200/50 p-6">
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
    <Skeleton className="h-8 w-32 mb-3" />
    <Skeleton className="h-4 w-20" />
  </div>
);