import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../redux/slices/orderSlice';
import { clearCartItems } from '../redux/slices/cartSlice';
import { logout } from '../redux/slices/userSlice';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, CreditCard, Zap, TrendingUp, Clock, ShieldCheck, Smartphone } from 'lucide-react';
import { createOrder } from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState('Standard');

  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const paymentMethods = [
    { id: 'UPI', label: 'UPI / QR', icon: <Smartphone size={20} />, description: 'Pay using any UPI App' },
    { id: 'GPay', label: 'Google Pay', icon: (
      <svg width="40" height="16" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4 18.2V26.5H9.7V9.5H16.8C18.4 9.5 19.8 10.1 20.9 11.2C22 12.3 22.6 13.7 22.6 15.3C22.6 16.9 22 18.3 20.9 19.4C19.8 20.5 18.4 21.1 16.8 21.1H12.4V18.2ZM12.4 12.3V18.4H16.9C17.8 18.4 18.5 18.1 19 17.6C19.6 17.1 19.8 16.4 19.8 15.6C19.8 14.8 19.5 14.1 19 13.5C18.5 13 17.7 12.7 16.9 12.7H12.4V12.3Z" fill="#5F6368"/>
        <path d="M30.6 26.5V11.2H33.3V26.5H30.6Z" fill="#5F6368"/>
        <path d="M43.7 26.5V23.7H43.6C43.1 24.6 42.4 25.4 41.5 25.9C40.6 26.4 39.6 26.7 38.6 26.7C36.6 26.7 35.1 26.1 34 24.9C32.9 23.7 32.3 22 32.3 19.8C32.3 17.6 32.9 15.9 34 14.7C35.1 13.5 36.6 12.9 38.6 12.9C39.6 12.9 40.6 13.2 41.5 13.7C42.4 14.2 43.1 15 43.6 15.9H43.7V13.2H46.4V26.5H43.7ZM38.6 15.6C37.3 15.6 36.3 16 35.7 16.8C35.1 17.6 34.8 18.7 34.8 20.1C34.8 21.5 35.1 22.6 35.7 23.4C36.3 24.2 37.3 24.6 38.6 24.6C39.9 24.6 40.9 24.2 41.5 23.4C42.1 22.6 42.4 21.5 42.4 20.1C42.4 18.7 42.1 17.6 41.5 16.8C40.9 16 39.9 15.6 38.6 15.6Z" fill="#5F6368"/>
        <path d="M57.6 13.2L50.4 29.8H47.6L50.5 23.1L45.4 13.2H48.4L51.8 21.4H51.9L55.1 13.2H57.6Z" fill="#5F6368"/>
        <path d="M85.4 19.9C85.4 18.7 85.3 17.6 85.1 16.5H75V22.9H80.8C80.5 24.4 79.6 25.7 78.4 26.5V30.6H83.8C87 27.7 88.8 23.2 88.8 17.9L85.4 19.9Z" fill="#4285F4"/>
        <path d="M75 34C79.1 34 82.5 32.7 84.9 30.5L79.5 26.4C78 27.4 76.2 28 75 28C71.1 28 67.8 25.3 66.6 21.7H61.1V26.1C63.6 30.8 68.9 34 75 34Z" fill="#34A853"/>
        <path d="M66.6 21.7C66.3 20.8 66.1 19.9 66.1 19C66.1 18.1 66.3 17.2 66.6 16.3V11.9H61.1C60.2 13.6 59.8 15.6 59.8 17.6C59.8 19.6 60.2 21.6 61.1 23.3L66.6 21.7Z" fill="#FBBC04"/>
        <path d="M75 10C77.2 10 79.2 10.8 80.8 12.3L85.4 7.7C82.6 5.1 79.1 3.6 75 3.6C68.9 3.6 63.6 6.8 61.1 11.5L66.6 15.9C67.8 12.3 71.1 10 75 10Z" fill="#EA4335"/>
      </svg>
    ), description: 'Fast and secure' },
    { id: 'Paytm', label: 'Paytm', icon: <span style={{ fontWeight: '900', color: '#00baf2', fontSize: '0.7rem' }}>Paytm</span>, description: 'Pay via Paytm Wallet' },
    { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={20} />, description: 'Pay when you receive' },
  ];

  const deliveryOptions = {
    'Standard': { cost: 10, time: '3-5 Business Days', icon: <Truck size={20} /> },
    'Fast': { cost: 25, time: '1-2 Business Days', icon: <Zap size={20} /> },
    'Express': { cost: 45, time: 'Next Day', icon: <TrendingUp size={20} /> },
    'Today': { cost: 75, time: 'Within 24 Hours', icon: <Clock size={20} /> }
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const baseShipping = deliveryOptions[deliveryMethod].cost;
  const shippingPrice = (deliveryMethod === 'Standard' && itemsPrice > 500) ? 0 : baseShipping;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    if (!address || !city || !postalCode || !country) {
      alert("Please fill all address fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await createOrder({
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product
        })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        deliveryMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      dispatch(placeOrder(data));
      dispatch(clearCartItems());
      setLoading(false);
      navigate('/orders');
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      alert(message);
      if (message && message.includes('Not authorized')) {
        dispatch(logout());
        navigate('/login');
      }
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <Link to="/" style={{ color: '#6366f1', marginTop: '1rem', display: 'inline-block' }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '3rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          Checkout
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ background: '#fff', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={24} color="#6366f1" /> Shipping Address
            </h2>
            <form onSubmit={placeOrderHandler}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>Address</label>
                <input 
                  type="text" 
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address" 
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>City</label>
                  <input 
                    type="text" 
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City name" 
                    style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>Postal Code</label>
                  <input 
                    type="text" 
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal code" 
                    style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569' }}>Country</label>
                <input 
                  type="text" 
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country name" 
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              {/* Delivery Options */}
              <div style={{ marginBottom: '3rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Zap size={24} color="#6366f1" /> Delivery Method
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  {Object.entries(deliveryOptions).map(([key, opt]) => (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDeliveryMethod(key)}
                      style={{
                        padding: '1.5rem',
                        borderRadius: '1.5rem',
                        border: `2px solid ${deliveryMethod === key ? '#6366f1' : '#f1f5f9'}`,
                        background: deliveryMethod === key ? '#f5f3ff' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: deliveryMethod === key ? '0 10px 20px rgba(99,102,241,0.1)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div style={{ color: deliveryMethod === key ? '#6366f1' : '#94a3b8' }}>
                          {opt.icon}
                        </div>
                        <span style={{ fontWeight: '800', color: '#1a1a1a' }}>{key}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>{opt.time}</p>
                      <span style={{ fontWeight: '900', color: '#6366f1' }}>
                        {opt.cost === 0 ? 'FREE' : `$${opt.cost}`}
                      </span>
                      {deliveryMethod === key && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#6366f1' }}>
                          <CheckCircle size={18} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
                <CreditCard size={24} color="#6366f1" /> Payment Method
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPaymentMethod(method.id)}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '1.25rem',
                      border: `2px solid ${paymentMethod === method.id ? '#6366f1' : '#f1f5f9'}`,
                      background: paymentMethod === method.id ? '#f5f3ff' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                      <div style={{ color: paymentMethod === method.id ? '#6366f1' : '#94a3b8', display: 'flex', alignItems: 'center' }}>
                        {method.icon}
                      </div>
                      <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#1a1a1a' }}>{method.label}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{method.description}</p>
                    {paymentMethod === method.id && (
                      <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', color: '#6366f1' }}>
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                style={{ width: '100%', padding: '1.2rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '1.25rem', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 25px rgba(99,102,241,0.3)' }}
              >
                Place Order
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ background: '#fff', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', position: 'sticky', top: '100px' }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '1.5rem' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '0.5rem', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.product}/100/100`; }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Qty: {item.qty}</p>
                  </div>
                  <p style={{ fontWeight: '800', color: '#6366f1' }}>${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '600' }}>
                <span>Items</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '600' }}>
                <span>Shipping</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '600' }}>
                <span>Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1a1a1a', fontWeight: '900', fontSize: '1.25rem' }}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
