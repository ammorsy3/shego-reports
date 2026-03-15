import React, { useState, useEffect } from 'react';
import OmBdrReport from './clients/OmBdrReport';
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

function App() {
  return (
    <>
      <CustomCursor />
      <OmBdrReport />
    </>
  );
}

export default App;
