// Claude Extraction Service
// Uses Claude to extract numeric values from search results

import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure environment variables are loaded from the correct path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function extractIndexValue(searchContent, indexName) {
  const message = await anthropic.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: `Extract the current value of the ${indexName} stock index from the following search results.

Return ONLY a JSON object in this exact format, nothing else:
{"value": "12,345.67", "found": true}

If you cannot find a clear value, return:
{"value": null, "found": false}

Search results:
${searchContent}`
      }
    ]
  });

  try {
    const text = message.content[0].text.trim();
    // Handle potential markdown code blocks
    const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse Claude response:', message.content[0].text);
    return { value: null, found: false };
  }
}

