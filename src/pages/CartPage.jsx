import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQtyHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '3rem 0' }}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em' }}>
            Shopping <span style={{ color: '#6366f1' }}>Cart</span>
          </h1>
          <p style={{ color: '#64748b', fontWeight: '600' }}>
            {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#fff',
              borderRadius: '2rem',
              padding: '5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9'
            }}
          >
            <div style={{ width: '80px', height: '80px', background: '#f5f3ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShoppingCart size={36} color="#6366f1" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.75rem' }}>Your cart is empty</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '1rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <ShoppingBag size={18} /> Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <motion.div
                  key={item.product}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{
                    background: '#fff',
                    borderRadius: '1.5rem',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '1rem', flexShrink: 0 }}
                    onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.product}/200/200`; }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.25rem' }}>{item.name}</h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: '900', color: '#6366f1' }}>${item.price}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <select
                      value={item.qty}
                      onChange={(e) => updateQtyHandler(item, e.target.value)}
                      style={{
                        padding: '0.6rem 1rem',
                        borderRadius: '0.75rem',
                        border: '2px solid #e2e8f0',
                        background: '#f8fafc',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        color: '#1a1a1a',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
                        <option key={x} value={x}>{x}</option>
                      ))}
                    </select>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromCartHandler(item.product)}
                      style={{
                        background: '#fff1f2',
                        border: 'none',
                        color: '#ef4444',
                        width: '40px',
                        height: '40px',
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '80px' }}>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>Subtotal</p>
                    <p style={{ fontSize: '1.15rem', fontWeight: '900', color: '#1a1a1a' }}>
                      ${(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: '#fff',
                borderRadius: '2rem',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid #f1f5f9',
                position: 'sticky',
                top: '120px'
              }}
            >
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>Order Summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '600' }}>
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '600' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#22c55e', fontWeight: '700' }}>FREE</span>
                </div>
                <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1a1a1a', fontWeight: '900', fontSize: '1.25rem' }}>
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, background: '#4f46e5' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  background: '#6366f1',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '1rem',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 10px 25px rgba(99,102,241,0.3)'
                }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </motion.button>

              <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#6366f1', fontWeight: '700', fontSize: '0.9rem' }}>
                ← Continue Shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
