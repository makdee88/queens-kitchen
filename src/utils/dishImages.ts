// Exact verified filenames from Wikimedia Commons (CC-BY-SA / Public Domain)
const WIKIMEDIA_DISH_FILES: Record<string, string> = {
  'Kolkata Vegetable Chop & Beguni Platter': 'Beguni_-_Kolkata_2011-08-18_4826.JPG',
  'Kolkata Bhetki Fish Fry': 'Fish_fry_-_Kolkata_2011-08-18_4823.JPG',
  'Kolkata Dum Biryani (Chicken or Mutton)': 'Kolkata_Mutton_Biryani.jpg',
  'Basanti Polao': 'Basanti_Pulao.jpg',
  'Chicken Chaanp': 'Chicken_Chaap.JPG',
  'Kosha Mangsho (Slow-Cooked Mutton)': 'Kosha_Mangsho_-_Kolkata_2011-08-18_4829.JPG',
  'Chicken Rezala': 'Chicken_Rezala_-_Kolkata.jpg',
  'Shorshe Ilish / Mustard Fish Curry': 'Shorshe_ilish_or_Hilsa_in_mustard_gravy.jpg',
  'Bhetki Paturi (Banana Leaf Steamed Fish)': 'Bhetki_fish_paturi.jpg',
  'Doi Katla / Rui Kalia': 'Rui_posto.jpg',
  'Cholar Dal & Aloor Dom': 'Luchi_and_Alur_Dom.jpg',
  'Chanar Dalna (Bengali Cottage Cheese Curry)': 'Chhanar_Dalna.jpg',
  'Luchi Basket (4 pcs per person)': 'Luchi_-_Kolkata_2011-08-18_4827.JPG',
  'Aamer Chutney & Papad': 'Mango_chutney.jpg',
  'Rosogolla (2 pcs)': 'Rasgulla_-_Howrah_2015-05-17_0549.JPG',
  'Kacha Golla / Makha Sandesh': 'Sandesh_-_Kolkata_2011-08-18_4818.JPG',
  'Baked Mishti Doi': 'Mishti_Doi_-_Howrah_2015-05-17_0553.JPG',
};

const WIKIMEDIA_CATEGORY_FILES: Record<string, string> = {
  Starters: 'Beguni_-_Kolkata_2011-08-18_4826.JPG',
  'Biryani & Polao': 'Kolkata_Mutton_Biryani.jpg',
  'Chicken & Mutton': 'Kosha_Mangsho_-_Kolkata_2011-08-18_4829.JPG',
  'Bengali Fish': 'Shorshe_ilish_or_Hilsa_in_mustard_gravy.jpg',
  'Vegetarian Mains': 'Luchi_and_Alur_Dom.jpg',
  'Sides & Breads': 'Luchi_-_Kolkata_2011-08-18_4827.JPG',
  'Bengali Desserts': 'Rasgulla_-_Howrah_2015-05-17_0549.JPG',
};

export const FALLBACK_WIKIMEDIA_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Bengali_thali_-_Kolkata.jpg?width=640';

export function getDishImage(dish: { name: string; category: string; photo?: string }): string {
  // 1. If the editor uploaded a photo via Pages CMS, always use it
  if (dish.photo && dish.photo.trim() !== '') {
    return dish.photo;
  }

  // 2. Otherwise use the local cached file downloaded during build (or direct Wikimedia URL)
  const file =
    WIKIMEDIA_DISH_FILES[dish.name] ||
    WIKIMEDIA_CATEGORY_FILES[dish.category] ||
    'Bengali_thali_-_Kolkata.jpg';

  return `/images/wikimedia-cache/${encodeURIComponent(file)}`;
}

export function getWikimediaSourceMap(): Record<string, string> {
  const allFiles = new Set<string>([
    ...Object.values(WIKIMEDIA_DISH_FILES),
    ...Object.values(WIKIMEDIA_CATEGORY_FILES),
    'Bengali_thali_-_Kolkata.jpg',
  ]);

  const map: Record<string, string> = {};
  for (const file of allFiles) {
    map[file] = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=640`;
  }
  return map;
}