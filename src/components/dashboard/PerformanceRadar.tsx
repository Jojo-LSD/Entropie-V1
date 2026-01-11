import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';

const performanceData = [
  { metric: 'Ventes', value: 85 },
  { metric: 'Stock', value: 70 },
  { metric: 'Livraison', value: 90 },
  { metric: 'Qualité', value: 95 },
  { metric: 'Client', value: 80 },
  { metric: 'Marge', value: 75 },
];

export const PerformanceRadar = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Performance globale</h3>
        <p className="text-sm text-gray-600">Vue d'ensemble des indicateurs</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={performanceData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
