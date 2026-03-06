import React, { useState } from 'react';
import { checkPassword, saveRole } from './auth';
import './PasswordGate.css';

function PasswordGate({ onAuth }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = checkPassword(value);
    if (role) {
      saveRole(role);
      onAuth(role);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="pg-overlay">
      <div className="pg-bg-blur-1" />
      <div className="pg-bg-blur-2" />
      <div className={`pg-card ${shake ? 'shake' : ''}`}>
        <div className="pg-logo">
          <span className="pg-logo-text">SEET</span>
          <span className="pg-logo-sub">Marketing Solutions</span>
        </div>
        <h2 className="pg-title">Ads Manager Reporting</h2>
        <p className="pg-subtitle">Enter your password to continue</p>
        <form onSubmit={handleSubmit} className="pg-form">
          <div className="pg-input-wrap">
            <input
              type={show ? 'text' : 'password'}
              className={`pg-input ${error ? 'pg-input-error' : ''}`}
              placeholder="Password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false); }}
              autoFocus
            />
            <button
              type="button"
              className="pg-toggle"
              onClick={() => setShow(s => !s)}
              tabIndex={-1}
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>
          {error && <p className="pg-error">Incorrect password. Please try again.</p>}
          <button type="submit" className="pg-btn">Access Reports</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordGate;
