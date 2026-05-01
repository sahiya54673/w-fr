import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginApi } from '../services/api';
import { setUserInfo } from '../redux/slices/userSlice';
import PremiumBackground from '../components/PremiumBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { data } = await loginApi({ email, password });
      dispatch(setUserInfo(data));
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PremiumBackground light={true}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', padding: '2rem' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '450px', padding: '3rem', borderRadius: '2.5rem', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Welcome Back</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontWeight: '500' }}>Enter your details to access your account</p>
            
            {error && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}
            
            <form onSubmit={submitHandler}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.9rem', color: '#1a1a1a' }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '1.25rem', border: '2px solid #f1f5f9', background: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.9rem', color: '#1a1a1a' }}>Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '1.25rem', border: '2px solid #f1f5f9', background: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1.2rem', marginBottom: '1.5rem', borderRadius: '1.25rem', fontSize: '1.1rem', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
            
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500' }}>
              New Customer? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '700' }}>Create an Account</Link>
            </div>
          </div>
        </div>
      </PremiumBackground>
    </div>
  );
};

export default Login;
