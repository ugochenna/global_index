// Hook for managing stock data with live updates

import { useState, useEffect, useCallback } from 'react';
import { STOCK_DATA } from '../constants';
import { fetchStockData, StockDataResponse } from '../services/api';
import { StockData } from '../types';

export function useStockData() {
  const [stockData, setStockData] = useState<StockData[]>(STOCK_DATA);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mergeWithLiveData = useCallback((liveData: StockDataResponse) => {
    const merged = STOCK_DATA.map(stock => {
      const liveCountry = liveData.data[stock.id];
      if (!liveCountry) return stock;

      // Clone the stock object
      const updated = { ...stock };

      // Update GDP if available
      if (liveCountry.gdp?.found && liveCountry.gdp.gdp !== null) {
        updated.gdp = liveCountry.gdp.gdp;
      }

      // Update market value for single-index countries
      const indexNames = Object.keys(liveCountry.indices);
      if (indexNames.length === 1 && !stock.indices) {
        const indexData = liveCountry.indices[indexNames[0]];
        if (indexData.found && indexData.value) {
          updated.marketValue = indexData.value;
        }
      }

      // Update multiple indices for countries like USA, India, UAE
      if (stock.indices && stock.indices.length > 0) {
        updated.indices = stock.indices.map(idx => {
          const liveIdx = liveCountry.indices[idx.name];
          if (liveIdx?.found && liveIdx.value) {
            return { ...idx, value: liveIdx.value };
          }
          return idx;
        });
      }

      return updated;
    });

    return merged;
  }, []);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const liveData = await fetchStockData();

      if (liveData) {
        const merged = mergeWithLiveData(liveData);
        setStockData(merged);
        setLastUpdated(liveData.updatedAt);
      }
      // If no live data, we keep using static STOCK_DATA
    } catch (err) {
      setError('Failed to load live data. Using cached values.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [mergeWithLiveData]);

  useEffect(() => {
    loadData();

    // Refresh every 30 minutes while the app is open
    const interval = setInterval(loadData, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadData]);

  return {
    stockData,
    lastUpdated,
    isLoading,
    error,
    refresh: loadData
  };
}
