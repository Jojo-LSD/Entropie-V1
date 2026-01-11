import { useState, useEffect } from 'react';
import { KPI } from '../types';
import { KpiCard } from '../components/dashboard/KpiCard';
import { SalesChart } from '../components/dashboard/SalesChart';
import { StockDonut } from '../components/dashboard/StockDonut';
import { TopProducts } from '../components/dashboard/TopProducts';
import { PerformanceRadar } from '../components/dashboard/PerformanceRadar';
import { TopClients } from '../components/dashboard/TopClients';
import { MarginEvolution } from '../components/dashboard/MarginEvolution';
import { dashboardService } from '../api/dashboardApi';
import { SkeletonCard } from '../components/ui/Skeleton';
import { DashboardSidebar } from '../components/layout/DashboardSidebar';

export const Dashboard = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('transport');

  useEffect(() => {
    const fetchKpis = async () => {
      setIsLoading(true);
      try {
        const kpiData = await dashboardService.getKPIs(selectedCategory);
        setKpis(kpiData);
      } catch (error) {
        console.error('Failed to fetch KPIs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKpis();
  }, [selectedCategory]);

  const getCategoryTitle = () => {
    const titles: { [key: string]: string } = {
      transport: 'KPI Transport',
      entrepot: 'KPI Entrepôt / Stockage',
      commandes: 'KPI Commandes / Fulfillment',
      achats: 'KPI Achats & Approvisionnement',
      qualite: 'KPI Qualité & Conformité',
      financiers: 'KPI Financiers Logistiques',
      retours: 'KPI Retours & Reverse Logistics',
      performance: 'KPI Performance & Pilotage Global',
    };
    return titles[selectedCategory] || 'Tableaux de bord';
  };

  return (
    <div className="flex gap-6">
      <DashboardSidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="flex-1 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            kpis.map(kpi => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))
          )}
        </div>

        {/* Main Charts Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SalesChart />
          <StockDonut />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopProducts />
          <PerformanceRadar />
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TopClients />
          <MarginEvolution />
        </div>
      </div>
    </div>
  );
};