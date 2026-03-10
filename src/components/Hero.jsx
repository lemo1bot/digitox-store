export default function Hero() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <span className="hero-subtitle">Premium Quality, Lowest Prices</span>
        <h1 className="hero-title">Certified Refurbished Smartphones</h1>
        <p className="hero-desc">
          Shop India's most trusted collection of pre-owned phones.
          All devices are strictly tested, fully unlocked, and come with a 6-month warranty.
        </p>
        <button className="btn-primary hero-cta">Shop Now</button>
      </div>

      <style>{`
        .hero-banner {
          position: relative;
          width: 100%;
          min-height: 500px;
          background-color: var(--secondary);
          background-image: url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
        }

        .hero-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          color: #fff;
          max-width: 600px;
          margin-left: max(5%, calc((100vw - 1200px) / 2 + 1.5rem));
          padding: 3rem;
          background: rgba(0, 0, 0, 0.6);
        }

        .hero-subtitle {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          display: block;
          color: #e0e0e0;
        }

        .hero-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-desc {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
          color: #f4f4f4;
        }

        .hero-cta {
          padding: 1rem 2.5rem;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .hero-content {
            margin: 0 auto;
            text-align: center;
            width: 100%;
            padding: 2.5rem 1.5rem;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      `}</style>
    </section>
  );
}
