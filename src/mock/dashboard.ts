import { KPI, SalesData, StockData } from '../types';

export const mockKPIs: KPI[] = [
  {
    id: '1',
    title: 'Chiffre d\'affaires',
    value: '€47,253',
    change: 12.5,
    changeType: 'increase',
    icon: 'TrendingUp'
  },
  {
    id: '2',
    title: 'Ventes Viande',
    value: '€31,420',
    change: 8.2,
    changeType: 'increase',
    icon: 'Beef'
  },
  {
    id: '3',
    title: 'Ventes Triperie',
    value: '€8,940',
    change: -3.1,
    changeType: 'decrease',
    icon: 'Heart'
  },
  {
    id: '4',
    title: 'Marge Brute',
    value: '32.4%',
    change: 2.8,
    changeType: 'increase',
    icon: 'Percent'
  },
  {
    id: '5',
    title: 'Nombre de Clients',
    value: '1,247',
    change: 15.3,
    changeType: 'increase',
    icon: 'Users'
  },
  {
    id: '6',
    title: 'Panier Moyen',
    value: '€37.85',
    change: -1.2,
    changeType: 'decrease',
    icon: 'ShoppingCart'
  }
];

export const mockSalesData: Record<string, SalesData[]> = {
  '7d': [
    { date: '2024-01-01', value: 4200 },
    { date: '2024-01-02', value: 3800 },
    { date: '2024-01-03', value: 4500 },
    { date: '2024-01-04', value: 4100 },
    { date: '2024-01-05', value: 4800 },
    { date: '2024-01-06', value: 4300 },
    { date: '2024-01-07', value: 4700 }
  ],
  '30d': [
    { date: '2024-01-01', value: 28000 },
    { date: '2024-01-08', value: 32000 },
    { date: '2024-01-15', value: 29000 },
    { date: '2024-01-22', value: 35000 },
    { date: '2024-01-29', value: 31000 }
  ],
  '90d': [
    { date: '2024-01-01', value: 85000 },
    { date: '2024-02-01', value: 92000 },
    { date: '2024-03-01', value: 88000 }
  ]
};

export const mockStockData: StockData[] = [
  { category: 'Viande', value: 45, color: '#EF4444' },
  { category: 'Abats', value: 25, color: '#F97316' },
  { category: 'Volaille', value: 30, color: '#10B981' }
];