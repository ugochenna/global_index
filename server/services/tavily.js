// Tavily Search Service
// Searches for current stock index values

export async function searchIndexValue(indexName, country) {
  const query = `${indexName} ${country} stock index value today`;

  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: 'basic',
      max_results: 3
    })
  });

  if (!response.ok) {
    throw new Error(`Tavily search failed: ${response.statusText}`);
  }

  const data = await response.json();

  // Combine the content from top results for better extraction
  const combinedContent = data.results
    .map(r => r.content)
    .join('\n\n');

  return {
    query,
    content: combinedContent,
    rawResults: data.results
  };
}

