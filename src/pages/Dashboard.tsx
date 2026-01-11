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

export const Dashboard = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      setIsLoading(true);
      try {
        const kpiData = await dashboardService.getKPIs();
        setKpis(kpiData);
      } catch (error) {
        console.error('Failed to fetch KPIs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKpis();
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Tableaux de bord
        </h1>
        <p className="text-slate-600 text-lg">
          Vue d'ensemble de votre activité
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
  );
};