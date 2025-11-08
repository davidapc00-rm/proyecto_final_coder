// scripts/generate-favicons.mjs
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";

const SRC = "assets/icon-192.png";     // si luego tienes 512, cambia a "assets/icon-512.png"
const OUT = "assets";
const SIZES = [16, 32, 48];

async function main() {
  const outputs = [];
  for (const size of SIZES) {
    const outPath = `${OUT}/favicon-${size}.png`;
    await sharp(SRC).resize(size, size, { fit: "cover" }).png().toFile(outPath);
    outputs.push(outPath);
    console.log(`✓ PNG ${size}x${size} → ${outPath}`);
  }

  const icoBuffer = await pngToIco(outputs);
  await writeFile(`${OUT}/favicon.ico`, icoBuffer);
  console.log("✓ ICO → assets/favicon.ico");
}

main().catch(err => {
  console.error("Error generando favicons:", err);
  process.exit(1);
});