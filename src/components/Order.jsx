import React, { useState } from 'react';

function Order({ cart, clearCart, setCurrentScreen }) {
  const [isPlaced, setIsPlaced] = useState(false);
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isPlaced) {
    return (
      <div className="screen-container order-screen success">
        <div className="success-icon">✨</div>
        <h1>Order Placed!</h1>
        <p>Your fresh batches are being prepared.</p>
        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(20, 15, 13, 0.4)', borderRadius: '16px', textAlign: 'left', border: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--text-main)', fontFamily: 'Playfair Display' }}>Next Steps:</h3>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Please transfer the total amount (Rs {total}) to our bank account and send the receipt to:
          </p>
          <ul style={{ fontSize: '1rem', color: 'var(--text-muted)', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Email: <strong style={{ color: 'var(--text-main)' }}>engermuhammadawais154@gmail.com</strong></li>
            <li>WhatsApp: <strong style={{ color: 'var(--text-main)' }}>03340809229</strong></li>
          </ul>
        </div>
        <button className="cart-btn" onClick={() => setCurrentScreen('home')} style={{ marginTop: '2rem' }}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="screen-container order-screen">
      <div className="order-header">
        <h1>Checkout</h1>
        <p>Total: Rs {total}</p>
      </div>

      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" required />
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="03340809229" required />
        </div>

        <div className="form-group">
          <label>Shipping Address</label>
          <textarea placeholder="123 Bakery Lane..." required></textarea>
        </div>

        <div className="form-group">
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
            Payment Method: <strong style={{ color: 'var(--text-main)' }}>Bank Transfer</strong>. After placing the order, please send the payment receipt to our WhatsApp/Email.
          </p>
        </div>

        <button type="submit" className="cart-btn checkout-btn">
          Place Order (Rs {total})
        </button>
        <button type="button" className="text-btn" onClick={() => setCurrentScreen('cart')}>
          Back to Cart
        </button>
      </form>
    </div>
  );
}

export default Order;
