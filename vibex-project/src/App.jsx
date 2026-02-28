import { useState, useEffect } from 'react';
import './App.css';

// Supabase Configuration (Placeholder)
const SUPABASE_URL = 'https://giwbhgsbxzxzidmtknig.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpd2JoZ3NieHp4emlkbXRrbmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNTMxNTEsImV4cCI6MjA4NzgyOTE1MX0.rceDkdGX87j625lrXsur-b9YsQV3cj-eOjEyFBx0YiE';
const supabase = (SUPABASE_URL !== 'https://giwbhgsbxzxzidmtknig.supabase.co' && SUPABASE_URL !== '')
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Importing assets
import iphoneImg from './assets/images/iphone.png';
import macbookImg from './assets/images/macbook.png';
import airpodsImg from './assets/images/airpods.png';
import iphoneHero from './assets/images/iphone_hero_v2.png';
import macbookHero from './assets/images/macbook_hero.png';

const PRODUCTS = [
  {
    id: 'iphone-16-pro',
    name: "iPhone 16 Pro",
    price: 119900,
    image: iphoneImg,
    description: "Built for Apple Intelligence. Stunning Desert Titanium.",
    category: "iPhone"
  },
  {
    id: 'macbook-pro-m4',
    name: "MacBook Pro M4",
    price: 169900,
    image: macbookImg,
    description: "The most advanced chips ever built for a personal computer.",
    category: "Mac"
  },
  {
    id: 'airpods-pro-2',
    name: "AirPods Pro",
    price: 24900,
    image: airpodsImg,
    description: "Magic. Remastered. Now with active noise cancellation.",
    category: "Audio"
  },
  {
    id: 'iphone-16',
    name: "iPhone 16",
    price: 79900,
    image: iphoneImg,
    description: "A total powerhouse. Camera Control. All-new A18 chip.",
    category: "iPhone"
  },
  {
    id: 'macbook-air-m3',
    name: "MacBook Air M3",
    price: 114900,
    image: macbookImg,
    description: "Lean, mean, M3 machine. Strikingly thin design.",
    category: "Mac"
  },
  {
    id: 'watch-ultra-2',
    name: "Apple Watch Ultra 2",
    price: 89900,
    image: iphoneImg, // Placeholder for variety
    description: "The ultimate sports watch. Rugged and capable.",
    category: "Watch"
  }
];

function App() {
  const [view, setView] = useState('shop'); // shop, bag, tracker
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [location, setLocation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const addToBag = (p) => {
    setCart([...cart, { ...p, cartId: Math.random() }]);
  };

  const removeFromBag = (cid) => {
    setCart(cart.filter(i => i.cartId !== cid));
  };

  const subtotal = cart.reduce((acc, current) => acc + current.price, 0);

  const placeOrder = () => {
    if (!location) return alert("Please specify your delivery location.");
    setIsProcessing(true);
    setTimeout(() => {
      setOrder({
        id: `AXP-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        total: subtotal,
        location: location,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setCart([]);
      setIsProcessing(false);
      setView('tracker');
    }, 2000);
  };

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="container">
          <div className="nav-logo" onClick={() => setView('shop')}>
            Aptronix <span className="logo-expr">Express</span>
          </div>

          <div className="nav-links">
            <button className={`nav-link ${view === 'shop' ? 'active' : ''}`} onClick={() => setView('shop')}>Store</button>
            <button className={`nav-link ${view === 'tracker' ? 'active' : ''}`} onClick={() => setView('tracker')}>Order Status</button>
          </div>

          <div className="nav-actions">
            <div className="bag-btn" onClick={() => setView('bag')}>
              <span>Bag</span>
              <span className="bag-pill">{cart.length}</span>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {view === 'shop' && (
          <section className="section fade-in">
            <div className="container">
              <div className="section-header">
                <h1 className="section-title text-gradient">Store. <span style={{ color: '#86868b' }}>The best way to buy the<br /> devices you love.</span></h1>
              </div>

              <div className="hero-slider">
                <div className="hero-card">
                  <div className="hero-content">
                    <h2>iPhone 16 Pro</h2>
                    <p>Built for Apple Intelligence.</p>
                    <button className="btn-primary" onClick={() => addToBag(PRODUCTS[0])}>Buy Now</button>
                  </div>
                  <img src={iphoneHero} className="hero-img" alt="iPhone Hero" />
                </div>
                <div className="hero-card">
                  <div className="hero-content">
                    <h2>MacBook Pro</h2>
                    <p>Mind-blowing power. M4.</p>
                    <button className="btn-primary" onClick={() => addToBag(PRODUCTS[1])}>Learn more</button>
                  </div>
                  <img src={macbookHero} className="hero-img" alt="MacBook Hero" />
                </div>
              </div>

              <h2 style={{ fontSize: '28px', margin: '60px 0 30px' }}>All models. <span style={{ color: '#86868b' }}>Take your pick.</span></h2>
              <div className="product-grid">
                {PRODUCTS.map(p => (
                  <div key={p.id} className="product-card">
                    <div className="img-container">
                      <img src={p.image} alt={p.name} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '21px', marginBottom: '8px' }}>{p.name}</h3>
                      <p className="product-desc">{p.description}</p>
                      <p className="product-price">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button className="btn-primary" style={{ width: '100%' }} onClick={() => addToBag(p)}>Add to Bag</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === 'bag' && (
          <section className="section fade-in">
            <div className="container">
              <h1 className="section-title">Review your bag. <span style={{ color: '#86868b' }}><br />Free express delivery to your desk.</span></h1>

              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                  <p style={{ fontSize: '24px', color: '#86868b', marginBottom: '32px' }}>Your bag is empty.</p>
                  <button className="btn-primary" onClick={() => setView('shop')}>Continue Shopping</button>
                </div>
              ) : (
                <div className="bag-layout">
                  <div className="bag-items">
                    {cart.map(item => (
                      <div key={item.cartId} className="bag-item">
                        <div className="bag-item-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="bag-item-details">
                          <h2 style={{ fontSize: '24px' }}>{item.name}</h2>
                          <p style={{ color: '#86868b', marginTop: '8px' }}>{item.description}</p>
                          <p style={{ fontSize: '19px', marginTop: '24px', fontWeight: 500 }}>₹{item.price.toLocaleString('en-IN')}</p>
                          <button
                            onClick={() => removeFromBag(item.cartId)}
                            style={{ marginTop: '32px', color: 'var(--apple-blue)', cursor: 'pointer' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="checkout-panel">
                    <h3>Summary</h3>
                    <div style={{ marginTop: '32px' }}>
                      <div className="summary-item">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="summary-item">
                        <span>Delivery</span>
                        <span style={{ color: '#27ae60' }}>FREE</span>
                      </div>
                      <div className="summary-total">
                        <div className="summary-item" style={{ fontWeight: 600 }}>
                          <span>Total</span>
                          <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                    <input
                      className="input-box"
                      placeholder="Building, Floor, or IT Park Desk"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                      className="btn-primary"
                      style={{ width: '100%', padding: '18px', fontSize: '19px' }}
                      onClick={placeOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {view === 'tracker' && (
          <section className="section fade-in">
            <div className="container">
              <h1 className="section-title text-gradient" style={{ textAlign: 'center' }}>
                {order ? 'Your delivery is on its way.' : 'Track your order.'}
              </h1>

              {!order ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                  <p style={{ fontSize: '24px', color: '#86868b', marginBottom: '32px' }}>No active deliveries found for your current session.</p>
                  <button className="btn-primary" onClick={() => setView('shop')}>View New Releases</button>
                </div>
              ) : (
                <div className="order-status-card">
                  <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <p style={{ color: '#86868b', fontSize: '14px', marginBottom: '8px' }}>Order #{order.id}</p>
                    <h2 style={{ fontSize: '32px' }}>Arriving Today</h2>
                    <p style={{ color: '#27ae60', fontWeight: 500, marginTop: '8px' }}>Out for Delivery</p>
                  </div>

                  <div className="status-timeline">
                    <div className="step-row completed">
                      <div className="indicator"></div>
                      <div>
                        <h3>Order Placed</h3>
                        <p style={{ color: '#86868b' }}>{order.time}</p>
                      </div>
                    </div>
                    <div className="step-row completed">
                      <div className="indicator"></div>
                      <div>
                        <h3>Order Processed</h3>
                        <p style={{ color: '#86868b' }}>Preparing for delivery</p>
                      </div>
                    </div>
                    <div className="step-row active">
                      <div className="indicator"></div>
                      <div>
                        <h3>Out for Delivery</h3>
                        <p style={{ color: '#86868b' }}>Partner is arriving at {order.location}</p>
                      </div>
                    </div>
                    <div className="step-row">
                      <div className="indicator"></div>
                      <div>
                        <h3>Delivered</h3>
                        <p style={{ color: '#86868b' }}>Enjoy your new device!</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '40px', padding: '24px', borderRadius: '14px', background: '#fafafa' }}>
                    <h4 style={{ marginBottom: '8px' }}>Delivery Location</h4>
                    <p style={{ color: '#86868b' }}>{order.location}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer>
        <div className="container" style={{ borderTop: '0.5px solid rgba(0,0,0,0.1)', paddingTop: '40px' }}>
          <p>© 2026 Aptronix India. Apple Authorised Reseller. <br />
            Pricing includes GST. Terms and conditions apply. Fast delivery available only in verified IT Parks.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
