import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '2mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Lazy-initialized Gemini AI client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Server-side AI Shopping Assistant endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, catalog } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();

    // If no Gemini API key is configured on server, return a structured fallback response
    if (!ai) {
      return res.json({
        content: `I am currently operating in catalog-safe mode. I can help guide you through our handpicked finds including electronics, kitchen essentials, pure Ayurvedic beauty, and trending deals!`,
        recommendations: []
      });
    }

    const catalogJson = JSON.stringify(catalog || []).slice(0, 12000);

    const systemInstruction = `You are "Kanha AI Assistant", the friendly and knowledgeable shopping assistant for "Kanha Bazaar" (Tagline: "Smart Finds. Better Choices.").
You assist visitors in finding useful products, comparing deals, and discovering items from our catalog.

STRICT SAFETY AND GROUNDING RULES:
1. You MUST ONLY recommend products that exist in the PROVIDED CATALOG.
2. NEVER invent prices, discounts, stock, reviews, specifications, or links.
3. If an item or feature is not in the catalog, clearly state: "I don't have that information in the current product catalog."
4. If asked about a budget (e.g. "under ₹1,000"), only recommend catalog items whose price <= that amount.
5. In your response, provide helpful text guidance in Indian English (polite, warm, knowledgeable).
6. Return a structured JSON response matching the schema with:
   - "content": markdown text explaining your advice and why you chose these products.
   - "recommendedProductIds": an array of string product IDs (must be exact matches from the catalog). Up to 3 products.`;

    const prompt = `User query: "${message}"\n\nRecent conversation history:\n${JSON.stringify(history || [])}\n\nAvailable Product Catalog:\n${catalogJson}\n\nPlease respond to the user query strictly based on the catalog above.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: {
              type: Type.STRING,
              description: 'The natural conversational explanation and recommendations for the user.',
            },
            recommendedProductIds: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: 'List of product IDs from the catalog that match the recommendation.',
            },
          },
          required: ['content', 'recommendedProductIds'],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    // Map matched IDs back to full structured recommendation objects
    const catalogList = Array.isArray(catalog) ? catalog : [];
    const recommendations = (parsed.recommendedProductIds || [])
      .map((id: string) => catalogList.find((p: any) => String(p.id) === String(id)))
      .filter(Boolean)
      .map((p: any) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
        regularPrice: p.regularPrice,
        discount: p.discount,
        category: p.category,
        image: p.image,
        affiliateUrl: p.affiliateUrl,
        affiliateNetwork: p.affiliateNetwork,
        whyMatches: p.whySelected || `Matches your search for ${message}`,
      }));

    return res.json({
      content: parsed.content || 'Here are the matching products from our catalog.',
      recommendations,
    });
  } catch (error: any) {
    console.warn('Gemini API temporary issue or busy, using resilient catalog fallback:', error?.message);
    const catalogList = Array.isArray(req.body.catalog) ? req.body.catalog : [];
    const query = String(req.body.message || '').toLowerCase();

    // Find up to 3 relevant products
    const matched = catalogList.filter((p: any) => 
      query.includes(p.category?.toLowerCase() || '') ||
      p.name?.toLowerCase().includes(query) ||
      (p.tags && p.tags.some((t: string) => query.includes(t.toLowerCase()))) ||
      (query.includes('deal') && p.discount > 20) ||
      (query.includes('under') && p.price < 2000)
    ).slice(0, 3);

    const fallbackList = matched.length > 0 ? matched : catalogList.slice(0, 3);
    const recs = fallbackList.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      regularPrice: p.regularPrice,
      discount: p.discount,
      category: p.category,
      image: p.image,
      affiliateUrl: p.affiliateUrl,
      affiliateNetwork: p.affiliateNetwork,
      whyMatches: p.whySelected || `Handpicked selection from our ${p.category} collection.`,
    }));

    return res.json({
      content: `I've analyzed our curated Kanha Bazaar catalog for you. Here are our top hand-selected finds matching your interest:`,
      recommendations: recs,
    });
  }
});

// Secure WooCommerce Proxy API
app.get('/api/woocommerce/products', async (req, res) => {
  const wpUrl = process.env.VITE_WORDPRESS_API_URL || process.env.WORDPRESS_API_URL;
  if (!wpUrl) {
    return res.status(503).json({ error: 'WordPress API URL not configured' });
  }

  try {
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    const targetUrl = new URL(`${wpUrl.replace(/\/$/, '')}/products`);
    targetUrl.searchParams.set('per_page', '50');
    targetUrl.searchParams.set('status', 'publish');

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (consumerKey && consumerSecret) {
      const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
      headers['Authorization'] = `Basic ${auth}`;
    }

    const wcRes = await fetch(targetUrl.toString(), { headers });
    if (!wcRes.ok) {
      return res.status(wcRes.status).json({ error: `WooCommerce responded with ${wcRes.status}` });
    }

    const data = await wcRes.json();
    return res.json(data);
  } catch (error: any) {
    console.error('Error proxying WooCommerce request:', error);
    return res.status(502).json({ error: 'Failed to connect to WooCommerce backend' });
  }
});

// Setup Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kanha Bazaar server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
