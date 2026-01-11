import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { StockData } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { dashboardService } from '../../api/dashboardApi';
import { Skeleton } from '../ui/Skeleton';

export const StockDonut = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const stockData = await dashboardService.getStockData();
        setData(stockData);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCustomLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className="space-y-3">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {entry.value}: {data.find(d => d.category === entry.value)?.value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Stock par catégorie</h3>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="flex items-center justify-between h-64">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Stock']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(8px)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-8">
              <Legend
                content={renderCustomLegend}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};