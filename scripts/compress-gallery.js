const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.join(__dirname, "..", "public", "images categorised");
const DEST_DIR = path.join(__dirname, "..", "public", "Images", "Gallery");
const THUMB_DIR = path.join(DEST_DIR, "thumbs");

const ORDERED_CATEGORIES = [
  {
    id: "toronto",
    name: "Toronto",
    city: "Toronto, ON",
    venue: "Queen Elizabeth Theatre",
    folder: "Toronto"
  },
  {
    id: "vancouver",
    name: "Vancouver",
    city: "Vancouver, BC",
    venue: "Bell Performing Arts Centre",
    folder: "Vancouver"
  },
  {
    id: "montreal",
    name: "Montreal",
    city: "Montreal, QC",
    venue: "Oscar Peterson Concert Hall",
    folder: "Montreal"
  },
  {
    id: "niagara-falls",
    name: "Niagara Falls",
    city: "Niagara Falls, ON",
    venue: "Niagara Live Concert",
    folder: "NiagaraFalls"
  }
];

const CATEGORY_MAP = {};
for (const cat of ORDERED_CATEGORIES) {
  CATEGORY_MAP[cat.name] = cat;
  CATEGORY_MAP[cat.folder] = cat;
  CATEGORY_MAP[cat.id] = cat;
}
CATEGORY_MAP["Niagra Falls"] = CATEGORY_MAP["Niagara Falls"];
CATEGORY_MAP["Vancuver"] = CATEGORY_MAP["Vancouver"];

async function processGallery() {
  fs.mkdirSync(DEST_DIR, { recursive: true });
  fs.mkdirSync(THUMB_DIR, { recursive: true });

  const galleryItems = [];
  let totalAfterBytes = 0;
  let totalThumbBytes = 0;
  let count = 0;

  for (const catInfo of ORDERED_CATEGORIES) {
    const catDestPath = path.join(DEST_DIR, catInfo.folder);
    const catThumbPath = path.join(THUMB_DIR, catInfo.folder);
    fs.mkdirSync(catDestPath, { recursive: true });
    fs.mkdirSync(catThumbPath, { recursive: true });

    if (!fs.existsSync(catDestPath)) continue;

    const files = fs.readdirSync(catDestPath)
      .filter(f => /\.webp$/i.test(f) && !f.includes("thumb"))
      .sort((a, b) => a.localeCompare(undefined, { numeric: true, sensitivity: "base" }));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(catDestPath, file);
      const thumbPath = path.join(catThumbPath, file);

      // Generate thumbnail if missing
      if (!fs.existsSync(thumbPath)) {
        const thumbBuf = await sharp(filePath)
          .resize({ width: 500, height: 500, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 75, effort: 4 })
          .toBuffer();
        fs.writeFileSync(thumbPath, thumbBuf);
      }

      const meta = await sharp(filePath).metadata();
      const size = fs.statSync(filePath).size;
      const thumbSize = fs.statSync(thumbPath).size;
      totalAfterBytes += size;
      totalThumbBytes += thumbSize;
      count++;

      const isPortrait = (meta.height || 0) > (meta.width || 0);

      galleryItems.push({
        id: `gal-${catInfo.id}-${i + 1}`,
        categoryId: catInfo.id,
        categoryName: catInfo.name,
        city: catInfo.city,
        venue: catInfo.venue,
        title: `${catInfo.name} Live Moments`,
        src: `/Images/Gallery/${catInfo.folder}/${file}`,
        thumb: `/Images/Gallery/thumbs/${catInfo.folder}/${file}`,
        width: meta.width || 1400,
        height: meta.height || 933,
        aspectRatio: isPortrait ? "portrait" : "landscape",
        fileSizeKB: Math.round(size / 1024),
        thumbSizeKB: Math.round(thumbSize / 1024)
      });
    }
  }

  // Write gallery data file
  const dataPath = path.join(__dirname, "..", "src", "data", "galleryData.js");
  fs.mkdirSync(path.dirname(dataPath), { recursive: true });

  const categoriesList = ORDERED_CATEGORIES.map(c => ({
    id: c.id,
    name: c.name,
    city: c.city,
    venue: c.venue,
    folder: c.folder,
    count: galleryItems.filter(item => item.categoryId === c.id).length
  }));

  const fileContent = `// Auto-generated gallery data with ordered categories and thumbnails
export const GALLERY_CATEGORIES = ${JSON.stringify(categoriesList, null, 2)};

export const GALLERY_ITEMS = ${JSON.stringify(galleryItems, null, 2)};
`;

  fs.writeFileSync(dataPath, fileContent, "utf8");

  console.log("\n=========================================");
  console.log(`Verified ${count} optimized images + thumbnails in gallery!`);
  console.log(`Full image size: ${(totalAfterBytes / 1e6).toFixed(2)} MB`);
  console.log(`Thumbnail size: ${(totalThumbBytes / 1e6).toFixed(2)} MB`);
  console.log(`Generated: src/data/galleryData.js`);
  console.log("=========================================\n");
}

processGallery().catch(err => {
  console.error("Gallery processing failed:", err);
  process.exit(1);
});
