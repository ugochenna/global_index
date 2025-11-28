export enum Region {
  AFRICA = 'Africa',
  NORTH_AMERICA = 'North America',
  SOUTH_AMERICA = 'South America',
  EUROPE = 'Europe',
  ASIA = 'Asia',
  MIDDLE_EAST = 'Middle East',
  OCEANIA = 'Oceania'
}

export interface MarketIndex {
  name: string;
  value: string;
  notes: string;
}

export interface StockData {
  id: string;
  country: string;
  flag: string;
  indexName: string;
  currency: string;
  currencySymbol: string;
  exchangeRate: string;
  gdp: number; // In Trillions USD
  notes: string;
  funFact: string;
  region: Region;
  lat: number;
  lng: number;
  marketValue: string; // Sample static index value
  indices?: MarketIndex[]; // Optional array for multiple indexes
}

export interface ComparisonData {
  name: string;
  gdp: number;
  fill: string;
}