import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Period = '7' | '30' | '90';

const marginData = {
  '7': [
    { date: '14/10', margin: 0.28 },
    { date: '15/10', margin: 0.32 },
    { date: '16/10', margin: 0.30 },
    { date: '17/10', margin: 0.35 },
    { date: '18/10', margin: 0.33 },
    { date: '19/10', margin: 0.38 },
    { date: '20/10', margin: 0.36 },
  ],
  '30': [
    { date: '15/09', margin: 0.25 },
    { date: '20/09', margin: 0.30 },
    { date: '25/09', margin: 0.28 },
    { date: '30/09', margin: 0.32 },
    { date: '05/10', margin: 0.35 },
    { date: '10/10', margin: 0.33 },
    { date: '15/10', margin: 0.38 },
    { date: '20/10', margin: 0.36 },
  ],
  '90': [
    { date: '14/10', margin: 0.28 },
    { date: '17/10', margin: 0.30 },
    { date: '20/10', margin: 0.32 },
    { date: '23/10', margin: 0.29 },
    { date: '26/10', margin: 0.31 },
    { date: '29/10', margin: 0.35 },
    { date: '01/11', margin: 0.33 },
    { date: '03/11', margin: 0.30 },
    { date: '06/11', margin: 0.34 },
    { date: '09/11', margin: 0.38 },
    { date: '12/11', margin: 0.40 },
  ],
};

export const MarginEvolution = () => {
  const [period, setPeriod] = useState<Period>('90');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Évolution de la marge</h3>
          <p className="text-sm text-gray-600">Marge brute par jour</p>
        </div>

        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {(['7', '30', '90'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                period === p
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {p} jours
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={marginData[period]}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="marginGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            domain={[0, 0.5]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
          />
          <Area
            type="monotone"
            dataKey="margin"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#marginGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
