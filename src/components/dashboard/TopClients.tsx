import { Medal } from 'lucide-react';

const topClients = [
  { id: 1, name: 'Restaurant Le Gourmet', orders: 48, revenue: 125000 },
  { id: 2, name: 'Boucherie Martin', orders: 35, revenue: 99000 },
  { id: 3, name: 'Hôtel des Saveurs', orders: 29, revenue: 87000 },
];

const getRankBadgeColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 2:
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 3:
      return 'bg-orange-100 text-orange-800 border-orange-300';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

export const TopClients = () => {
  return (
    <div className="glass-strong rounded-2xl shadow-xl border border-slate-200/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 mb-1">Top clients</h3>
        <p className="text-sm text-slate-600">Classement par chiffre d'affaires</p>
      </div>

      <div className="space-y-4">
        {topClients.map((client, index) => (
          <div
            key={client.id}
            className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-white/60 to-white/40 border border-slate-200/60 hover:shadow-lg hover:border-violet-200 transition-all duration-200"
          >
            <div
              className={`w-12 h-12 rounded-xl ${getRankBadgeColor(
                index + 1
              )} border-2 flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm`}
            >
              #{index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 truncate">{client.name}</h4>
              <p className="text-sm text-slate-600 font-medium">{client.orders} commandes</p>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-lg font-bold text-slate-900">
                {(client.revenue / 1000).toFixed(0)} k€
              </div>
              <div className="text-xs text-slate-600 font-medium">CA total</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
