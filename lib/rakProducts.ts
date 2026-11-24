import type { Product } from './products';
import { RAK_CATALOG_PRODUCTS } from './rakCatalogGenerated';

export const seriesToSlugMap: Record<string, string> = {
  'Wall Tiles (25x40)': 'wall-tiles-25x40',
  'Victoria Series': 'victoria-series',
  'Premium Collection - Vivid Collection': 'vivid-collection',
  'Premium Collection (30x50.5)': 'premium-collection-30x50-5',
  'Premium Collection - Vivid Collection (30x50.5)': 'vivid-collection-30x50-5',
  'Premija Collection': 'premija-collection',
  'Premium Collection - Aston Series': 'aston-series',
  'Premium Collection - Suger Series': 'suger-series',
  'Premium Collection - Stone Art': 'stone-art',
  'Premium Collection - Paris & Berlin Series': 'paris-and-berlin-series',
  'Premium Collection - Jordana Series': 'jordana-series',
  'Premium Collection - Turin & Dallas Series': 'turin-and-dallas-series',
  'Premium Collection - Dallas, Diana & Eden Series': 'dallas-diana-eden-series',
  'Premium Collection - Emir Series': 'emir-series',
};

export const rakProducts: Product[] = (RAK_CATALOG_PRODUCTS as readonly any[]).map((item) => {
  const specs = (item.specs || {}) as Record<string, any>;
  const seriesName = specs.series || 'Wall Tiles';
  const collectionSlug = seriesToSlugMap[seriesName] || 'wall-tiles';
  const size = specs.sizeCm || specs.dimensions || 'See specification';
  const sqFtPerBox = typeof specs.sqFtPerBox === 'number' ? specs.sqFtPerBox : 0;
  const price = typeof item.pricePerSqFt === 'number' ? item.pricePerSqFt : 0;
  const pricePerBox = sqFtPerBox ? price * sqFtPerBox : price;
  const coveragePerBox = sqFtPerBox ? sqFtPerBox / 10.7639 : 1.0;
  const apps = Array.isArray(item.recommendedApplications)
    ? (item.recommendedApplications as string[]).join(', ')
    : 'Wall, Bathroom, Kitchen';

  return {
    id: String(item.id),
    slug: String(item.slug),
    name: String(item.title),
    price,
    pricePerBox: Math.round(pricePerBox * 100) / 100,
    coveragePerBox: Math.round(coveragePerBox * 100) / 100,
    dimensions: size,
    material: specs.mainCategory || 'Ceramic',
    colour: specs.variantLabel || specs.modelCode || 'See design',
    finish: specs.surfaceFinish || 'Ceramic Wall Tiles',
    suitability: apps,
    slipRating: 'Wall Use Only',
    image: String(item.image),
    badge: specs.series || item.badge,
    category: 'wall-tiles',
    categoryName: 'Wall Tiles',
    description: item.descriptionEn || item.descriptionBn || '',
    series: seriesName,
    collectionSlug,
    swatches: ['#dcd8cf', '#b5aba0', '#7a736a'],
  };
});
