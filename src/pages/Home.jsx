import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  Zap,
  Heart,
  CheckCircle
} from 'lucide-react';
import PremiumBackground from '../components/PremiumBackground';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { fetchProducts } from '../services/api';

const Home = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  const toggleWishlist = (product) => {
    const isWishlisted = wishlistItems.find((x) => x._id === product._id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    }));
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="home-page" style={{ background: '#fff' }}>
      
      {/* HERO SECTION */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <PremiumBackground light={true}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', minHeight: '90vh', padding: '120px 0 80px', gap: '4rem' }}>
            
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.8)', padding: '0.6rem 1.25rem', borderRadius: '2rem', marginBottom: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.5)' }}>
                <Zap size={16} color="#6366f1" fill="#6366f1" />
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#4f46e5', letterSpacing: '0.05em', textTransform: 'uppercase' }}>New Collection 2026</span>
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900', lineHeight: 1.1, color: '#1a1a1a', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                Elevate Your <span className="premium-text-gradient">Everyday</span> Aesthetic.
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '540px', fontWeight: '500' }}>
                Experience a curated selection of luxury tech, fashion, and lifestyle essentials designed for those who demand the extraordinary.
              </p>
              
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <Link to="/category/electronics">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} style={{ padding: '1.25rem 2.5rem', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                    Shop Collection <ArrowRight size={20} />
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button whileHover={{ scale: 1.05, background: 'rgba(255,255,255,1)' }} whileTap={{ scale: 0.98 }} style={{ padding: '1.25rem 2.5rem', background: 'rgba(255,255,255,0.5)', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                    Our Story
                  </motion.button>
                </Link>
              </div>

              {/* Stats/Social Proof */}
              <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '2.5rem' }}>
                <div>
                  <p style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '0.25rem' }}>12k+</p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Happy Clients</p>
                </div>
                <div>
                  <p style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '0.25rem' }}>4.9/5</p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Avg Rating</p>
                </div>
                <div>
                  <p style={{ fontSize: '1.75rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '0.25rem' }}>24h</p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Fast Delivery</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} style={{ position: 'relative' }}>
              <div style={{ 
                position: 'relative', 
                zIndex: 2, 
                borderRadius: '2.5rem', 
                overflow: 'hidden', 
                boxShadow: '0 80px 120px -30px rgba(99, 102, 241, 0.25)',
                transform: 'perspective(1500px) rotateY(-8deg) rotateX(2deg)',
                border: '8px solid rgba(255,255,255,0.8)',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(20px)'
              }}>
                <img 
                  src="/images/elegant_hero_showcase_1776762280521.png" 
                  alt="Luxury Lifestyle" 
                  style={{ width: '100%', height: '750px', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(99, 102, 241, 0.1), transparent)' }}></div>
              </div>
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', top: '10%', left: '-8%', padding: '1.5rem', background: '#fff', borderRadius: '1.25rem', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 5, border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <TrendingUp size={22} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trending Now</p>
                  <p style={{ fontSize: '1rem', fontWeight: '900', color: '#1a1a1a' }}>Aura Headphones</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: 'absolute', bottom: '15%', right: '-8%', padding: '1.75rem', background: 'rgba(255,255,255,0.9)', borderRadius: '1.5rem', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', zIndex: 5, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)' }}>
                <div style={{ display: 'flex', gap: '0.3rem', color: '#fbbf24', marginBottom: '0.75rem' }}>
                  {[...Array(5)].map((_, i) => <Sparkles key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                </div>
                <p style={{ fontSize: '1rem', fontWeight: '800', fontStyle: 'italic', color: '#1a1a1a' }}>"Simply Unmatched"</p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', fontWeight: '600' }}>- Sarah Jenkins, Creative Director</p>
              </motion.div>
            </motion.div>
          </div>
        </PremiumBackground>
      </section>

      {/* TRUST MARKS */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Truck size={32} color="#6366f1" />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1a1a1a' }}>Worldwide Shipping</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Fast delivery globally</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={32} color="#6366f1" />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1a1a1a' }}>Secure Payments</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>100% encrypted checkout</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <RotateCcw size={32} color="#6366f1" />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1a1a1a' }}>Easy Returns</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>30-day money-back</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Star size={32} color="#6366f1" />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#1a1a1a' }}>Premium Quality</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Curated excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section style={{ padding: '100px 0', background: '#fcfcfd' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                Shop by <span className="premium-text-gradient">Category</span>
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto' }}>
                Explore our handpicked collections across every lifestyle category.
              </p>
            </motion.div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {[
              { 
                name: 'Electronics', 
                subtitle: 'Smart Devices & Gadgets',
                items: '2,400+',
                image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(99,102,241,0.85), rgba(79,70,229,0.6))',
                span: false 
              },
              { 
                name: 'Fashion', 
                subtitle: 'Trending Styles & Apparel',
                items: '5,100+',
                image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(236,72,153,0.85), rgba(219,39,119,0.6))',
                span: false
              },
              { 
                name: 'Kitchen', 
                subtitle: 'Cookware & Essentials',
                items: '1,800+',
                image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(245,158,11,0.85), rgba(217,119,6,0.6))',
                span: false
              },
              { 
                name: 'Beauty', 
                subtitle: 'Skincare & Cosmetics',
                items: '3,200+',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(168,85,247,0.85), rgba(139,92,246,0.6))',
                span: false
              },
              { 
                name: 'Health', 
                subtitle: 'Wellness & Fitness',
                items: '1,500+',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(16,185,129,0.85), rgba(5,150,105,0.6))',
                span: false
              },
              { 
                name: 'Sports', 
                subtitle: 'Gear & Equipment',
                items: '2,000+',
                image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(239,68,68,0.85), rgba(220,38,38,0.6))',
                span: false
              },
              { 
                name: 'Grocery', 
                subtitle: 'Fresh & Organic Essentials',
                items: '1,200+',
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(34,197,94,0.85), rgba(22,163,74,0.6))',
                span: false
              },
              { 
                name: 'Decor', 
                subtitle: 'Art, Lighting & Accents',
                items: '950+',
                image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(139,92,246,0.85), rgba(124,58,237,0.6))',
                span: false
              },
              { 
                name: 'Pets', 
                subtitle: 'Premium Food & Toys',
                items: '800+',
                image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80',
                gradient: 'linear-gradient(135deg, rgba(249,115,22,0.85), rgba(234,88,12,0.6))',
                span: false
              },
            ].map((category, idx) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{ 
                  position: 'relative', 
                  height: '420px', 
                  borderRadius: '2rem', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  gridColumn: category.span ? 'span 2' : 'span 1'
                }}
              >
                <Link to={`/category/${category.name.toLowerCase()}`} style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* Premium Overlay Gradient */}
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: category.gradient,
                    mixBlendMode: 'multiply',
                    opacity: 0.4
                  }}></div>
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' 
                  }}></div>
                  
                  {/* Content */}
                  <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: '800', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '0.3rem 0.75rem', borderRadius: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {category.items} Products
                      </span>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>{category.name}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {category.subtitle} <ArrowRight size={16} />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                Curated <span className="premium-text-gradient">Selection</span>
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Handpicked essentials for the modern lifestyle.</p>
            </div>
            <Link to="/category/electronics">
              <motion.button whileHover={{ x: 10 }} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                View All <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <div 
                  style={{ 
                    borderRadius: '2rem', 
                    overflow: 'hidden', 
                    background: '#fff', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f5f9',
                    position: 'relative',
                    transition: 'all 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 40px 80px rgba(99, 102, 241, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button 
                      onClick={() => toggleWishlist(product)}
                      style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: '#fff', border: 'none', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', cursor: 'pointer', color: wishlistItems.find(x => x._id === product._id) ? '#ef4444' : '#1a1a1a', transition: 'all 0.3s' }}
                    >
                      <Heart size={20} fill={wishlistItems.find(x => x._id === product._id) ? '#ef4444' : 'none'} />
                    </button>
                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: product.countInStock > 0 ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '800', backdropFilter: 'blur(5px)' }}>
                      {product.countInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                    </div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.75rem' }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', color: '#fbbf24' }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '700' }}>(124 reviews)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1a1a1a' }}>${product.price}</span>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={product.countInStock === 0}
                        onClick={() => handleAddToCart(product)}
                        style={{ background: product.countInStock === 0 ? '#cbd5e1' : (addedId === product._id ? '#22c55e' : '#6366f1'), color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.75rem', fontWeight: '700', cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)', transition: 'background 0.3s' }}
                      >
                        {product.countInStock === 0 ? 'Sold Out' : (addedId === product._id ? <><CheckCircle size={18} /> Added!</> : <><ShoppingBag size={18} /> Add to Cart</>)}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: '100px 0', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(225deg, rgba(99, 102, 241, 0.2), transparent)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Join the <span className="premium-text-gradient">Aesthetic</span>.</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '3rem', lineHeight: 1.6 }}>Subscribe to our newsletter for exclusive previews of new drops and member-only aesthetic inspiration.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ flex: 1, padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem', outline: 'none' }}
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ padding: '1.25rem 2.5rem', background: '#fff', color: '#1a1a1a', border: 'none', borderRadius: '1rem', fontWeight: '800', cursor: 'pointer' }}
              >
                Join Now
              </motion.button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
