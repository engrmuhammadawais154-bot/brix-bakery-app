import React from 'react';

function Contact() {
  return (
    <div className="screen-container" style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', color: 'var(--gold-primary)' }}>Contact Us</h1>
      <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.1rem' }}>
        Have a question or want to place a custom order? Get in touch with us!
      </p>
      
      <div style={{ background: 'rgba(20, 15, 13, 0.4)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</h3>
          <a href="mailto:engermuhammadawais154@gmail.com" style={{ color: 'var(--gold-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '500' }}>
            engermuhammadawais154@gmail.com
          </a>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone / WhatsApp</h3>
          <a href="tel:03340809229" style={{ color: 'var(--gold-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '500' }}>
            03340809229
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
