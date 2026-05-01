import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container" style={{ maxWidth: '900px', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>Contact Us</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Send us a message</h2>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Full Name</label>
              <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Email Address</label>
              <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Message</label>
              <textarea placeholder="How can we help?" rows="4" style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'none' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Send Message</button>
          </form>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <Mail size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem' }}>Email Support</h3>
              <p style={{ color: 'var(--text-muted)' }}>support@ecommerce.com</p>
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <Phone size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem' }}>Call Us</h3>
              <p style={{ color: 'var(--text-muted)' }}>+1 (555) 000-0000</p>
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem' }}>Our Office</h3>
              <p style={{ color: 'var(--text-muted)' }}>123 Commerce St, New York, NY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
