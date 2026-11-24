'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allProducts, Product } from '@/lib/products';
import { Search, Heart } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [cartCount, setCartCount] = useState(0);

  const results = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.series && p.series.toLowerCase().includes(q)) ||
        (p.colour && p.colour.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <>
      <section className="subpage-hero">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Search</span>
        </div>
        <h1 className="subpage-title">Search Results</h1>
        <div style={{ maxWidth: '540px', margin: '20px auto 0', display: 'flex', background: '#fff', border: '1px solid var(--line)', padding: '6px 14px', alignItems: 'center' }}>
          <Search size={20} style={{ color: '#78837b', marginRight: '10px' }} />
          <input
            style={{ border: 0, outline: 'none', width: '100%', fontSize: '15px' }}
            placeholder="Search tiles, materials, rooms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      <section className="subpage-content">
        <div style={{ marginBottom: '28px', color: '#627080', fontSize: '14px' }}>
          Showing <strong>{results.length}</strong> results {query ? `for "${query}"` : 'across all collections'}
        </div>

        <div className="catalog-grid">
          {results.slice(0, 48).map((product) => (
            <article className="catalog-card" key={product.id || product.slug}>
              <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="catalog-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="catalog-heart"
                    aria-label={`Save ${product.name}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      alert(`Saved ${product.name} to wishlist!`);
                    }}
                  >
                    <Heart size={18} />
                  </button>
                </div>
              </Link>
              <div style={{ padding: '8px 0 4px', fontSize: '12px', color: '#ac6543', fontWeight: 600 }}>
                {product.categoryName || product.category} &bull; {product.material}
              </div>
              <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>{product.name}</h2>
                <p>£{product.price.toFixed(2)} /m<sup>2</sup></p>
              </Link>
              <Link
                href={`/products/${product.slug}`}
                className="sample-button"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>

        {results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--cream)', borderRadius: '4px' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', margin: '0 0 10px', fontWeight: 400 }}>No products matched your search</h2>
            <p style={{ color: '#627080', fontSize: '15px', marginBottom: '20px' }}>Try searching for &quot;Terracotta&quot;, &quot;Premija&quot;, &quot;Victoria&quot;, &quot;Porcelain&quot;, or &quot;Bathroom&quot;.</p>
            <button className="btn-secondary" onClick={() => setQuery('')}>Clear Search Filter</button>
          </div>
        )}
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="subpage">
      <Header />
      <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Loading search results...</div>}>
        <SearchContent />
      </Suspense>
      <Footer />
    </main>
  );
}
