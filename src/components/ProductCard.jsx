import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, darkTheme = false }) => {
  return (
    <motion.div 
      whileHover={{ y: -15 }}
      style={{ 
        position: 'relative',
        background: darkTheme ? '#0a0a0a' : 'white',
        border: darkTheme ? '1px solid #1a1a1a' : '1px solid #eee',
        borderRadius: '0',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
      }}
    >
      <Link to={`/product/${product._id}`} style={{ display: 'block', overflow: 'hidden' }}>
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '450px', objectFit: 'cover' }}
        />
      </Link>
      
      <div style={{ padding: '2rem', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <Link to={`/product/${product._id}`}>
              <h3 style={{ 
                marginBottom: '0.5rem', 
                fontSize: '1.2rem', 
                fontWeight: '600',
                color: darkTheme ? '#fff' : '#000',
                letterSpacing: '0.02em'
              }}>{product.name}</h3>
            </Link>
            <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Premium Edition</span>
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: darkTheme ? '#fff' : '#000' }}>${product.price}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', color: '#fbbf24' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'} strokeWidth={1} />
            ))}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#444' }}>{product.numReviews} REVIEWS</span>
        </div>

        <motion.button 
          whileHover={{ background: darkTheme ? '#fff' : '#000', color: darkTheme ? '#000' : '#fff' }}
          onClick={() => alert(`${product.name} added to cart! 🛒`)}
          style={{ 
            width: '100%',
            padding: '1.2rem',
            border: darkTheme ? '1px solid #333' : '1px solid #000',
            background: 'transparent',
            color: darkTheme ? '#fff' : '#000',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <ShoppingBag size={18} />
          Add to Selection
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
