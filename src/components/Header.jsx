import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-wrapper">
      <div className="announcement-bar">
        <p>Welcome to Digitox | India's #1 Refurbished Store | Free Shipping</p>
      </div>

      <div className="header-main">
        <div className="container header-container">
          <div className="header-mobile-menu">
            <button className="btn-icon">
              <Menu size={24} />
            </button>
          </div>

          <Link to="/" className="site-logo">
            Digitox
          </Link>

          <nav className="desktop-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Smartphones</Link></li>
              <li><Link to="/">Categories</Link></li>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </nav>

          <div className="header-icons">
            <button className="btn-icon">
              <Search size={22} />
            </button>
            <button className="btn-icon">
              <User size={22} />
            </button>
            <button className="btn-icon cart-icon">
              <ShoppingCart size={22} />
              <span className="cart-count">0</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .header-wrapper {
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 100;
        }

        .announcement-bar {
          background: var(--primary);
          color: #fff;
          text-align: center;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        .header-main {
          padding: 1.25rem 0;
        }

        .header-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        .header-mobile-menu {
          display: none;
        }

        .site-logo {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          justify-self: center;
        }

        .desktop-nav {
          justify-self: center;
        }

        .desktop-nav ul {
          display: flex;
          gap: 2rem;
        }

        .desktop-nav a {
          font-size: 0.95rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .desktop-nav a:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .header-icons {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-self: end;
        }

        .cart-icon {
          position: relative;
        }

        .cart-count {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--primary);
          color: #fff;
          font-size: 0.65rem;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(25%, -25%);
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .header-container {
            grid-template-columns: 1fr auto 1fr;
          }
          .header-mobile-menu {
            display: block;
            justify-self: start;
          }
        }
      `}</style>
    </header>
  );
}
