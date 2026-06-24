import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- AUTHENTICATION STATES ---
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- PRODUCT & CART STATES ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- THEME & SEARCH STATES ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  // --- CAROUSEL STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerImages = [
    "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
    "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg"
  ];

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetch(`http://localhost:5000/products?category=${searchCategory}&search=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [token, searchCategory, searchTerm]);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setEmail('');
    setPassword('');
    setCart([]);
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const formatPrice = (price) => {
    const [whole, fraction] = parseFloat(price).toFixed(2).split('.');
    return (
      <div style={{ display: 'flex' }}>
        <span className="price-symbol">₹</span>
        <span className="price-whole">{whole}</span>
        <span className="price-fraction">{fraction}</span>
      </div>
    );
  };

  const navigateHome = () => {
    setShowCart(false);
    setSelectedProduct(null);
  };

  if (!token) {
    return (
      <div className={`auth-wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <img className="auth-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
        <div className="auth-container">
          <h2 style={{ marginBottom: '20px', fontWeight: '500' }}>{isLogin ? 'Sign in' : 'Create account'}</h2>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
              </div>
            )}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
            </div>
            <button type="submit" className="add-to-cart-btn" style={{ marginTop: '10px' }}>
              {isLogin ? 'Continue' : 'Verify email'}
            </button>
          </form>
          <div onClick={() => setIsLogin(!isLogin)} className="auth-link" style={{ marginTop: '20px', fontSize: '13px', cursor: 'pointer', textAlign: 'center' }}>
            {isLogin ? 'New to Amazon.in? Create an account' : 'Already have an account? Sign in'}
          </div>
          <div onClick={toggleTheme} className="auth-link" style={{ marginTop: '15px', fontSize: '13px', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold' }}>
            {theme === 'light' ? '🌙 Switch to Dark Mode' : '☀️ Switch to Light Mode'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="header">
        <img onClick={navigateHome} className="header-logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
        
        <div className="header-location">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '8px', marginRight: '3px' }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div className="header-option" style={{ marginLeft: 0 }}>
            <span className="header-optionLineOne" style={{ color: '#ccc' }}>Deliver to</span>
            <span className="header-optionLineTwo">Ranchi 835215</span>
          </div>
        </div>

        <div className="header-search">
          <select className="search-category" value={searchCategory} onChange={(e) => { setSearchCategory(e.target.value); navigateHome(); }}>
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Amazon Devices">Amazon Devices</option>
          </select>
          <input className="header-searchInput" type="text" placeholder="Search Amazon.in" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); navigateHome(); }} />
          <div className="header-searchIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f1111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="header-nav">
          <div className="header-option" onClick={handleLogout}>
            <span className="header-optionLineOne">Hello, User</span>
            <span className="header-optionLineTwo" style={{ display: 'flex', alignItems: 'center' }}>
              Account & Lists 
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', marginTop: '2px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
          <div className="header-option">
            <span className="header-optionLineOne">Returns</span>
            <span className="header-optionLineTwo">& Orders</span>
          </div>
          <div className="header-optionBasket" onClick={() => { setShowCart(true); setSelectedProduct(null); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="header-basketCount">{cart.length}</span>
            <span style={{ fontSize: '14px', fontWeight: '700', marginTop: '10px', marginLeft: '2px' }}>Cart</span>
          </div>
        </div>
      </div>

      <div className="sub-header">
        <span style={{ fontWeight: '700' }} onClick={navigateHome}>☰ All</span>
        <span onClick={navigateHome}>Today's Deals</span>
        <span>Customer Service</span>
        <span>Registry</span>
        <span>Gift Cards</span>
        <span>Sell</span>
        
        <span onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </span>
      </div>

      <div className="home">
        {selectedProduct ? (
          <div style={{ backgroundColor: 'var(--bg-color)' }}>
            <div style={{ padding: '15px 20px', backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)' }}>
              <span onClick={navigateHome} style={{ cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                <strong style={{ fontSize: '20px', marginRight: '5px', paddingBottom: '2px' }}>‹</strong> Back to results
              </span>
            </div>

            <div className="product-detail-container">
              <div className="detail-image-column">
                <img className="detail-large-image" src={selectedProduct.image} alt={selectedProduct.title} />
              </div>

              <div className="detail-info-column">
                <h1 className="detail-title">{selectedProduct.title}</h1>
                <span className="detail-brand-link">Visit the {selectedProduct.category} Store</span>
                <div style={{ color: '#ffa41c', fontSize: '14px' }}>⭐⭐⭐⭐• 4.6 out of 5 stars | 852 ratings</div>
                
                <hr className="detail-divider" />
                
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span style={{ color: '#CC0C39', fontSize: '24px', marginRight: '10px', fontWeight: '300' }}>-15%</span>
                  {formatPrice(selectedProduct.price)}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Typical price: <span style={{ textDecoration: 'line-through' }}>₹{(selectedProduct.price * 1.15).toFixed(2)}</span></span>
                
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg" alt="Prime" className="prime-logo" style={{ width: '60px' }} />
                
                <hr className="detail-divider" />
                
                <h3 style={{ fontSize: '16px', fontWeight: '700' }}>About this item</h3>
                <ul className="detail-description-list">
                  <li><strong>Premium Experience:</strong> Optimized specifications designed for daily high-performance functionality.</li>
                  <li><strong>Dynamic Ergonomics:</strong> Engineered directly to improve comfort and deployment flexibility.</li>
                  <li>{selectedProduct.description}</li>
                  <li>Eligible for Free Shipping and Free 30-Day Returns.</li>
                </ul>
              </div>

              <div className="detail-buy-column">
                <div className="buy-box">
                  {formatPrice(selectedProduct.price)}
                  <p className="buy-box-delivery">FREE delivery <strong>Tomorrow</strong>. Order within <span style={{ color: '#007600' }}>4 hrs 12 mins</span></p>
                  <p className="buy-box-status">In Stock</p>
                  
                  <div>
                    <label style={{ fontSize: '13px' }}>Qty: </label>
                    <select className="buy-box-select">
                      <option>1</option><option>2</option><option>3</option>
                    </select>
                  </div>

                  <button className="add-to-cart-btn" onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
                  <button className="add-to-cart-btn" style={{ background: '#ffa41c', borderColor: '#a88734' }} onClick={() => { addToCart(selectedProduct); setShowCart(true); setSelectedProduct(null); }}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ) : showCart ? (
          <div style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 120px)' }}>
            <div style={{ padding: '15px 20px', backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)' }}>
              <span onClick={navigateHome} style={{ cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                <strong style={{ fontSize: '20px', marginRight: '5px', paddingBottom: '2px' }}>‹</strong> Continue Shopping
              </span>
            </div>

            <div className="cart-page" style={{ margin: '20px' }}>
              <h2>Shopping Cart</h2>
              <hr style={{ margin: '15px 0', border: 'none', borderBottom: '1px solid var(--border-color)' }} />
              {cart.length === 0 ? <p>Your Amazon.in Cart is empty.</p> : (
                <div>
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <img className="cart-item-image" src={item.image} alt={item.title} />
                      <div>
                        <h3 style={{ fontWeight: '500', cursor: 'pointer', color: 'var(--link-color)' }} onClick={() => { setSelectedProduct(item); setShowCart(false); }}>{item.title}</h3>
                        <p style={{ color: '#007185', fontSize: '12px', marginTop: '5px' }}>In Stock</p>
                        <strong style={{ fontSize: '20px', display: 'block', marginTop: '10px' }}>₹{item.price}</strong>
                      </div>
                    </div>
                  ))}
                  <h3 style={{ textAlign: 'right', marginTop: '20px' }}>Subtotal ({cart.length} items): <strong>₹{cartTotal.toFixed(2)}</strong></h3>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="home-slider-container">
              <button className="slider-btn prev" onClick={prevSlide}>❮</button>
              <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {bannerImages.map((img, index) => (
                  <img key={index} className="slider-image" src={img} alt={`Banner ${index}`} />
                ))}
              </div>
              <button className="slider-btn next" onClick={nextSlide}>❯</button>
            </div>

            <div className="product-grid">
              {loading ? <p>Loading products...</p> : products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-info">
                    <p className="product-title" style={{ cursor: 'pointer', color: 'var(--link-color)' }} onClick={() => setSelectedProduct(product)}>{product.title}</p>
                    <div style={{ color: '#ffa41c', marginTop: '5px', fontSize: '14px' }}>⭐⭐⭐⭐• 1,423</div>
                    {formatPrice(product.price)}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg" alt="Prime" className="prime-logo" />
                  </div>
                  <img className="product-image" src={product.image} alt={product.title} onClick={() => setSelectedProduct(product)} />
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to cart</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;