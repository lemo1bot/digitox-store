import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero />

      <main className="main-content">
        <div className="container">

          <div className="collection-header">
            <h2 className="collection-title">Refurbished Mobile Phones (Rs. 1000 - 10000)</h2>
            <div className="collection-filters">
              <span>{productsData.length} products</span>
              <select className="sort-input">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {productsData.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>

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
