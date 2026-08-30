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
        style={{ alignSelf: 'flex-start', margin: '1rem 0', color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', transition: 'color 0.2s', padding: '10px 0' }} 
        onClick={() => setCurrentScreen('home')}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        Back to Shelf
      </button>

      <div style={{ padding: '0 1rem 3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Pouch Graphic */}
        <div style={{
          width: '240px',
          height: '340px',
          backgroundImage: `url(${pouchImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          marginBottom: '3rem',
          filter: 'contrast(1.05)'
        }}>
          {/* Elegant Sticker Label instead of full overlay */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            backgroundColor: product.color, 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.2)',
            borderRadius: '8px',
            width: '75%'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.4rem', color: product.labelColor, fontFamily: 'Playfair Display', textAlign: 'center', lineHeight: '1.2' }}>{product.title}</h3>
            <span style={{ fontSize: '0.75rem', color: product.labelColor, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '6px' }}>{product.size}</span>
          </div>
        </div>

        {/* Product Info */}
        <div style={{ width: '100%', maxWidth: '450px', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '2.5rem', letterSpacing: '1px' }}>{product.title}</h1>
          <p style={{ margin: '0 0 1.5rem 0', color: 'var(--gold-primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>{product.size} Pouch</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: '300', color: 'var(--text-main)', fontFamily: 'Playfair Display' }}>Rs {product.price}</span>
            <span style={{ 
              padding: '6px 14px', 
              borderRadius: '30px', 
              fontSize: '0.85rem', 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              background: product.stockQuantity > 0 ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
              color: product.stockQuantity > 0 ? '#81c784' : '#e57373',
              border: product.stockQuantity > 0 ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(244, 67, 54, 0.3)'
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
