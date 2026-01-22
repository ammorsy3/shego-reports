import React, { useEffect, useState } from 'react';
import './App.css';

// Currency conversion: 1 USD = 3.75 SAR
const USD_TO_SAR = 3.75;

// Custom Cursor Component
const CustomCursor = () => {
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
};

// Platform Logos
const MetaLogo = () => (
  <svg viewBox="0 0 36 36" fill="currentColor" width="22" height="22">
    <path d="M18 2.1C9.2 2.1 2.1 9.2 2.1 18c0 7.9 5.8 14.5 13.4 15.7v-11.1h-4v-4.6h4v-3.5c0-4 2.4-6.2 6-6.2 1.7 0 3.5.3 3.5.3v3.9h-2c-2 0-2.6 1.2-2.6 2.5v3h4.4l-.7 4.6h-3.7v11.1c7.6-1.2 13.4-7.8 13.4-15.7.1-8.8-7-15.9-15.8-15.9z"/>
  </svg>
);

const SnapchatLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.809-.329-1.228-.719-1.228-1.153 0-.359.255-.704.72-.853.149-.06.314-.09.494-.09.12 0 .284.015.434.09.389.18.748.3 1.048.3.181 0 .314-.045.399-.104-.009-.18-.019-.359-.034-.553l-.004-.06c-.104-1.627-.229-3.654.3-4.848 1.583-3.545 4.94-3.821 5.93-3.821h.424z"/>
  </svg>
);

const TikTokLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Campaign Data - All in SAR
const campaignData = {
  reportPeriod: "January 15-22, 2026",
  meta: {
    captains: [
      { name: "App Install | iOS | Captains", spend: 865.10, installs: 42, cpi: 20.60 },
      { name: "App Install | Android | Captains", spend: 883.38, installs: 133, cpi: 6.64 }
    ],
    users: [
      { name: "App Install | iOS | Users", spend: 23.07, installs: 4, cpi: 5.77 },
      { name: "App Install | Android | Users", spend: 38.20, installs: 4, cpi: 9.55 },
      { name: "[AF] App Install | Android | Users", spend: 145.41, installs: 13, cpi: 11.19 },
      { name: "[AF] App Install | iOS | Users", spend: 151.36, installs: 13, cpi: 11.64 }
    ]
  },
  snapchat: {
    captains: [
      { name: "Leads | Captains", spend: 266.80 * USD_TO_SAR, leads: 53, cpl: 5.03 * USD_TO_SAR }
    ],
    users: [
      { name: "App Install | iOS | Users", spend: 133.15 * USD_TO_SAR, installs: 9, cpi: 14.79 * USD_TO_SAR },
      { name: "App Install | Android | Users", spend: 137.20 * USD_TO_SAR, installs: 57, cpi: 2.41 * USD_TO_SAR },
      { name: "App Install | Users (Paused)", spend: 69.88 * USD_TO_SAR, installs: 1, cpi: 69.88 * USD_TO_SAR }
    ]
  },
  tiktok: {
    captains: [
      { name: "Leads | Captains", spend: 182.77, leads: 98, cpl: 1.87 }
    ],
    users: [
      { name: "App Install | Android | Users", spend: 278.88, installs: 50, cpi: 5.58 },
      { name: "App Install | iOS | Users (SKAN)", spend: 260.87, installs: 10, cpi: 26.09 },
      { name: "Video Views | New Users (Paused)", spend: 121.53, installs: 0, cpi: 0 }
    ]
  }
};

// Calculate totals
const calcTotals = () => {
  const mc = campaignData.meta.captains.reduce((a, c) => ({ spend: a.spend + c.spend, installs: a.installs + c.installs }), { spend: 0, installs: 0 });
  const mu = campaignData.meta.users.reduce((a, c) => ({ spend: a.spend + c.spend, installs: a.installs + c.installs }), { spend: 0, installs: 0 });
  const sc = campaignData.snapchat.captains.reduce((a, c) => ({ spend: a.spend + c.spend, leads: a.leads + c.leads }), { spend: 0, leads: 0 });
  const su = campaignData.snapchat.users.reduce((a, c) => ({ spend: a.spend + c.spend, installs: a.installs + c.installs }), { spend: 0, installs: 0 });
  const tc = campaignData.tiktok.captains.reduce((a, c) => ({ spend: a.spend + c.spend, leads: a.leads + c.leads }), { spend: 0, leads: 0 });
  const tu = campaignData.tiktok.users.reduce((a, c) => ({ spend: a.spend + c.spend, installs: a.installs + c.installs }), { spend: 0, installs: 0 });

  return {
    captains: { spend: mc.spend + sc.spend + tc.spend, installs: mc.installs, leads: sc.leads + tc.leads, meta: mc, snapchat: sc, tiktok: tc },
    users: { spend: mu.spend + su.spend + tu.spend, installs: mu.installs + su.installs + tu.installs, meta: mu, snapchat: su, tiktok: tu },
    overall: { spend: mc.spend + sc.spend + tc.spend + mu.spend + su.spend + tu.spend, installs: mc.installs + mu.installs + su.installs + tu.installs, leads: sc.leads + tc.leads }
  };
};

const totals = calcTotals();
const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });
const fmtSAR = (n) => `${fmt(n)} SAR`;
const safeDivide = (numerator, denominator) => denominator > 0 ? numerator / denominator : 0;

// Header
const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo-section">
        <div className="logo">
          <img src="/logo.jpg" alt="SheGo" className="logo-image" />
          <span className="logo-text">SheGo</span>
        </div>
        <span className="tagline">Women-Only Ride Service</span>
      </div>
      <div className="report-info">
        <h1>Weekly Performance Report</h1>
        <p className="date-range">{campaignData.reportPeriod}</p>
      </div>
    </div>
  </header>
);

// Summary Card
const SummaryCard = ({ title, value, subtitle, icon, color }) => (
  <div className="summary-card glass">
    <div className={`card-icon ${color}`}>{icon}</div>
    <div className="card-content">
      <h3>{title}</h3>
      <p className="value">{value}</p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  </div>
);

// Executive Summary
const ExecutiveSummary = () => (
  <section className="section">
    <h2 className="section-title">Executive Summary</h2>
    <div className="summary-grid">
      <SummaryCard title="Total Ad Spend" value={fmtSAR(totals.overall.spend)} icon="💰" color="purple" />
      <SummaryCard title="Total App Downloads" value={fmt(totals.overall.installs)} subtitle={`Avg CPI: ${fmtSAR(safeDivide(totals.overall.spend, totals.overall.installs))}`} icon="📱" color="blue" />
      <SummaryCard title="Captain Leads" value={fmt(totals.captains.leads)} subtitle={`Avg CPL: ${fmtSAR(safeDivide(totals.captains.snapchat.spend + totals.captains.tiktok.spend, totals.captains.leads))}`} icon="👩‍✈️" color="green" />
      <SummaryCard title="Captain Installs" value={fmt(totals.captains.installs)} subtitle={`CPI: ${fmtSAR(safeDivide(totals.captains.meta.spend, totals.captains.installs))}`} icon="🚗" color="orange" />
    </div>
  </section>
);

// Audience Breakdown
const AudienceBreakdown = () => (
  <section className="section">
    <h2 className="section-title">Performance by Audience</h2>
    <div className="audience-grid">
      <div className="audience-card glass captains">
        <div className="audience-header"><div className="audience-icon">👩‍✈️</div><h3>Captains (Drivers)</h3></div>
        <div className="audience-stats">
          <div className="stat"><span className="label">Total Spend</span><span className="value">{fmtSAR(totals.captains.spend)}</span></div>
          <div className="stat"><span className="label">App Installs</span><span className="value">{totals.captains.installs}</span></div>
          <div className="stat"><span className="label">Leads</span><span className="value">{totals.captains.leads}</span></div>
          <div className="stat highlight"><span className="label">Cost per Lead</span><span className="value">{fmtSAR(safeDivide(totals.captains.snapchat.spend + totals.captains.tiktok.spend, totals.captains.leads))}</span></div>
        </div>
      </div>
      <div className="audience-card glass users">
        <div className="audience-header"><div className="audience-icon">👩</div><h3>Users (Customers)</h3></div>
        <div className="audience-stats">
          <div className="stat"><span className="label">Total Spend</span><span className="value">{fmtSAR(totals.users.spend)}</span></div>
          <div className="stat"><span className="label">App Installs</span><span className="value">{totals.users.installs}</span></div>
          <div className="stat highlight"><span className="label">Cost per Install</span><span className="value">{fmtSAR(safeDivide(totals.users.spend, totals.users.installs))}</span></div>
          <div className="stat"><span className="label">Platforms</span><span className="value">3</span></div>
        </div>
      </div>
    </div>
  </section>
);

// Platform Comparison
const PlatformComparison = () => {
  const platforms = [
    { name: 'Meta', spend: totals.captains.meta.spend + totals.users.meta.spend, color: '#1877f2', logo: <MetaLogo /> },
    { name: 'Snapchat', spend: totals.captains.snapchat.spend + totals.users.snapchat.spend, color: '#FFFC00', logo: <SnapchatLogo /> },
    { name: 'TikTok', spend: totals.captains.tiktok.spend + totals.users.tiktok.spend, color: '#ff0050', logo: <TikTokLogo /> }
  ];
  const max = Math.max(...platforms.map(p => p.spend));

  return (
    <section className="section">
      <h2 className="section-title">Spend by Platform</h2>
      <div className="comparison-chart glass">
        {platforms.map((p, i) => (
          <div key={i} className="bar-row">
            <div className="bar-label"><span className={`bar-logo ${p.name.toLowerCase()}`}>{p.logo}</span>{p.name}</div>
            <div className="bar-track"><div className="bar-fill" style={{ width: `${(p.spend / max) * 100}%`, background: p.color }} /></div>
            <div className="bar-value">{fmtSAR(p.spend)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Platform Card
const PlatformCard = ({ platform, data }) => {
  const names = { meta: 'Meta (Facebook/Instagram)', snapchat: 'Snapchat', tiktok: 'TikTok' };
  const logos = { meta: <MetaLogo />, snapchat: <SnapchatLogo />, tiktok: <TikTokLogo /> };

  return (
    <div className={`platform-card glass ${platform}`}>
      <div className="platform-header"><div className="platform-icon">{logos[platform]}</div><h3>{names[platform]}</h3></div>
      <div className="platform-content">
        {data.captains?.length > 0 && (
          <div className="campaign-group">
            <h4>👩‍✈️ Captains</h4>
            <table><thead><tr><th>Campaign</th><th>Spend</th><th>Results</th><th>Cost</th></tr></thead>
              <tbody>{data.captains.map((c, i) => <tr key={i}><td>{c.name}</td><td>{fmtSAR(c.spend)}</td><td>{c.installs ? `${c.installs} installs` : `${c.leads} leads`}</td><td>{fmtSAR(c.cpi || c.cpl)}</td></tr>)}</tbody>
            </table>
          </div>
        )}
        {data.users?.length > 0 && (
          <div className="campaign-group">
            <h4>👩 Users</h4>
            <table><thead><tr><th>Campaign</th><th>Spend</th><th>Installs</th><th>CPI</th></tr></thead>
              <tbody>{data.users.map((c, i) => <tr key={i}><td>{c.name}</td><td>{fmtSAR(c.spend)}</td><td>{c.installs}</td><td>{c.cpi > 0 ? fmtSAR(c.cpi) : '-'}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Platform Breakdown
const PlatformBreakdown = () => (
  <section className="section">
    <h2 className="section-title">Platform Details</h2>
    <div className="platforms-grid">
      <PlatformCard platform="meta" data={campaignData.meta} />
      <PlatformCard platform="snapchat" data={campaignData.snapchat} />
      <PlatformCard platform="tiktok" data={campaignData.tiktok} />
    </div>
  </section>
);

// Key Insights
const KeyInsights = () => (
  <section className="section">
    <h2 className="section-title">Key Insights</h2>
    <div className="insights-grid">
      <div className="insight-card glass success"><div className="insight-icon">✅</div><h4>Best Performing</h4><p><strong>TikTok Leads</strong> achieved lowest CPL at <strong>{fmtSAR(1.87)}</strong> with 98 leads.</p></div>
      <div className="insight-card glass success"><div className="insight-icon">✅</div><h4>Efficient Acquisition</h4><p><strong>Meta Android Captains</strong> delivered at <strong>{fmtSAR(6.64)}</strong> CPI.</p></div>
      <div className="insight-card glass warning"><div className="insight-icon">⚠️</div><h4>Higher Cost</h4><p><strong>Snapchat iOS</strong> has higher CPI at <strong>{fmtSAR(14.79 * USD_TO_SAR)}</strong>.</p></div>
      <div className="insight-card glass info"><div className="insight-icon">💡</div><h4>Recommendation</h4><p>Scale TikTok leads and Meta Android campaigns for efficiency.</p></div>
    </div>
  </section>
);

// Final Summary
const FinalSummary = () => (
  <section className="section">
    <h2 className="section-title">Week at a Glance</h2>
    <div className="final-summary glass">
      <div className="summary-table">
        <div className="table-row header"><span>Metric</span><span>Captains</span><span>Users</span><span>Total</span></div>
        <div className="table-row"><span>Ad Spend</span><span>{fmtSAR(totals.captains.spend)}</span><span>{fmtSAR(totals.users.spend)}</span><span className="highlight">{fmtSAR(totals.overall.spend)}</span></div>
        <div className="table-row"><span>Installs</span><span>{totals.captains.installs}</span><span>{totals.users.installs}</span><span className="highlight">{totals.overall.installs}</span></div>
        <div className="table-row"><span>Leads</span><span>{totals.captains.leads}</span><span>-</span><span className="highlight">{totals.overall.leads}</span></div>
      </div>
      <div className="bottom-line">
        <h3>The Bottom Line</h3>
        <p>This week, <strong>{fmtSAR(totals.overall.spend)}</strong> was invested resulting in <strong>{totals.overall.installs} downloads</strong> and <strong>{totals.overall.leads} captain leads</strong>. Average CPI: <strong>{fmtSAR(safeDivide(totals.overall.spend, totals.overall.installs))}</strong>.</p>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <img src="/logo.jpg" alt="SheGo" className="footer-logo" />
      <span className="footer-brand">SheGo</span>
    </div>
    <p>Weekly Report | {campaignData.reportPeriod}</p>
    <p className="powered">Prepared by SEET Marketing Solutions</p>
  </footer>
);

// Main App
function App() {
  return (
    <div className="App">
      <CustomCursor />
      <div className="bg-blur-1" />
      <div className="bg-blur-2" />
      <Header />
      <main className="main">
        <ExecutiveSummary />
        <AudienceBreakdown />
        <PlatformComparison />
        <PlatformBreakdown />
        <KeyInsights />
        <FinalSummary />
      </main>
      <Footer />
    </div>
  );
}

export default App;
