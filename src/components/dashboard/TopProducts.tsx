import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const topProducts = [
  { name: 'Filet de porc fermier', stock: 1.0 },
  { name: "Rognons d'agneau", stock: 0.85 },
  { name: 'Foie de veau bio', stock: 0.72 },
  { name: 'Entrecôte maturée', stock: 0.65 },
  { name: 'Côte de boeuf premium', stock: 0.58 },
];

export const TopProducts = () => {
  return (
    <div className="glass-strong rounded-2xl shadow-xl border border-slate-200/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Top produits en stock</h3>
        <p className="text-sm text-slate-600">Produits avec le plus de stock</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={topProducts}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" domain={[0, 1]} stroke="#94a3b8" />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#94a3b8"
            width={150}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(8px)'
            }}
          />
          <Bar dataKey="stock" fill="#8b5cf6" radius={[0, 12, 12, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
