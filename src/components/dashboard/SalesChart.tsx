import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Period, SalesData } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { PeriodTabs } from './PeriodTabs';
import { dashboardService } from '../../api/dashboardApi';
import { Skeleton } from '../ui/Skeleton';

export const SalesChart = () => {
  const [data, setData] = useState<SalesData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const salesData = await dashboardService.getSalesData(selectedPeriod);
        setData(salesData);
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Évolution des ventes</h3>
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
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { 
                    day: '2-digit', 
                    month: '2-digit' 
                  })}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}€`, 'Ventes']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR')}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};