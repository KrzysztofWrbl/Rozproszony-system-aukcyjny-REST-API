import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AuctionList from './AuctionList';
import AuctionDetails from './AuctionDetails';
import CreateAuction from './CreateAuction';

function AuthPanel() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  
  const url = isLoginView ? 'https://localhost:61090/api/auth/login' : 'https://localhost:61090/api/auth/register';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username: isLoginView ? undefined : username })
  });

  if (response.ok) {
    if (isLoginView) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      alert("Zalogowano!");
    } else {
      alert("Zarejestrowano! Teraz możesz się zalogować.");
      setIsLoginView(true);
    }
  } else {
    alert("Błąd: " + await response.text());
  }
};

  return (
    <div style={{ 
      maxWidth: '440px', 
      margin: '60px auto', 
      padding: '40px', 
      background: 'var(--card-bg)', 
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      border: '1px solid var(--card-border)',
      borderRadius: '24px', 
      boxShadow: 'var(--shadow-lg)',
      transition: 'all 0.4s ease'
    }}>
      <h2 style={{ marginTop: 0, textAlign: 'center', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>
        {isLoginView ? 'Witaj ponownie' : 'Stwórz konto'}
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px', fontSize: '15px' }}>
        {isLoginView ? 'Zaloguj się do cyfrowego świata aukcji.' : 'Dołącz do nas i zacznij licytować.'}
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {!isLoginView && (
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Nazwa użytkownika
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="TwojaNazwa"
              required 
              style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} 
            />
          </label>
        )}

        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Adres Email
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="twoj@email.com"
            required 
            style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} 
          />
        </label>

        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Hasło
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
            required 
            style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} 
          />
        </label>

        <button 
          type="submit" 
          style={{ 
            padding: '16px', 
            marginTop: '15px', 
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: '700', 
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1)'}
        >
          {isLoginView ? 'Zaloguj się' : 'Zarejestruj się'}
        </button>
      </form>

      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
        {isLoginView ? 'Nie masz jeszcze konta? ' : 'Masz już konto? '}
        <span 
          onClick={() => setIsLoginView(!isLoginView)} 
          style={{ color: 'var(--primary-color)', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLoginView ? 'Zarejestruj się' : 'Zaloguj się'}
        </span>
      </div>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <nav style={{ 
          padding: '20px 40px', 
          background: 'var(--nav-bg)', 
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderRadius: '0 0 24px 24px',
          marginBottom: '50px',
          boxShadow: 'var(--shadow-sm)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          transition: 'all 0.4s ease'
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>A</div>
            <h2 style={{ margin: 0, color: 'var(--text-color)', fontWeight: '700', letterSpacing: '-0.5px' }}>
              Aukcjomat<span style={{ color: 'var(--primary-color)' }}>.pl</span>
            </h2>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>
              Przeglądaj
            </Link>
            <Link to="/create" style={{ color: 'var(--text-color)', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}>
              Wystaw
            </Link>
            
            <Link to="/login" style={{ 
              color: 'var(--btn-konto-text)', 
              backgroundColor: 'var(--btn-konto-bg)', 
              textDecoration: 'none', 
              padding: '10px 24px', 
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'transform 0.2s, background-color 0.4s ease, color 0.4s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Konto
            </Link>
            
            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 5px' }}></div>

            <label className="theme-switch" title="Zmień motyw">
              <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
              <span className="slider"></span>
            </label>
          </div>
        </nav>

        <main style={{ padding: '0 20px', minHeight: '75vh' }}>
          <Routes>
            <Route path="/" element={<AuctionList />} />
            <Route path="/auction/:id" element={<AuctionDetails />} />
            <Route path="/create" element={<CreateAuction />} />
            <Route path="/login" element={<AuthPanel />} />
          </Routes>
        </main>

        <footer style={{ marginTop: '60px', padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', borderTop: '1px solid var(--border-color)' }}>
          <p>© 2026 Aukcjomat.pl - Nowoczesny System Aukcyjny</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;