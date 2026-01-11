const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export type GraphicWalkerRow = Record<string, unknown>;

export const getPygwalkerData = async (
  limit: number = 10000
): Promise<GraphicWalkerRow[]> => {
  const response = await fetch(`${API_BASE_URL}/api/data/pygwalker?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`GET /api/data/pygwalker failed: ${response.statusText}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('GET /api/data/pygwalker failed: unexpected response shape');
  }
  return data as GraphicWalkerRow[];
};
