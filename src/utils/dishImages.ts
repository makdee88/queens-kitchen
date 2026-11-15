export const FALLBACK_DISH_IMAGE = '/images/fallback-dish.jpg';

// Optional search query hints for Bengali dish names so Wikimedia returns the best photo
const SEARCH_HINTS: Record<string, string> = {
  'Kolkata Vegetable Chop & Beguni Platter': 'Beguni Kolkata',
  'Kolkata Bhetki Fish Fry': 'Kolkata fish fry',
  'Kolkata Dum Biryani (Chicken or Mutton)': 'Kolkata biryani',
  'Basanti Polao': 'Basanti pulao',
  'Chicken Chaanp': 'Chicken chaap',
  'Kosha Mangsho (Slow-Cooked Mutton)': 'Kosha mangsho',
  'Shorshe Ilish / Mustard Fish Curry': 'Shorshe ilish',
  'Doi Katla / Rui Kalia': 'Doi maach',
  'Cholar Dal & Aloor Dom': 'Alur dom',
  'Luchi Basket (4 pcs per person)': 'Luchi food',
  'Aamer Chutney & Papad': 'Mango chutney',
  'Rosogolla (2 pcs)': 'Rasgulla',
  'Kacha Golla / Makha Sandesh': 'Sandesh sweet',
  'Baked Mishti Doi': 'Mishti doi',
};

export function getDishInitialImage(dish: { photo?: string }): string {
  if (dish.photo && dish.photo.trim() !== '') {
    return dish.photo;
  }
  return FALLBACK_DISH_IMAGE;
}

export function getWikimediaQuery(dish: { name: string }): string {
  return SEARCH_HINTS[dish.name] || dish.name.replace(/\(.*?\)/g, '').trim();
}