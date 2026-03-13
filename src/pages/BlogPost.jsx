import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import posts from '../data/posts.json';
import AdUnit from '../components/AdUnit';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Digitox Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      }
      
      // Dynamic canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `https://digitox.site/blog/${post.slug}`;
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="blog-post-page container">
      <Link to="/blog" className="back-link">← Back to Blog</Link>
      
      <article className="post-article">
        <header className="post-header">
          <span className="post-date">{post.date}</span>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>
        </header>

        <img src={post.image} alt={post.title} className="post-hero-image" />

        <AdUnit slot="leaderboard" style={{ margin: '2rem 0' }} />

        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <AdUnit slot="leaderboard" style={{ marginTop: '4rem' }} />
      </article>

      <style>{`
        .blog-post-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1.5rem 5rem;
        }
        .back-link {
          display: inline-block;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 2rem;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: var(--primary);
        }
        .post-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .post-date {
          font-size: 0.9rem;
          color: var(--primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 1rem;
          display: block;
        }
        .post-title {
          font-size: 2.8rem;
          line-height: 1.2;
          color: var(--text-main);
          margin-bottom: 1.5rem;
        }
        .post-excerpt {
          font-size: 1.2rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 650px;
          margin: 0 auto;
        }
        .post-hero-image {
          width: 100%;
          height: auto;
          border-radius: 12px;
          margin-bottom: 3rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .post-content {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-main);
        }
        .post-content p {
          margin-bottom: 1.5rem;
        }
        .post-content h3 {
          font-size: 1.8rem;
          margin: 2.5rem 0 1rem;
          color: var(--text-main);
        }
        .post-content ul, .post-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .post-content li {
          margin-bottom: 0.5rem;
        }
        .post-content strong {
          font-weight: 600;
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .post-title {
            font-size: 2rem;
          }
          .post-excerpt {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
