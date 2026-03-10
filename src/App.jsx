import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CheckoutDemo from './pages/CheckoutDemo';
import ProductDetails from './pages/ProductDetails';

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
          </Routes>
        </main>

        <Footer />
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
