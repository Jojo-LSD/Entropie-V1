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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border p-6 shadow-md hover:shadow-lg transition-all duration-200" style={{ borderColor: 'var(--card-border)' }}>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Performance globale</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Vue d'ensemble des indicateurs</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={performanceData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
