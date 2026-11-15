import fs from 'node:fs';
import path from 'node:path';

// Maps each dish name to a clean local cache filename + Wikimedia Commons search query
const DISH_QUERIES = [
  { slug: 'beguni', query: 'Beguni Kolkata' },
  { slug: 'fish-fry', query: 'Fish fry Kolkata' },
  { slug: 'kolkata-biryani', query: 'Kolkata Biryani' },
  { slug: 'basanti-polao', query: 'Basanti Pulao' },
  { slug: 'chicken-chaap', query: 'Chicken Chaap' },
  { slug: 'kosha-mangsho', query: 'Kosha Mangsho' },
  { slug: 'chicken-rezala', query: 'Chicken Rezala' },
  { slug: 'shorshe-ilish', query: 'Shorshe Ilish' },
  { slug: 'bhetki-paturi', query: 'Bhetki Paturi' },
  { slug: 'doi-maach', query: 'Doi Maach' },
  { slug: 'luchi-alur-dom', query: 'Luchi Alur Dom' },
  { slug: 'chanar-dalna', query: 'Chanar Dalna' },
  { slug: 'luchi', query: 'Luchi Bengali' },
  { slug: 'mango-chutney', query: 'Mango chutney' },
  { slug: 'rasgulla', query: 'Rasgulla Kolkata' },
  { slug: 'sandesh', query: 'Sandesh Kolkata' },
  { slug: 'mishti-doi', query: 'Mishti Doi' },
  { slug: 'bengali-thali', query: 'Bengali thali' },
];

const OUT_DIR = path.resolve('public/images/wikimedia-cache');
fs.mkdirSync(OUT_DIR, { recursive: true });

const HEADERS = {
  'User-Agent': 'QueensKitchenStockholm/1.0 (https://queenskitchen.pages.dev)',
};

async function searchAndDownload(slug, query) {
  const dest = path.join(OUT_DIR, `${slug}.jpg`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) {
    return;
  }

  // Query Wikimedia Commons API for real existing files matching the dish
  const apiUrl =
    `https://commons.wikimedia.org/w/api.php?action=query&format=json` +
    `&generator=search&gsrnamespace=6&gsrlimit=3&gsrsearch=${encodeURIComponent(query)}` +
    `&prop=imageinfo&iiprop=url&iiurlwidth=640`;

  try {
    const res = await fetch(apiUrl, { headers: HEADERS });
    const data = await res.json();
    const pages = Object.values(data?.query?.pages || {});
    const validPage = pages.find((p) => {
      const thumb = p?.imageinfo?.[0]?.thumburl || '';
      return /\.(jpe?g|png|webp)$/i.test(thumb);
    });

    const imageUrl = validPage?.imageinfo?.[0]?.thumburl;
    if (!imageUrl) {
      console.warn(`No Wikimedia match for "${query}"`);
      return;
    }

    const imgRes = await fetch(imageUrl, { headers: HEADERS });
    if (!imgRes.ok) {
      console.warn(`Download failed for ${slug}: HTTP ${imgRes.status}`);
      return;
    }

    const buf = Buffer.from(await imgRes.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Saved ${slug}.jpg (${Math.round(buf.length / 1024)} KB)`);
  } catch (err) {
    console.warn(`Error fetching ${slug}:`, err.message);
  }
}

for (const item of DISH_QUERIES) {
  await searchAndDownload(item.slug, item.query);
}