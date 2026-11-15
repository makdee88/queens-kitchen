// Direct Wikimedia Commons upload.wikimedia.org CDN thumbnails (CC-BY-SA / Public Domain)
const DISH_FALLBACKS: Record<string, string> = {
  'Kolkata Vegetable Chop & Beguni Platter':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Beguni_-_Kolkata_2011-08-18_4826.JPG/640px-Beguni_-_Kolkata_2011-08-18_4826.JPG',
  'Kolkata Bhetki Fish Fry':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Fish_fry_Kolkata.jpg/640px-Fish_fry_Kolkata.jpg',
  'Kolkata Dum Biryani (Chicken or Mutton)':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/640px-%22Hyderabadi_Dum_Biryani%22.jpg',
  'Basanti Polao':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Basanti_Pulao_and_Kosha_Mangsho.jpg/640px-Basanti_Pulao_and_Kosha_Mangsho.jpg',
  'Chicken Chaanp':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Chicken_chap.jpg/640px-Chicken_chap.jpg',
  'Kosha Mangsho (Slow-Cooked Mutton)':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Basanti_Pulao_and_Kosha_Mangsho.jpg/640px-Basanti_Pulao_and_Kosha_Mangsho.jpg',
  'Chicken Rezala':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Chicken_Rezala.jpg/640px-Chicken_Rezala.jpg',
  'Shorshe Ilish / Mustard Fish Curry':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Shorshe_Ilish.jpg/640px-Shorshe_Ilish.jpg',
  'Bhetki Paturi (Banana Leaf Steamed Fish)':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Bhetki_fish_paturi.jpg/640px-Bhetki_fish_paturi.jpg',
  'Doi Katla / Rui Kalia':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Doi_Maach.jpg/640px-Doi_Maach.jpg',
  'Cholar Dal & Aloor Dom':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Luchi_Alur_Dom.jpg/640px-Luchi_Alur_Dom.jpg',
  'Chanar Dalna (Bengali Cottage Cheese Curry)':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Chhanar_Dalna.jpg/640px-Chhanar_Dalna.jpg',
  'Luchi Basket (4 pcs per person)':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Luchi_Alur_Dom.jpg/640px-Luchi_Alur_Dom.jpg',
  'Aamer Chutney & Papad':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mango_chutney.jpg/640px-Mango_chutney.jpg',
  'Rosogolla (2 pcs)':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Rasgulla_-_Howrah_2015-05-17_0549.JPG/640px-Rasgulla_-_Howrah_2015-05-17_0549.JPG',
  'Kacha Golla / Makha Sandesh':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Sandesh_-_Kolkata_2011-08-18_4818.JPG/640px-Sandesh_-_Kolkata_2011-08-18_4818.JPG',
  'Baked Mishti Doi':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Mishti_Doi.jpg/640px-Mishti_Doi.jpg',
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  Starters:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Beguni_-_Kolkata_2011-08-18_4826.JPG/640px-Beguni_-_Kolkata_2011-08-18_4826.JPG',
  'Biryani & Polao':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Basanti_Pulao_and_Kosha_Mangsho.jpg/640px-Basanti_Pulao_and_Kosha_Mangsho.jpg',
  'Chicken & Mutton':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Basanti_Pulao_and_Kosha_Mangsho.jpg/640px-Basanti_Pulao_and_Kosha_Mangsho.jpg',
  'Bengali Fish':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Shorshe_Ilish.jpg/640px-Shorshe_Ilish.jpg',
  'Vegetarian Mains':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Luchi_Alur_Dom.jpg/640px-Luchi_Alur_Dom.jpg',
  'Sides & Breads':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Luchi_Alur_Dom.jpg/640px-Luchi_Alur_Dom.jpg',
  'Bengali Desserts':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Rasgulla_-_Howrah_2015-05-17_0549.JPG/640px-Rasgulla_-_Howrah_2015-05-17_0549.JPG',
};

// Self-contained warm Bengali plate SVG fallback (zero external network dependency)
export const DEFAULT_BENGALI_PLATE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#fef3c7"/>
      <circle cx="200" cy="150" r="88" fill="#ffffff" stroke="#d97706" stroke-width="6"/>
      <circle cx="200" cy="150" r="68" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="200" y="145" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="#92400e">Queen's Kitchen</text>
      <text x="200" y="168" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#b45309">Authentic Bengali Dish</text>
    </svg>`
  );

export function getDishImage(dish: { name: string; category: string; photo?: string }): string {
  if (dish.photo && dish.photo.trim() !== '') {
    return dish.photo;
  }
  return (
    DISH_FALLBACKS[dish.name] ||
    CATEGORY_FALLBACKS[dish.category] ||
    DEFAULT_BENGALI_PLATE
  );
}