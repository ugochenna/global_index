// API Service for fetching stock data from backend

const API_BASE = 'http://localhost:3002';

export interface CachedIndexData {
  value: string | null;
  found: boolean;
}

export interface CachedGDPData {
  gdp: number | null;
  year?: string;
  found: boolean;
}

export interface CachedCountryData {
  indices: Record<string, CachedIndexData>;
  gdp?: CachedGDPData;
}

export interface StockDataResponse {
  updatedAt: string;
  data: Record<string, CachedCountryData>;
}

export interface CacheStatus {
  hasData: boolean;
  updatedAt: string | null;
  ageHours: number | null;
  countriesCount: number;
}

export async function fetchStockData(): Promise<StockDataResponse | null> {
  try {
    const response = await fetch(`${API_BASE}/api/stocks`);
    if (!response.ok) {
      console.warn('Stock data not available yet');
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch stock data:', error);
    return null;
  }
}

export async function fetchCacheStatus(): Promise<CacheStatus | null> {
  try {
    const response = await fetch(`${API_BASE}/api/status`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch cache status:', error);
    return null;
  }
}

export async function triggerRefresh(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/refresh`, { method: 'POST' });
    return response.ok;
  } catch (error) {
    console.error('Failed to trigger refresh:', error);
    return false;
  }
}
