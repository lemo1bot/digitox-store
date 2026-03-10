export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container footer-container">
        <div className="footer-block">
          <h3>Digitox</h3>
          <p className="footer-text">
            India's most trusted partner for certified refurbished and pre-owned devices. Save money without compromising on quality.
          </p>
        </div>

        <div className="footer-block">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Search</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-block">
          <h3>Policies</h3>
          <ul>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Shipping Policy</a></li>
          </ul>
        </div>

        <div className="footer-block">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li><strong>Address:</strong><br />Shop No. 14, Ground Floor, Cyber Hub Plaza, Sector 15<br />Noida, Uttar Pradesh 201301, India</li>
            <li><strong>Phone:</strong><br />+91 98765 43210</li>
            <li><strong>Email:</strong><br />support@digitox.in</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>&copy; {new Date().getFullYear()}, Digitox Powered by Custom React</p>
          <div className="payment-icons">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">RuPay</span>
            <span className="payment-badge">Visa</span>
            <span className="payment-badge">Mastercard</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background: var(--secondary);
          padding-top: 4rem;
          margin-top: 4rem;
          border-top: 1px solid var(--border-color);
        }

        .footer-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .footer-block h3 {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-text {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .footer-block ul {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-block a {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .footer-block a:hover {
          color: var(--primary);
        }

        .contact-info li {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .contact-info strong {
          color: var(--primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding: 1.5rem 0;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .payment-icons {
          display: flex;
          gap: 0.5rem;
        }

        .payment-badge {
          background: #fff;
          border: 1px solid var(--border-color);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
          .bottom-container {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
