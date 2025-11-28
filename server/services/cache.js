// JSON Cache Service
// Stores and retrieves cached stock data

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = path.join(__dirname, '../data/cache.json');
const CACHE_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
import { mkdirSync } from 'fs';
if (!existsSync(CACHE_DIR)) {
  mkdirSync(CACHE_DIR, { recursive: true });
}

export async function getCache() {
  try {
    if (!existsSync(CACHE_FILE)) {
      return null;
    }
    const data = await readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

export async function setCache(data) {
  try {
    const cacheData = {
      updatedAt: new Date().toISOString(),
      data
    };
    await writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log('Cache updated at:', cacheData.updatedAt);
    return true;
  } catch (error) {
    console.error('Error writing cache:', error);
    return false;
  }
}

export async function getCacheAge() {
  const cache = await getCache();
  if (!cache || !cache.updatedAt) {
    return Infinity;
  }
  const updatedAt = new Date(cache.updatedAt);
  const now = new Date();
  return (now - updatedAt) / 1000 / 60 / 60; // Returns age in hours
}
