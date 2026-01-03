// API Service for fetching stock data from static cache

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

export async function fetchStockData(): Promise<StockDataResponse | null> {
  try {
    const response = await fetch('/data/cache.json');
    if (!response.ok) {
      console.warn('Stock data not available');
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch stock data:', error);
    return null;
  }
}
