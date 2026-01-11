import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPI } from '../../types';
import { Card, CardContent } from '../ui/Card';
import * as Icons from 'lucide-react';

interface KpiCardProps {
  kpi: KPI;
}

const getKpiColor = (index: number) => {
  const colors = [
    { bg: '#FFF4F0', icon: '#FF6B2C' }, // Orange
    { bg: '#FFF0F0', icon: '#FF5757' }, // Red
    { bg: '#F4F3FF', icon: '#6C5CE7' }, // Violet
    { bg: '#F0F7FF', icon: '#4D96FF' }, // Blue
    { bg: '#FFF9E6', icon: '#FFB400' }, // Yellow
    { bg: '#E6F9FF', icon: '#00D4FF' }, // Cyan
  ];
  return colors[index % colors.length];
};

export const KpiCard = ({ kpi }: KpiCardProps) => {
  const IconComponent = (Icons as any)[kpi.icon] || TrendingUp;
  const isPositive = kpi.changeType === 'increase';
  const colorScheme = getKpiColor(parseInt(kpi.id) || 0);

  return (
    <Card variant="elevated" className="group">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg transition-all duration-200" style={{ backgroundColor: colorScheme.bg }}>
            <IconComponent className="h-5 w-5" style={{ color: colorScheme.icon }} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{kpi.title}</h3>
          <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{kpi.value}</p>

          <div className="flex items-center space-x-2 pt-1">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-semibold ${
              isPositive
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(kpi.change)}%</span>
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>vs période précédente</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};