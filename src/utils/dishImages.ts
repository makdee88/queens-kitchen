// Verified Wikimedia Commons filenames (CC-BY-SA / Public Domain)
const DISH_FALLBACKS: Record<string, string> = {
  'Kolkata Vegetable Chop & Beguni Platter':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Beguni_-_Kolkata_2011-08-18_4826.JPG?width=600',
  'Kolkata Bhetki Fish Fry':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Fish_fry_Kolkata.jpg?width=600',
  'Kolkata Dum Biryani (Chicken or Mutton)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Kolkata_Biryani.jpg?width=600',
  'Basanti Polao':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Basanti_Pulao_and_Kosha_Mangsho.jpg?width=600',
  'Chicken Chaanp':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chicken_chap.jpg?width=600',
  'Kosha Mangsho (Slow-Cooked Mutton)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Kosha_Mangsho.jpg?width=600',
  'Chicken Rezala':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chicken_Rezala.jpg?width=600',
  'Shorshe Ilish / Mustard Fish Curry':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Shorshe_Ilish.jpg?width=600',
  'Bhetki Paturi (Banana Leaf Steamed Fish)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Bhetki_fish_paturi.jpg?width=600',
  'Doi Katla / Rui Kalia':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Doi_Maach.jpg?width=600',
  'Cholar Dal & Aloor Dom':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi_Alur_Dom.jpg?width=600',
  'Chanar Dalna (Bengali Cottage Cheese Curry)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chhanar_Dalna.jpg?width=600',
  'Luchi Basket (4 pcs per person)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi.jpg?width=600',
  'Aamer Chutney & Papad':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Mango_Chutney.jpg?width=600',
  'Rosogolla (2 pcs)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Rasgulla.jpg?width=600',
  'Kacha Golla / Makha Sandesh':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Sandesh_-_Kolkata_2011-08-18_4818.JPG?width=600',
  'Baked Mishti Doi':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Mishti_Doi.jpg?width=600',
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  Starters: 'https://commons.wikimedia.org/wiki/Special:FilePath/Beguni_-_Kolkata_2011-08-18_4826.JPG?width=600',
  'Biryani & Polao': 'https://commons.wikimedia.org/wiki/Special:FilePath/Kolkata_Biryani.jpg?width=600',
  'Chicken & Mutton': 'https://commons.wikimedia.org/wiki/Special:FilePath/Kosha_Mangsho.jpg?width=600',
  'Bengali Fish': 'https://commons.wikimedia.org/wiki/Special:FilePath/Shorshe_Ilish.jpg?width=600',
  'Vegetarian Mains': 'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi_Alur_Dom.jpg?width=600',
  'Sides & Breads': 'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi.jpg?width=600',
  'Bengali Desserts': 'https://commons.wikimedia.org/wiki/Special:FilePath/Rasgulla.jpg?width=600',
};

export const DEFAULT_BENGALI_PLATE =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Bengali_Meal.jpg?width=600';

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