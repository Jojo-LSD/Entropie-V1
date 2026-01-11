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
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      <div className="flex-shrink-0">
        <DashboardSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-8 pr-2">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 animate-fade-in-up">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            kpis.map(kpi => (
              <div key={kpi.id} className="hover-lift">
                <KpiCard kpi={kpi} />
              </div>
            ))
          )}
        </div>

        {/* Main Charts Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-scale-in">
          <div className="hover-lift"><SalesChart category={selectedCategory} /></div>
          <div className="hover-lift"><StockDonut category={selectedCategory} /></div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slide-in-right">
          <div className="hover-lift"><TopProducts /></div>
          <div className="hover-lift"><PerformanceRadar /></div>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fade-in-up">
          <div className="hover-lift"><TopClients /></div>
          <div className="hover-lift"><MarginEvolution /></div>
        </div>
      </div>
    </div>
  );
};