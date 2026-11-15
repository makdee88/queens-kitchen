// Maps each dish name (or category) to an open-license Wikimedia Commons thumbnail
const DISH_FALLBACKS: Record<string, string> = {
  'Kolkata Vegetable Chop & Beguni Platter':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Beguni.jpg?width=600',
  'Kolkata Bhetki Fish Fry':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Kolkata_Fish_Fry.jpg?width=600',
  'Kolkata Dum Biryani (Chicken or Mutton)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Kolkata_Mutton_Biryani.jpg?width=600',
  'Basanti Polao':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Basanti_Pulao.jpg?width=600',
  'Chicken Chaanp':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chicken_Chaap.jpg?width=600',
  'Kosha Mangsho (Slow-Cooked Mutton)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Kosha_Mangsho.jpg?width=600',
  'Chicken Rezala':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chicken_Rezala.jpg?width=600',
  'Shorshe Ilish / Mustard Fish Curry':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Shorshe_Ilish.jpg?width=600',
  'Bhetki Paturi (Banana Leaf Steamed Fish)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Bhetki_Paturi.jpg?width=600',
  'Doi Katla / Rui Kalia':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Doi_Maach.jpg?width=600',
  'Cholar Dal & Aloor Dom':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi_Alur_Dom.jpg?width=600',
  'Chanar Dalna (Bengali Cottage Cheese Curry)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chanar_Dalna.jpg?width=600',
  'Luchi Basket (4 pcs per person)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi.jpg?width=600',
  'Aamer Chutney & Papad':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Mango_chutney.jpg?width=600',
  'Rosogolla (2 pcs)':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Rasgulla.jpg?width=600',
  'Kacha Golla / Makha Sandesh':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Sandesh_(sweet).jpg?width=600',
  'Baked Mishti Doi':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Mishti_Doi.jpg?width=600',
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  Starters: 'https://commons.wikimedia.org/wiki/Special:FilePath/Beguni.jpg?width=600',
  'Biryani & Polao': 'https://commons.wikimedia.org/wiki/Special:FilePath/Kolkata_Mutton_Biryani.jpg?width=600',
  'Chicken & Mutton': 'https://commons.wikimedia.org/wiki/Special:FilePath/Kosha_Mangsho.jpg?width=600',
  'Bengali Fish': 'https://commons.wikimedia.org/wiki/Special:FilePath/Shorshe_Ilish.jpg?width=600',
  'Vegetarian Mains': 'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi_Alur_Dom.jpg?width=600',
  'Sides & Breads': 'https://commons.wikimedia.org/wiki/Special:FilePath/Luchi.jpg?width=600',
  'Bengali Desserts': 'https://commons.wikimedia.org/wiki/Special:FilePath/Rasgulla.jpg?width=600',
};

export function getDishImage(dish: { name: string; category: string; photo?: string }): string {
  if (dish.photo && dish.photo.trim() !== '') {
    return dish.photo;
  }
  return (
    DISH_FALLBACKS[dish.name] ||
    CATEGORY_FALLBACKS[dish.category] ||
    'https://commons.wikimedia.org/wiki/Special:FilePath/Bengali_thali.jpg?width=600'
  );
}