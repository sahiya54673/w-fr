import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Clock, Truck, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchMyOrders } from '../services/api';
import { setOrders } from '../redux/slices/orderSlice';
import { logout } from '../redux/slices/userSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const { data } = await fetchMyOrders();
        dispatch(setOrders(data));
        setLoading(false);
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        setError(message);
        if (message && message.includes('Not authorized')) {
          dispatch(logout());
          window.location.href = '/login';
        }
        setLoading(false);
      }
    };
    getOrders();
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <Loader size={48} color="#6366f1" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#ef4444' }}>Error: {error}</h2>
        <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#6366f1', color: '#fff', borderRadius: '0.5rem', border: 'none' }}>Retry</button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <Package size={64} color="#cbd5e1" style={{ marginBottom: '1.5rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#1a1a1a', marginBottom: '1rem' }}>No Orders Yet</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Looks like you haven't placed any orders.</p>
        <Link to="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '1rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}
          >
            Start Shopping
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          My Orders
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map((order) => (
            <motion.div 
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: '#fff', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                    Order #{order._id.substring(0, 8)}
                  </p>
                  <p style={{ color: '#1a1a1a', fontWeight: '600' }}>
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#6366f1' }}>
                    ${order.totalPrice.toFixed(2)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.6rem', borderRadius: '0.5rem', marginRight: '0.5rem' }}>
                      {order.paymentMethod}
                    </span>
                    {order.isPaid ? <CheckCircle size={14} color="#22c55e" /> : <Clock size={14} color="#f59e0b" />}
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: order.isPaid ? '#22c55e' : '#f59e0b' }}>
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Items</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {order.orderItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover', border: '1px solid #f1f5f9' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.product}/100/100`; }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '700', color: '#0f172a' }}>{item.name}</p>
                        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '3rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Shipping Address</h4>
                  <p style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.5 }}>
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Delivery Status</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {order.isDelivered ? (
                      <><CheckCircle size={18} color="#22c55e" /><span style={{ fontWeight: '600', color: '#22c55e' }}>Delivered</span></>
                    ) : (
                      <><Truck size={18} color="#f59e0b" /><span style={{ fontWeight: '600', color: '#f59e0b' }}>Processing</span></>
                    )}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Method</h4>
                  <p style={{ fontWeight: '700', color: '#6366f1', fontSize: '0.9rem' }}>
                    {order.deliveryMethod || 'Standard'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
