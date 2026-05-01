import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, X } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [mapOpen, setMapOpen] = useState(false);

  // Address: 123 Commerce St, New York, NY
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.168516104273!2d-74.0062269!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a187f53913b%3A0x65436688f1d3550e!2sCommerce%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus';
  const externalMapUrl = 'https://www.google.com/maps/search/?api=1&query=123+Commerce+St,+New+York,+NY';

  return (
    <>
    <footer style={{
      backgroundColor: '#f8fafc',
      color: 'var(--text-muted)',
      padding: '8rem 0 4rem',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
        {/* Brand Info */}
        <div style={{ maxWidth: '350px' }}>
          <h2 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>HAPYSHOPY</h2>
          <p style={{ lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
            Elevating your daily experience with curated premium goods and an uncompromising commitment to design and quality.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { Icon: FaFacebook, url: 'https://facebook.com/hapyshopy' }, 
              { Icon: FaTwitter, url: 'https://twitter.com/hapyshopy' }, 
              { Icon: FaInstagram, url: 'https://instagram.com/hapyshopy' }, 
              { Icon: FaYoutube, url: 'https://youtube.com/hapyshopy' }
            ].map(({ Icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', 
                height: '40px', 
                background: '#fff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--text-muted)', 
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s' 
              }} 
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--primary-color)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }} 
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '2rem', fontSize: '1rem', fontWeight: '800' }}>Explore</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'Electronics', path: '/category/electronics' },
              { name: 'Fashion', path: '/category/fashion' },
              { name: 'Home & Kitchen', path: '/category/kitchen' },
              { name: 'Beauty & Health', path: '/category/beauty' },
              { name: 'Sports & Outdoors', path: '/category/sports' }
            ].map(item => (
              <li key={item.name}>
                <Link to={item.path} style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--primary-color)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Navigation */}
        <div>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '2rem', fontSize: '1rem', fontWeight: '800' }}>Company</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'About Us', path: '/about' },
              { name: 'Sustainability', path: '/sustainability' },
              { name: 'Journal', path: '/journal' },
              { name: 'Shipping Policy', path: '/shipping' },
              { name: 'Contact Support', path: '/contact' }
            ].map(item => (
              <li key={item.name}>
                <Link to={item.path} style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--primary-color)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '800' }}>Visit Us</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li
              onClick={() => setMapOpen(true)}
              style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                cursor: 'pointer',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              title="Click to view on map"
            >
              <div style={{ color: 'var(--primary-color)', marginTop: '0.2rem' }}><MapPin size={18} /></div>
              <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                123 Commerce St<br />New York, NY 10014
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--primary-color)', marginTop: '0.25rem', fontWeight: 600 }}>View exact location →</span>
              </span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-color)' }}><Mail size={18} /></div>
              <span style={{ fontSize: '0.9rem' }}>hello@hapyshopy.com</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-color)' }}><Phone size={18} /></div>
              <span style={{ fontSize: '0.9rem' }}>+76123482173</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          &copy; {new Date().getFullYear()} HAPYSHOPY. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' }}>
          <Link to="/privacy" onMouseEnter={f => f.target.style.color='var(--primary-color)'} onMouseLeave={f => f.target.style.color='#94a3b8'}>Privacy Policy</Link>
          <Link to="/terms" onMouseEnter={f => f.target.style.color='var(--primary-color)'} onMouseLeave={f => f.target.style.color='#94a3b8'}>Terms of Service</Link>
        </div>
      </div>
    </footer>

      {/* ── Map Modal ── */}
      {mapOpen && (
        <div
          onClick={() => setMapOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(15,15,35,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeInModal 0.25s ease'
          }}
        >
          <style>{`
            @keyframes fadeInModal {
              from { opacity: 0; transform: scale(0.96); }
              to   { opacity: 1; transform: scale(1); }
            }
            .map-modal-card {
              background: #fff;
              border-radius: 18px;
              overflow: hidden;
              width: min(900px, 95vw);
              box-shadow: 0 32px 80px rgba(0,0,0,0.4);
              position: relative;
              animation: fadeInModal 0.25s ease;
            }
            .map-modal-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1.1rem 1.5rem;
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
            }
            .map-modal-header h4 {
              color: #fff;
              font-size: 1rem;
              font-weight: 700;
              margin: 0;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .map-close-btn {
              background: rgba(255,255,255,0.2);
              border: none;
              border-radius: 50%;
              width: 34px; height: 34px;
              display: flex; align-items: center; justify-content: center;
              cursor: pointer;
              color: #fff;
              transition: background 0.2s;
            }
            .map-close-btn:hover { background: rgba(255,255,255,0.35); }
          `}</style>

          <div className="map-modal-card" onClick={e => e.stopPropagation()}>
            <div className="map-modal-header">
              <h4><MapPin size={16} /> 123 Commerce St, New York, NY</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <a 
                  href={externalMapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '0.75rem', 
                    color: '#fff', 
                    textDecoration: 'underline',
                    fontWeight: 600
                  }}
                >
                  Open in Google Maps
                </a>
                <button className="map-close-btn" onClick={() => setMapOpen(false)} aria-label="Close map">
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe
              title="Store Location"
              src={mapSrc}
              width="100%"
              height="480"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
