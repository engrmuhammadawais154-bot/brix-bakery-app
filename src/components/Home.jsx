import React, { useState, useRef, useEffect, useCallback } from 'react';
import pouchImg from '../assets/pouch.jpg';

function Home({ addToCart, inventory, viewProduct }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const isScrollingRef = useRef(false);

  const handleScroll = () => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;
    const container = scrollContainerRef.current;
    
    const containerCenter = container.scrollLeft + (container.offsetWidth / 2);
    
    let newActiveIndex = 0;
    let minDistance = Infinity;

    const children = Array.from(container.children);
    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + (child.offsetWidth / 2);
      const distance = Math.abs(containerCenter - childCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        newActiveIndex = index;
      }
    });

    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  };

  const scrollToPouch = useCallback((index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const targetChild = container.children[index];
    
    if (targetChild) {
      isScrollingRef.current = true;
      setActiveIndex(index);
      
      const scrollLeft = targetChild.offsetLeft - (container.offsetWidth / 2) + (targetChild.offsetWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  }, []);

  const handlePrev = () => {
    if (activeIndex > 0) scrollToPouch(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < inventory.length - 1) scrollToPouch(activeIndex + 1);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const activeItem = inventory[activeIndex] || inventory[0];

  if (!activeItem) return <div className="home-screen">No products available.</div>;

  return (
    <div className="home-screen">
      
      {/* Mobile Top Header */}
      <header className="header mobile-header">
        <h1>Fresh Batches</h1>
        <p>Handcrafted daily. Select your pouch.</p>
      </header>

      {/* Product Information (Left on Desktop, Bottom on Mobile) */}
      <div className="content-area">
        <header className="header desktop-header">
          <h1>Fresh Batches</h1>
          <p>Handcrafted daily. Select your pouch.</p>
        </header>

        <div className="product-details">
          <div className="info-text">
            <h2>{activeItem.title}</h2>
            <p className="size-badge">{activeItem.size} Pouch</p>
          </div>
          <div className="price-wrap">
            <span className="price">Rs {activeItem.price}</span>
            <span className="stock-badge" style={{ marginLeft: '10px', fontSize: '0.9rem', color: activeItem.stockQuantity > 0 ? '#4caf50' : '#f44336' }}>
              {activeItem.stockQuantity > 0 ? `${activeItem.stockQuantity} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="cart-btn" onClick={() => addToCart(activeItem)} disabled={activeItem.stockQuantity <= 0}>
              Add to Cart
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-icon">
                <path d="M5 9l1.5 9h11L19 9" />
                <path d="M9 9V5a3 3 0 0 1 6 0v4" />
              </svg>
            </button>
            <button className="cart-btn" style={{ background: '#eee', color: '#333' }} onClick={() => viewProduct(activeItem.id)}>
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Shelf Display (Right on Desktop, Middle on Mobile) */}
      <div className="display-area">
        <button 
          className="nav-btn prev-btn" 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous batch"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div className="shelf-environment">
          <div className="shelf">
            <div className="shelf-top"></div>
            <div 
              className="shelf-glow" 
              style={{ backgroundColor: activeItem.labelColor }}
            ></div>
          </div>

          <div 
            className="scroll-container" 
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {inventory.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  className="pouch-wrapper" 
                  key={item.id}
                  onClick={() => scrollToPouch(index)}
                >
                  <div 
                    className={`pouch-graphic ${isActive ? 'active' : ''}`}
                    style={{
                      backgroundImage: `url(${pouchImg})`
                    }}
                  >
                    <div className="pouch-overlay" style={{ backgroundColor: item.color + 'd9' }}>
                      <div className="pouch-label" style={{ color: item.labelColor }}>
                        <h3>{item.title}</h3>
                        <span>{item.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button 
          className="nav-btn next-btn" 
          onClick={handleNext}
          disabled={activeIndex === inventory.length - 1}
          aria-label="Next batch"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

    </div>
  );
}

export default Home;
