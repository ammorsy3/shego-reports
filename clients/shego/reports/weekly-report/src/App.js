import React, { useEffect, useState } from 'react';
import './App.css';

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(
          computedStyle.cursor === 'pointer' ||
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.tagName === 'A' ||
          hoveredElement.closest('button') ||
          hoveredElement.closest('a')
        );
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursorType);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position.x, position.y]);

  return (
    <>
      <div
        className={`cursor-dot ${isVisible ? 'visible' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
      <div
        className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isVisible ? 'visible' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
};

// Currency conversion: 1 USD = 3.75 SAR
const USD_TO_SAR = 3.75;

// Campaign Data - All converted to SAR
const campaignData = {
  reportPeriod: "January 15-22, 2026",
  client: "SheGo",

  // META DATA (Already in SAR)
  meta: {
    captains: [
      { name: "App Install | iOS | Captains", spend: 865.10, installs: 42, cpi: 20.60, impressions: 107352, clicks: 1257, ctr: 1.17 },
      { name: "App Install | Android | Captains", spend: 883.38, installs: 133, cpi: 6.64, impressions: 106736, clicks: 1392, ctr: 1.30 }
    ],
    users: [
      { name: "App Install | iOS | Users", spend: 23.07, installs: 4, cpi: 5.77, impressions: 1738, clicks: 17, ctr: 0.98 },
      { name: "App Install | Android | Users", spend: 38.20, installs: 4, cpi: 9.55, impressions: 1723, clicks: 17, ctr: 0.99 },
      { name: "[AF] App Install | Android | Users", spend: 145.41, installs: 13, cpi: 11.19, impressions: 8210, clicks: 68, ctr: 0.83 },
      { name: "[AF] App Install | iOS | Users", spend: 151.36, installs: 13, cpi: 11.64, impressions: 10394, clicks: 169, ctr: 1.63 }
    ]
  },

  // SNAPCHAT DATA (Converted from USD to SAR)
  snapchat: {
    captains: [
      { name: "Leads | Captains", spend: 266.80 * USD_TO_SAR, leads: 53, cpl: 5.03 * USD_TO_SAR, impressions: 59865, clicks: 362, ctr: 0.60, appInstalls: 1 }
    ],
    users: [
      { name: "App Install | iOS | Users", spend: 133.15 * USD_TO_SAR, installs: 9, cpi: 14.79 * USD_TO_SAR, impressions: 122046, clicks: 3100, ctr: 2.54 },
      { name: "App Install | Android | Users", spend: 137.20 * USD_TO_SAR, installs: 57, cpi: 2.41 * USD_TO_SAR, impressions: 29356, clicks: 415, ctr: 1.41 },
      { name: "App Install | Users (Paused)", spend: 69.88 * USD_TO_SAR, installs: 1, cpi: 69.88 * USD_TO_SAR, impressions: 12301, clicks: 175, ctr: 1.42 }
    ]
  },

  // TIKTOK DATA (Already in SAR)
  tiktok: {
    captains: [
      { name: "Leads | Captains", spend: 182.77, leads: 98, cpl: 1.87, impressions: 65252, clicks: 1098, ctr: 1.68 }
    ],
    users: [
      { name: "App Install | Android | Users", spend: 278.88, installs: 50, cpi: 5.58, impressions: 42261, clicks: 383, ctr: 0.91 },
      { name: "App Install | iOS | Users (SKAN)", spend: 260.87, installs: 10, cpi: 26.09, impressions: 31854, clicks: 487, ctr: 1.53 },
      { name: "Video Views | New Users (Paused)", spend: 121.53, installs: 0, cpi: 0, impressions: 20455, clicks: 421, ctr: 2.06 }
    ]
  }
};

// Calculate totals
const calculateTotals = () => {
  const metaCaptainsSpend = campaignData.meta.captains.reduce((sum, c) => sum + c.spend, 0);
  const metaCaptainsInstalls = campaignData.meta.captains.reduce((sum, c) => sum + c.installs, 0);
  const snapchatCaptainsSpend = campaignData.snapchat.captains.reduce((sum, c) => sum + c.spend, 0);
  const snapchatCaptainsLeads = campaignData.snapchat.captains.reduce((sum, c) => sum + c.leads, 0);
  const tiktokCaptainsSpend = campaignData.tiktok.captains.reduce((sum, c) => sum + c.spend, 0);
  const tiktokCaptainsLeads = campaignData.tiktok.captains.reduce((sum, c) => sum + c.leads, 0);
  const metaUsersSpend = campaignData.meta.users.reduce((sum, c) => sum + c.spend, 0);
  const metaUsersInstalls = campaignData.meta.users.reduce((sum, c) => sum + c.installs, 0);
  const snapchatUsersSpend = campaignData.snapchat.users.reduce((sum, c) => sum + c.spend, 0);
  const snapchatUsersInstalls = campaignData.snapchat.users.reduce((sum, c) => sum + c.installs, 0);
  const tiktokUsersSpend = campaignData.tiktok.users.reduce((sum, c) => sum + c.spend, 0);
  const tiktokUsersInstalls = campaignData.tiktok.users.reduce((sum, c) => sum + c.installs, 0);

  return {
    captains: {
      totalSpend: metaCaptainsSpend + snapchatCaptainsSpend + tiktokCaptainsSpend,
      totalInstalls: metaCaptainsInstalls,
      totalLeads: snapchatCaptainsLeads + tiktokCaptainsLeads,
      byPlatform: {
        meta: { spend: metaCaptainsSpend, installs: metaCaptainsInstalls },
        snapchat: { spend: snapchatCaptainsSpend, leads: snapchatCaptainsLeads },
        tiktok: { spend: tiktokCaptainsSpend, leads: tiktokCaptainsLeads }
      }
    },
    users: {
      totalSpend: metaUsersSpend + snapchatUsersSpend + tiktokUsersSpend,
      totalInstalls: metaUsersInstalls + snapchatUsersInstalls + tiktokUsersInstalls,
      byPlatform: {
        meta: { spend: metaUsersSpend, installs: metaUsersInstalls },
        snapchat: { spend: snapchatUsersSpend, installs: snapchatUsersInstalls },
        tiktok: { spend: tiktokUsersSpend, installs: tiktokUsersInstalls }
      }
    },
    overall: {
      totalSpend: metaCaptainsSpend + snapchatCaptainsSpend + tiktokCaptainsSpend + metaUsersSpend + snapchatUsersSpend + tiktokUsersSpend,
      totalInstalls: metaCaptainsInstalls + metaUsersInstalls + snapchatUsersInstalls + tiktokUsersInstalls,
      totalLeads: snapchatCaptainsLeads + tiktokCaptainsLeads
    }
  };
};

const totals = calculateTotals();

const formatNumber = (num) => num.toLocaleString('en-US', { maximumFractionDigits: 2 });
const formatCurrency = (num) => `${formatNumber(num)} SAR`;

// Header Component
const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo-section">
        <div className="logo">
          <img src="/logo.jpg" alt="SheGo Logo" className="logo-image" />
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

// Summary Card Component
const SummaryCard = ({ title, value, subtitle, icon, color }) => (
  <div className={`summary-card glass`}>
    <div className={`card-icon ${color}`}>{icon}</div>
    <div className="card-content">
      <h3>{title}</h3>
      <p className="value">{value}</p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  </div>
);

// Executive Summary Section
const ExecutiveSummary = () => (
  <section className="executive-summary">
    <h2 className="section-title">Executive Summary</h2>
    <div className="summary-grid">
      <SummaryCard
        title="Total Ad Spend"
        value={formatCurrency(totals.overall.totalSpend)}
        icon="💰"
        color="purple"
      />
      <SummaryCard
        title="Total App Downloads"
        value={formatNumber(totals.overall.totalInstalls)}
        subtitle={`Avg. CPI: ${formatCurrency(totals.overall.totalSpend / totals.overall.totalInstalls)}`}
        icon="📱"
        color="blue"
      />
      <SummaryCard
        title="Captain Leads"
        value={formatNumber(totals.captains.totalLeads)}
        subtitle={`Avg. CPL: ${formatCurrency((totals.captains.byPlatform.snapchat.spend + totals.captains.byPlatform.tiktok.spend) / totals.captains.totalLeads)}`}
        icon="👩‍✈️"
        color="green"
      />
      <SummaryCard
        title="Captain App Installs"
        value={formatNumber(totals.captains.totalInstalls)}
        subtitle={`CPI: ${formatCurrency(totals.captains.byPlatform.meta.spend / totals.captains.totalInstalls)}`}
        icon="🚗"
        color="orange"
      />
    </div>
  </section>
);

// Audience Breakdown Component
const AudienceBreakdown = () => (
  <section className="audience-breakdown">
    <h2 className="section-title">Performance by Audience</h2>
    <div className="audience-grid">
      <div className="audience-card captains glass">
        <div className="audience-header">
          <div className="audience-icon">👩‍✈️</div>
          <h3>Captains (Drivers)</h3>
        </div>
        <div className="audience-stats">
          <div className="stat">
            <span className="label">Total Spend</span>
            <span className="value">{formatCurrency(totals.captains.totalSpend)}</span>
          </div>
          <div className="stat">
            <span className="label">App Installs</span>
            <span className="value">{totals.captains.totalInstalls}</span>
          </div>
          <div className="stat">
            <span className="label">Leads Collected</span>
            <span className="value">{totals.captains.totalLeads}</span>
          </div>
          <div className="stat highlight">
            <span className="label">Cost per Lead</span>
            <span className="value">{formatCurrency((totals.captains.byPlatform.snapchat.spend + totals.captains.byPlatform.tiktok.spend) / totals.captains.totalLeads)}</span>
          </div>
        </div>
      </div>

      <div className="audience-card users glass">
        <div className="audience-header">
          <div className="audience-icon">👩</div>
          <h3>Users (Customers)</h3>
        </div>
        <div className="audience-stats">
          <div className="stat">
            <span className="label">Total Spend</span>
            <span className="value">{formatCurrency(totals.users.totalSpend)}</span>
          </div>
          <div className="stat">
            <span className="label">App Installs</span>
            <span className="value">{totals.users.totalInstalls}</span>
          </div>
          <div className="stat highlight">
            <span className="label">Cost per Install</span>
            <span className="value">{formatCurrency(totals.users.totalSpend / totals.users.totalInstalls)}</span>
          </div>
          <div className="stat">
            <span className="label">Platforms</span>
            <span className="value">3</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Platform Comparison Chart
const PlatformComparison = () => {
  const platforms = [
    { name: 'Meta', spend: totals.captains.byPlatform.meta.spend + totals.users.byPlatform.meta.spend, color: '#1877f2', logo: <MetaLogo /> },
    { name: 'Snapchat', spend: totals.captains.byPlatform.snapchat.spend + totals.users.byPlatform.snapchat.spend, color: '#FFFC00', logo: <SnapchatLogo /> },
    { name: 'TikTok', spend: totals.captains.byPlatform.tiktok.spend + totals.users.byPlatform.tiktok.spend, color: '#ff0050', logo: <TikTokLogo /> }
  ];
  const maxSpend = Math.max(...platforms.map(p => p.spend));

  return (
    <section className="platform-comparison glass">
      <h2 className="section-title">Spend Distribution by Platform</h2>
      <div className="comparison-chart">
        {platforms.map((platform, idx) => (
          <div key={idx} className="bar-container">
            <div className="bar-label">
              <span className={`bar-logo ${platform.name.toLowerCase()}`}>{platform.logo}</span>
              {platform.name}
            </div>
            <div className="bar-wrapper">
              <div
                className="bar"
                style={{
                  width: `${(platform.spend / maxSpend) * 100}%`,
                  backgroundColor: platform.color
                }}
              />
            </div>
            <div className="bar-value">{formatCurrency(platform.spend)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Platform Logo Components
const MetaLogo = () => (
  <svg viewBox="0 0 36 36" fill="currentColor" width="24" height="24">
    <path d="M18 2.1C9.2 2.1 2.1 9.2 2.1 18c0 7.9 5.8 14.5 13.4 15.7v-11.1h-4v-4.6h4v-3.5c0-4 2.4-6.2 6-6.2 1.7 0 3.5.3 3.5.3v3.9h-2c-2 0-2.6 1.2-2.6 2.5v3h4.4l-.7 4.6h-3.7v11.1c7.6-1.2 13.4-7.8 13.4-15.7.1-8.8-7-15.9-15.8-15.9z"/>
  </svg>
);

const SnapchatLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-.809-.329-1.228-.719-1.228-1.153 0-.359.255-.704.72-.853.149-.06.314-.09.494-.09.12 0 .284.015.434.09.389.18.748.3 1.048.3.181 0 .314-.045.399-.104-.009-.18-.019-.359-.034-.553l-.004-.06c-.104-1.627-.229-3.654.3-4.848 1.583-3.545 4.94-3.821 5.93-3.821h.424z"/>
  </svg>
);

const TikTokLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Platform Card Component
const PlatformCard = ({ platform, data }) => {
  const platformNames = {
    meta: 'Meta (Facebook/Instagram)',
    snapchat: 'Snapchat',
    tiktok: 'TikTok'
  };
  const platformLogos = {
    meta: <MetaLogo />,
    snapchat: <SnapchatLogo />,
    tiktok: <TikTokLogo />
  };

  return (
    <div className={`platform-card ${platform} glass`}>
      <div className="platform-header">
        <div className="platform-icon">{platformLogos[platform]}</div>
        <h3>{platformNames[platform]}</h3>
      </div>
      <div className="platform-content">
        {data.captains && data.captains.length > 0 && (
          <div className="campaign-group">
            <h4>👩‍✈️ Captains Campaigns</h4>
            <table>
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Spend</th>
                  <th>Results</th>
                  <th>Cost/Result</th>
                </tr>
              </thead>
              <tbody>
                {data.captains.map((campaign, idx) => (
                  <tr key={idx}>
                    <td>{campaign.name}</td>
                    <td>{formatCurrency(campaign.spend)}</td>
                    <td>{campaign.installs ? `${campaign.installs} installs` : `${campaign.leads} leads`}</td>
                    <td>{formatCurrency(campaign.cpi || campaign.cpl)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data.users && data.users.length > 0 && (
          <div className="campaign-group">
            <h4>👩 Users Campaigns</h4>
            <table>
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Spend</th>
                  <th>Installs</th>
                  <th>CPI</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((campaign, idx) => (
                  <tr key={idx}>
                    <td>{campaign.name}</td>
                    <td>{formatCurrency(campaign.spend)}</td>
                    <td>{campaign.installs}</td>
                    <td>{campaign.cpi > 0 ? formatCurrency(campaign.cpi) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Platform Breakdown Section
const PlatformBreakdown = () => (
  <section className="platform-breakdown">
    <h2 className="section-title">Platform Performance Details</h2>
    <div className="platforms-grid">
      <PlatformCard platform="meta" data={campaignData.meta} />
      <PlatformCard platform="snapchat" data={campaignData.snapchat} />
      <PlatformCard platform="tiktok" data={campaignData.tiktok} />
    </div>
  </section>
);

// Key Insights Section
const KeyInsights = () => (
  <section className="key-insights">
    <h2 className="section-title">Key Insights & Recommendations</h2>
    <div className="insights-grid">
      <div className="insight-card success glass">
        <div className="insight-icon">✅</div>
        <h4>Best Performing</h4>
        <p><strong>TikTok Captain Leads</strong> achieved the lowest CPL at <strong>{formatCurrency(1.87)}</strong> with 98 leads collected.</p>
      </div>
      <div className="insight-card success glass">
        <div className="insight-icon">✅</div>
        <h4>Efficient User Acquisition</h4>
        <p><strong>Meta Android Captains</strong> delivered installs at <strong>{formatCurrency(6.64)}</strong> CPI - most efficient for captain recruitment.</p>
      </div>
      <div className="insight-card warning glass">
        <div className="insight-icon">⚠️</div>
        <h4>Higher Cost Channel</h4>
        <p><strong>Snapchat iOS Users</strong> has higher CPI at <strong>{formatCurrency(14.79 * USD_TO_SAR)}</strong>. Consider optimizing targeting or creatives.</p>
      </div>
      <div className="insight-card info glass">
        <div className="insight-icon">💡</div>
        <h4>Recommendation</h4>
        <p>Scale TikTok lead campaigns for captains and Meta Android campaigns for both audiences due to strong cost efficiency.</p>
      </div>
    </div>
  </section>
);

// Final Summary Section
const FinalSummary = () => (
  <section className="final-summary">
    <h2 className="section-title">Week at a Glance</h2>
    <div className="final-summary-content glass">
      <div className="summary-box">
        <div className="summary-row header">
          <span>Metric</span>
          <span>Captains</span>
          <span>Users</span>
          <span>Total</span>
        </div>
        <div className="summary-row">
          <span>Ad Spend</span>
          <span>{formatCurrency(totals.captains.totalSpend)}</span>
          <span>{formatCurrency(totals.users.totalSpend)}</span>
          <span className="highlight">{formatCurrency(totals.overall.totalSpend)}</span>
        </div>
        <div className="summary-row">
          <span>App Installs</span>
          <span>{totals.captains.totalInstalls}</span>
          <span>{totals.users.totalInstalls}</span>
          <span className="highlight">{totals.overall.totalInstalls}</span>
        </div>
        <div className="summary-row">
          <span>Leads</span>
          <span>{totals.captains.totalLeads}</span>
          <span>-</span>
          <span className="highlight">{totals.overall.totalLeads}</span>
        </div>
        <div className="summary-row">
          <span>Avg. CPI</span>
          <span>{formatCurrency(totals.captains.byPlatform.meta.spend / totals.captains.totalInstalls)}</span>
          <span>{formatCurrency(totals.users.totalSpend / totals.users.totalInstalls)}</span>
          <span className="highlight">{formatCurrency(totals.overall.totalSpend / totals.overall.totalInstalls)}</span>
        </div>
      </div>
      <div className="bottom-line">
        <h3>The Bottom Line</h3>
        <p>
          This week, <strong>{formatCurrency(totals.overall.totalSpend)}</strong> was invested across Meta, Snapchat, and TikTok,
          resulting in <strong>{totals.overall.totalInstalls} app downloads</strong> and <strong>{totals.overall.totalLeads} captain leads</strong>.
          The average cost per install is <strong>{formatCurrency(totals.overall.totalSpend / totals.overall.totalInstalls)}</strong>,
          and the average cost per lead is <strong>{formatCurrency((totals.captains.byPlatform.snapchat.spend + totals.captains.byPlatform.tiktok.spend) / totals.captains.totalLeads)}</strong>.
        </p>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-logo">
        <img src="/logo.jpg" alt="SheGo" />
        <span>SheGo</span>
      </div>
      <p>Weekly Performance Report | {campaignData.reportPeriod}</p>
      <p className="powered">Prepared by SEET Marketing Solutions</p>
    </div>
  </footer>
);

// Main App Component
function App() {
  return (
    <div className="App">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background blur effects */}
      <div className="bg-blur-1" />
      <div className="bg-blur-2" />

      <Header />
      <main className="main-content">
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
