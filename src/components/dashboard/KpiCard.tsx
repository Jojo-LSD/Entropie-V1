import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPI } from '../../types';
import { Card, CardContent } from '../ui/Card';
import * as Icons from 'lucide-react';

interface KpiCardProps {
  kpi: KPI;
}

const getKpiColor = (index: number) => {
  const colors = [
    { bg: '#EFF6FF', icon: '#3B82F6' }, // Blue
    { bg: '#ECFEFF', icon: '#06B6D4' }, // Cyan
    { bg: '#EEF2FF', icon: '#6366F1' }, // Indigo
    { bg: '#F0F9FF', icon: '#0EA5E9' }, // Sky
    { bg: '#F5F3FF', icon: '#8B5CF6' }, // Violet
    { bg: '#F0FDFA', icon: '#14B8A6' }, // Teal
  ];
  return colors[index % colors.length];
};

export const KpiCard = ({ kpi }: KpiCardProps) => {
  const IconComponent = (Icons as any)[kpi.icon] || TrendingUp;
  const colorScheme = getKpiColor(parseInt(kpi.id) || 0);

  return (
    <Card variant="elevated" className="group">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg transition-all duration-200 flex-shrink-0" style={{ backgroundColor: colorScheme.bg }}>
            <IconComponent className="h-6 w-6" style={{ color: colorScheme.icon }} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{kpi.title}</h3>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};