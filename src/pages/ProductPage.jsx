import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, ShieldCheck, Truck, RefreshCw, Heart, ShoppingBag, CheckCircle, Loader } from 'lucide-react';
import PremiumBackground from '../components/PremiumBackground';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { fetchProductById } from '../services/api';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishlistItems.find((x) => x._id === id);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        // Try fetching from API
        const { data } = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        // Fallback to dummy data if API fails or product not found in DB
        setProduct({
          _id: id,
          name: 'Premium Lifestyle Edition',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          price: 199.99,
          rating: 4.5,
          numReviews: 124,
          countInStock: 5,
          description: 'Experience true luxury with this limited edition piece. Crafted from the highest quality materials and designed for the modern lifestyle.',
        });
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
        <Loader size={48} color="#6366f1" />
      </motion.div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PremiumBackground light={true}>
        <div className="container" style={{ padding: '4rem 2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', color: '#6366f1', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>
            <ArrowLeft size={18} />
            Back to Boutique
          </Link>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '3rem', boxShadow: '0 50px 100px -30px rgba(0,0,0,0.15)', border: '8px solid #fff' }} />
                <button 
                  onClick={toggleWishlist}
                  style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#fff', border: 'none', width: '55px', height: '55px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', cursor: 'pointer', color: isWishlisted ? '#ef4444' : '#1a1a1a', transition: 'all 0.3s' }}
                >
                  <Heart size={24} fill={isWishlisted ? '#ef4444' : 'none'} />
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.02em', color: '#1a1a1a' }}>{product.name}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', color: '#fbbf24', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'} strokeWidth={1.5} />
                  ))}
                </div>
                <span style={{ color: '#64748b', fontWeight: '600' }}>{product.numReviews} Verified Reviews</span>
              </div>
              
              <div className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: '#6366f1', marginBottom: '1.5rem' }}>${product.price}</p>
                <p style={{ marginBottom: '2rem', color: '#4b5563', lineHeight: '1.8', fontSize: '1.1rem' }}>{product.description}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', padding: '1.5rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#6366f1', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><ShieldCheck size={24} /></div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1a1a1a' }}>2yr Warranty</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#6366f1', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><Truck size={24} /></div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1a1a1a' }}>Free Shipping</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#6366f1', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><RefreshCw size={24} /></div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1a1a1a' }}>30-day Return</p>
                  </div>
                </div>
              </div>
              
              <div className="glass" style={{ padding: '2rem', borderRadius: '2.5rem', background: 'rgba(255,255,255,0.8)', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Availability</span>
                  <span style={{ 
                    padding: '0.5rem 1.25rem', 
                    borderRadius: '2rem', 
                    fontSize: '0.875rem', 
                    fontWeight: '800',
                    background: product.countInStock > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: product.countInStock > 0 ? '#15803d' : '#b91c1c'
                  }}>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <button 
                  onClick={addToCartHandler}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '1.4rem', borderRadius: '1.5rem', fontSize: '1.1rem', background: added ? '#22c55e' : '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }} 
                  disabled={product.countInStock === 0}
                >
                  {added ? <><CheckCircle size={24} /> Added to Bag</> : <><ShoppingBag size={24} /> Add to Shopping Bag</>}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </PremiumBackground>
    </div>
  );
};

export default ProductPage;
