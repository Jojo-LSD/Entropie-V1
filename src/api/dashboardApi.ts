import { KPI, SalesData, StockData, Period } from '../types';
import { mockKPIsByCategory, mockSalesDataByCategory, mockStockDataByCategory } from '../mock/dashboard';

export class DashboardService {
  // Future: Replace with actual API calls to PostgreSQL via FastAPI
  async getKPIs(category: string = 'transport'): Promise<KPI[]> {
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockKPIsByCategory[category] || mockKPIsByCategory.transport;
  }

  async getSalesData(period: Period, category: string = 'transport'): Promise<SalesData[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockSalesDataByCategory[category]?.[period] || mockSalesDataByCategory.transport[period];
  }

  async getStockData(category: string = 'transport'): Promise<StockData[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockStockDataByCategory[category] || mockStockDataByCategory.transport;
  }
}

export const dashboardService = new DashboardService();