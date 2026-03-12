import React, { useState, useMemo, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import AdUnit from '../components/AdUnit';
import productsData from '../data/products.json';

export default function Home() {
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('featured');

  useEffect(() => {
    document.title = "Digitox | Premium Refurbished Smartphones India";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Buy premium refurbished and highly-anticipated vintage smartphones in India. Huge discounts on iPhones, Galaxy, BlackBerry, and Nokia with fast free shipping.');
    }
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData;

    // Sort logic
    if (sortOption === 'low') {
      filtered = [...filtered].sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortOption === 'high') {
      filtered = [...filtered].sort((a, b) => b.priceNum - a.priceNum);
    }

    return filtered;
  }, [priceFilter, sortOption]);

  return (
    <div className="page-wrapper">
      <Hero />

      <main className="main-content">
        <div className="container">

          <div id="smartphones" className="collection-header">
            <h2 className="collection-title">Refurbished Mobile Phones (Rs. 1000 - 10000)</h2>
            <div className="collection-filters">
              <span>{filteredAndSortedProducts.length} products</span>
              <select className="sort-input" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                <option value="featured">Sort by: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {filteredAndSortedProducts.map((product, idx) => (
              <React.Fragment key={idx}>
                <ProductCard product={product} />
                {/* Show an ad after every 8 products */}
                {idx === 7 && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <AdUnit slot="leaderboard" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Ad before About section */}
          <AdUnit slot="leaderboard" style={{ marginTop: '2rem' }} />

          <section id="about" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <h2 className="collection-title">About Us</h2>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Welcome to Digitox, India's premier destination for high-quality refurbished and vintage smartphones. We believe in sustainable technology and giving iconic devices a second life. Every phone in our inventory undergoes rigorous testing to ensure it meets our strict quality standards before it reaches your hands.
            </p>
          </section>

        </div>
      </main>

      <style>{`
        .page-wrapper {
          width: 100%;
        }

        .main-content {
          padding: 4rem 0;
        }

        .collection-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .collection-title {
          font-size: 2rem;
          font-weight: 500;
        }

        .collection-filters {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .sort-input {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          background: #fff;
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem 1.5rem;
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .collection-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .collection-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
