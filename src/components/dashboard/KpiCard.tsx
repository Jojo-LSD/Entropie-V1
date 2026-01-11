import { TrendingUp, TrendingDown } from 'lucide-react';
import { KPI } from '../../types';
import { Card, CardContent } from '../ui/Card';
import * as Icons from 'lucide-react';

interface KpiCardProps {
  kpi: KPI;
}

export const KpiCard = ({ kpi }: KpiCardProps) => {
  const IconComponent = (Icons as any)[kpi.icon] || TrendingUp;
  const isPositive = kpi.changeType === 'increase';

  return (
    <Card variant="elevated" className="group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-slate-600">{kpi.title}</h3>
          <div className="p-2.5 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl group-hover:from-violet-100 group-hover:to-purple-100 transition-all duration-200">
            <IconComponent className="h-5 w-5 text-violet-600" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</p>

          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
              isPositive
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{Math.abs(kpi.change)}%</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">vs période précédente</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};