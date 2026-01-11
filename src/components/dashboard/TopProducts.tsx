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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Top produits en stock</h3>
        <p className="text-sm text-gray-600">Produits avec le plus de stock</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={topProducts}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" domain={[0, 1]} stroke="#9ca3af" />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#9ca3af"
            width={150}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="stock" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
