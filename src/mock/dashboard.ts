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