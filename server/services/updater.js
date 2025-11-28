// Data Updater Service
// Fetches and updates stock index data and GDP for all countries

import { searchIndexValue } from './tavily.js';
import { extractIndexValue } from './claude.js';
import { setCache } from './cache.js';
import { fetchAllGDP } from './worldbank.js';

// List of indices to fetch (matches frontend data)
const INDICES_TO_FETCH = [
  { id: 'usa', country: 'United States', indices: ['Dow Jones', 'S&P 500', 'NASDAQ'] },
  { id: 'can', country: 'Canada', indices: ['S&P/TSX Composite'] },
  { id: 'mex', country: 'Mexico', indices: ['IPC BMV'] },
  { id: 'bra', country: 'Brazil', indices: ['IBOVESPA'] },
  { id: 'arg', country: 'Argentina', indices: ['MERVAL'] },
  { id: 'col', country: 'Colombia', indices: ['COLCAP'] },
  { id: 'chl', country: 'Chile', indices: ['S&P IPSA'] },
  { id: 'gbr', country: 'United Kingdom', indices: ['FTSE 100'] },
  { id: 'deu', country: 'Germany', indices: ['DAX 40'] },
  { id: 'fra', country: 'France', indices: ['CAC 40'] },
  { id: 'ita', country: 'Italy', indices: ['FTSE MIB'] },
  { id: 'esp', country: 'Spain', indices: ['IBEX 35'] },
  { id: 'nld', country: 'Netherlands', indices: ['AEX'] },
  { id: 'che', country: 'Switzerland', indices: ['SMI'] },
  { id: 'nga', country: 'Nigeria', indices: ['NGX All-Share'] },
  { id: 'zaf', country: 'South Africa', indices: ['JSE Top 40'] },
  { id: 'egy', country: 'Egypt', indices: ['EGX 30'] },
  { id: 'mar', country: 'Morocco', indices: ['MASI'] },
  { id: 'jpn', country: 'Japan', indices: ['Nikkei 225'] },
  { id: 'chn', country: 'China', indices: ['Shanghai Composite'] },
  { id: 'ind', country: 'India', indices: ['Nifty 50', 'BSE Sensex'] },
  { id: 'idn', country: 'Indonesia', indices: ['IDX Composite'] },
  { id: 'kor', country: 'South Korea', indices: ['KOSPI'] },
  { id: 'sgp', country: 'Singapore', indices: ['Straits Times Index'] },
  { id: 'hkg', country: 'Hong Kong', indices: ['Hang Seng Index'] },
  { id: 'sau', country: 'Saudi Arabia', indices: ['Tadawul All Share'] },
  { id: 'are', country: 'UAE', indices: ['ADX General', 'DFM General'] },
  { id: 'aus', country: 'Australia', indices: ['ASX 200'] },
  { id: 'nzl', country: 'New Zealand', indices: ['NZX 50'] }
];

// Add delay between API calls to avoid rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function updateAllIndices() {
  console.log('Starting full update (indices + GDP)...');
  const results = {};

  // First, fetch GDP data from World Bank (free, fast)
  console.log('\n--- Fetching GDP data ---');
  const gdpData = await fetchAllGDP();

  // Then fetch stock indices from Tavily + Claude
  console.log('\n--- Fetching stock indices ---');
  for (const item of INDICES_TO_FETCH) {
    console.log(`Fetching ${item.country}...`);
    results[item.id] = {
      indices: {},
      gdp: gdpData[item.id] || { gdp: null, found: false }
    };

    for (const indexName of item.indices) {
      try {
        // Search with Tavily
        const searchResult = await searchIndexValue(indexName, item.country);

        // Extract value with Claude
        const extracted = await extractIndexValue(searchResult.content, indexName);

        results[item.id].indices[indexName] = {
          value: extracted.value,
          found: extracted.found
        };

        console.log(`  ${indexName}: ${extracted.value || 'not found'}`);

        // Small delay to avoid rate limiting
        await delay(500);
      } catch (error) {
        console.error(`  Error fetching ${indexName}:`, error.message);
        results[item.id].indices[indexName] = { value: null, found: false, error: error.message };
      }
    }
  }

  // Save to cache
  await setCache(results);
  console.log('\nUpdate complete!');

  return results;
}

// Update a single country (for on-demand requests)
export async function updateSingleCountry(countryId) {
  const item = INDICES_TO_FETCH.find(i => i.id === countryId);
  if (!item) {
    throw new Error(`Country ${countryId} not found`);
  }

  const result = { indices: {} };

  for (const indexName of item.indices) {
    const searchResult = await searchIndexValue(indexName, item.country);
    const extracted = await extractIndexValue(searchResult.content, indexName);

    result.indices[indexName] = {
      value: extracted.value,
      found: extracted.found
    };
  }

  return result;
}
