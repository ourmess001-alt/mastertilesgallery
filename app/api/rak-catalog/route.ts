import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

const catalogPath =
  'J:\\Brothers_Tiles_data_set\\Master tiles dataset\\rak_catalog_export\\products_master.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!fs.existsSync(catalogPath)) {
    return NextResponse.json({ products: [] });
  }

  const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  return NextResponse.json({ products });
}
