import { Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  // Valid fallback image
  const image = product.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.web_scraper_order}`, { state: { product } })}>
      <div className="card-image-wrapper">
        <span className="badge-sale absolute-badge">Sale</span>
        <img src={image} alt={product.data} className="card-image" referrerPolicy="no-referrer" />
        <div className="quick-add">
          <button className="btn-primary full-width" onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.web_scraper_order}`, { state: { product } })
          }}>View Details</button>
        </div>
      </div>

      <div className="card-info">
        <div className="reviews">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? "var(--primary)" : "none"}
                className={i < Math.floor(product.rating) ? "star-filled" : "star-empty"}
              />
            ))}
          </div>
          <span className="review-count">({product.reviewsCount})</span>
        </div>

        <h3 className="card-title">{product.data}</h3>

        {/* Render Specs if they exist */}
        {product.specs && (
          <ul className="product-specs">
            {product.specs.slice(0, 3).map((spec, i) => (
              <li key={i}><CheckCircle size={12} className="spec-icon" /> {spec}</li>
            ))}
          </ul>
        )}

        <div className="card-price">
          <span className="price-sale">{product.priceDisplay}</span>
          <span className="price-original">Rs. {(product.priceNum * 1.3).toLocaleString()}</span>
        </div>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
        }

        .product-card:hover .card-title {
          text-decoration: underline;
        }

        .card-image-wrapper {
          background: var(--secondary);
          position: relative;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .absolute-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
        }

        .card-image {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
          transition: transform 0.3s;
        }

        .product-card:hover .card-image {
          transform: scale(1.05);
        }

        .quick-add {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          transform: translateY(100%);
          transition: transform 0.3s;
        }

        .product-card:hover .quick-add {
          transform: translateY(0);
        }

        .full-width {
          width: 100%;
          border-radius: 0;
          padding: 1rem;
        }

        .card-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .reviews {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .star-filled {
          color: var(--primary);
        }
        
        .star-empty {
          color: var(--border-color);
        }

        .review-count {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .card-title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-specs {
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .product-specs li {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .spec-icon {
          color: var(--success);
          flex-shrink: 0;
        }

        .card-price {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .price-sale {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .price-original {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
}
