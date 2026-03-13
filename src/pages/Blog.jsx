import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import posts from '../data/posts.json';

export default function Blog() {
  useEffect(() => {
    document.title = "Digitox Blog | Refurbished & Vintage Phone Guides";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Read the latest guides, reviews, and news about refurbished, vintage, and modern smartphones in India.');
    }
  }, []);

  return (
    <div className="blog-page container">
      <div className="blog-header">
        <h1>The Digitox Tech Blog</h1>
        <p>Your ultimate guide to smart buying, vintage tech, and finding the perfect refurbished smartphone.</p>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card glass-panel">
            <Link to={`/blog/${post.slug}`} className="blog-image-link">
              <img src={post.image} alt={post.title} className="blog-image" />
            </Link>
            <div className="blog-card-content">
              <span className="blog-date">{post.date}</span>
              <h2 className="blog-title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="read-more">Read Article →</Link>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .blog-page {
          padding: 3rem 1.5rem;
          min-height: 70vh;
        }
        .blog-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .blog-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--text-main);
        }
        .blog-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.5rem;
        }
        .blog-card {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .blog-image-link {
          display: block;
          height: 220px;
          overflow: hidden;
        }
        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }
        .blog-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .blog-date {
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.8rem;
          display: block;
        }
        .blog-title {
          font-size: 1.3rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }
        .blog-title a {
          color: var(--text-main);
          text-decoration: none;
        }
        .blog-title a:hover {
          color: var(--primary);
        }
        .blog-excerpt {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .read-more {
          font-weight: 600;
          color: var(--text-main);
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s;
        }
        .read-more:hover {
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
