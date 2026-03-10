import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function CheckoutDemo() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) {
    return (
      <div className="container empty-state">
        <h2>No Product Selected</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>Return to Shop</button>
        <style>{`.empty-state { text-align: center; padding: 10rem 0; } .empty-state h2 { margin-bottom: 2rem; }`}</style>
      </div>
    );
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container success-state">
        <div className="success-content">
          <ShieldCheck size={64} color="var(--success)" />
          <h2>Order Confirmed</h2>
          <p>Thank you for purchasing {product.data}. This was a simulated checkout demo for Digitox.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
        <style>{`
          .success-state { display: flex; justify-content: center; align-items: center; min-height: 50vh; text-align: center; }
          .success-content { padding: 3rem; background: var(--secondary); border: 1px solid var(--border-color); }
          .success-content h2 { margin: 1rem 0; font-size: 2rem; }
          .success-content p { color: var(--text-muted); margin-bottom: 2rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <div className="checkout-layout">
        <div className="checkout-form-area">
          <h1 className="checkout-title">Digitox Checkout</h1>
          <form onSubmit={handleCheckout}>

            <div className="form-section">
              <h3>Contact Information</h3>
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="form-section">
              <h3>Shipping address (India)</h3>
              <div className="form-grid">
                <input type="text" placeholder="First name" required />
                <input type="text" placeholder="Last name" required />
              </div>
              <input type="text" placeholder="Address" required style={{ marginTop: '1rem', width: '100%' }} />
              <div className="form-grid" style={{ marginTop: '1rem' }}>
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="PIN code" required />
              </div>
            </div>

            <div className="form-section">
              <h3>Payment (Demo)</h3>
              <p className="payment-hint">All transactions are secure and encrypted.</p>

              <div className="payment-methods">
                <label className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                  <span>UPI (Google Pay, PhonePe, Paytm)</span>
                </label>

                {paymentMethod === 'upi' && (
                  <div className="payment-details">
                    <input type="text" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" required />
                  </div>
                )}

                <label className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span>Credit / Debit Card</span>
                </label>

                {paymentMethod === 'card' && (
                  <div className="payment-details">
                    <input type="text" placeholder="Card number" required />
                    <div className="form-grid" style={{ marginTop: '1rem' }}>
                      <input type="text" placeholder="Expiration date (MM / YY)" required />
                      <input type="text" placeholder="Security code" required />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn-primary submit-btn" disabled={isProcessing}>
              {isProcessing ? 'Processing Demo...' : 'Pay now'}
            </button>
          </form>
        </div>

        <div className="checkout-sidebar">
          <div className="sidebar-product">
            <div className="product-thumb">
              <img src={product.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3"} alt="Product" />
              <span className="product-qty">1</span>
            </div>
            <div className="product-desc">
              <h4>{product.data}</h4>
            </div>
            <span className="product-price">{product.priceDisplay}</span>
          </div>

          <div className="sidebar-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{product.priceDisplay}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="total-row final-total">
              <span>Total</span>
              <span><span className="currency">INR</span> {product.priceDisplay}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-container {
          padding: 3rem 1.5rem;
          max-width: 1000px;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
        }

        .checkout-title {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .form-section {
          margin-bottom: 2.5rem;
        }

        .form-section h3 {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .payment-hint {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .payment-methods {
          border: 1px solid var(--border-color);
          border-radius: 4px;
          overflow: hidden;
        }

        .payment-method {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          background: #fafafa;
        }

        .payment-method.active {
          background: #f0f8ff;
          border-color: var(--primary);
        }

        .payment-method:last-child {
          border-bottom: none;
        }

        .payment-details {
          padding: 1.5rem;
          background: #f9f9f9;
          border-bottom: 1px solid var(--border-color);
        }

        .submit-btn {
          width: 100%;
          padding: 1.2rem;
          font-size: 1.1rem;
          margin-top: 1rem;
          border-radius: 4px;
        }

        .checkout-sidebar {
          background: var(--secondary);
          padding: 2rem;
          border-left: 1px solid var(--border-color);
        }

        .sidebar-product {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .product-thumb {
          position: relative;
          width: 64px;
          height: 64px;
          border: 1px solid var(--border-color);
          background: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-thumb img {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
        }

        .product-qty {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--text-muted);
          color: #fff;
          font-size: 0.75rem;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .product-desc {
          flex: 1;
        }

        .product-desc h4 {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .product-price {
          font-weight: 500;
        }

        .sidebar-totals {
          padding-top: 1.5rem;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        hr {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 1.5rem 0;
        }

        .final-total {
          color: var(--text-main);
          font-size: 1.2rem;
          font-weight: 600;
          align-items: center;
        }

        .currency {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 400;
          margin-right: 0.25rem;
        }

        @media (max-width: 900px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
          .checkout-sidebar {
            order: -1;
            border-left: none;
            border-bottom: 1px solid var(--border-color);
          }
        }
      `}</style>
    </div>
  );
}
