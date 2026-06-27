import { useState, useEffect } from 'react';

const globalStyles = `
/* --- App.css --- */
:root {
  /* Light Theme Variables */
  --bg-color: #E3E6E6;
  --card-bg: white;
  --text-primary: #0f1111;
  --text-secondary: #565959;
  --border-color: #ddd;
  --link-color: #0066c0;
  
  /* Input Fields (Light Mode) */
  --input-bg: #ffffff;
  --input-text: #0f1111;
  --input-border: #a6a6a6;
}

.dark-theme {
  /* Dark Theme Variables */
  --bg-color: #131A22;
  --card-bg: #232F3E;
  --text-primary: #FFFFFF;
  --text-secondary: #B1B3B3;
  --border-color: #3a4b5d;
  --link-color: #4ba3e3;

  /* Input Fields (Dark Mode) */
  --input-bg: #131A22;
  --input-text: #FFFFFF;
  --input-border: #565959;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Amazon Ember", Arial, sans-serif;
}

html, body, #root {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: var(--bg-color);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
  font-size: 14px; 
}

/* --- FORM CONTRAST OVERRIDES --- */
.auth-container input {
  background-color: var(--input-bg) !important;
  color: var(--input-text) !important;
  border: 1px solid var(--input-border) !important;
  border-radius: 3px;
  outline: none;
  transition: all 0.2s;
}

/* Amazon style focus ring */
.auth-container input:focus {
  border-color: #e77600 !important;
  box-shadow: 0 0 3px 2px rgba(228,121,17,.5) !important;
}

.buy-box-select {
  background-color: var(--input-bg) !important;
  color: var(--input-text) !important;
  border: 1px solid var(--input-border) !important;
  transition: background-color 0.3s, color 0.3s;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}

/* --- MAIN HEADER --- */
.header {
  min-height: 60px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-logo {
  width: 110px;
  object-fit: contain;
  margin: 0 10px;
  margin-top: 12px;
  padding: 5px;
  cursor: pointer;
  border: 1px solid transparent;
}

.header-logo:hover, .header-option:hover, .header-optionBasket:hover {
  border: 1px solid white;
  border-radius: 2px;
}

.header-location {
  display: flex;
  align-items: center;
  color: white;
  margin-right: 15px;
  padding: 5px;
  cursor: pointer;
  border: 1px solid transparent;
}

/* --- SEARCH BAR --- */
.header-search {
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
}

.search-category {
  background-color: #f3f3f3 !important;
  color: #555555 !important;
  border: none !important;
  height: 40px;
  padding: 0 5px 0 10px;
  border-right: 1px solid #ccc !important;
  cursor: pointer;
  font-size: 12px;
  width: auto;
  max-width: 55px; 
}

.header-searchInput {
  height: 40px;
  padding: 10px;
  border: none !important;
  width: 100%;
  outline: none;
  background-color: #ffffff !important;
  color: #0f1111 !important; 
}

.header-searchIcon {
  padding: 10px;
  height: 40px !important;
  background-color: #febd69;
  cursor: pointer;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-searchIcon:hover {
  background-color: #f3a847;
}

/* --- NAV OPTIONS --- */
.header-nav {
  display: flex;
  justify-content: space-evenly;
  padding: 0 10px;
}

.header-option {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  color: white;
  cursor: pointer;
  border: 1px solid transparent;
}

.header-optionLineOne {
  font-size: 11px;
  line-height: 12px;
  margin-bottom: 2px;
}

.header-optionLineTwo {
  font-size: 13px;
  font-weight: 700;
  line-height: 14px;
}

.header-optionBasket {
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  padding: 5px;
  border: 1px solid transparent;
}

.header-basketCount {
  margin-left: 5px;
  color: #f08804;
  font-weight: 800;
  font-size: 18px;
}

/* --- SUB-NAVIGATION --- */
.sub-header {
  display: flex;
  align-items: center;
  background-color: #232f3e;
  color: white;
  padding: 5px 20px;
  font-size: 14px;
  font-weight: 500;
}

.sub-header span {
  margin-right: 20px;
  cursor: pointer;
  padding: 5px;
  border: 1px solid transparent;
}

.sub-header span:hover {
  border: 1px solid white;
  border-radius: 2px;
}

.theme-toggle-btn {
  margin-left: auto;
  font-weight: bold;
  color: #febd69;
}

/* --- MAIN CONTAINER --- */
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin: 0;
}

/* --- HERO SLIDER --- */
.home-slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: -250px;
  z-index: 0;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-out;
}

.slider-image {
  min-width: 100%;
  object-fit: cover;
}

.slider-btn {
  position: absolute;
  top: 40px; 
  background: transparent;
  border: 1px solid transparent;
  color: white;
  font-size: 40px;
  cursor: pointer;
  z-index: 10;
  padding: 0 15px;
  height: 250px; 
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.slider-btn:hover {
  border: 2px solid white;
  border-radius: 4px;
}

.slider-btn.prev { left: 10px; }
.slider-btn.next { right: 10px; }

/* --- PRODUCT CARDS --- */
.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  padding: 0 20px 40px 20px;
  z-index: 1;
}

.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--card-bg);
  color: var(--text-primary);
  z-index: 1;
  width: 320px;
  padding: 25px;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12);
  border-color: #a88734;
}

.product-title {
  font-size: 16px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-symbol { font-size: 12px; vertical-align: top; position: relative; top: 5px; }
.price-whole { font-size: 28px; font-weight: 500; }
.price-fraction { font-size: 12px; vertical-align: top; position: relative; top: 5px; }
.prime-logo { height: 15px; margin-top: 5px; }

.product-image {
  max-height: 200px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: transparent;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.add-to-cart-btn {
  background: #ffd814;
  border: none;
  color: #0f1111;
  padding: 10px;
  border-radius: 100px;
  cursor: pointer;
  font-weight: 400;
  font-size: 13px;
  box-shadow: 0 2px 5px rgba(213,217,217,.5);
}

.add-to-cart-btn:hover { background: #F7CA00; }

/* --- PRODUCT DETAIL PAGE --- */
.product-detail-container {
  display: flex;
  padding: 30px 20px;
  background-color: var(--card-bg);
  color: var(--text-primary);
  gap: 40px;
  min-height: calc(100vh - 120px);
}

.detail-image-column { flex: 0.4; display: flex; justify-content: center; align-items: flex-start; }
.detail-large-image { max-width: 100%; max-height: 450px; object-fit: contain; position: sticky; top: 80px; }
.detail-info-column { flex: 0.4; display: flex; flex-direction: column; gap: 10px; }
.detail-title { font-size: 24px; font-weight: 500; line-height: 32px; }
.detail-brand-link { color: var(--link-color); font-size: 13px; cursor: pointer; text-decoration: none; }
.detail-divider { border: none; border-bottom: 1px solid var(--border-color); margin: 10px 0; }
.detail-description-list { margin-left: 20px; margin-top: 10px; display: flex; flex-direction: column; gap: 8px; }
.detail-buy-column { flex: 0.2; }

.buy-box {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--card-bg);
}

.buy-box-delivery { font-size: 13px; color: var(--text-secondary); }
.buy-box-status { color: #B12704; font-size: 18px; font-weight: 500; }

/* --- CART PAGE --- */
.cart-page { padding: 20px; background-color: var(--card-bg); margin: 20px; }
.cart-item { display: flex; border-bottom: 1px solid var(--border-color); padding: 20px 0; gap: 20px; }
.cart-item-image { width: 150px; object-fit: contain; }
.cart-item-details { display: flex; flex-direction: column; align-items: flex-start; flex: 1; }
.cart-item-actions { display: flex; align-items: center; margin-top: 15px; gap: 10px; }
.cart-item-separator { color: var(--border-color); }
.cart-item-delete { color: var(--link-color); font-size: 13px; cursor: pointer; }
.cart-item-delete:hover { text-decoration: underline; }

/* --- AUTH PAGE (POLISHED) --- */
.auth-wrapper {
  background-color: var(--bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.auth-container {
  background-color: var(--card-bg);
  width: 100%;
  max-width: 350px;
  padding: 20px 26px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

/* Ensure text is visible in light/dark mode */
.auth-container h2, .auth-container label {
  color: var(--text-primary);
}

.auth-logo {
  width: 100px;
  object-fit: contain;
  margin-top: 10px;
  margin-bottom: 20px;
}

.auth-link {
  color: var(--link-color);
}

/* Amazon Style Error Box */
.error-box {
  border: 1px solid #c40000;
  border-radius: 4px;
  padding: 14px 18px;
  margin-bottom: 18px;
  width: 100%;
  box-shadow: 0 0 0 4px rgba(221,0,0,.1) inset;
  background-color: transparent;
}

.error-box h4 {
  color: #c40000;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.error-box p {
  font-size: 12px;
  margin: 0;
  color: var(--text-primary);
}

/* =========================================
   MOBILE RESPONSIVENESS (Media Queries)
   ========================================= */
@media screen and (max-width: 768px) {
  /* Fix Header Wrapping */
  .header {
    flex-wrap: wrap;
    padding: 10px 5px;
    height: auto;
  }
  
  .header-search {
    order: 3; /* Pushes search bar to bottom row */
    width: 100%;
    margin-top: 10px;
    flex: 0 0 100%;
  }

  .header-nav {
    justify-content: flex-end;
    flex: 1;
  }

  .header-location {
    display: none; /* Hide location on small screens to save space */
  }

  /* Fix Slider Height */
  .home-slider-container {
    margin-bottom: -100px;
  }
  
  .slider-btn {
    height: 150px;
    top: 20px;
  }

  /* Fix Product Details Page Stacking */
  .product-detail-container {
    flex-direction: column;
    padding: 15px;
    gap: 20px;
  }

  .detail-image-column, .detail-info-column, .detail-buy-column {
    flex: 1;
    width: 100%;
  }

  .detail-large-image {
    position: relative;
    top: 0;
    max-height: 300px;
  }

  /* Fix Cart Item Stacking */
  .cart-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .cart-item-details {
    align-items: center;
  }

  /* Sub-header overflow */
  .sub-header {
    overflow-x: auto;
    white-space: nowrap;
  }
}
`;

function App() {
  // --- AUTHENTICATION STATES ---
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- PRODUCT & CART STATES ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // NEW: Tracks the quantity chosen on the single product detail page
  const [detailQty, setDetailQty] = useState(1);

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
      fetch(`https://amazon-clone-4q3s.onrender.com/products?category=${searchCategory}&search=${searchTerm}`)
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
    setError(''); 
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`https://amazon-clone-4q3s.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError('Network error. Please try again.');
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

  // --- NEW: ADVANCED CART LOGIC ---
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      // Check if product is already in the cart
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      if (existingItem) {
        // If it is, map through the cart and just increase the quantity
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // If it is completely new, add it with the chosen quantity
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    // Keeps all items EXCEPT the one matching the ID
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Calculate total price based on quantities
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate total number of physical items (for the header icon)
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  // ---------------------------------

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

  // Helper to cleanly open a product and reset detail quantity
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setShowCart(false);
    setDetailQty(1); 
  };

  const navigateHome = () => {
    setShowCart(false);
    setSelectedProduct(null);
  };

  if (!token) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
        <div className={`auth-wrapper ${theme === 'dark' ? 'dark-theme' : ''}`}>
          <img className="auth-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
          
          <div className="auth-container">
            {error && (
              <div className="error-box">
                <h4>There was a problem</h4>
                <p>{error}</p>
              </div>
            )}

            <h2 style={{ marginBottom: '20px', fontWeight: '400', fontSize: '28px' }}>
              {isLogin ? 'Sign in' : 'Create account'}
            </h2>
            
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
              <button type="submit" className="add-to-cart-btn" style={{ marginTop: '10px', height: '32px', borderRadius: '4px' }}>
                {isLogin ? 'Continue' : 'Verify email'}
              </button>
            </form>
            
            <p style={{ fontSize: '12px', marginTop: '20px' }}>
              By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>

            <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid var(--border-color)' }}/>
            
            <div onClick={() => setIsLogin(!isLogin)} className="auth-link" style={{ fontSize: '13px', cursor: 'pointer', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isLogin ? (
                <button style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)' }}>
                  Create your Amazon account
                </button>
              ) : (
                'Already have an account? Sign in'
              )}
            </div>
            
            <div onClick={toggleTheme} className="auth-link" style={{ marginTop: '20px', fontSize: '13px', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold' }}>
              {theme === 'light' ? '🌙 Switch to Dark Mode' : '☀️ Switch to Light Mode'}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
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
              <span className="header-basketCount">{cartItemCount}</span>
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
                  <img className="detail-large-image" src={selectedProduct.image} alt={selectedProduct.title} loading="lazy" />
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
                      <label style={{ fontSize: '13px', marginRight: '8px' }}>Qty: </label>
                      <select 
                        className="buy-box-select"
                        value={detailQty}
                        onChange={(e) => setDetailQty(parseInt(e.target.value))}
                      >
                        {[...Array(10).keys()].map(x => (
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                      </select>
                    </div>

                    <button className="add-to-cart-btn" onClick={() => addToCart(selectedProduct, detailQty)}>Add to Cart</button>
                    <button className="add-to-cart-btn" style={{ background: '#ffa41c', borderColor: '#a88734' }} onClick={() => { addToCart(selectedProduct, detailQty); setShowCart(true); setSelectedProduct(null); }}>Buy Now</button>
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
                    {cart.map((item) => (
                      <div key={item._id} className="cart-item">
                        <img className="cart-item-image" src={item.image} alt={item.title} loading="lazy" />
                        
                        {/* Detailed cart item layout */}
                        <div className="cart-item-details">
                          <h3 style={{ fontWeight: '500', cursor: 'pointer', color: 'var(--link-color)' }} onClick={() => openProductDetail(item)}>
                            {item.title}
                          </h3>
                          <p style={{ color: '#007185', fontSize: '12px', marginTop: '5px' }}>In Stock</p>
                          <strong style={{ fontSize: '20px', display: 'block', marginTop: '5px' }}>₹{item.price}</strong>
                          
                          {/* New Controls: Quantity Select and Delete */}
                          <div className="cart-item-actions">
                            <select 
                              className="buy-box-select" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                            >
                              {[...Array(10).keys()].map(x => (
                                <option key={x+1} value={x+1}>Qty: {x+1}</option>
                              ))}
                            </select>
                            
                            <span className="cart-item-separator">|</span>
                            
                            <span className="cart-item-delete" onClick={() => removeFromCart(item._id)}>
                              Delete
                            </span>
                          </div>
                        </div>

                      </div>
                    ))}
                    <h3 style={{ textAlign: 'right', marginTop: '20px' }}>
                      Subtotal ({cartItemCount} items): <strong>₹{cartTotal.toFixed(2)}</strong>
                    </h3>
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
                    <img key={index} className="slider-image" src={img} alt={`Banner ${index}`} loading="lazy" />
                  ))}
                </div>
                <button className="slider-btn next" onClick={nextSlide}>❯</button>
              </div>

              <div className="product-grid">
                {loading ? <p>Loading products...</p> : products.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-info">
                      <p className="product-title" style={{ cursor: 'pointer', color: 'var(--link-color)' }} onClick={() => openProductDetail(product)}>{product.title}</p>
                      <div style={{ color: '#ffa41c', marginTop: '5px', fontSize: '14px' }}>⭐⭐⭐⭐• 1,423</div>
                      {formatPrice(product.price)}
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg" alt="Prime" className="prime-logo" />
                    </div>
                    <img className="product-image" src={product.image} alt={product.title} onClick={() => openProductDetail(product)} loading="lazy" />
                    {/* From grid, we just add 1 item by default */}
                    <button className="add-to-cart-btn" onClick={() => addToCart(product, 1)}>Add to cart</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;