import { useState } from 'react';
import {
  Truck,
  Warehouse,
  ShoppingCart,
  Package,
  ShieldCheck,
  DollarSign,
  RotateCcw,
  TrendingUp
} from 'lucide-react';
import { PageSidebar } from './PageSidebar';

const kpiCategories = [
  { id: 'transport', label: 'KPI Transport', icon: Truck },
  { id: 'entrepot', label: 'KPI Entrepôt / Stockage', icon: Warehouse },
  { id: 'commandes', label: 'KPI Commandes / Fulfillment', icon: ShoppingCart },
  { id: 'achats', label: 'KPI Achats & Approvisionnement', icon: Package },
  { id: 'qualite', label: 'KPI Qualité & Conformité', icon: ShieldCheck },
  { id: 'financiers', label: 'KPI Financiers Logistiques', icon: DollarSign },
  { id: 'retours', label: 'KPI Retours & Reverse Logistics', icon: RotateCcw },
  { id: 'performance', label: 'KPI Performance & Pilotage Global', icon: TrendingUp },
];

interface DashboardSidebarProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const DashboardSidebar = ({ selectedCategory, onCategoryChange }: DashboardSidebarProps) => {
  return (
    <PageSidebar title="Tableaux de bord">
      {kpiCategories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-3 w-full px-4 py-3 text-left rounded-xl transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-200 shadow-sm'
                : 'hover:bg-gray-50/50'
            }`}
            style={{
              color: selectedCategory === category.id ? '#3B82F6' : 'var(--text-secondary)'
            }}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{category.label}</span>
          </button>
        );
      })}
    </PageSidebar>
  );
};
