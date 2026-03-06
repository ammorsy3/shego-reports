import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import SheGoReport from './clients/SheGoReport';
import OmBdrReport from './clients/OmBdrReport';
import PasswordGate from './auth/PasswordGate';
import { getStoredRole, clearRole, isClientRole, getClientPath } from './auth/auth';
import './App.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const checkPointer = (e) => {
      const el = e.target;
      const isClickable = el.tagName === 'BUTTON' || el.tagName === 'A' ||
        el.closest('button') || el.closest('a') ||
        window.getComputedStyle(el).cursor === 'pointer';
      setIsPointer(isClickable);
    };
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', checkPointer);
    document.addEventListener('mouseleave', () => setIsVisible(false));
    document.addEventListener('mouseenter', () => setIsVisible(true));
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', checkPointer);
    };
  }, []);

  return (
    <>
      <div className={`cursor-dot ${isVisible ? 'visible' : ''}`} style={{ left: position.x, top: position.y }} />
      <div className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isVisible ? 'visible' : ''}`} style={{ left: position.x, top: position.y }} />
    </>
  );
}

const clients = [
  { name: 'SheGo', path: '/shego', description: 'Women-Only Ride Service', color: '#a855f7' },
  { name: 'OmBdr', path: '/ombdr', description: 'Weekly Performance Report', color: '#06b6d4' },
];

function Home({ role }) {
  // Client-level users get redirected to their path immediately
  if (isClientRole(role)) {
    return <Navigate to={getClientPath(role)} replace />;
  }

  return (
    <div className="App">
      <div className="bg-blur-1" />
      <div className="bg-blur-2" />
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span className="logo-text" style={{ fontSize: '1.5rem' }}>SEET</span>
            </div>
            <span className="tagline">Marketing Solutions</span>
          </div>
          <div className="report-info">
            <h1>Ads Manager Reporting</h1>
            <p className="date-range">Select a client to view their report</p>
          </div>
        </div>
      </header>
      <main className="main">
        <section className="section">
          <h2 className="section-title">Clients</h2>
          <div className="summary-grid">
            {clients.map((client) => (
              <Link key={client.path} to={client.path} style={{ textDecoration: 'none' }}>
                <div className="summary-card glass" style={{ cursor: 'pointer', borderLeft: `4px solid ${client.color}` }}>
                  <div className="card-icon" style={{ background: client.color, opacity: 0.9, fontSize: '1.5rem', fontWeight: 700 }}>
                    {client.name.charAt(0)}
                  </div>
                  <div className="card-content">
                    <h3>Client</h3>
                    <p className="value" style={{ fontSize: '1.25rem' }}>{client.name}</p>
                    <p className="subtitle">{client.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="powered">SEET Marketing Solutions</p>
      </footer>
    </div>
  );
}

// Protects a client route: client-level users can only see their own path
function ClientRoute({ role, allowedRole, children }) {
  if (isClientRole(role) && role !== allowedRole) {
    return <Navigate to={getClientPath(role)} replace />;
  }
  return children;
}

function AppRoutes({ role }) {
  return (
    <Routes>
      <Route path="/" element={<Home role={role} />} />
      <Route
        path="/shego"
        element={
          <ClientRoute role={role} allowedRole="shego">
            <SheGoReport />
          </ClientRoute>
        }
      />
      <Route
        path="/ombdr"
        element={
          <ClientRoute role={role} allowedRole="ombdr">
            <OmBdrReport />
          </ClientRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function HomeButton() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return (
    <Link to="/" className="home-btn" title="Back to home">
      ← Home
    </Link>
  );
}

function App() {
  const [role, setRole] = useState(() => getStoredRole());

  const handleAuth = (newRole) => {
    setRole(newRole);
  };

  const handleLogout = () => {
    clearRole();
    setRole(null);
  };

  if (!role) {
    return (
      <>
        <CustomCursor />
        <PasswordGate onAuth={handleAuth} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <CustomCursor />
      <AppRoutes role={role} />
      {role === 'admin' && <HomeButton />}
      <button className="logout-btn" onClick={handleLogout} title="Log out">
        Log out
      </button>
    </BrowserRouter>
  );
}

export default App;
