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
    <div className="glass-strong rounded-2xl shadow-xl border border-slate-200/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Performance globale</h3>
        <p className="text-sm text-slate-600">Vue d'ensemble des indicateurs</p>
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
