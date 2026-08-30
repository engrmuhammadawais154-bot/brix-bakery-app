import React from 'react';

function Contact() {
  return (
    <div className="screen-container" style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', color: '#333' }}>Contact Us</h1>
      <p style={{ marginBottom: '2rem', color: '#666', lineHeight: '1.6' }}>
        Have a question or want to place a custom order? Get in touch with us!
      </p>
      
      <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#444' }}>Email</h3>
          <a href="mailto:engermuhammadawais154@gmail.com" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>
            engermuhammadawais154@gmail.com
          </a>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#444' }}>Phone / WhatsApp</h3>
          <a href="tel:03340809229" style={{ color: '#0066cc', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>
            03340809229
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
