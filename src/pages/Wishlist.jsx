import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import PremiumBackground from '../components/PremiumBackground';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    dispatch(removeFromWishlist(product._id));
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <PremiumBackground light={true}>
        <div className="container" style={{ padding: '4rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', fontWeight: '800', textDecoration: 'none' }}>
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '3rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Heart size={40} color="#ef4444" fill="#ef4444" />
            My Wishlist
            <span style={{ fontSize: '1.25rem', color: '#94a3b8', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '1rem', marginLeft: '1rem' }}>
              {wishlistItems.length} Items
            </span>
          </h1>

          {wishlistItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass" 
              style={{ padding: '5rem 2rem', textAlign: 'center', borderRadius: '3rem' }}
            >
              <div style={{ color: '#cbd5e1', marginBottom: '2rem' }}><Heart size={100} /></div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Your wishlist is empty</h2>
              <p style={{ color: '#64748b', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Save items you love and they will show up here!</p>
              <Link to="/" className="btn btn-primary" style={{ padding: '1.2rem 3rem', borderRadius: '1.5rem', fontSize: '1.1rem' }}>
                Discover Products
              </Link>
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              <AnimatePresence>
                {wishlistItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="glass"
                    style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.8)' }}
                  >
                    <div style={{ position: 'relative', height: '240px' }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <button 
                        onClick={() => removeFromWishlistHandler(item._id)}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      >
                        <Trash2 size={18} />
                      </button>
                      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: item.countInStock > 0 ? '#22c55e' : '#ef4444', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '800' }}>
                        {item.countInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', color: '#1a1a1a' }}>{item.name}</h3>
                      <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#6366f1', marginBottom: '1.5rem' }}>${item.price}</p>
                      
                      <button 
                        disabled={item.countInStock === 0}
                        onClick={() => addToCartHandler(item)}
                        style={{ width: '100%', padding: '1rem', borderRadius: '1rem', background: '#1a1a1a', color: '#fff', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: item.countInStock === 0 ? 0.5 : 1 }}
                      >
                        <ShoppingBag size={20} />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </PremiumBackground>
    </div>
  );
};

export default Wishlist;
