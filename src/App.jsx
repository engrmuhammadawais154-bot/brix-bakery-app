import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Search from './components/Search';
import Cart from './components/Cart';
import Order from './components/Order';
import Navbar from './components/Navbar';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Load cart from local storage if available (optional enhancement, but good for UX)
  useEffect(() => {
    const savedCart = localStorage.getItem('brixCart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('brixCart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.title} to cart`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const renderScreen = () => {
    switch(currentScreen) {
      case 'home':
        return <Home addToCart={addToCart} />;
      case 'search':
        return <Search addToCart={addToCart} />;
      case 'cart':
        return <Cart cart={cart} updateQuantity={updateQuantity} setCurrentScreen={setCurrentScreen} />;
      case 'order':
        return <Order cart={cart} clearCart={clearCart} setCurrentScreen={setCurrentScreen} />;
      default:
        return <Home addToCart={addToCart} />;
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <Navbar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} cartCount={cartCount} />
      
      <main className="main-content">
        {renderScreen()}
      </main>

      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
