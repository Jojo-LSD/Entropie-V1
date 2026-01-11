import { KPI, SalesData, StockData } from '../types';

export const mockKPIsByCategory: Record<string, KPI[]> = {
  transport: [
    {
      id: '1',
      title: 'Coût Transport Total',
      value: '€12,450',
      change: 5.2,
      changeType: 'increase',
      icon: 'Truck'
    },
    {
      id: '2',
      title: 'Livraisons à Temps',
      value: '94.2%',
      change: 2.1,
      changeType: 'increase',
      icon: 'Clock'
    },
    {
      id: '3',
      title: 'Distance Parcourue',
      value: '8,540 km',
      change: -1.5,
      changeType: 'decrease',
      icon: 'MapPin'
    },
    {
      id: '4',
      title: 'Coût par km',
      value: '€1.46',
      change: 0.8,
      changeType: 'increase',
      icon: 'DollarSign'
    },
    {
      id: '5',
      title: 'Nombre de Livraisons',
      value: '342',
      change: 8.5,
      changeType: 'increase',
      icon: 'Package'
    },
    {
      id: '6',
      title: 'Taux d\'Utilisation',
      value: '87.3%',
      change: 3.2,
      changeType: 'increase',
      icon: 'TrendingUp'
    },
    {
      id: '7',
      title: 'Retards de Livraison',
      value: '5.8%',
      change: -2.1,
      changeType: 'decrease',
      icon: 'AlertCircle'
    },
    {
      id: '8',
      title: 'Satisfaction Client',
      value: '4.6/5',
      change: 0.3,
      changeType: 'increase',
      icon: 'Star'
    }
  ],
  entrepot: [
    {
      id: '1',
      title: 'Taux de Remplissage',
      value: '78.5%',
      change: 4.2,
      changeType: 'increase',
      icon: 'Warehouse'
    },
    {
      id: '2',
      title: 'Valeur du Stock',
      value: '€145,320',
      change: -2.8,
      changeType: 'decrease',
      icon: 'DollarSign'
    },
    {
      id: '3',
      title: 'Rotation Stock',
      value: '12.4x',
      change: 1.5,
      changeType: 'increase',
      icon: 'RotateCcw'
    },
    {
      id: '4',
      title: 'Articles en Stock',
      value: '2,847',
      change: 5.6,
      changeType: 'increase',
      icon: 'Package'
    },
    {
      id: '5',
      title: 'Ruptures de Stock',
      value: '3.2%',
      change: -1.2,
      changeType: 'decrease',
      icon: 'AlertTriangle'
    },
    {
      id: '6',
      title: 'Temps de Préparation',
      value: '24 min',
      change: -8.5,
      changeType: 'decrease',
      icon: 'Clock'
    },
    {
      id: '7',
      title: 'Précision Inventaire',
      value: '98.7%',
      change: 0.9,
      changeType: 'increase',
      icon: 'CheckCircle'
    },
    {
      id: '8',
      title: 'Coût Entreposage',
      value: '€8,450',
      change: 2.3,
      changeType: 'increase',
      icon: 'Coins'
    }
  ],
  commandes: [
    {
      id: '1',
      title: 'Commandes Traitées',
      value: '1,842',
      change: 12.3,
      changeType: 'increase',
      icon: 'ShoppingCart'
    },
    {
      id: '2',
      title: 'Taux de Complétion',
      value: '96.8%',
      change: 1.5,
      changeType: 'increase',
      icon: 'CheckCircle'
    },
    {
      id: '3',
      title: 'Temps Moyen Traitement',
      value: '2.4h',
      change: -12.5,
      changeType: 'decrease',
      icon: 'Clock'
    },
    {
      id: '4',
      title: 'Valeur Moyenne Commande',
      value: '€156.40',
      change: 4.2,
      changeType: 'increase',
      icon: 'DollarSign'
    },
    {
      id: '5',
      title: 'Commandes en Attente',
      value: '87',
      change: -5.8,
      changeType: 'decrease',
      icon: 'Clock3'
    },
    {
      id: '6',
      title: 'Taux d\'Annulation',
      value: '2.1%',
      change: -0.8,
      changeType: 'decrease',
      icon: 'XCircle'
    },
    {
      id: '7',
      title: 'Commandes Urgentes',
      value: '45',
      change: 15.2,
      changeType: 'increase',
      icon: 'Zap'
    },
    {
      id: '8',
      title: 'Précision Préparation',
      value: '99.2%',
      change: 0.5,
      changeType: 'increase',
      icon: 'Target'
    }
  ],
  achats: [
    {
      id: '1',
      title: 'Volume d\'Achats',
      value: '€89,450',
      change: 8.7,
      changeType: 'increase',
      icon: 'ShoppingBag'
    },
    {
      id: '2',
      title: 'Nombre Fournisseurs',
      value: '47',
      change: 3.2,
      changeType: 'increase',
      icon: 'Users'
    },
    {
      id: '3',
      title: 'Délai Livraison Moyen',
      value: '5.2 jours',
      change: -1.8,
      changeType: 'decrease',
      icon: 'Calendar'
    },
    {
      id: '4',
      title: 'Taux de Conformité',
      value: '97.4%',
      change: 2.1,
      changeType: 'increase',
      icon: 'CheckSquare'
    },
    {
      id: '5',
      title: 'Économies Réalisées',
      value: '€12,340',
      change: 18.5,
      changeType: 'increase',
      icon: 'PiggyBank'
    },
    {
      id: '6',
      title: 'Commandes en Cours',
      value: '124',
      change: 5.6,
      changeType: 'increase',
      icon: 'FileText'
    },
    {
      id: '7',
      title: 'Taux de Retour',
      value: '1.8%',
      change: -0.5,
      changeType: 'decrease',
      icon: 'RotateCcw'
    },
    {
      id: '8',
      title: 'Performance Fournisseurs',
      value: '8.4/10',
      change: 0.6,
      changeType: 'increase',
      icon: 'Award'
    }
  ],
  qualite: [
    {
      id: '1',
      title: 'Taux de Conformité',
      value: '98.9%',
      change: 1.2,
      changeType: 'increase',
      icon: 'ShieldCheck'
    },
    {
      id: '2',
      title: 'Non-Conformités',
      value: '12',
      change: -25.0,
      changeType: 'decrease',
      icon: 'AlertOctagon'
    },
    {
      id: '3',
      title: 'Audits Réalisés',
      value: '8',
      change: 0.0,
      changeType: 'increase',
      icon: 'FileCheck'
    },
    {
      id: '4',
      title: 'Réclamations Client',
      value: '5',
      change: -16.7,
      changeType: 'decrease',
      icon: 'MessageSquare'
    },
    {
      id: '5',
      title: 'Taux de Satisfaction',
      value: '96.2%',
      change: 2.8,
      changeType: 'increase',
      icon: 'ThumbsUp'
    },
    {
      id: '6',
      title: 'Actions Correctives',
      value: '15',
      change: 7.1,
      changeType: 'increase',
      icon: 'Tool'
    },
    {
      id: '7',
      title: 'Certifications Valides',
      value: '12/12',
      change: 0.0,
      changeType: 'increase',
      icon: 'Badge'
    },
    {
      id: '8',
      title: 'Délai de Résolution',
      value: '2.3 jours',
      change: -15.2,
      changeType: 'decrease',
      icon: 'Timer'
    }
  ],
  financiers: [
    {
      id: '1',
      title: 'Coût Logistique Total',
      value: '€45,680',
      change: 3.5,
      changeType: 'increase',
      icon: 'DollarSign'
    },
    {
      id: '2',
      title: 'Coût par Commande',
      value: '€24.80',
      change: -2.1,
      changeType: 'decrease',
      icon: 'Calculator'
    },
    {
      id: '3',
      title: 'ROI Logistique',
      value: '18.5%',
      change: 4.2,
      changeType: 'increase',
      icon: 'TrendingUp'
    },
    {
      id: '4',
      title: 'Coût Entreposage',
      value: '€12,450',
      change: 1.8,
      changeType: 'increase',
      icon: 'Warehouse'
    },
    {
      id: '5',
      title: 'Coût Transport',
      value: '€18,920',
      change: 5.2,
      changeType: 'increase',
      icon: 'Truck'
    },
    {
      id: '6',
      title: 'Coût Main d\'Œuvre',
      value: '€14,310',
      change: 2.9,
      changeType: 'increase',
      icon: 'Users'
    },
    {
      id: '7',
      title: 'Budget Utilisé',
      value: '78.4%',
      change: 8.5,
      changeType: 'increase',
      icon: 'PieChart'
    },
    {
      id: '8',
      title: 'Économies Réalisées',
      value: '€8,760',
      change: 12.3,
      changeType: 'increase',
      icon: 'Coins'
    }
  ],
  retours: [
    {
      id: '1',
      title: 'Taux de Retour',
      value: '3.8%',
      change: -1.2,
      changeType: 'decrease',
      icon: 'RotateCcw'
    },
    {
      id: '2',
      title: 'Retours Traités',
      value: '142',
      change: -8.5,
      changeType: 'decrease',
      icon: 'PackageCheck'
    },
    {
      id: '3',
      title: 'Délai Traitement',
      value: '3.2 jours',
      change: -15.8,
      changeType: 'decrease',
      icon: 'Clock'
    },
    {
      id: '4',
      title: 'Coût des Retours',
      value: '€5,840',
      change: -6.2,
      changeType: 'decrease',
      icon: 'DollarSign'
    },
    {
      id: '5',
      title: 'Taux de Remise en Stock',
      value: '76.5%',
      change: 4.8,
      changeType: 'increase',
      icon: 'PackagePlus'
    },
    {
      id: '6',
      title: 'Retours en Attente',
      value: '28',
      change: -12.5,
      changeType: 'decrease',
      icon: 'Clock3'
    },
    {
      id: '7',
      title: 'Satisfaction Retours',
      value: '89.2%',
      change: 5.4,
      changeType: 'increase',
      icon: 'Heart'
    },
    {
      id: '8',
      title: 'Raison Principale',
      value: 'Défaut',
      change: 0.0,
      changeType: 'increase',
      icon: 'AlertTriangle'
    }
  ],
  performance: [
    {
      id: '1',
      title: 'Performance Globale',
      value: '87.5%',
      change: 3.8,
      changeType: 'increase',
      icon: 'TrendingUp'
    },
    {
      id: '2',
      title: 'Taux de Service',
      value: '96.2%',
      change: 2.1,
      changeType: 'increase',
      icon: 'Target'
    },
    {
      id: '3',
      title: 'Productivité',
      value: '142%',
      change: 8.5,
      changeType: 'increase',
      icon: 'Zap'
    },
    {
      id: '4',
      title: 'Efficacité Opérationnelle',
      value: '91.8%',
      change: 4.2,
      changeType: 'increase',
      icon: 'Activity'
    },
    {
      id: '5',
      title: 'Objectifs Atteints',
      value: '15/17',
      change: 11.1,
      changeType: 'increase',
      icon: 'CheckCircle'
    },
    {
      id: '6',
      title: 'Coût d\'Opportunité',
      value: '€2,340',
      change: -18.5,
      changeType: 'decrease',
      icon: 'DollarSign'
    },
    {
      id: '7',
      title: 'Cycle Time',
      value: '4.2h',
      change: -12.8,
      changeType: 'decrease',
      icon: 'Clock'
    },
    {
      id: '8',
      title: 'Score NPS',
      value: '72',
      change: 6.5,
      changeType: 'increase',
      icon: 'Star'
    }
  ]
};

export const mockKPIs: KPI[] = mockKPIsByCategory.transport;

export const mockSalesDataByCategory: Record<string, Record<string, SalesData[]>> = {
  transport: {
    '7d': [
      { date: '2024-01-01', value: 12200 },
      { date: '2024-01-02', value: 11800 },
      { date: '2024-01-03', value: 13500 },
      { date: '2024-01-04', value: 12100 },
      { date: '2024-01-05', value: 14800 },
      { date: '2024-01-06', value: 13300 },
      { date: '2024-01-07', value: 12700 }
    ],
    '30d': [
      { date: '2024-01-01', value: 38000 },
      { date: '2024-01-08', value: 42000 },
      { date: '2024-01-15', value: 39000 },
      { date: '2024-01-22', value: 45000 },
      { date: '2024-01-29', value: 41000 }
    ],
    '90d': [
      { date: '2024-01-01', value: 115000 },
      { date: '2024-02-01', value: 122000 },
      { date: '2024-03-01', value: 118000 }
    ]
  },
  entrepot: {
    '7d': [
      { date: '2024-01-01', value: 8200 },
      { date: '2024-01-02', value: 7800 },
      { date: '2024-01-03', value: 8500 },
      { date: '2024-01-04', value: 8100 },
      { date: '2024-01-05', value: 9200 },
      { date: '2024-01-06', value: 8600 },
      { date: '2024-01-07', value: 8900 }
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
  },
  commandes: {
    '7d': [
      { date: '2024-01-01', value: 15600 },
      { date: '2024-01-02', value: 14200 },
      { date: '2024-01-03', value: 16800 },
      { date: '2024-01-04', value: 15400 },
      { date: '2024-01-05', value: 17200 },
      { date: '2024-01-06', value: 16100 },
      { date: '2024-01-07', value: 15900 }
    ],
    '30d': [
      { date: '2024-01-01', value: 48000 },
      { date: '2024-01-08', value: 52000 },
      { date: '2024-01-15', value: 49000 },
      { date: '2024-01-22', value: 55000 },
      { date: '2024-01-29', value: 51000 }
    ],
    '90d': [
      { date: '2024-01-01', value: 145000 },
      { date: '2024-02-01', value: 152000 },
      { date: '2024-03-01', value: 148000 }
    ]
  },
  achats: {
    '7d': [
      { date: '2024-01-01', value: 11200 },
      { date: '2024-01-02', value: 10800 },
      { date: '2024-01-03', value: 12500 },
      { date: '2024-01-04', value: 11100 },
      { date: '2024-01-05', value: 13800 },
      { date: '2024-01-06', value: 12300 },
      { date: '2024-01-07', value: 11700 }
    ],
    '30d': [
      { date: '2024-01-01', value: 78000 },
      { date: '2024-01-08', value: 82000 },
      { date: '2024-01-15', value: 79000 },
      { date: '2024-01-22', value: 95000 },
      { date: '2024-01-29', value: 91000 }
    ],
    '90d': [
      { date: '2024-01-01', value: 235000 },
      { date: '2024-02-01', value: 252000 },
      { date: '2024-03-01', value: 248000 }
    ]
  },
  qualite: {
    '7d': [
      { date: '2024-01-01', value: 98.5 },
      { date: '2024-01-02', value: 97.8 },
      { date: '2024-01-03', value: 99.2 },
      { date: '2024-01-04', value: 98.1 },
      { date: '2024-01-05', value: 99.5 },
      { date: '2024-01-06', value: 98.9 },
      { date: '2024-01-07', value: 99.1 }
    ],
    '30d': [
      { date: '2024-01-01', value: 97.5 },
      { date: '2024-01-08', value: 98.2 },
      { date: '2024-01-15', value: 98.8 },
      { date: '2024-01-22', value: 99.1 },
      { date: '2024-01-29', value: 98.9 }
    ],
    '90d': [
      { date: '2024-01-01', value: 96.8 },
      { date: '2024-02-01', value: 98.2 },
      { date: '2024-03-01', value: 98.9 }
    ]
  },
  financiers: {
    '7d': [
      { date: '2024-01-01', value: 42200 },
      { date: '2024-01-02', value: 41800 },
      { date: '2024-01-03', value: 43500 },
      { date: '2024-01-04', value: 42100 },
      { date: '2024-01-05', value: 44800 },
      { date: '2024-01-06', value: 43300 },
      { date: '2024-01-07', value: 42700 }
    ],
    '30d': [
      { date: '2024-01-01', value: 138000 },
      { date: '2024-01-08', value: 142000 },
      { date: '2024-01-15', value: 139000 },
      { date: '2024-01-22', value: 145000 },
      { date: '2024-01-29', value: 141000 }
    ],
    '90d': [
      { date: '2024-01-01', value: 415000 },
      { date: '2024-02-01', value: 422000 },
      { date: '2024-03-01', value: 418000 }
    ]
  },
  retours: {
    '7d': [
      { date: '2024-01-01', value: 2.2 },
      { date: '2024-01-02', value: 1.8 },
      { date: '2024-01-03', value: 3.5 },
      { date: '2024-01-04', value: 2.1 },
      { date: '2024-01-05', value: 4.8 },
      { date: '2024-01-06', value: 3.3 },
      { date: '2024-01-07', value: 2.7 }
    ],
    '30d': [
      { date: '2024-01-01', value: 3.8 },
      { date: '2024-01-08', value: 4.2 },
      { date: '2024-01-15', value: 3.9 },
      { date: '2024-01-22', value: 4.5 },
      { date: '2024-01-29', value: 4.1 }
    ],
    '90d': [
      { date: '2024-01-01', value: 4.5 },
      { date: '2024-02-01', value: 4.2 },
      { date: '2024-03-01', value: 3.8 }
    ]
  },
  performance: {
    '7d': [
      { date: '2024-01-01', value: 85.2 },
      { date: '2024-01-02', value: 84.8 },
      { date: '2024-01-03', value: 86.5 },
      { date: '2024-01-04', value: 85.1 },
      { date: '2024-01-05', value: 88.2 },
      { date: '2024-01-06', value: 87.3 },
      { date: '2024-01-07', value: 87.5 }
    ],
    '30d': [
      { date: '2024-01-01', value: 83.5 },
      { date: '2024-01-08', value: 85.2 },
      { date: '2024-01-15', value: 84.8 },
      { date: '2024-01-22', value: 86.9 },
      { date: '2024-01-29', value: 87.5 }
    ],
    '90d': [
      { date: '2024-01-01', value: 81.8 },
      { date: '2024-02-01', value: 84.2 },
      { date: '2024-03-01', value: 87.5 }
    ]
  }
};

export const mockSalesData: Record<string, SalesData[]> = mockSalesDataByCategory.transport;

export const mockStockDataByCategory: Record<string, StockData[]> = {
  transport: [
    { category: 'Transport Local', value: 45, color: '#FF6B2C' },
    { category: 'Transport National', value: 35, color: '#F97316' },
    { category: 'Transport International', value: 20, color: '#FB923C' }
  ],
  entrepot: [
    { category: 'Zone A', value: 40, color: '#8b5cf6' },
    { category: 'Zone B', value: 35, color: '#a78bfa' },
    { category: 'Zone C', value: 25, color: '#c4b5fd' }
  ],
  commandes: [
    { category: 'Standard', value: 50, color: '#3b82f6' },
    { category: 'Express', value: 30, color: '#60a5fa' },
    { category: 'Urgent', value: 20, color: '#93c5fd' }
  ],
  achats: [
    { category: 'Matières Premières', value: 55, color: '#10b981' },
    { category: 'Fournitures', value: 25, color: '#34d399' },
    { category: 'Services', value: 20, color: '#6ee7b7' }
  ],
  qualite: [
    { category: 'Conformes', value: 89, color: '#22c55e' },
    { category: 'En Contrôle', value: 8, color: '#fbbf24' },
    { category: 'Non-Conformes', value: 3, color: '#ef4444' }
  ],
  financiers: [
    { category: 'Transport', value: 42, color: '#f59e0b' },
    { category: 'Entreposage', value: 28, color: '#fbbf24' },
    { category: 'Main d\'Œuvre', value: 30, color: '#fcd34d' }
  ],
  retours: [
    { category: 'Défaut', value: 48, color: '#ef4444' },
    { category: 'Erreur Commande', value: 32, color: '#f87171' },
    { category: 'Autre', value: 20, color: '#fca5a5' }
  ],
  performance: [
    { category: 'Excellent', value: 45, color: '#22c55e' },
    { category: 'Bon', value: 35, color: '#84cc16' },
    { category: 'À Améliorer', value: 20, color: '#fbbf24' }
  ]
};

export const mockStockData: StockData[] = mockStockDataByCategory.transport;