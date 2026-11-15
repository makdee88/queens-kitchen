import fs from 'node:fs';
import path from 'node:path';

const FILES = [
  'Beguni_-_Kolkata_2011-08-18_4826.JPG',
  'Fish_fry_-_Kolkata_2011-08-18_4823.JPG',
  'Kolkata_Mutton_Biryani.jpg',
  'Basanti_Pulao.jpg',
  'Chicken_Chaap.JPG',
  'Kosha_Mangsho_-_Kolkata_2011-08-18_4829.JPG',
  'Chicken_Rezala_-_Kolkata.jpg',
  'Shorshe_ilish_or_Hilsa_in_mustard_gravy.jpg',
  'Bhetki_fish_paturi.jpg',
  'Rui_posto.jpg',
  'Luchi_and_Alur_Dom.jpg',
  'Chhanar_Dalna.jpg',
  'Luchi_-_Kolkata_2011-08-18_4827.JPG',
  'Mango_chutney.jpg',
  'Rasgulla_-_Howrah_2015-05-17_0549.JPG',
  'Sandesh_-_Kolkata_2011-08-18_4818.JPG',
  'Mishti_Doi_-_Howrah_2015-05-17_0553.JPG',
  'Bengali_thali_-_Kolkata.jpg',
];

const OUT_DIR = path.resolve('public/images/wikimedia-cache');
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const file of FILES) {
  const dest = path.join(OUT_DIR, file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) {
    continue;
  }
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=640`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'QueensKitchenStockholmBot/1.0 (https://queenskitchen.pages.dev)',
      },
      redirect: 'follow',
    });
    if (!res.ok) {
      console.warn(`Skipping ${file}: HTTP ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Downloaded ${file} (${Math.round(buf.length / 1024)} KB)`);
  } catch (err) {
    console.warn(`Error downloading ${file}:`, err.message);
  }
}