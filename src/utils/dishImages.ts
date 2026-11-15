const DISH_SLUGS: Record<string, string> = {
  'Kolkata Vegetable Chop & Beguni Platter': 'beguni',
  'Kolkata Bhetki Fish Fry': 'fish-fry',
  'Kolkata Dum Biryani (Chicken or Mutton)': 'kolkata-biryani',
  'Basanti Polao': 'basanti-polao',
  'Chicken Chaanp': 'chicken-chaap',
  'Kosha Mangsho (Slow-Cooked Mutton)': 'kosha-mangsho',
  'Chicken Rezala': 'chicken-rezala',
  'Shorshe Ilish / Mustard Fish Curry': 'shorshe-ilish',
  'Bhetki Paturi (Banana Leaf Steamed Fish)': 'bhetki-paturi',
  'Doi Katla / Rui Kalia': 'doi-maach',
  'Cholar Dal & Aloor Dom': 'luchi-alur-dom',
  'Chanar Dalna (Bengali Cottage Cheese Curry)': 'chanar-dalna',
  'Luchi Basket (4 pcs per person)': 'luchi',
  'Aamer Chutney & Papad': 'mango-chutney',
  'Rosogolla (2 pcs)': 'rasgulla',
  'Kacha Golla / Makha Sandesh': 'sandesh',
  'Baked Mishti Doi': 'mishti-doi',
};

const CATEGORY_SLUGS: Record<string, string> = {
  Starters: 'beguni',
  'Biryani & Polao': 'kolkata-biryani',
  'Chicken & Mutton': 'kosha-mangsho',
  'Bengali Fish': 'shorshe-ilish',
  'Vegetarian Mains': 'luchi-alur-dom',
  'Sides & Breads': 'luchi',
  'Bengali Desserts': 'rasgulla',
};

export const FALLBACK_DISH_IMAGE = '/images/wikimedia-cache/bengali-thali.jpg';

export function getDishImage(dish: { name: string; category: string; photo?: string }): string {
  if (dish.photo && dish.photo.trim() !== '') {
    return dish.photo;
  }
  const slug = DISH_SLUGS[dish.name] || CATEGORY_SLUGS[dish.category] || 'bengali-thali';
  return `/images/wikimedia-cache/${slug}.jpg`;
}

export function getFallbackDishImage(dish: { category: string }): string {
  const slug = CATEGORY_SLUGS[dish.category] || 'bengali-thali';
  return `/images/wikimedia-cache/${slug}.jpg`;
}