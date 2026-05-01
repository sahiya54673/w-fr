import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, Shield, Truck, Star, Users, Package, Globe, Award,
  ArrowRight, Sparkles, CheckCircle
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } })
};

const stats = [
  { number: '12K+', label: 'Happy Customers', icon: <Users size={28} color="#6366f1" /> },
  { number: '9', label: 'Product Categories', icon: <Package size={28} color="#ec4899" /> },
  { number: '4.9/5', label: 'Average Rating', icon: <Star size={28} color="#f59e0b" /> },
  { number: '50+', label: 'Countries Served', icon: <Globe size={28} color="#22c55e" /> },
];

const values = [
  {
    icon: <Shield size={32} color="#6366f1" />,
    title: 'Quality First',
    desc: 'Every product in our catalog is hand-picked and tested for premium quality. We never compromise on what reaches your doorstep.',
    bg: '#f5f3ff'
  },
  {
    icon: <Heart size={32} color="#ec4899" />,
    title: 'Customer Love',
    desc: 'Our customers are at the heart of everything we do. We listen, improve, and go the extra mile to ensure 100% satisfaction.',
    bg: '#fdf2f8'
  },
  {
    icon: <Truck size={32} color="#22c55e" />,
    title: 'Fast Delivery',
    desc: 'With our global logistics network, we ensure fast, reliable, and trackable delivery straight to your door — anywhere in the world.',
    bg: '#f0fdf4'
  },
  {
    icon: <Award size={32} color="#f59e0b" />,
    title: 'Trusted Brand',
    desc: 'Since 2024, we have built trust through transparency, honest pricing, and a commitment to sustainability and ethical sourcing.',
    bg: '#fffbeb'
  },
];

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
  { name: 'Priya Sharma', role: 'Head of Curation', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  { name: 'James Koh', role: 'Chief Design Officer', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' },
  { name: 'Sofia Chen', role: 'Head of Logistics', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
];

const milestones = [
  { year: '2024', event: 'HAPYSHOPY was founded with a vision to redefine premium e-commerce.' },
  { year: 'Q2 2024', event: 'Launched with 3 categories and 500+ curated products.' },
  { year: 'Q4 2024', event: 'Reached 5,000 happy customers and expanded to 9 categories.' },
  { year: '2025', event: 'Shipped to 50+ countries worldwide. Achieved 4.9-star average rating.' },
  { year: '2026', event: 'Now serving 12,000+ customers with new AR try-on and AI recommendations.' },
];

const About = () => {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf2f8 50%, #fff 100%)',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', padding: '0.5rem 1.25rem', borderRadius: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '1.5rem', border: '1px solid #e0e7ff' }}>
              <Sparkles size={16} color="#6366f1" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Our Story</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.03em', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              We're on a Mission to Make<br />
              <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Premium Accessible
              </span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7, fontWeight: '500' }}>
              HAPYSHOPY was born from a simple belief — that everyone deserves access to beautifully designed, high-quality products without the luxury markup.
            </p>
            <Link to="/category/electronics">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '1rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Explore Our Store <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>{s.icon}</div>
                <p style={{ fontSize: '2.25rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>{s.number}</p>
                <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                How HAPYSHOPY<br />Came to Life
              </h2>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
                It started with a frustration — premium products were either out of reach financially or buried under layers of ordinary options. Our founders Alex and Priya spent years in the design and retail industry, witnessing this gap first-hand.
              </p>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
                In 2024, they launched HAPYSHOPY — a carefully curated marketplace where every single product is chosen for its design excellence, quality craftsmanship, and genuine value for money.
              </p>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Today, we're proud to serve over 12,000 customers across 50+ countries, with 9 categories covering everything from cutting-edge electronics to artisan home décor.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Our Team"
                  style={{ width: '100%', borderRadius: '2rem', boxShadow: '0 40px 80px rgba(0,0,0,0.12)' }}
                  onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/team/800/600'; }}
                />
                <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: '#fff', borderRadius: '1.5rem', padding: '1.5rem 2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
                  <p style={{ fontSize: '1.75rem', fontWeight: '900', color: '#6366f1', marginBottom: '0.25rem' }}>2024</p>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700' }}>Founded in London 🇬🇧</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '100px 0', background: '#fcfcfd' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.75rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>What We Stand For</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>Our core values guide every decision we make — from which products we source to how we treat every customer.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                style={{ background: '#fff', borderRadius: '2rem', padding: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
              >
                <div style={{ width: '60px', height: '60px', background: v.bg, borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{v.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.75rem' }}>{v.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem' }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.75rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Our Journey</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Key milestones that shaped who we are today.</p>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #6366f1, #ec4899)', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '2.5rem', position: 'relative' }}
              >
                <div style={{ width: '45%', background: '#fff', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.year}</span>
                  <p style={{ color: '#1a1a1a', fontWeight: '600', marginTop: '0.4rem', lineHeight: 1.6 }}>{m.event}</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 0 0 3px rgba(99,102,241,0.2)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '100px 0', background: '#fcfcfd' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.75rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Meet the Team</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto' }}>The people behind HAPYSHOPY who work tirelessly to bring you the best.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                style={{ background: '#fff', borderRadius: '2rem', padding: '2rem', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #e0e7ff' }}
                  onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${member.name}/200/200`; }}
                />
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '0.25rem' }}>{member.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: '700' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                alt="Shopping Experience"
                style={{ width: '100%', borderRadius: '2rem', boxShadow: '0 40px 80px rgba(0,0,0,0.12)' }}
                onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/shopping/800/600'; }}
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Why Customers<br />Choose Us
              </h2>
              {[
                'Hand-picked products from verified global suppliers',
                'Free worldwide shipping on orders over $99',
                '30-day no-questions-asked return policy',
                '24/7 dedicated customer support team',
                'Secure checkout with 256-bit SSL encryption',
                'Exclusive member-only deals and early access',
              ].map((point, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeUp}
                  viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
                >
                  <CheckCircle size={20} color="#22c55e" style={{ flexShrink: 0 }} />
                  <span style={{ color: '#374151', fontWeight: '600', fontSize: '1rem' }}>{point}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.25), transparent 60%)' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Ready to Experience<br />
              <span style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Premium Shopping?
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Join 12,000+ happy customers who shop smarter with HAPYSHOPY.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/category/electronics">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ background: '#fff', color: '#1a1a1a', border: 'none', padding: '1rem 2.5rem', borderRadius: '1rem', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Shop Now <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem 2.5rem', borderRadius: '1rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
