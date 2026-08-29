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
        <button className="cart-btn" onClick={() => setCurrentScreen('home')}>
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
          <label>Shipping Address</label>
          <textarea placeholder="123 Bakery Lane..." required></textarea>
        </div>

        <div className="form-group row">
          <div className="half">
            <label>Card Number</label>
            <input type="text" placeholder="•••• •••• •••• ••••" required />
          </div>
          <div className="half">
            <label>Expiry</label>
            <input type="text" placeholder="MM/YY" required />
          </div>
        </div>

        <button type="submit" className="cart-btn checkout-btn">
          Pay Rs {total}
        </button>
        <button type="button" className="text-btn" onClick={() => setCurrentScreen('cart')}>
          Back to Cart
        </button>
      </form>
    </div>
  );
}

export default Order;
