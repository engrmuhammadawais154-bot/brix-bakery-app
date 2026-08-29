import React, { useState } from 'react';
import { inventory } from '../data';
import pouchImg from '../assets/pouch.jpg';

function Search({ addToCart }) {
  const [query, setQuery] = useState('');

  const filtered = inventory.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.size.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="screen-container search-screen">
      <div className="search-header">
        <h1>Discover</h1>
        <div className="search-input-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search flavors, sizes..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="search-grid">
        {filtered.map(item => (
          <div className="search-card" key={item.id}>
            <div className="search-card-img" style={{ backgroundImage: `url(${pouchImg})` }}>
              <div className="pouch-overlay" style={{ backgroundColor: item.color + 'd9' }}>
                <div className="pouch-label" style={{ color: item.labelColor }}>
                  <h3 style={{fontSize: '14px'}}>{item.title}</h3>
                  <span style={{fontSize: '10px'}}>{item.size}</span>
                </div>
              </div>
            </div>
            <div className="search-card-info">
              <h3>{item.title}</h3>
              <p>{item.size}</p>
              <div className="search-card-bottom">
                <span className="price">Rs {item.price}</span>
                <button className="add-btn-small" onClick={() => addToCart(item)}>
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="no-results">No cookies found matching "{query}"</div>
        )}
      </div>
    </div>
  );
}

export default Search;
