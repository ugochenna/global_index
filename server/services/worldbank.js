// World Bank API Service
// Fetches GDP data for countries (free, no API key required)

// ISO 3166-1 alpha-3 country codes for World Bank API
const COUNTRY_CODES = {
  usa: 'USA',
  can: 'CAN',
  mex: 'MEX',
  bra: 'BRA',
  arg: 'ARG',
  col: 'COL',
  chl: 'CHL',
  gbr: 'GBR',
  deu: 'DEU',
  fra: 'FRA',
  ita: 'ITA',
  esp: 'ESP',
  nld: 'NLD',
  che: 'CHE',
  nga: 'NGA',
  zaf: 'ZAF',
  egy: 'EGY',
  mar: 'MAR',
  jpn: 'JPN',
  chn: 'CHN',
  ind: 'IND',
  idn: 'IDN',
  kor: 'KOR',
  sgp: 'SGP',
  hkg: 'HKG',
  sau: 'SAU',
  are: 'ARE',
  aus: 'AUS',
  nzl: 'NZL'
};

// Fetch GDP for a single country
// Returns GDP in trillions of USD
export async function fetchGDP(countryId) {
  const countryCode = COUNTRY_CODES[countryId];
  if (!countryCode) {
    console.warn(`No country code mapping for: ${countryId}`);
    return null;
  }

  try {
    // NY.GDP.MKTP.CD = GDP in current US dollars
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&per_page=5&date=2020:2024`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`World Bank API error: ${response.statusText}`);
    }

    const data = await response.json();

    // World Bank returns [metadata, data_array]
    if (!data || !data[1] || data[1].length === 0) {
      console.warn(`No GDP data found for ${countryCode}`);
      return null;
    }

    // Find the most recent non-null value
    const gdpEntry = data[1].find(entry => entry.value !== null);
    if (!gdpEntry) {
      return null;
    }

    // Convert from USD to trillions
    const gdpInTrillions = gdpEntry.value / 1_000_000_000_000;

    return {
      gdp: Math.round(gdpInTrillions * 100) / 100, // Round to 2 decimal places
      year: gdpEntry.date,
      found: true
    };
  } catch (error) {
    console.error(`Error fetching GDP for ${countryId}:`, error.message);
    return null;
  }
}

// Fetch GDP for all countries
export async function fetchAllGDP() {
  console.log('Fetching GDP data from World Bank...');
  const results = {};

  for (const countryId of Object.keys(COUNTRY_CODES)) {
    const gdpData = await fetchGDP(countryId);
    if (gdpData) {
      results[countryId] = gdpData;
      console.log(`  ${countryId}: $${gdpData.gdp}T (${gdpData.year})`);
    } else {
      results[countryId] = { gdp: null, found: false };
    }

    // Small delay to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('GDP fetch complete!');
  return results;
}
