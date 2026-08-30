import React from 'react';
import pouchImg from '../assets/pouch.jpg';

function Product({ productId, inventory, addToCart, setCurrentScreen }) {
  const product = inventory.find(item => item.id === productId);

  if (!product) {
    return (
      <div className="screen-container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="cart-btn" style={{ width: 'auto', marginTop: '1rem' }} onClick={() => setCurrentScreen('home')}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="screen-container product-screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <button 
        className="text-btn" 
        style={{ alignSelf: 'flex-start', margin: '1rem', color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }} 
        onClick={() => setCurrentScreen('home')}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        Back
      </button>

      <div style={{ padding: '0 1rem 2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{
          width: '250px',
          height: '350px',
          backgroundImage: `url(${pouchImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          position: 'relative',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <div className="pouch-overlay" style={{ backgroundColor: product.color + 'd9', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pouch-label" style={{ color: product.labelColor, textAlign: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{product.title}</h3>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{product.size}</span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>{product.title}</h1>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>{product.size} Pouch</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--gold-primary)' }}>Rs {product.price}</span>
            <span style={{ 
              padding: '4px 10px', 
              borderRadius: '20px', 
              fontSize: '0.85rem', 
              fontWeight: '600',
              background: product.stockQuantity > 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
              color: product.stockQuantity > 0 ? '#4caf50' : '#f44336',
              border: product.stockQuantity > 0 ? '1px solid rgba(76, 175, 80, 0.2)' : '1px solid rgba(244, 67, 54, 0.2)'
            }}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </span>
          </div>

          <p style={{ margin: '0 0 2rem 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            {product.description || "Freshly baked and handcrafted with the finest ingredients."}
          </p>

          <button 
            className="cart-btn" 
            onClick={() => addToCart(product)}
            disabled={product.stockQuantity <= 0}
            style={{ padding: '1rem', fontSize: '1.1rem', opacity: product.stockQuantity <= 0 ? 0.5 : 1 }}
          >
            {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
