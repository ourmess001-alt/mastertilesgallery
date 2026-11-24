import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProductCardInteraction from '@/components/ProductCardInteraction';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Master Tiles Gallery',
  description: 'Master Tiles Gallery - Online Shopping for Tiles, Bathrooms & Finishes',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ProductCardInteraction />
        {children}
      </body>
    </html>
  );
}
