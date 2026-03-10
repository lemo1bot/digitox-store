import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Star, CheckCircle, Shield, Truck, RefreshCcw } from 'lucide-react';

export default function ProductDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Product not found</h2>
                <button className="btn-primary" onClick={() => navigate('/')}>Return to Store</button>
            </div>
        );
    }

    const image = product.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

    return (
        <div className="container product-details-page">
            <div className="details-layout">

                {/* Left: Image Gallery */}
                <div className="product-gallery">
                    <div className="main-image-container">
                        <span className="badge-sale absolute-badge" style={{ top: '20px', left: '20px' }}>Refurbished</span>
                        <img src={image} alt={product.data} className="main-image" />
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="product-info-column">
                    <h1 className="product-title">{product.data}</h1>

                    <div className="product-meta">
                        <div className="reviews">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < Math.floor(product.rating) ? "var(--primary)" : "none"}
                                        color={i < Math.floor(product.rating) ? "var(--primary)" : "var(--border-color)"}
                                    />
                                ))}
                            </div>
                            <span className="review-count">{product.rating} ({product.reviewsCount} reviews)</span>
                        </div>
                        <span className="sku">SKU: {product.web_scraper_order}</span>
                    </div>

                    <div className="price-section">
                        <span className="price-sale">{product.priceDisplay}</span>
                        <span className="price-original">Rs. {(product.priceNum * 1.3).toLocaleString()}</span>
                        <span className="tax-notice">Tax included. Free Shipping across India.</span>
                    </div>

                    {/* Quick Specs */}
                    <div className="specs-section">
                        <h3>Key Specifications</h3>
                        <ul className="full-specs-list">
                            {product.specs ? product.specs.map((spec, i) => (
                                <li key={i}><CheckCircle size={16} className="spec-icon" /> {spec}</li>
                            )) : (
                                <>
                                    <li><CheckCircle size={16} className="spec-icon" /> Fully Unlocked to any network</li>
                                    <li><CheckCircle size={16} className="spec-icon" /> Thoroughly tested & 100% functional</li>
                                    <li><CheckCircle size={16} className="spec-icon" /> Original battery replaced or health is optimal</li>
                                    <li><CheckCircle size={16} className="spec-icon" /> Clean cosmetic condition</li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Trust Badges */}
                    <div className="trust-badges">
                        <div className="badge-item">
                            <Shield size={24} />
                            <span>6 Months Warranty</span>
                        </div>
                        <div className="badge-item">
                            <Truck size={24} />
                            <span>Free Delivery</span>
                        </div>
                        <div className="badge-item">
                            <RefreshCcw size={24} />
                            <span>7 Days Return</span>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="actions">
                        <button
                            className="btn-primary buy-btn"
                            onClick={() => navigate('/checkout', { state: { product } })}
                        >
                            Buy Now - Secure Checkout
                        </button>
                        <p className="stock-notice">🟢 In Stock - Ready to Ship</p>
                    </div>
                </div>
            </div>

            {/* Bottom: Detailed Description & Reviews */}
            <div className="product-tabs">
                <div className="tab-header">
                    <h2 className="active-tab">Detailed Reviews ({product.reviewsCount})</h2>
                </div>

                <div className="tab-content reviews-tab">
                    <div className="review-summary">
                        <h3>Customer Feedback</h3>
                        <div className="average-rating">
                            <Star size={32} fill="var(--primary)" color="var(--primary)" />
                            <span className="big-rating">{product.rating}</span>
                            <span className="out-of">/ 5.0</span>
                        </div>
                        <p>Based on {product.reviewsCount} verified purchases</p>
                    </div>

                    <div className="review-list">
                        <div className="review-card">
                            <div className="review-head">
                                <div className="stars">
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                </div>
                                <span className="reviewer">Rahul S.</span>
                                <span className="date">2 days ago</span>
                            </div>
                            <h4>Exactly as described!</h4>
                            <p>The condition of the phone was pristine. It honestly looks brand new. The battery life is holding up great so far. Highly recommended Digitox!</p>
                        </div>

                        <div className="review-card">
                            <div className="review-head">
                                <div className="stars">
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} fill="var(--primary)" color="var(--primary)" />
                                    <Star size={14} color="var(--border-color)" />
                                </div>
                                <span className="reviewer">Vikas M.</span>
                                <span className="date">1 week ago</span>
                            </div>
                            <h4>Good value for money</h4>
                            <p>Got this for a very low price. There's a tiny scratch on the back, but for a refurbished unit, it's totally acceptable. Performs perfectly.</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .product-details-page {
          padding: 2rem 1.5rem;
          max-width: 1200px;
        }

        .details-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .product-gallery {
          display: flex;
          flex-direction: column;
        }

        .main-image-container {
          background: #fff;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .main-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .product-title {
          font-size: 2rem;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .product-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .reviews {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .review-count {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .sku {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .price-section {
          margin-bottom: 2rem;
        }

        .price-sale {
          font-size: 2rem;
          font-weight: 600;
          color: var(--text-main);
          margin-right: 1rem;
        }

        .price-original {
          font-size: 1.2rem;
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .tax-notice {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .specs-section {
          margin-bottom: 2rem;
        }

        .specs-section h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .full-specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .full-specs-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-main);
        }

        .spec-icon {
          color: var(--success);
        }

        .trust-badges {
          display: flex;
          gap: 2rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 2rem;
        }

        .badge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-main);
          text-align: center;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .buy-btn {
          padding: 1.2rem;
          font-size: 1.1rem;
          border-radius: 4px;
        }

        .stock-notice {
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .product-tabs {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }

        .tab-header {
          margin-bottom: 2rem;
        }

        .active-tab {
          font-size: 1.5rem;
          display: inline-block;
          border-bottom: 2px solid var(--text-main);
          padding-bottom: 0.5rem;
        }

        .reviews-tab {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
        }

        .average-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .big-rating {
          font-size: 3rem;
          font-weight: 700;
        }

        .out-of {
          color: var(--text-muted);
          font-size: 1.2rem;
        }

        .review-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .review-card {
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .review-card:last-child {
          border-bottom: none;
        }

        .review-head {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .reviewer {
          font-weight: 600;
        }

        .date {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .review-card h4 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .review-card p {
          color: var(--text-main);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .details-layout, .reviews-tab {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .main-image-container {
            height: 350px;
          }
        }
      `}</style>
        </div>
    );
}
