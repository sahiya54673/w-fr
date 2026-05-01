import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, MessageSquare, Zap, ShoppingBag, ShieldCheck } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your HapyShopy AI Assistant. How can I help you elevate your aesthetic today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('shipping')) {
        response = "We offer free worldwide shipping on orders over $99! Standard shipping usually takes 3-5 business days.";
      } else if (lowerInput.includes('return') || lowerInput.includes('refund')) {
        response = "We have a hassle-free 30-day return policy. Your satisfaction is our priority.";
      } else if (lowerInput.includes('sale') || lowerInput.includes('discount')) {
        response = "You can use the code LUXE2026 at checkout for a special premium discount!";
      } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
        response = "I can help with tracking orders, finding products, or answering policy questions. What's on your mind?";
      } else {
        response = "That's a great question! Our curated collections are designed for quality and style. Would you like me to show you our trending electronics or fashion?";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 15px 35px rgba(99, 102, 241, 0.4)',
          cursor: 'pointer',
          border: 'none',
          position: 'relative',
        }}
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '15px',
              height: '15px',
              background: '#22c55e',
              borderRadius: '50%',
              border: '3px solid #fff'
            }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              right: 0,
              width: '380px',
              height: '550px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              border: '1px solid rgba(99, 102, 241, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#fff',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: 0 }}>HapyShopy AI</h3>
                  <p style={{ fontSize: '0.7rem', opacity: 0.8, margin: 0 }}>Online & Ready to Help</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              style={{
                flex: 1,
                padding: '1.5rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '0.85rem 1.15rem',
                    borderRadius: msg.role === 'user' ? '1.25rem 1.25rem 0 1.25rem' : '1.25rem 1.25rem 1.25rem 0',
                    background: msg.role === 'user' ? '#6366f1' : '#f1f5f9',
                    color: msg.role === 'user' ? '#fff' : '#1a1a1a',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                    lineHeight: 1.5
                  }}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '0.85rem 1.15rem', borderRadius: '1.25rem 1.25rem 1.25rem 0', display: 'flex', gap: '3px' }}>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '6px', height: '6px', background: '#64748b', borderRadius: '50%' }} />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: '6px', height: '6px', background: '#64748b', borderRadius: '50%' }} />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: '6px', height: '6px', background: '#64748b', borderRadius: '50%' }} />
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{ padding: '0 1.5rem 1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {[
                { icon: <ShoppingBag size={14} />, label: 'Orders' },
                { icon: <ShieldCheck size={14} />, label: 'Returns' },
                { icon: <Zap size={14} />, label: 'Promo' }
              ].map((action, i) => (
                <button 
                  key={i}
                  onClick={() => { setInput(action.label); }}
                  style={{ padding: '0.5rem 0.85rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, border: 'none', background: '#f8fafc', padding: '0.85rem 1.25rem', borderRadius: '1rem', fontSize: '0.875rem', outline: 'none', color: '#1a1a1a' }}
              />
              <button 
                onClick={handleSend}
                style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#6366f1', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 15px rgba(99, 102, 241, 0.25)' }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
