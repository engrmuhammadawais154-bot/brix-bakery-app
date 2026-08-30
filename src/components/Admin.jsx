import React, { useState } from 'react';

function Admin({ inventory, setInventory }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('adminLoggedIn') === 'true');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({
    title: '', size: '', price: '', color: '#e8d8c3', labelColor: '#2b1c11', stockQuantity: 0, description: ''
  });

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: name === 'price' || name === 'stockQuantity' ? Number(value) : value }));
  };

  const saveEdit = () => {
    setInventory(prev => prev.map(item => item.id === editingId ? { ...editForm } : item));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({ ...prev, [name]: name === 'price' || name === 'stockQuantity' ? Number(value) : value }));
  };

  const saveNew = () => {
    const newProduct = {
      ...addForm,
      id: Date.now(),
    };
    setInventory(prev => [...prev, newProduct]);
    setIsAdding(false);
    setAddForm({ title: '', size: '', price: '', color: '#e8d8c3', labelColor: '#2b1c11', stockQuantity: 0, description: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === 'awaisarshad774@gmail.com' && loginForm.password === '178178Awais') {
      setIsLoggedIn(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
    setLoginForm({ email: '', password: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="screen-container" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
        <div style={{ background: 'rgba(20, 15, 13, 0.6)', padding: '2rem', borderRadius: '24px', width: '100%', maxWidth: '400px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-main)', fontFamily: 'Playfair Display' }}>Admin Login</h2>
          {loginError && <div style={{ color: '#f44336', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={loginForm.email} 
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={loginForm.password} 
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} 
                required 
              />
            </div>
            <button type="submit" className="cart-btn" style={{ marginTop: '1rem' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container" style={{ overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0 }}>Admin Panel</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="cart-btn" style={{ padding: '0.5rem 1rem', width: 'auto' }} onClick={() => setIsAdding(true)}>
            + Add Product
          </button>
          <button className="cart-btn" style={{ padding: '0.5rem 1rem', width: 'auto', background: '#f44336' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {isAdding && (
        <div style={{ background: 'rgba(20, 15, 13, 0.4)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Add New Product</h3>
          <div className="form-group"><label>Title</label><input type="text" name="title" value={addForm.title} onChange={handleAddChange} /></div>
          <div className="form-group"><label>Size</label><input type="text" name="size" value={addForm.size} onChange={handleAddChange} /></div>
          <div className="form-group row">
            <div className="half"><label>Price (Rs)</label><input type="number" name="price" value={addForm.price} onChange={handleAddChange} /></div>
            <div className="half"><label>Stock Quantity</label><input type="number" name="stockQuantity" value={addForm.stockQuantity} onChange={handleAddChange} /></div>
          </div>
          <div className="form-group"><label>Description</label><textarea name="description" value={addForm.description} onChange={handleAddChange}></textarea></div>
          <div className="form-group row">
            <div className="half"><label>Pouch Color</label><input type="color" name="color" value={addForm.color} onChange={handleAddChange} style={{width: '100%'}} /></div>
            <div className="half"><label>Label Color</label><input type="color" name="labelColor" value={addForm.labelColor} onChange={handleAddChange} style={{width: '100%'}}/></div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
            <button className="cart-btn" onClick={saveNew}>Save Product</button>
            <button className="cart-btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }} onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div>
        {inventory.map(item => (
          <div key={item.id} style={{ border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', background: 'rgba(20, 15, 13, 0.4)' }}>
            {editingId === item.id ? (
              <div>
                <div className="form-group"><label>Title</label><input type="text" name="title" value={editForm.title} onChange={handleEditChange} /></div>
                <div className="form-group"><label>Size</label><input type="text" name="size" value={editForm.size} onChange={handleEditChange} /></div>
                <div className="form-group row">
                  <div className="half"><label>Price (Rs)</label><input type="number" name="price" value={editForm.price} onChange={handleEditChange} /></div>
                  <div className="half"><label>Stock</label><input type="number" name="stockQuantity" value={editForm.stockQuantity} onChange={handleEditChange} /></div>
                </div>
                <div className="form-group"><label>Description</label><textarea name="description" value={editForm.description} onChange={handleEditChange}></textarea></div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                  <button className="add-btn-small" style={{ background: '#4caf50', padding: '0.5rem' }} onClick={saveEdit}>Save</button>
                  <button className="add-btn-small" style={{ background: '#9e9e9e', padding: '0.5rem' }} onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>{item.title}</h3>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>{item.size} • Rs {item.price}</p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: item.stockQuantity > 0 ? '#4caf50' : '#f44336' }}>
                      Stock: {item.stockQuantity}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="add-btn-small" style={{ background: '#2196f3', padding: '0.5rem' }} onClick={() => handleEditClick(item)}>Edit</button>
                    <button className="add-btn-small" style={{ background: '#f44336', padding: '0.5rem' }} onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {inventory.length === 0 && <p>No products in inventory.</p>}
      </div>
    </div>
  );
}

export default Admin;
