import React from 'react';

function Navbar({ currentScreen, setCurrentScreen, cartCount }) {
  const navItems = [
    { id: 'home', label: 'Shelf', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { id: 'search', label: 'Discover', icon: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
    { id: 'cart', label: 'Cart', icon: 'M9 20a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2zm-9.8-5h9.6c.5 0 .9-.4 1-.9l1.4-7c.1-.6-.4-1.1-1-1.1H5.4L4.7 3H2v2h1.5l2.4 11.4c-.6.6-.9 1.4-.9 2.1 0 1.7 1.3 3 3 3h12v-2H8.2c-.4 0-.8-.4-.8-.8v-.2z' },
    { id: 'contact', label: 'Contact', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' },
    { id: 'admin', label: 'Admin', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4 M12 16h.01' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setCurrentScreen('home')}>
        Brix Bakery
      </div>
      <div className="nav-links">
        {navItems.map(item => (
          <button 
            key={item.id}
            className={`nav-item ${currentScreen === item.id ? 'active' : ''}`}
            onClick={() => setCurrentScreen(item.id)}
          >
            <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.id === 'cart' && cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
