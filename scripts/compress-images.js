const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES = path.join(__dirname, "..", "public", "Images");
const IMAGES_OPT = path.join(__dirname, "..", "public", "ImagesOpt");

const TARGETS = [
  { rel: "EventinSurtaal/homepage_3x.webp", width: 1920, quality: 78 },
  { rel: "EventinSurtaal/about.webp", width: 1600, quality: 78 },
  { rel: "EventinSurtaal/bg (1).webp", width: 1920, quality: 75 },
  { rel: "EventinSurtaal/asim.webp", width: 700, quality: 80 },
  { rel: "AboutUs/mic.webp", width: 1400, quality: 78 },
  { rel: "AboutUs/aboususimage.webp", width: 1200, quality: 78 },
  { rel: "Tickets/choose.webp", width: 1400, quality: 78 },
  { rel: "Tickets/asim.webp", width: 900, quality: 80 },
  { rel: "Tickets/zain.png", width: 900, quality: 82, outRel: "Tickets/zain.webp" },
  { rel: "Tickets/01.png", width: 900, quality: 82, outRel: "Tickets/01.webp" },
  { rel: "Tickets/ZainZohaib3.png", width: 900, quality: 82, outRel: "Tickets/ZainZohaib3.webp" },
  { rel: "Tickets/03.png", width: 900, quality: 82, outRel: "Tickets/03.webp" },
  { rel: "Artists/mystory.webp", width: 1400, quality: 78 },
  { rel: "Artists/a1.webp", width: 800, quality: 80 },
  { rel: "Artists/Asim.webp", width: 800, quality: 80 },
  { rel: "Artists/Atif.webp", width: 800, quality: 80 },
  { rel: "Artists/Sajjad.webp", width: 800, quality: 80 },
  { rel: "Artists/ZainZohaib.webp", width: 800, quality: 80 },
  { rel: "Artists/Aima.webp", width: 800, quality: 80 },
  { rel: "Artists/Asif.webp", width: 800, quality: 80 },
  { rel: "Artists/Fariha.webp", width: 800, quality: 80 },
  { rel: "EventinSurtaal/artist01.webp", width: 900, quality: 80 },
  { rel: "EventinSurtaal/arist02.webp", width: 900, quality: 80 },
  { rel: "EventinSurtaal/arist03.webp", width: 900, quality: 80 },
  { rel: "EventinSurtaal/arist04.webp", width: 900, quality: 80 },
  { rel: "EventinSurtaal/arist05.webp", width: 900, quality: 80 },
  { rel: "EventinSurtaal/arist06.webp", width: 900, quality: 80 },
  { rel: "EventinSurtaal/Service1.webp", width: 700, quality: 80 },
  { rel: "EventinSurtaal/Service2.webp", width: 700, quality: 80 },
  { rel: "EventinSurtaal/Service3.webp", width: 700, quality: 80 },
  { rel: "EventinSurtaal/Service4.webp", width: 700, quality: 80 },
  { rel: "Footer/Footer1.webp", width: 1100, quality: 75 },
  { rel: "Footer/Footer2.webp", width: 1100, quality: 75 },
  { rel: "Footer/Footer3.webp", width: 900, quality: 75 },
  { rel: "Footer/Footer4.webp", width: 900, quality: 75 },
  { rel: "Footer/Footer5.webp", width: 900, quality: 75 },
  { rel: "Footer/FooterHover1.webp", width: 1100, quality: 75 },
  { rel: "Footer/FooterHover2.webp", width: 1100, quality: 75 },
  { rel: "Footer/FooterHover3.webp", width: 900, quality: 75 },
  { rel: "Footer/FooterHover4.webp", width: 900, quality: 75 },
  { rel: "Footer/FooterHover5.webp", width: 900, quality: 75 },
  { rel: "OurTeam/team1.webp", width: 500, quality: 80 },
  { rel: "OurTeam/team2.webp", width: 500, quality: 80 },
  { rel: "OurTeam/team3.webp", width: 500, quality: 80 },
  { rel: "OurTeam/team4.webp", width: 500, quality: 80 },
];

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function compressOne({ rel, width, quality, outRel }) {
  const inputPath = path.join(IMAGES, rel);
  const optPath = path.join(IMAGES_OPT, rel);
  const sourcePath = fs.existsSync(inputPath)
    ? inputPath
    : fs.existsSync(optPath)
      ? optPath
      : null;

  if (!sourcePath) {
    console.log("skip missing", rel);
    return;
  }

  const outputRel = outRel || rel.replace(/\.png$/i, ".webp");
  const outPath = path.join(IMAGES, outputRel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const before = fs.statSync(sourcePath).size;
  const input = fs.readFileSync(sourcePath);
  const buf = await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toBuffer();

  fs.writeFileSync(outPath, buf);
  console.log(
    `OK  ${outputRel}  ${(before / 1e6).toFixed(2)}MB → ${(buf.length / 1e6).toFixed(2)}MB`
  );
}

(async () => {
  console.log("Merging optimized assets into public/Images...");
  copyDir(IMAGES_OPT, IMAGES);

  console.log("Compressing heavy images in place...");
  for (const target of TARGETS) {
    try {
      await compressOne(target);
    } catch (error) {
      console.error("FAIL", target.rel, error.message);
    }
  }

  if (fs.existsSync(IMAGES_OPT)) {
    fs.rmSync(IMAGES_OPT, { recursive: true, force: true });
    console.log("Removed public/ImagesOpt");
  }

  const heavyPngs = [
    "Tickets/zain.png",
    "Tickets/01.png",
    "Tickets/ZainZohaib3.png",
    "Tickets/03.png",
  ];
  for (const png of heavyPngs) {
    const pngPath = path.join(IMAGES, png);
    if (fs.existsSync(pngPath)) {
      fs.unlinkSync(pngPath);
      console.log(`Removed heavy ${png}`);
    }
  }

  console.log("Done.");
})();
