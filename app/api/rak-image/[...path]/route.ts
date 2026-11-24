import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

const catalogRootMaster =
  'J:\\Brothers_Tiles_data_set\\Master tiles dataset\\rak_catalog_export\\by_category';
const catalogRootFallback =
  'J:\\Brothers_Tiles_data_set\\rak_catalog_export\\by_category';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { path: string[] } },
) {
  const parts = params.path.filter(Boolean);
  if (parts.some((part) => part === '..' || part.includes(':'))) {
    return new NextResponse(null, { status: 400 });
  }

  const lastPart = parts[parts.length - 1] || '';
  const isImageFile = /\.(jpe?g|png|webp|svg)$/i.test(lastPart);

  const localDir = path.join(process.cwd(), 'public', 'images', 'rak-catalog');
  let targetPath = isImageFile
    ? path.join(localDir, ...parts)
    : path.join(localDir, ...parts, 'image.jpg');

  if (!fs.existsSync(targetPath)) {
    targetPath = isImageFile
      ? path.join(catalogRootMaster, ...parts)
      : path.join(catalogRootMaster, ...parts, 'image.jpg');
  }

  if (!fs.existsSync(targetPath)) {
    targetPath = isImageFile
      ? path.join(catalogRootFallback, ...parts)
      : path.join(catalogRootFallback, ...parts, 'image.jpg');
  }

  if (!fs.existsSync(targetPath)) {
    return new NextResponse(null, { status: 404 });
  }

  const image = fs.readFileSync(targetPath);
  return new NextResponse(image, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
