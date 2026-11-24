import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = 'J:\\Brothers_Tiles_data_set\\Master tiles dataset\\rak_catalog_export';

if (!fs.existsSync(source)) {
  console.warn(`RAK catalog source not found: ${source}`);
  process.exit(0);
}

const srcTs = path.join(source, 'siteData_rak_catalog.ts');
const dstTs = path.join(repo, 'lib', 'rakCatalogGenerated.ts');
if (fs.existsSync(srcTs)) {
  fs.copyFileSync(srcTs, dstTs);
}

const imagesDir = path.join(repo, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const destination = path.join(imagesDir, 'rak-catalog');
if (!fs.existsSync(destination)) {
  try {
    fs.symlinkSync(path.join(source, 'by_category'), destination, 'junction');
  } catch (err) {
    try {
      fs.cpSync(path.join(source, 'by_category'), destination, { recursive: true });
    } catch (e) {
      console.warn('Could not link images directory:', e);
    }
  }
}

console.log('Integrated RAK catalog TypeScript and images.');
