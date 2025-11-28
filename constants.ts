import { Region, StockData } from './types';

export const US_GDP = 27.4; // Trillions

export const GLOSSARY = [
  { term: "Stock Index", definition: "A number that tracks how a group of companies are doing. If the number goes up, those companies are generally worth more!" },
  { term: "GDP (Gross Domestic Product)", definition: "Measures how much a country produces in a year. It's like measuring how big an economy is." },
  { term: "Exchange Rate", definition: "This tells you how much one country's money is worth compared to another country's money." },
];

// A curated list based on the project brief.
export const STOCK_DATA: StockData[] = [
  // --- NORTH AMERICA ---
  {
    id: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    indexName: 'Dow Jones / S&P 500 / NASDAQ',
    currency: 'US Dollar',
    currencySymbol: '$',
    exchangeRate: 'Base Currency',
    gdp: 27.4,
    notes: 'The US has the largest stock markets in the world.',
    funFact: 'The Dow Jones started in 1896 with just 12 companies! Today it includes giants like Apple and Microsoft.',
    region: Region.NORTH_AMERICA,
    lat: 39.8,
    lng: -98.5,
    marketValue: 'Multiple Indices',
    indices: [
      {
        name: 'Dow Jones',
        value: '42,840.26',
        notes: '30 major US companies — the most famous index!'
      },
      {
        name: 'S&P 500',
        value: '5,842.21',
        notes: 'Tracks 500 of the biggest US companies.'
      },
      {
        name: 'NASDAQ',
        value: '18,342.10',
        notes: 'Mostly technology companies like Apple and Google.'
      }
    ]
  },
  {
    id: 'can',
    country: 'Canada',
    flag: '🇨🇦',
    indexName: 'S&P/TSX Composite',
    currency: 'Canadian Dollar',
    currencySymbol: 'C$',
    exchangeRate: '1 USD = 1.36 CAD',
    gdp: 2.1,
    notes: 'Canada\'s main stock index, heavy on banking and energy companies.',
    funFact: 'Canada has the longest coastline of any country in the world!',
    region: Region.NORTH_AMERICA,
    lat: 56.1,
    lng: -106.3,
    marketValue: '22,234.10'
  },
  {
    id: 'mex',
    country: 'Mexico',
    flag: '🇲🇽',
    indexName: 'IPC (BMV IPC)',
    currency: 'Mexican Peso',
    currencySymbol: 'MX$',
    exchangeRate: '1 USD = 17.10 MXN',
    gdp: 1.5,
    notes: 'Mexico\'s main stock index tracking 35 major companies.',
    funFact: 'Mexico City is sinking about 10 inches every year because it was built on a lake!',
    region: Region.NORTH_AMERICA,
    lat: 23.6,
    lng: -102.5,
    marketValue: '57,210.50'
  },

  // --- SOUTH AMERICA ---
  {
    id: 'bra',
    country: 'Brazil',
    flag: '🇧🇷',
    indexName: 'IBOVESPA',
    currency: 'Brazilian Real',
    currencySymbol: 'R$',
    exchangeRate: '1 USD = 5.15 BRL',
    gdp: 2.17,
    notes: 'Latin America\'s largest stock exchange, located in São Paulo.',
    funFact: 'Brazil produces about a third of all the world\'s coffee.',
    region: Region.SOUTH_AMERICA,
    lat: -14.2,
    lng: -51.9,
    marketValue: '128,450.00'
  },
  {
    id: 'arg',
    country: 'Argentina',
    flag: '🇦🇷',
    indexName: 'MERVAL',
    currency: 'Argentine Peso',
    currencySymbol: 'ARS',
    exchangeRate: '1 USD = 880 ARS',
    gdp: 0.64,
    notes: 'Argentina\'s main index. The market here can be very volatile!',
    funFact: 'Argentina is the birthplace of the Tango dance.',
    region: Region.SOUTH_AMERICA,
    lat: -38.4,
    lng: -63.6,
    marketValue: '1,245,300'
  },
  {
    id: 'col',
    country: 'Colombia',
    flag: '🇨🇴',
    indexName: 'COLCAP',
    currency: 'Colombian Peso',
    currencySymbol: 'COP',
    exchangeRate: '1 USD = 3900 COP',
    gdp: 0.36,
    notes: 'Colombia\'s main stock index.',
    funFact: 'Colombia is the second most biodiverse country in the world.',
    region: Region.SOUTH_AMERICA,
    lat: 4.6,
    lng: -74.1,
    marketValue: '1,350.40'
  },
  {
    id: 'chl',
    country: 'Chile',
    flag: '🇨🇱',
    indexName: 'S&P IPSA',
    currency: 'Chilean Peso',
    currencySymbol: 'CLP',
    exchangeRate: '1 USD = 950 CLP',
    gdp: 0.3,
    notes: 'Chile\'s main stock index.',
    funFact: 'The Atacama Desert in Chile is the driest place on Earth.',
    region: Region.SOUTH_AMERICA,
    lat: -35.6,
    lng: -71.5,
    marketValue: '6,450.80'
  },

  // --- EUROPE ---
  {
    id: 'gbr',
    country: 'United Kingdom',
    flag: '🇬🇧',
    indexName: 'FTSE 100',
    currency: 'British Pound',
    currencySymbol: '£',
    exchangeRate: '1 USD = 0.79 GBP',
    gdp: 3.3,
    notes: 'Tracks the 100 biggest companies in the UK, often called the "Footsie".',
    funFact: 'The London Stock Exchange is one of the oldest in the world, tracing roots back to coffee houses in the 1600s.',
    region: Region.EUROPE,
    lat: 55.3,
    lng: -3.4,
    marketValue: '8,210.45'
  },
  {
    id: 'deu',
    country: 'Germany',
    flag: '🇩🇪',
    indexName: 'DAX 40',
    currency: 'Euro',
    currencySymbol: '€',
    exchangeRate: '1 USD = 0.92 EUR',
    gdp: 4.5,
    notes: '40 biggest German companies. Germany has the largest economy in Europe.',
    funFact: 'Famous DAX companies include BMW, Adidas, and Volkswagen. Germany loves engineering!',
    region: Region.EUROPE,
    lat: 51.1,
    lng: 10.4,
    marketValue: '18,456.32'
  },
  {
    id: 'fra',
    country: 'France',
    flag: '🇫🇷',
    indexName: 'CAC 40',
    currency: 'Euro',
    currencySymbol: '€',
    exchangeRate: '1 USD = 0.92 EUR',
    gdp: 3.0,
    notes: '40 biggest French companies, including luxury brands like LVMH.',
    funFact: 'France is the most visited country in the world.',
    region: Region.EUROPE,
    lat: 46.2,
    lng: 2.2,
    marketValue: '7,980.20'
  },
  {
    id: 'ita',
    country: 'Italy',
    flag: '🇮🇹',
    indexName: 'FTSE MIB',
    currency: 'Euro',
    currencySymbol: '€',
    exchangeRate: '1 USD = 0.92 EUR',
    gdp: 2.2,
    notes: '40 biggest Italian companies. Italy is famous for fashion and cars!',
    funFact: 'Italy has more UNESCO World Heritage sites than any other country in the world.',
    region: Region.EUROPE,
    lat: 41.9,
    lng: 12.6,
    marketValue: '34,250.50'
  },
  {
    id: 'esp',
    country: 'Spain',
    flag: '🇪🇸',
    indexName: 'IBEX 35',
    currency: 'Euro',
    currencySymbol: '€',
    exchangeRate: '1 USD = 0.92 EUR',
    gdp: 1.6,
    notes: '35 biggest Spanish companies.',
    funFact: 'Spain produces over 40% of the world\'s olive oil.',
    region: Region.EUROPE,
    lat: 40.4,
    lng: -3.7,
    marketValue: '11,150.20'
  },
  {
    id: 'nld',
    country: 'Netherlands',
    flag: '🇳🇱',
    indexName: 'AEX',
    currency: 'Euro',
    currencySymbol: '€',
    exchangeRate: '1 USD = 0.92 EUR',
    gdp: 1.1,
    notes: 'Tracks the 25 largest Dutch companies.',
    funFact: 'There are more bicycles than people in the Netherlands!',
    region: Region.EUROPE,
    lat: 52.1,
    lng: 5.3,
    marketValue: '910.45'
  },
  {
    id: 'che',
    country: 'Switzerland',
    flag: '🇨🇭',
    indexName: 'SMI',
    currency: 'Swiss Franc',
    currencySymbol: 'CHF',
    exchangeRate: '1 USD = 0.91 CHF',
    gdp: 0.9,
    notes: '20 biggest Swiss companies, known for pharmaceuticals and banking.',
    funFact: 'Switzerland has four national languages: German, French, Italian, and Romansh.',
    region: Region.EUROPE,
    lat: 46.8,
    lng: 8.2,
    marketValue: '11,950.80'
  },
  
  // --- AFRICA ---
  {
    id: 'nga',
    country: 'Nigeria',
    flag: '🇳🇬',
    indexName: 'NGX All-Share',
    currency: 'Nigerian Naira',
    currencySymbol: '₦',
    exchangeRate: '1 USD = 1400 NGN',
    gdp: 0.39,
    notes: 'Africa\'s largest economy and biggest stock exchange by trading volume.',
    funFact: 'Nollywood (Nigeria\'s film industry) produces the second most movies in the world!',
    region: Region.AFRICA,
    lat: 9.0,
    lng: 8.6,
    marketValue: '99,850.15'
  },
  {
    id: 'zaf',
    country: 'South Africa',
    flag: '🇿🇦',
    indexName: 'JSE Top 40',
    currency: 'South African Rand',
    currencySymbol: 'R',
    exchangeRate: '1 USD = 18.50 ZAR',
    gdp: 0.38,
    notes: 'Africa\'s most valuable stock exchange, rich in mining companies.',
    funFact: 'South Africa has three different capital cities: Pretoria, Cape Town, and Bloemfontein.',
    region: Region.AFRICA,
    lat: -30.5,
    lng: 22.9,
    marketValue: '74,320.10'
  },
  {
    id: 'egy',
    country: 'Egypt',
    flag: '🇪🇬',
    indexName: 'EGX 30',
    currency: 'Egyptian Pound',
    currencySymbol: 'E£',
    exchangeRate: '1 USD = 47.50 EGP',
    gdp: 0.39,
    notes: 'One of Africa\'s oldest stock exchanges, started in 1883!',
    funFact: 'The Great Pyramid of Giza is the only surviving wonder of the ancient world.',
    region: Region.AFRICA,
    lat: 26.8,
    lng: 30.8,
    marketValue: '28,150.00'
  },
  {
    id: 'mar',
    country: 'Morocco',
    flag: '🇲🇦',
    indexName: 'MASI',
    currency: 'Moroccan Dirham',
    currencySymbol: 'MAD',
    exchangeRate: '1 USD = 10 MAD',
    gdp: 0.14,
    notes: 'North Africa\'s second-largest exchange.',
    funFact: 'The oldest university in the world is in Fez, Morocco, founded in 859 AD.',
    region: Region.AFRICA,
    lat: 31.8,
    lng: -7.1,
    marketValue: '13,250.60'
  },

  // --- ASIA ---
  {
    id: 'jpn',
    country: 'Japan',
    flag: '🇯🇵',
    indexName: 'Nikkei 225',
    currency: 'Japanese Yen',
    currencySymbol: '¥',
    exchangeRate: '1 USD = 155 JPY',
    gdp: 4.2,
    notes: 'Tracks 225 major Japanese companies like Sony and Toyota.',
    funFact: 'Japan has over 6,800 islands!',
    region: Region.ASIA,
    lat: 36.2,
    lng: 138.2,
    marketValue: '38,900.50'
  },
  {
    id: 'chn',
    country: 'China',
    flag: '🇨🇳',
    indexName: 'Shanghai Composite',
    currency: 'Chinese Yuan',
    currencySymbol: 'CNY',
    exchangeRate: '1 USD = 7.23 CNY',
    gdp: 17.7,
    notes: 'China\'s biggest stock exchange. The second largest economy in the world.',
    funFact: 'The Great Wall of China is over 13,000 miles long.',
    region: Region.ASIA,
    lat: 35.8,
    lng: 104.1,
    marketValue: '3,150.25'
  },
  {
    id: 'ind',
    country: 'India',
    flag: '🇮🇳',
    indexName: 'Nifty 50 / Sensex',
    currency: 'Indian Rupee',
    currencySymbol: '₹',
    exchangeRate: '1 USD = 83.50 INR',
    gdp: 3.7,
    notes: 'India has two major stock exchanges: the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE).',
    funFact: 'India is the wettest inhabited place on Earth (Mawsynram village).',
    region: Region.ASIA,
    lat: 20.5,
    lng: 78.9,
    marketValue: 'Multiple Indices',
    indices: [
        {
            name: 'Nifty 50',
            value: '22,500.80',
            notes: '50 major Indian companies listed on the NSE.'
        },
        {
            name: 'BSE Sensex',
            value: '74,100.30',
            notes: '30 major Indian companies listed on the BSE.'
        }
    ]
  },
  {
    id: 'idn',
    country: 'Indonesia',
    flag: '🇮🇩',
    indexName: 'IDX Composite',
    currency: 'Indonesian Rupiah',
    currencySymbol: 'Rp',
    exchangeRate: '1 USD = 16,000 IDR',
    gdp: 1.3,
    notes: 'Indonesia\'s main index. The world\'s 4th most populous country!',
    funFact: 'Indonesia is home to the Komodo dragon, the world\'s largest lizard.',
    region: Region.ASIA,
    lat: -0.7,
    lng: 113.9,
    marketValue: '7,150.20'
  },
  {
    id: 'kor',
    country: 'South Korea',
    flag: '🇰🇷',
    indexName: 'KOSPI',
    currency: 'South Korean Won',
    currencySymbol: '₩',
    exchangeRate: '1 USD = 1380 KRW',
    gdp: 1.7,
    notes: 'South Korea\'s main index, featuring tech giants like Samsung.',
    funFact: 'South Korea has the fastest average internet speeds in the world.',
    region: Region.ASIA,
    lat: 35.9,
    lng: 127.8,
    marketValue: '2,750.30'
  },
  {
    id: 'sgp',
    country: 'Singapore',
    flag: '🇸🇬',
    indexName: 'Straits Times Index',
    currency: 'Singapore Dollar',
    currencySymbol: 'S$',
    exchangeRate: '1 USD = 1.35 SGD',
    gdp: 0.5,
    notes: 'Tracks the top 30 companies listed in Singapore.',
    funFact: 'Singapore is one of the only three city-states in the world.',
    region: Region.ASIA,
    lat: 1.35,
    lng: 103.8,
    marketValue: '3,250.10'
  },
   {
    id: 'hkg',
    country: 'Hong Kong',
    flag: '🇭🇰',
    indexName: 'Hang Seng Index',
    currency: 'Hong Kong Dollar',
    currencySymbol: 'HK$',
    exchangeRate: '1 USD = 7.83 HKD',
    gdp: 0.36,
    notes: 'A major financial hub in Asia.',
    funFact: 'Hong Kong has more skyscrapers than any other city in the world.',
    region: Region.ASIA,
    lat: 22.3,
    lng: 114.2,
    marketValue: '17,850.20'
  },

  // --- MIDDLE EAST ---
  {
    id: 'sau',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    indexName: 'Tadawul All Share',
    currency: 'Saudi Riyal',
    currencySymbol: 'SAR',
    exchangeRate: '1 USD = 3.75 SAR',
    gdp: 1.1,
    notes: 'The largest stock exchange in the Middle East, listing giant oil companies.',
    funFact: 'Saudi Arabia is the largest country in the world without a river.',
    region: Region.MIDDLE_EAST,
    lat: 23.8,
    lng: 45.0,
    marketValue: '12,450.60'
  },
  {
    id: 'are',
    country: 'UAE',
    flag: '🇦🇪',
    indexName: 'ADX / DFM General',
    currency: 'UAE Dirham',
    currencySymbol: 'AED',
    exchangeRate: '1 USD = 3.67 AED',
    gdp: 0.5,
    notes: 'The UAE has major stock exchanges in both Abu Dhabi and Dubai.',
    funFact: 'The Burj Khalifa in Dubai is the tallest building in the world.',
    region: Region.MIDDLE_EAST,
    lat: 23.4,
    lng: 53.8,
    marketValue: 'Multiple Indices',
    indices: [
        {
            name: 'ADX General',
            value: '9,250.40',
            notes: 'Abu Dhabi Securities Exchange, UAE\'s main index.'
        },
        {
            name: 'DFM General',
            value: '4,250.30',
            notes: 'Dubai Financial Market, a major hub for finance and tourism.'
        }
    ]
  },

  // --- OCEANIA ---
  {
    id: 'aus',
    country: 'Australia',
    flag: '🇦🇺',
    indexName: 'ASX 200',
    currency: 'Australian Dollar',
    currencySymbol: 'A$',
    exchangeRate: '1 USD = 1.52 AUD',
    gdp: 1.7,
    notes: '200 biggest Australian companies, heavy on mining and banks.',
    funFact: 'There are more kangaroos than humans in Australia!',
    region: Region.OCEANIA,
    lat: -25.2,
    lng: 133.7,
    marketValue: '7,850.10'
  },
  {
    id: 'nzl',
    country: 'New Zealand',
    flag: '🇳🇿',
    indexName: 'NZX 50',
    currency: 'New Zealand Dollar',
    currencySymbol: 'NZ$',
    exchangeRate: '1 USD = 1.66 NZD',
    gdp: 0.25,
    notes: '50 biggest New Zealand companies.',
    funFact: 'New Zealand was the first country to give women the right to vote (1893).',
    region: Region.OCEANIA,
    lat: -40.9,
    lng: 174.8,
    marketValue: '11,850.40'
  }
];

// Color mapping for regions to make them distinct on the globe
export const REGION_COLORS: Record<Region, string> = {
  [Region.NORTH_AMERICA]: '#3b82f6', // blue-500
  [Region.SOUTH_AMERICA]: '#22c55e', // green-500
  [Region.EUROPE]: '#a855f7', // purple-500
  [Region.AFRICA]: '#eab308', // yellow-500
  [Region.ASIA]: '#ef4444', // red-500
  [Region.MIDDLE_EAST]: '#f97316', // orange-500
  [Region.OCEANIA]: '#06b6d4', // cyan-500
};