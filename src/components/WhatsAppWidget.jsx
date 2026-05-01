import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Video, MoreVertical, CheckCheck, Smile, Paperclip } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! Welcome to HapyShopy. How can we help you today? 🛍️', time: '10:00 AM' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const phoneNumber = "1234567890";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { role: 'user', text: input, time: now };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate WhatsApp AI response
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! 👋 How can I assist you with your premium shopping today?";
      } else if (lowerInput.includes('track') || lowerInput.includes('status')) {
        response = "You can track your orders in the 'My Orders' section of your profile! 📦";
      } else if (lowerInput.includes('discount') || lowerInput.includes('coupon')) {
        response = "Sure! Use code LUXE2026 for a special premium discount at checkout. 💎";
      } else {
        response = "Thanks for your message! Our team usually responds within minutes. Is there anything specific about our collections you'd like to know? ✨";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: response, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000 }}>
      {/* WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
          cursor: 'pointer',
          border: 'none',
          position: 'relative',
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={32} />}
        {!isOpen && (
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '18px',
            height: '18px',
            background: '#ef4444',
            borderRadius: '50%',
            color: '#fff',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            border: '2px solid #fff'
          }}>1</div>
        )}
      </motion.button>

      {/* WhatsApp Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              left: 0,
              width: '360px',
              height: '500px',
              background: '#E5DDD5', // WhatsApp Chat BG color
              borderRadius: '1rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '0.75rem 1rem',
              background: '#075E54',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80" 
                    alt="Support" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', background: '#25D366', borderRadius: '50%', border: '2px solid #075E54' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600', margin: 0 }}>HapyShopy Support</h4>
                  <p style={{ fontSize: '0.7rem', opacity: 0.8, margin: 0 }}>Online</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', opacity: 0.8 }}>
                <Video size={18} />
                <Phone size={18} />
                <MoreVertical size={18} />
              </div>
            </div>

            {/* Chat Content */}
            <div 
              ref={scrollRef}
              style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                backgroundSize: 'contain'
              }}
            >
              <div style={{ alignSelf: 'center', background: '#DCF8C6', padding: '0.4rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.7rem', color: '#1a1a1a', marginBottom: '1rem', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                Today
              </div>

              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    background: msg.role === 'user' ? '#DCF8C6' : '#fff',
                    color: '#1a1a1a',
                    fontSize: '0.875rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    position: 'relative',
                    marginBottom: '2px'
                  }}
                >
                  {msg.text}
                  <div style={{ fontSize: '0.65rem', color: '#667781', textAlign: 'right', marginTop: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
                    {msg.time} {msg.role === 'user' && <CheckCheck size={12} color="#53bdeb" />}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '0.5rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#667781', fontStyle: 'italic' }}>
                  Typing...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div style={{ padding: '0.5rem 0.75rem', background: '#F0F2F5', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', color: '#54656f' }}>
                <Smile size={24} />
                <Paperclip size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Type a message" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, border: 'none', background: '#fff', padding: '0.6rem 0.8rem', borderRadius: '0.5rem', fontSize: '0.9rem', outline: 'none' }}
              />
              <button 
                onClick={handleSend}
                style={{ background: 'none', border: 'none', color: '#54656f', cursor: 'pointer', display: 'flex' }}
              >
                <Send size={24} />
              </button>
            </div>

            {/* Footer / Real WA Link */}
            <a 
              href={`https://wa.me/${phoneNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                padding: '0.75rem',
                background: '#fff',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#25D366',
                fontSize: '0.8rem',
                fontWeight: '700',
                borderTop: '1px solid #f1f5f9'
              }}
            >
              Switch to Real WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppWidget;
