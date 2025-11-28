// GlobalMarkets Backend Server
// Provides cached stock index data to the frontend

import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { getCache, getCacheAge } from './services/cache.js';
import { updateAllIndices, updateSingleCountry } from './services/updater.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - helpful info page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>GlobalMarkets API</title>
        <style>
          body { font-family: system-ui; background: #0f172a; color: #e2e8f0; padding: 40px; }
          h1 { color: #3b82f6; }
          a { color: #60a5fa; }
          code { background: #1e293b; padding: 4px 8px; border-radius: 4px; }
          .endpoint { margin: 16px 0; padding: 12px; background: #1e293b; border-radius: 8px; }
          .method { color: #22c55e; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>🌐 GlobalMarkets API Server</h1>
        <p>This is the backend API. For the interactive app, visit <a href="http://localhost:3001">http://localhost:3001</a></p>
        <h2>Available Endpoints:</h2>
        <div class="endpoint">
          <span class="method">GET</span> <code>/api/stocks</code> - Returns cached stock index and GDP data
        </div>
        <div class="endpoint">
          <span class="method">GET</span> <code>/api/status</code> - Returns cache status and age
        </div>
        <div class="endpoint">
          <span class="method">POST</span> <code>/api/refresh</code> - Triggers a manual data refresh
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all cached stock data
app.get('/api/stocks', async (req, res) => {
  try {
    const cache = await getCache();

    if (!cache) {
      return res.status(503).json({
        error: 'No data available yet',
        message: 'Data is being fetched. Please try again in a few minutes.'
      });
    }

    res.json({
      updatedAt: cache.updatedAt,
      data: cache.data
    });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get cache status
app.get('/api/status', async (req, res) => {
  const cache = await getCache();
  const ageHours = await getCacheAge();

  res.json({
    hasData: !!cache,
    updatedAt: cache?.updatedAt || null,
    ageHours: ageHours === Infinity ? null : Math.round(ageHours * 100) / 100,
    countriesCount: cache?.data ? Object.keys(cache.data).length : 0
  });
});

// Manually trigger an update (useful for testing)
app.post('/api/refresh', async (req, res) => {
  try {
    console.log('Manual refresh triggered');
    res.json({ message: 'Update started', status: 'processing' });

    // Run update in background (don't await)
    updateAllIndices().catch(err => {
      console.error('Update failed:', err);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start update' });
  }
});

// Get fresh data for a single country
app.get('/api/stocks/:countryId/refresh', async (req, res) => {
  try {
    const { countryId } = req.params;
    const result = await updateSingleCountry(countryId);
    res.json(result);
  } catch (error) {
    console.error('Error refreshing country:', error);
    res.status(500).json({ error: error.message });
  }
});

// Schedule updates weekly (every Sunday at midnight)
cron.schedule('0 0 * * 0', async () => {
  console.log('Scheduled weekly update starting...');
  try {
    await updateAllIndices();
  } catch (error) {
    console.error('Scheduled update failed:', error);
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  GET  /api/stocks     - Get cached stock data`);
  console.log(`  GET  /api/status     - Get cache status`);
  console.log(`  POST /api/refresh    - Trigger manual update`);
  console.log('');

  // Check if we need initial data (stale after 7 days)
  const ageHours = await getCacheAge();
  if (ageHours > 168) { // 7 days
    console.log('Cache is stale or empty. Starting initial fetch...');
    console.log('This may take a few minutes for all countries.');
    updateAllIndices().catch(err => {
      console.error('Initial update failed:', err);
    });
  } else {
    console.log(`Cache is fresh (${Math.round(ageHours * 10) / 10} hours old)`);
  }
});
