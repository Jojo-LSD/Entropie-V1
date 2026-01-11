import { KPI, SalesData, StockData, Period } from '../types';
import { mockKPIs, mockSalesData, mockStockData } from '../mock/dashboard';

export class DashboardService {
  // Future: Replace with actual API calls to PostgreSQL via FastAPI
  async getKPIs(): Promise<KPI[]> {
    // Mock delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockKPIs;
  }

  async getSalesData(period: Period): Promise<SalesData[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockSalesData[period];
  }

  async getStockData(): Promise<StockData[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockStockData;
  }
}

export const dashboardService = new DashboardService();