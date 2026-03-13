import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CheckoutDemo from './pages/CheckoutDemo';
import ProductDetails from './pages/ProductDetails';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<CheckoutDemo />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>

        <Footer />
        <Analytics />
      </div>

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-top: 1.5rem;
        }
      `}</style>
    </Router>
  );
}
