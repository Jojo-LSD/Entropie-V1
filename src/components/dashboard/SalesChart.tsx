import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Period, SalesData } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { PeriodTabs } from './PeriodTabs';
import { dashboardService } from '../../api/dashboardApi';
import { Skeleton } from '../ui/Skeleton';

interface SalesChartProps {
  category?: string;
}

export const SalesChart = ({ category = 'transport' }: SalesChartProps) => {
  const [data, setData] = useState<SalesData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const salesData = await dashboardService.getSalesData(selectedPeriod, category);
        setData(salesData);
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod, category]);

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Évolution des ventes</h3>
          <PeriodTabs
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit'
                  })}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip
                  formatter={(value) => [`${value}€`, 'Ventes']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR')}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};