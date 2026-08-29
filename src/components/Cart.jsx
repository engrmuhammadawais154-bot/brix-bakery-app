import React from 'react';
import pouchImg from '../assets/pouch.jpg';

function Cart({ cart, updateQuantity, setCurrentScreen }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="screen-container cart-screen">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>{cart.length} items</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any fresh batches yet.</p>
          <button className="cart-btn" onClick={() => setCurrentScreen('home')}>
            Browse Shelf
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img" style={{ backgroundImage: `url(${pouchImg})` }}>
                  <div className="pouch-overlay" style={{ backgroundColor: item.color + 'd9', padding: '5px' }}>
                     <div className="pouch-label" style={{ color: item.labelColor }}>
                        <h3 style={{fontSize: '10px'}}>{item.title}</h3>
                     </div>
                  </div>
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="item-size">{item.size}</p>
                  <p className="item-price">Rs {item.price}</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs {total}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>
            <button className="cart-btn checkout-btn" onClick={() => setCurrentScreen('order')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
