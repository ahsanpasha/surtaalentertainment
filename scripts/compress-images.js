const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "public", "Images");
const DEST = path.join(__dirname, "..", "public", "ImagesOpt");

const TARGETS = [
  { rel: "EventinSurtaal/homepage_3x.webp", width: 1920, quality: 78 },
  { rel: "EventinSurtaal/about.webp", width: 1600, quality: 78 },
  { rel: "AboutUs/mic.webp", width: 1400, quality: 78 },
  { rel: "AboutUs/aboususimage.webp", width: 1200, quality: 78 },
  { rel: "Tickets/choose.webp", width: 1400, quality: 78 },
  { rel: "Tickets/asim.webp", width: 900, quality: 80 },
  { rel: "Artists/mystory.webp", width: 1400, quality: 78 },
  { rel: "Artists/a1.webp", width: 800, quality: 80 },
  { rel: "Artists/a2.webp", width: 800, quality: 80 },
  { rel: "Artists/a3.webp", width: 800, quality: 80 },
  { rel: "Artists/a4.webp", width: 800, quality: 80 },
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
];

async function compressOne({ rel, width, quality }) {
  const inputPath = path.join(SRC, rel);
  if (!fs.existsSync(inputPath)) {
    console.log("skip missing", rel);
    return;
  }
  const outPath = path.join(DEST, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const before = fs.statSync(inputPath).size;
  const input = fs.readFileSync(inputPath);
  const buf = await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toBuffer();
  fs.writeFileSync(outPath, buf);
  console.log(
    `OK  ${rel}  ${(before / 1e6).toFixed(2)}MB → ${(buf.length / 1e6).toFixed(2)}MB`
  );
}

(async () => {
  for (const t of TARGETS) {
    try {
      await compressOne(t);
    } catch (e) {
      console.error("FAIL", t.rel, e.message);
    }
  }
})();
