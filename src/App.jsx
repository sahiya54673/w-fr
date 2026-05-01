import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import AIAssistant from './components/AIAssistant';
import WhatsAppWidget from './components/WhatsAppWidget';

// Placeholders for remaining new pages
const Help = () => <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}><h1>Help Center</h1><p>Coming soon...</p></div>;
const Sustainability = () => <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}><h1>Sustainability</h1><p>Our commitment to the environment...</p></div>;
const Journal = () => <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}><h1>Journal</h1><p>Read our latest stories...</p></div>;
const ShippingPolicy = () => <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}><h1>Shipping Policy</h1><p>Information about shipping rates and delivery times...</p></div>;
const PrivacyPolicy = () => <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}><h1>Privacy Policy</h1><p>How we handle your data...</p></div>;
const TermsOfService = () => <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}><h1>Terms of Service</h1><p>Rules and guidelines for using our service...</p></div>;
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
        <WhatsAppWidget />
      </div>
    </Router>
  );
}

export default App;
