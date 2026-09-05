import { ChatMessage, StructuredRecommendation } from '../types/chat';
import { Product } from '../types/product';
import { SITE_CONFIG } from '../config/site';
import { productService } from './productService';

export interface AIAssistantResponse {
  content: string;
  recommendations?: StructuredRecommendation[];
}

/**
 * Intelligent client-side fallback if backend AI API is unreachable or rate-limited.
 * Strictly adheres to catalog safety: only references real products and real prices.
 */
function localCatalogFallback(message: string, catalog: Product[]): AIAssistantResponse {
  const query = message.toLowerCase();

  // Price match under ₹X
  const priceUnderMatch = query.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)/i);
  const targetPrice = priceUnderMatch ? parseInt(priceUnderMatch[1].replace(/,/g, ''), 10) : null;

  let matchedProducts: Product[] = [];
  let reason = '';

  if (query.includes('deal') || query.includes('discount') || query.includes('offer') || query.includes('save')) {
    matchedProducts = catalog.filter((p) => p.deal).sort((a, b) => b.discount - a.discount).slice(0, 3);
    reason = 'Featured under our curated deals with up to 60% savings on verified finds.';
  } else if (targetPrice) {
    matchedProducts = catalog
      .filter((p) => p.price <= targetPrice)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    reason = `Matches your budget constraint of under ₹${targetPrice.toLocaleString('en-IN')}.`;
  } else if (query.includes('gadget') || query.includes('tech') || query.includes('electronic') || query.includes('charger') || query.includes('plug')) {
    matchedProducts = catalog
      .filter((p) => p.category === 'gadgets' || p.category === 'electronics')
      .slice(0, 3);
    reason = 'Top-rated tech find tested for daily utility and modern convenience.';
  } else if (query.includes('kitchen') || query.includes('cook') || query.includes('kadai') || query.includes('kettle') || query.includes('juicer')) {
    matchedProducts = catalog
      .filter((p) => p.category === 'kitchen')
      .slice(0, 3);
    reason = 'Essential kitchen upgrade verified for healthy cooking and durability.';
  } else if (query.includes('earbud') || query.includes('audio') || query.includes('sound') || query.includes('headphone')) {
    matchedProducts = catalog
      .filter((p) => p.tags.includes('earbuds') || p.tags.includes('audio'))
      .slice(0, 2);
    reason = 'Active Noise Cancellation and dynamic sound tuning under ₹3,000.';
  } else if (query.includes('gift') || query.includes('present') || query.includes('home')) {
    matchedProducts = catalog
      .filter((p) => p.bestSeller || p.category === 'home-living' || p.category === 'beauty')
      .slice(0, 3);
    reason = 'Thoughtful, premium gifting choice with artisanal craftsmanship.';
  } else {
    // General keyword search
    const words = query.split(/\s+/).filter((w) => w.length > 2);
    matchedProducts = catalog.filter((p) => 
      words.some((w) => 
        p.name.toLowerCase().includes(w) || 
        p.category.toLowerCase().includes(w) ||
        p.tags.some((t) => t.toLowerCase().includes(w))
      )
    ).slice(0, 3);
  }

  if (matchedProducts.length === 0) {
    return {
      content: `I couldn't find an exact match for "${message}" in our curated Kanha Bazaar catalog. You can try exploring our Electronics, Kitchen, Home & Living, or Trending Deals sections!`,
      recommendations: []
    };
  }

  const recs: StructuredRecommendation[] = matchedProducts.map((p) => ({
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
    whyMatches: p.whySelected || reason || 'Carefully chosen based on utility and verified value.'
  }));

  const productNames = matchedProducts.map((p) => `**${p.name}** (₹${p.price.toLocaleString('en-IN')})`).join(', ');

  return {
    content: `Here are our top recommendations from the Kanha Bazaar catalog: ${productNames}. Each of these has been selected for authentic build quality and value. Click any card below to check full specs or visit the deal!`,
    recommendations: recs
  };
}

/**
 * Ask the Kanha AI Shopping Assistant.
 * Securely communicates with the server-side /api/chat route,
 * providing the relevant catalog context.
 */
export async function askShoppingAssistant(
  message: string,
  history: ChatMessage[] = [],
  catalogContext?: Product[]
): Promise<AIAssistantResponse> {
  const catalog = catalogContext && catalogContext.length > 0 
    ? catalogContext 
    : await productService.getProducts();

  // Mini summary of catalog sent to server so model has exact prices and slugs
  const compactCatalog = catalog.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    regularPrice: p.regularPrice,
    discount: p.discount,
    category: p.category,
    rating: p.rating,
    features: p.features.slice(0, 3),
    whySelected: p.whySelected,
    affiliateUrl: p.affiliateUrl,
    affiliateNetwork: p.affiliateNetwork,
    image: p.image
  }));

  try {
    const res = await fetch(SITE_CONFIG.aiApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        history: history.slice(-6).map((h) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          content: h.content
        })),
        catalog: compactCatalog
      })
    });

    if (!res.ok) {
      throw new Error(`AI API returned status ${res.status}`);
    }

    const data = await res.json();
    if (data && data.content) {
      return {
        content: data.content,
        recommendations: Array.isArray(data.recommendations) ? data.recommendations : []
      };
    }

    throw new Error('Invalid response structure from AI assistant');
  } catch (err) {
    console.info('Using smart catalog-grounded assistant fallback:', err);
    return localCatalogFallback(message, catalog);
  }
}
