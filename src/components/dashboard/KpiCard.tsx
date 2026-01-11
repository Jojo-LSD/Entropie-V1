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
    <Card variant="elevated" className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
          <div className="p-2 bg-gray-50 rounded-lg">
            <IconComponent className="h-5 w-5 text-gray-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
          
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(kpi.change)}%</span>
            </div>
            <span className="text-xs text-gray-500">vs période précédente</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};